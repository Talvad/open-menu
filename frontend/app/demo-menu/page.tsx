'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import Link from 'next/link';
import { BrandLockup } from '@/components/brand-mark';

type MenuTag = {
  label: string;
  variant?: 'amber' | 'stone';
};

type MenuItem = {
  id: string;
  group: 'breakfast' | 'drinks';
  name: string;
  description: string;
  price: number;
  hasImage?: boolean;
  soldOut?: boolean;
  tags: MenuTag[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'veg-sandwich',
    group: 'breakfast',
    name: 'Veg Sandwich',
    description: 'Grilled, with mint chutney',
    price: 80,
    hasImage: true,
    tags: [{ label: 'veg', variant: 'amber' }],
  },
  {
    id: 'masala-dosa',
    group: 'breakfast',
    name: 'Masala Dosa',
    description: 'Crisp dosa with potato masala, sambar and chutney',
    price: 95,
    hasImage: true,
    tags: [
      { label: 'veg', variant: 'amber' },
      { label: 'popular', variant: 'amber' },
    ],
  },
  {
    id: 'egg-omelette',
    group: 'breakfast',
    name: 'Egg Omelette',
    description: 'Two eggs, onion, chilli',
    price: 60,
    soldOut: true,
    tags: [{ label: 'non-veg', variant: 'stone' }],
  },
  {
    id: 'filter-coffee',
    group: 'drinks',
    name: 'Filter Coffee',
    description: 'South Indian style',
    price: 30,
    tags: [{ label: 'veg', variant: 'amber' }],
  },
  {
    id: 'fresh-lime-soda',
    group: 'drinks',
    name: 'Fresh Lime Soda',
    description: 'Sweet or salted',
    price: 45,
    tags: [
      { label: 'veg', variant: 'amber' },
      { label: 'Size: 250 ml', variant: 'stone' },
    ],
  },
];

const GROUPS = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'drinks', label: 'Drinks' },
] as const;

const ART_BACKGROUNDS = [
  'bg-[#e9d8bd] text-[#815c3d]',
  'bg-[#ead6c9] text-[#934c3d]',
];

