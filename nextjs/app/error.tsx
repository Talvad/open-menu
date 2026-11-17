'use client'

import { ui } from '@/components/ui'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-stone-600">{error.digest ? `Reference: ${error.digest}` : 'Please try again.'}</p>
      <button type="button" onClick={reset} className={`${ui.btnPrimary} mt-6`}>
        Try again
      </button>
    </main>
  )
}
