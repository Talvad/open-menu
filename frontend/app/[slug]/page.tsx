import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { MenuClient } from '@/components/menu-client';
import { getPublicMenu } from '@/lib/menu';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getPublicMenu(slug.toLowerCase());
  if (!menu) return { title: 'Menu not found' };
  return {
    title: menu.shop.name,
    description: menu.shop.description || `Menu of ${menu.shop.name}`,
  };
}

/**
 * Partial Prerendering: the skeleton below is the static shell served instantly from the edge.
 * The menu itself comes from a 'use cache' function (lib/menu.ts) and streams into the Suspense slot.
 */
export default function PublicMenuPage({ params }: Props) {
  return (
    <Suspense fallback={<MenuSkeleton />}>
      <Menu params={params} />
    </Suspense>
  );
}

async function Menu({ params }: Props) {
  const { slug } = await params;
  const menu = await getPublicMenu(slug.toLowerCase());
  if (!menu) notFound();
  return <MenuClient menu={menu} />;
}

function MenuSkeleton() {
  return (
    <div>
      <div className='h-44 animate-pulse bg-forest' />
      <div className='mx-auto max-w-3xl space-y-3 px-4 py-8'>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className='h-28 animate-pulse rounded-2xl bg-[#e9e2d6]' />
        ))}
      </div>
    </div>
  );
}
