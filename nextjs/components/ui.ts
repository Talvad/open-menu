// Tailwind class presets shared across the UI (kept as strings so server and client components can both use them).
export const ui = {
  input:
    'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200',
  label: 'mb-1 block text-xs font-medium uppercase tracking-wide text-stone-500',
  card: 'rounded-xl border border-stone-200 bg-white p-4 shadow-sm',
  btn: 'inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-100 disabled:opacity-50',
  btnPrimary:
    'inline-flex items-center justify-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50',
  btnDanger:
    'inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50',
  btnSmall: 'rounded-md border border-stone-300 bg-white px-2 py-1 text-xs font-medium hover:bg-stone-100 disabled:opacity-50',
} as const
