import Link from 'next/link'
import { Suspense } from 'react'
import { ui } from '@/components/ui'

// The page itself is static (part of the prerendered shell).
// Only the optional error banner reads searchParams, so it sits in its own Suspense boundary.
export default function Home({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <Suspense>
        <AuthError searchParams={searchParams} />
      </Suspense>
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">Open Menu</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
        A menu your customers can open with one scan.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-stone-600">
        Restaurants, hotels, grocery shops and furniture stores: list your products in groups with prices and photos,
        mark what is out of stock, and let customers add up their total on their own phone.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/auth/login?mode=signup&next=/dashboard" className={ui.btnPrimary} prefetch={false}>
          Create your shop
        </Link>
        <Link href="/auth/login?next=/dashboard" className={ui.btn} prefetch={false}>
          Sign in
        </Link>
        <Link href="/auth/login?provider=google&next=/dashboard" className={ui.btn} prefetch={false}>
          Continue with Google
        </Link>
        <Link href="/demo-cafe" className={ui.btn}>
          See a demo menu
        </Link>
      </div>

      <ul className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          ['Group your items', 'Breakfast, Drinks, Tables, Cots: organise anything into groups.'],
          ['Control availability', 'Hide items or mark them sold out in one tap. Changes show up instantly.'],
          ['Built-in calculator', 'Customers pick items and see the running total. Share it on WhatsApp.'],
        ].map(([title, text]) => (
          <li key={title} className={ui.card}>
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-stone-600">{text}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

/** The OAuth callback redirects to /?error=auth when sign-in fails. */
async function AuthError({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  if (error !== 'auth') return null
  return (
    <p role="alert" className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      Sign-in did not complete. Please try again.
    </p>
  )
}
