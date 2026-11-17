import { Suspense } from 'react'
import { AppHeader, PageSkeleton } from '@/components/AppHeader'
import { requireAdmin } from '@/lib/auth/session'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Shell>{children}</Shell>
    </Suspense>
  )
}

async function Shell({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin()
  return (
    <>
      <AppHeader
        title="Admin"
        email={session.email}
        links={[
          { href: '/admin?status=PENDING', label: 'Approval queue' },
          { href: '/admin?status=ALL', label: 'All shops' },
        ]}
      />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </>
  )
}
