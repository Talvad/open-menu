"use client";

import { useState, useMemo } from "react";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-bricolage",
});

type MenuTag = {
  label: string;
  variant?: "amber" | "stone";
};

type MenuItem = {
  id: string;
  group: "breakfast" | "drinks";
  name: string;
  description: string;
  price: number;
  hasImage?: boolean;
  soldOut?: boolean;
  tags: MenuTag[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: "veg-sandwich",
    group: "breakfast",
    name: "Veg Sandwich",
    description: "Grilled, with mint chutney",
    price: 80,
    hasImage: true,
    tags: [{ label: "veg", variant: "amber" }],
  },
  {
    id: "masala-dosa",
    group: "breakfast",
    name: "Masala Dosa",
    description: "Crisp dosa with potato masala, sambar and chutney",
    price: 95,
    hasImage: true,
    tags: [
      { label: "veg", variant: "amber" },
      { label: "popular", variant: "amber" },
    ],
  },
  {
    id: "egg-omelette",
    group: "breakfast",
    name: "Egg Omelette",
    description: "Two eggs, onion, chilli",
    price: 60,
    soldOut: true,
    tags: [{ label: "non-veg", variant: "stone" }],
  },
  {
    id: "filter-coffee",
    group: "drinks",
    name: "Filter Coffee",
    description: "South Indian style",
    price: 30,
    tags: [{ label: "veg", variant: "amber" }],
  },
  {
    id: "fresh-lime-soda",
    group: "drinks",
    name: "Fresh Lime Soda",
    description: "Sweet or salted",
    price: 45,
    tags: [
      { label: "veg", variant: "amber" },
      { label: "Size: 250 ml", variant: "stone" },
    ],
  },
];

const GROUPS = [
  { id: "breakfast", label: "Breakfast" },
  { id: "drinks", label: "Drinks" },
] as const;

export default function DemoMenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<"breakfast" | "drinks">(
    "breakfast",
  );
  // Pre-populated to match your initial mockup state (1 Veg Sandwich + 2 Masala Dosas = ₹270.00)
  const [cart, setCart] = useState<Record<string, number>>({
    "veg-sandwich": 1,
    "masala-dosa": 2,
  });

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[id] || 0) + delta;
      if (nextQty <= 0) {
        const { [id]: _, ...rest } = prev;
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
        item.tags.some((t) => t.label.toLowerCase().includes(q)),
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
    <div
      className={`${bricolage.variable} flex min-h-[1250px] flex-col bg-[#FAF8F5] font-sans text-[#1C1917]`}
    >
      {/* Shop header */}
      <header className="bg-[#B45309] px-4 pb-[22px] pt-8 text-white">
        <div className="mx-auto max-w-[672px]">
          <h1
            className="m-0 text-[32px] font-bold leading-[1.1] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
            }}
          >
            Demo Cafe
          </h1>
          <p className="m-0 mt-1.5 text-[15px] text-[#FFF3DC]">
            Breakfast, coffee and fresh juices.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#FFF3DC]">
            <span>Kuzhithurai</span>
            <a href="tel:9876543210" className="text-[#FFF3DC] underline">
              98765 43210
            </a>
          </div>
        </div>
      </header>

      {/* Sticky search + group chips */}
      <div className="sticky top-0 z-[2] border-b border-[#E7E5E4] bg-white">
        <div className="mx-auto max-w-[672px] px-4 py-2.5">
          <label htmlFor="q" className="sr-only">
            Search this menu
          </label>
          <input
            id="q"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search this menu"
            className="box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] placeholder:text-[#78716C] focus:border-[#B45309] focus:outline-none"
          />
          <nav
            aria-label="Groups"
            className="mt-2.5 flex gap-2 overflow-x-auto"
          >
            {GROUPS.map((group) => {
              const isActive = activeGroup === group.id;
              return (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  onClick={() => setActiveGroup(group.id)}
                  className={`shrink-0 rounded-full px-4 py-[9px] text-sm transition-colors ${
                    isActive
                      ? "bg-[#1C1917] font-semibold text-[#FFF3DC]"
                      : "bg-[#F5F5F4] font-medium text-[#1C1917] hover:bg-[#E7E5E4]"
                  }`}
                >
                  {group.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Menu */}
      <main className="mx-auto box-border flex w-full max-w-[672px] grow flex-col gap-8 px-4 py-6">
        {GROUPS.map((group) => {
          const groupItems = filteredItems.filter(
            (item) => item.group === group.id,
          );
          if (groupItems.length === 0) return null;

          return (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <h2
                className="m-0 mb-3 text-2xl font-bold tracking-[-0.01em]"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                {group.label}
              </h2>

              <div className="flex flex-col gap-3">
                {groupItems.map((item) => {
                  const qty = cart[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-[14px] border border-[#E7E5E4] bg-white p-3"
                    >
                      {item.hasImage && (
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[10px] bg-[#FDE7C2]">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#92400E"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="3" y="4" width="18" height="16" rx="2" />
                            <circle cx="9" cy="10" r="2" />
                            <path d="M21 16l-5-5-8 8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex min-w-0 flex-1 flex-col">
                        <h3
                          className={`m-0 text-base font-semibold ${
                            item.soldOut ? "text-[#57534E]" : "text-[#1C1917]"
                          }`}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={`m-0 mt-0.5 text-sm ${
                            item.soldOut ? "text-[#57534E]" : "text-[#44403C]"
                          }`}
                        >
                          {item.description}
                        </p>

                        {item.tags.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag.label}
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                  tag.variant === "stone"
                                    ? "bg-[#F5F5F4] text-[#44403C]"
                                    : "bg-[#FFFBEB] text-[#92400E]"
                                }`}
                              >
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        )}

                        <div
                          className={`mt-auto flex items-center justify-between ${
                            item.hasImage ? "pt-2" : "pt-2.5"
                          }`}
                        >
                          <span
                            className={`font-bold ${
                              item.soldOut ? "text-[#57534E]" : "text-[#1C1917]"
                            }`}
                          >
                            ₹{item.price.toFixed(2)}
                          </span>

                          {item.soldOut ? (
                            <span className="rounded-full bg-[#E7E5E4] px-3.5 py-[7px] text-[13px] font-semibold text-[#44403C]">
                              Sold out
                            </span>
                          ) : qty > 0 ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                aria-label={`Remove one ${item.name}`}
                                className="h-10 w-10 rounded-[10px] border border-[#D6D3D1] bg-white text-xl leading-none text-[#1C1917] transition-colors hover:bg-stone-50"
                              >
                                −
                              </button>
                              <span className="min-w-[18px] text-center font-semibold">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                aria-label={`Add one more ${item.name}`}
                                className="h-10 w-10 rounded-[10px] border-0 bg-[#B45309] text-xl leading-none text-white transition-colors hover:bg-[#92400E]"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-10 rounded-[10px] border-0 bg-[#B45309] px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-[#92400E]"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filteredItems.length === 0 && (
          <p className="py-10 text-center text-sm text-[#57534E]">
            No items match &ldquo;{searchQuery}&rdquo;.
          </p>
        )}

        <p className="m-0 text-center text-xs text-[#57534E]">
          Menu powered by <span className="font-semibold">Open Menu</span>
        </p>
      </main>

      {/* Calculator bar */}
      {totalItems > 0 && (
        <div className="sticky bottom-0 z-[3] border-t border-[#E7E5E4] bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            className="mx-auto flex w-full max-w-[672px] items-center justify-between rounded-xl border-0 bg-[#B45309] px-4 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#92400E]"
          >
            <span>
              {totalItems} {totalItems === 1 ? "item" : "items"} · View total
            </span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
