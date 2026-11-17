import { Suspense } from 'react'
import { AppHeader, PageSkeleton } from '@/components/AppHeader'
import { requireOwner } from '@/lib/auth/session'

// Everything under /dashboard is per-user and dynamic. Reading the session (cookies) happens inside
// Suspense, so the rest of the app keeps its static shell under Cache Components / PPR.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Shell>{children}</Shell>
    </Suspense>
  )
}

async function Shell({ children }: { children: React.ReactNode }) {
  const session = await requireOwner()
  return (
    <>
      <AppHeader
        title="Owner"
        email={session.email}
        links={[
          { href: '/dashboard', label: 'Overview' },
          { href: '/dashboard/menu', label: 'Menu' },
          { href: '/dashboard/settings', label: 'Shop details' },
        ]}
      />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </>
  )
}
