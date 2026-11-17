import { redirect } from 'next/navigation'
import { MenuManager } from '@/components/MenuManager'
import { getMe, getShopMenu } from '@/lib/api'

export default async function MenuPage() {
  const { shop } = await getMe()
  if (!shop) redirect('/dashboard')
  const menu = await getShopMenu(shop.id)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Menu</h1>
      <MenuManager menu={menu} />
    </div>
  )
}