export default function DemoMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<'breakfast' | 'drinks'>(
    'breakfast',
  );
  const [cart, setCart] = useState<Record<string, number>>({
    'veg-sandwich': 1,
    'masala-dosa': 2,
  });

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[id] || 0) + delta;
      if (nextQty <= 0) {
        const { [id]: removed, ...rest } = prev;
        void removed;
        return rest;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MENU_ITEMS;
    return MENU_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.label.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  const { totalItems, totalAmount } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of MENU_ITEMS) {
      const qty = cart[item.id] || 0;
      count += qty;
      sum += qty * item.price;
    }
    return { totalItems: count, totalAmount: sum };
  }, [cart]);

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <header className='border-b border-[#e6ddd0] bg-background px-4 py-3 sm:px-8'>
        <div className='mx-auto flex max-w-5xl items-center justify-between gap-4'>
          <Link href='/' aria-label='Open Menu home' className='rounded-lg'>
            <BrandLockup />
          </Link>
          <span className='hidden rounded-full bg-[#e5eadf] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest sm:inline-flex'>
            Interactive demo
          </span>
          <Link
            href='/auth/login?mode=signup&next=/dashboard'
            className='inline-flex items-center gap-1 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-paper transition-colors hover:bg-[#19382e] sm:text-sm'
          >
            Make a menu <ArrowUpRight aria-hidden='true' className='h-4 w-4' />
          </Link>
        </div>
      </header>

      <section className='bg-forest px-4 pb-8 pt-8 text-paper sm:px-8 sm:pb-10 sm:pt-12'>
        <div className='mx-auto max-w-5xl'>
          <p className='mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#efb08c]'>
            A sample shop menu
          </p>
          <h1 className='m-0 font-bricolage text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl'>
            Demo Cafe
          </h1>
          <p className='m-0 mt-3 max-w-lg text-sm leading-6 text-white/70 sm:text-base'>
            Breakfast worth getting up for, coffee worth lingering over, and
            something fresh for the walk home.
          </p>
          <div className='mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/65 sm:text-sm'>
            <span>Kuzhithurai · Open today, 8 am–4 pm</span>
            <a
              href='tel:9876543210'
              className='text-white underline decoration-white/40 underline-offset-4'
            >
              98765 43210
            </a>
          </div>
        </div>
      </section>

      <div className='sticky top-0 z-[2] border-b border-[#e6ddd0] bg-background/95 backdrop-blur'>
        <div className='mx-auto max-w-5xl px-4 py-3 sm:px-8'>
          <label htmlFor='q' className='sr-only'>
            Search this menu
          </label>
          <div className='relative'>
            <Search
              aria-hidden='true'
              className='absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898477]'
            />
            <input
              id='q'
              type='search'
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder='Find something delicious'
              className='box-border w-full rounded-full border border-[#d9d0c3] bg-paper py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-[#898477] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15'
            />
          </div>
          <nav
            aria-label='Groups'
            className='mt-3 flex gap-2 overflow-x-auto'
          >
            {GROUPS.map((group) => {
              const isActive = activeGroup === group.id;
              return (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  onClick={() => setActiveGroup(group.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-forest font-semibold text-paper'
                      : 'bg-[#eee8dd] font-medium text-foreground hover:bg-[#e3dbcd]'
                  }`}
                >
                  {group.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <main
        className={`mx-auto box-border flex w-full max-w-5xl grow flex-col gap-8 px-4 py-8 sm:px-8 sm:py-10 ${
          totalItems > 0 ? 'pb-28' : ''
        }`}
      >
        {GROUPS.map((group) => {
          const groupItems = filteredItems.filter(
            (item) => item.group === group.id,
          );
          if (groupItems.length === 0) return null;

          return (
            <section key={group.id} id={group.id} className='scroll-mt-36'>
              <div className='mb-4 flex items-end justify-between border-b border-[#ded5c7] pb-3'>
                <div>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
                    From the kitchen
                  </p>
                  <h2 className='m-0 mt-1 font-bricolage text-3xl font-bold tracking-[-0.05em] text-forest sm:text-4xl'>
                    {group.label}
                  </h2>
                </div>
                <span className='text-xs font-medium text-[#716e63]'>
                  {groupItems.length} picks
                </span>
              </div>

              <div className='grid gap-3 md:grid-cols-2'>
                {groupItems.map((item, index) => {
                  const qty = cart[item.id] || 0;

                  return (
                    <article
                      key={item.id}
                      className='flex min-h-36 gap-3 rounded-2xl border border-[#e6ddd0] bg-paper p-3 shadow-[0_8px_24px_rgba(47,54,43,0.04)] sm:gap-4 sm:p-4'
                    >
                      {item.hasImage && (
                        <div
                          aria-hidden='true'
                          className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-xl text-4xl sm:h-28 sm:w-28 ${ART_BACKGROUNDS[index % ART_BACKGROUNDS.length]}`}
                        >
                          {item.id === 'masala-dosa' ? '🥞' : '🥪'}
                        </div>
                      )}

                      <div className='flex min-w-0 flex-1 flex-col'>
                        <div className='flex items-start justify-between gap-2'>
                          <h3
                            className={`m-0 font-bricolage text-lg font-bold leading-tight tracking-[-0.03em] ${
                              item.soldOut ? 'text-[#777468]' : 'text-forest'
                            }`}
                          >
                            {item.name}
                          </h3>
                          {item.tags.some((tag) => tag.label === 'popular') && (
                            <span className='shrink-0 rounded-full bg-[#f5dfd9] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#943f32]'>
                              Popular
                            </span>
                          )}
                        </div>
                        <p
                          className={`m-0 mt-1 text-xs leading-5 sm:text-sm ${
                            item.soldOut ? 'text-[#777468]' : 'text-[#626258]'
                          }`}
                        >
                          {item.description}
                        </p>

                        {item.tags.length > 0 && (
                          <div className='mt-2 flex flex-wrap gap-1'>
                            {item.tags
                              .filter((tag) => tag.label !== 'popular')
                              .map((tag) => (
                                <span
                                  key={tag.label}
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                    tag.variant === 'stone'
                                      ? 'bg-[#eee8dd] text-[#5f5c52]'
                                      : 'bg-[#e5eadf] text-forest'
                                  }`}
                                >
                                  {tag.label}
                                </span>
                              ))}
                          </div>
                        )}

                        <div className='mt-auto flex items-center justify-between gap-2 pt-3'>
                          <span
                            className={`font-semibold tabular-nums ${
                              item.soldOut ? 'text-[#777468]' : 'text-forest'
                            }`}
                          >
                            ₹{item.price.toFixed(2)}
                          </span>

                          {item.soldOut ? (
                            <span className='rounded-full bg-[#eee8dd] px-3 py-1.5 text-xs font-semibold text-[#5f5c52]'>
                              Sold out
                            </span>
                          ) : qty > 0 ? (
                            <div className='flex items-center gap-2'>
                              <button
                                type='button'
                                onClick={() => updateQuantity(item.id, -1)}
                                aria-label={`Remove one ${item.name}`}
                                className='h-9 w-9 rounded-full border border-[#d9d0c3] bg-paper text-lg leading-none text-forest transition-colors hover:bg-[#eee8dd]'
                              >
                                −
                              </button>
                              <span className='min-w-5 text-center text-sm font-semibold tabular-nums'>
                                {qty}
                              </span>
                              <button
                                type='button'
                                onClick={() => updateQuantity(item.id, 1)}
                                aria-label={`Add one more ${item.name}`}
                                className='h-9 w-9 rounded-full bg-primary text-lg leading-none text-white transition-colors hover:bg-[#a43d30]'
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type='button'
                              onClick={() => updateQuantity(item.id, 1)}
                              className='rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#a43d30]'
                            >
                              Add to order
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filteredItems.length === 0 && (
          <p className='rounded-2xl border border-dashed border-[#d9d0c3] py-12 text-center text-sm text-[#716e63]'>
            Nothing on the menu matches “{searchQuery}”. Try another search.
          </p>
        )}
      </main>

      {totalItems > 0 && (
        <div className='sticky bottom-0 z-[3] border-t border-[#e6ddd0] bg-background/95 p-3 backdrop-blur'>
          <button
            type='button'
            className='mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-forest px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-[#19382e]'
          >
            <span>
              {totalItems} {totalItems === 1 ? 'item' : 'items'} · View your
              total
            </span>
            <span className='tabular-nums'>₹{totalAmount.toFixed(2)}</span>
          </button>
        </div>
      )}
      <footer className='border-t border-[#e6ddd0] px-4 py-5 text-center text-xs text-[#716e63]'>
        A menu by <span className='font-semibold text-forest'>Open Menu</span>
      </footer>
    </div>
  );
}
