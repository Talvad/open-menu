'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { formatMoney } from '@/lib/format';
import { ShopLogo } from '@/components/shop-logo';
import type { PriceOption, PublicItem, PublicMenu } from '@/lib/types';

type CartLine = {
  key: string;
  itemId: string;
  qty: number;
  variant?: string;
  extras: string[];
};

function cartKey(itemId: string, variant?: string, extras: string[] = []) {
  return JSON.stringify([itemId, variant ?? '', [...extras].sort()]);
}

function optionPrice(options: PriceOption[], selected: string[]) {
  return options
    .filter((option) => selected.includes(option.name))
    .reduce((sum, option) => sum + option.priceAdjustment, 0);
}

function linePrice(
  item: PublicItem,
  variant: string | undefined,
  extras: string[],
) {
  const variantAdjustment = item.variant?.options.find(
    (option) => option.name === variant,
  )?.priceAdjustment ?? 0;
  return item.price + variantAdjustment + optionPrice(item.extras, extras);
}

function restoreCart(raw: unknown, lookup: Map<string, PublicItem>): CartLine[] {
  const entries: unknown[] = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? Object.entries(raw).map(([itemId, qty]) => ({ itemId, qty }))
      : [];
  const restored = new Map<string, CartLine>();

  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') continue;
    const stored = entry as Record<string, unknown>;
    const itemId =
      typeof stored.itemId === 'string'
        ? stored.itemId
        : typeof stored.id === 'string'
          ? stored.id
          : '';
    const item = lookup.get(itemId);
    if (!item?.available || typeof stored.qty !== 'number') continue;
    if (!Number.isInteger(stored.qty) || stored.qty <= 0) continue;

    const variant =
      typeof stored.variant === 'string' &&
      item.variant?.options.some((option) => option.name === stored.variant)
        ? stored.variant
        : item.variant?.options[0]?.name;
    const extras = Array.isArray(stored.extras)
      ? stored.extras.filter(
          (name): name is string =>
            typeof name === 'string' &&
            item.extras.some((extra) => extra.name === name),
        )
      : [];
    const key = cartKey(itemId, variant, extras);
    const previous = restored.get(key);
    restored.set(key, {
      key,
      itemId,
      qty: Math.min(99, (previous?.qty ?? 0) + stored.qty),
      ...(variant ? { variant } : {}),
      extras,
    });
  }
  return [...restored.values()];
}

/**
 * Customer-facing menu + calculator. All cart logic is client-side: no backend calls, no cost per tap.
 * The cart is remembered per shop in localStorage (wrapped in try/catch: it can be blocked or empty).
 */
