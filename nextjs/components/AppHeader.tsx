import Link from 'next/link'
import { ui } from './ui'

interface Props {
  title: string
  email: string
  links: { href: string; label: string }[]
}

export function AppHeader({ title, email, links }: Props) {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-amber-700">
          Open Menu
        </Link>
        <span className="rounded bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">{title}</span>
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-stone-600 hover:text-stone-900">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-sm text-stone-500">
          <span className="hidden sm:inline">{email}</span>
          <form action="/auth/logout" method="post">
            <button type="submit" className={ui.btnSmall}>
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-4 px-4 py-8">
      <div className="h-8 w-1/3 rounded bg-stone-200" />
      <div className="h-32 rounded-xl bg-stone-200" />
      <div className="h-32 rounded-xl bg-stone-200" />
    </div>
  )
}
