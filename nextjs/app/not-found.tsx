import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold">Menu not found</h1>
      <p className="mt-2 text-stone-600">
        This address does not exist, or the shop has not been approved yet.
      </p>
      <Link href="/" className="mt-6 text-amber-700 underline">
        Back to Open Menu
      </Link>
    </main>
  )
}