export function MenuClient({ menu }: { menu: PublicMenu }) {
  const { shop, groups } = menu;
  const storageKey = `om-cart:${shop.slug}`;
  const money = (n: number) => formatMoney(n, shop.currency);

  const [cart, setCart] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [selectedExtras, setSelectedExtras] = useState<Record<string, string[]>>(
    {},
  );

  const lookup = useMemo(() => {
    const map = new Map<string, PublicItem>();
    for (const g of groups) for (const i of g.items) map.set(i.id, i);
    return map;
  }, [groups]);

  // Restore the cart, dropping items that were removed or went out of stock since.
  useEffect(() => {
    let cancelled = false;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        const clean = restoreCart(saved, lookup);
        queueMicrotask(() => {
          if (cancelled) return;
          setCart(clean);
          setLoaded(true);
        });
      } else {
        queueMicrotask(() => {
          if (cancelled) return;
          setCart([]);
          setLoaded(true);
        });
      }
    } catch {
      queueMicrotask(() => {
        if (cancelled) return;
        setCart([]);
        setLoaded(true);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [storageKey, lookup]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart, loaded, storageKey]);

  const lines = cart
    .map((line) => {
      const item = lookup.get(line.itemId);
      return item
        ? { ...line, item, price: linePrice(item, line.variant, line.extras) }
        : null;
    })
    .filter(
      (
        line,
      ): line is CartLine & { item: PublicItem; price: number } =>
        line !== null,
    );
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  // Sum in minor units to avoid floating point drift (0.1 + 0.2).
  const totalCents = lines.reduce(
    (sum, line) => sum + Math.round(line.price * 100) * line.qty,
    0,
  );
  const total = totalCents / 100;

  const change = (
    item: PublicItem,
    variant: string | undefined,
    extras: string[],
    delta: number,
  ) => {
    const key = cartKey(item.id, variant, extras);
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      const qty = Math.max(0, Math.min(99, (existing?.qty ?? 0) + delta));
      if (qty === 0) return current.filter((line) => line.key !== key);
      const next: CartLine = {
        key,
        itemId: item.id,
        qty,
        ...(variant ? { variant } : {}),
        extras,
      };
      return existing
        ? current.map((line) => (line.key === key ? next : line))
        : [...current, next];
    });
  };

  const q = query.trim().toLowerCase();
  const visibleGroups = groups
    .map((g) => ({
      ...g,
      items: q
        ? g.items.filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              i.description.toLowerCase().includes(q),
          )
        : g.items,
    }))
    .filter((g) => g.items.length > 0);

  const orderText = [
    `Order from ${shop.name}`,
    ...lines.map((line) => {
      const selections = [line.variant, ...line.extras].filter(Boolean);
      const label = selections.length ? ` (${selections.join(', ')})` : '';
      return `${line.qty} x ${line.item.name}${label} - ${money(line.price * line.qty)}`;
    }),
    `Total: ${money(total)}`,
  ].join('\n');

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className={count > 0 ? 'pb-28' : 'pb-10'}>
      <header className='relative overflow-hidden bg-forest px-4 py-9 text-paper sm:py-12'>
        <div aria-hidden='true' className='absolute -right-10 -top-20 h-56 w-56 rounded-full border-[24px] border-white/[0.06]' />
        <div className='relative mx-auto max-w-3xl'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
            <ShopLogo
              name={shop.name}
              logoUrl={shop.logoUrl}
              size='lg'
              className='border-white/20'
            />
            <div>
              <p className='mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#efb08c]'>
                Today at
              </p>
              <h1 className='font-bricolage text-4xl font-bold tracking-[-0.06em] sm:text-6xl'>
                {shop.name}
              </h1>
            </div>
          </div>
          {shop.description && (
            <p className='mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base'>
              {shop.description}
            </p>
          )}
          <div className='mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/65 sm:text-sm'>
            {shop.address && <span>{shop.address}</span>}
            {shop.phone && (
              <a
                href={`tel:${shop.phone.replace(/[^\d+]/g, '')}`}
                className='underline'
              >
                {shop.phone}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className='sticky top-0 z-10 border-b border-[#e6ddd0] bg-background/95 backdrop-blur'>
        <div className='mx-auto max-w-3xl px-4 py-3'>
          <input
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search this menu'
            aria-label='Search this menu'
            className='w-full rounded-full border border-[#d9d0c3] bg-paper px-4 py-3 text-sm outline-none placeholder:text-[#898477] focus:border-primary focus:ring-2 focus:ring-primary/15'
          />
          {groups.length > 1 && !q && (
            <nav
              className='-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1'
              aria-label='Groups'
            >
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#g-${g.id}`}
                  className='shrink-0 rounded-full bg-[#eee8dd] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#e3dbcd]'
                >
                  {g.name}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

      <main className='mx-auto max-w-3xl space-y-9 px-4 py-8 sm:py-10'>
        {groups.length === 0 && (
          <p className='rounded-2xl border border-dashed border-[#d9d0c3] px-5 py-12 text-center text-sm text-[#716e63]'>
            Nothing is listed just yet. Please check back soon.
          </p>
        )}
        {groups.length > 0 && visibleGroups.length === 0 && (
          <p className='rounded-2xl border border-dashed border-[#d9d0c3] px-5 py-12 text-center text-sm text-[#716e63]'>
            Nothing matches “{query}”. Try another search.
          </p>
        )}

        {visibleGroups.map((g) => (
          <section key={g.id} id={`g-${g.id}`} className='scroll-mt-32'>
            <div className='mb-4 border-b border-[#ded5c7] pb-3'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
                On the menu
              </p>
              <h2 className='mt-1 font-bricolage text-3xl font-bold tracking-[-0.05em] text-forest'>
                {g.name}
              </h2>
            </div>
            <ul className='space-y-3'>
              {g.items.map((item) => {
                const variant =
                  selectedVariants[item.id] ?? item.variant?.options[0]?.name;
                const extras = selectedExtras[item.id] ?? [];
                const key = cartKey(item.id, variant, extras);
                const qty = cart.find((line) => line.key === key)?.qty ?? 0;
                const price = linePrice(item, variant, extras);
                const regularPrice =
                  item.originalPrice === undefined
                    ? undefined
                    : item.originalPrice + (price - item.price);
                return (
                  <li
                    key={item.id}
                    className={`flex gap-3 rounded-2xl border border-[#e6ddd0] bg-paper p-3 shadow-[0_8px_24px_rgba(47,54,43,0.04)] sm:gap-4 sm:p-4 ${
                      item.available ? '' : 'opacity-60'
                    }`}
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={112}
                        height={112}
                        sizes='(max-width: 640px) 96px, 112px'
                        className='h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28'
                      />
                    )}
                    <div className='flex min-w-0 flex-1 flex-col'>
                      <h3 className='font-bricolage text-lg font-bold tracking-[-0.03em] text-forest'>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className='mt-1 text-sm leading-5 text-[#626258]'>
                          {item.description}
                        </p>
                      )}
                      {(item.tags.length > 0 ||
                        Object.keys(item.attributes).length > 0) && (
                        <div className='mt-1 flex flex-wrap gap-1 text-xs'>
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className='rounded-full bg-[#e5eadf] px-2.5 py-1 text-forest'
                            >
                              {t}
                            </span>
                          ))}
                          {Object.entries(item.attributes).map(([k, v]) => (
                            <span
                              key={k}
                              className='rounded-full bg-[#eee8dd] px-2.5 py-1 text-[#5f5c52]'
                            >
                              {k}: {v}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.specialLabel && (
                        <p className='mt-2 text-xs font-semibold text-primary'>
                          {item.specialLabel}
                        </p>
                      )}
                      {item.variant && (
                        <label className='mt-3 flex max-w-xs flex-col gap-1 text-xs font-semibold text-forest'>
                          {item.variant.name}
                          <select
                            value={variant}
                            onChange={(event) =>
                              setSelectedVariants((current) => ({
                                ...current,
                                [item.id]: event.target.value,
                              }))
                            }
                            className='rounded-lg border border-[#d9d0c3] bg-paper px-3 py-2 text-sm font-normal'
                          >
                            {item.variant.options.map((option) => (
                              <option key={option.name} value={option.name}>
                                {option.name}
                                {option.priceAdjustment
                                  ? ` (+${money(option.priceAdjustment)})`
                                  : ''}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                      {item.extras.length > 0 && (
                        <fieldset className='mt-3'>
                          <legend className='text-xs font-semibold text-forest'>
                            Extras
                          </legend>
                          <div className='mt-1 flex flex-wrap gap-x-3 gap-y-1'>
                            {item.extras.map((extra) => (
                              <label
                                key={extra.name}
                                className='inline-flex items-center gap-1.5 text-xs text-[#626258]'
                              >
                                <input
                                  type='checkbox'
                                  checked={extras.includes(extra.name)}
                                  onChange={(event) =>
                                    setSelectedExtras((current) => {
                                      const selected = current[item.id] ?? [];
                                      return {
                                        ...current,
                                        [item.id]: event.target.checked
                                          ? [...selected, extra.name]
                                          : selected.filter(
                                              (name) => name !== extra.name,
                                            ),
                                      };
                                    })
                                  }
                                  className='accent-primary'
                                />
                                {extra.name}
                                {extra.priceAdjustment
                                  ? ` (+${money(extra.priceAdjustment)})`
                                  : ''}
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      )}
                      <div className='mt-auto flex items-center justify-between pt-2'>
                        <span className='font-semibold tabular-nums text-forest'>
                          {regularPrice !== undefined && (
                            <span className='mr-2 text-sm font-normal text-[#898477] line-through'>
                              {money(regularPrice)}
                            </span>
                          )}
                          {money(price)}
                        </span>
                        {!item.available ? (
                          <span className='rounded-full bg-[#eee8dd] px-3 py-1.5 text-xs font-semibold text-[#5f5c52]'>
                            Sold out
                          </span>
                        ) : qty === 0 ? (
                          <button
                            type='button'
                            onClick={() => change(item, variant, extras, 1)}
                            className='rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#a43d30]'
                          >
                            Add
                          </button>
                        ) : (
                          <div className='flex items-center gap-2'>
                            <button
                              type='button'
                              onClick={() => change(item, variant, extras, -1)}
                              aria-label={`Remove one ${item.name}`}
                              className='h-9 w-9 rounded-full border border-[#d9d0c3] bg-paper text-lg leading-none text-forest hover:bg-[#eee8dd]'
                            >
                              −
                            </button>
                            <span className='w-5 text-center font-medium tabular-nums'>
                              {qty}
                            </span>
                            <button
                              type='button'
                              onClick={() => change(item, variant, extras, 1)}
                              aria-label={`Add one more ${item.name}`}
                              className='h-9 w-9 rounded-full bg-primary text-lg leading-none text-white hover:bg-[#a43d30]'
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>

      <footer className='border-t border-[#e6ddd0] px-4 py-5 text-center text-xs text-[#716e63]'>
        A menu by <span className='font-semibold text-forest'>Open Menu</span>
      </footer>

      {count > 0 && (
        <div className='fixed inset-x-0 bottom-0 z-20 border-t border-[#e6ddd0] bg-background/95 p-3 shadow-[0_-8px_24px_rgba(47,54,43,0.08)] backdrop-blur'>
          <button
            type='button'
            onClick={() => setOpen(true)}
            className='mx-auto flex w-full max-w-3xl items-center justify-between rounded-full bg-forest px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-[#19382e]'
          >
            <span>
              {count} item{count === 1 ? '' : 's'} · View total
            </span>
            <span className='tabular-nums'>{money(total)}</span>
          </button>
        </div>
      )}

      {open && (
        <div
          className='fixed inset-0 z-30 flex items-end bg-black/40 sm:items-center sm:justify-center'
          onClick={() => setOpen(false)}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-label='Your selection'
            className='max-h-[85vh] w-full overflow-y-auto rounded-t-[1.75rem] border border-[#e6ddd0] bg-paper p-5 sm:max-w-md sm:rounded-[1.75rem] sm:p-6'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between'>
              <h2 className='font-bricolage text-2xl font-bold tracking-[-0.04em] text-forest'>
                Your selection
              </h2>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='text-sm text-stone-500 hover:text-stone-800'
              >
                Close
              </button>
            </div>

            {lines.length === 0 ? (
              <p className='mt-6 text-sm text-[#716e63]'>Nothing selected yet.</p>
            ) : (
              <ul className='mt-4 divide-y divide-[#eee7dc]'>
                {lines.map((line) => (
                  <li key={line.key} className='flex items-center gap-3 py-2'>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate font-medium'>{line.item.name}</p>
                      {(line.variant || line.extras.length > 0) && (
                        <p className='truncate text-xs text-[#716e63]'>
                          {[line.variant, ...line.extras]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      )}
                      <p className='text-xs text-[#716e63]'>
                        {money(line.price)} × {line.qty}
                      </p>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <button
                        type='button'
                        onClick={() =>
                          change(line.item, line.variant, line.extras, -1)
                        }
                        aria-label={`Remove one ${line.item.name}`}
                        className='h-7 w-7 rounded-md border border-stone-300 leading-none'
                      >
                        −
                      </button>
                      <span className='w-5 text-center text-sm tabular-nums'>
                        {line.qty}
                      </span>
                      <button
                        type='button'
                        onClick={() =>
                          change(line.item, line.variant, line.extras, 1)
                        }
                        aria-label={`Add one more ${line.item.name}`}
                        className='h-7 w-7 rounded-md border border-stone-300 leading-none'
                      >
                        +
                      </button>
                    </div>
                    <span className='w-20 text-right text-sm font-medium tabular-nums'>
                      {money(line.price * line.qty)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className='mt-4 flex items-center justify-between border-t border-[#ded5c7] pt-4 text-lg font-bold text-forest'>
              <span>Total</span>
              <span className='tabular-nums'>{money(total)}</span>
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              {shop.whatsapp && lines.length > 0 && (
                <a
                  href={`https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(orderText)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 rounded-full bg-forest px-3 py-2.5 text-center text-sm font-semibold text-paper hover:bg-[#19382e]'
                >
                  Send on WhatsApp
                </a>
              )}
              <button
                type='button'
                onClick={copyOrder}
                className='flex-1 rounded-full border border-[#d9d0c3] px-3 py-2.5 text-sm font-semibold text-forest hover:bg-[#eee8dd]'
              >
                {copied ? 'Copied' : 'Copy order'}
              </button>
              <button
                type='button'
                onClick={() => setCart([])}
                className='rounded-full border border-[#d9d0c3] px-3 py-2.5 text-sm hover:bg-[#eee8dd]'
              >
                Clear
              </button>
            </div>
            <p className='mt-3 text-xs leading-5 text-[#898477]'>
              Use this as a quick estimate. The shop will confirm your final total.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
