import { redirect } from 'next/navigation'
import { ShopForm } from '@/components/ShopForm'
import { ui } from '@/components/ui'
import { getMe } from '@/lib/api'

export default async function SettingsPage() {
  const { shop } = await getMe()
  if (!shop) redirect('/dashboard')

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold">Shop details</h1>
      <p className="mt-1 text-sm text-stone-500">
        Web address: <span className="font-mono">/{shop.slug}</span>
      </p>
      <div className={`${ui.card} mt-6`}>
        <ShopForm shop={shop} />
      </div>
    </div>
  )
}
