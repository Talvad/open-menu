import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { JsonLd } from '@/components/json-ld';
import { MenuClient } from '@/components/menu-client';
import { getPublicMenu } from '@/lib/menu';
import { absoluteUrl } from '@/lib/seo';
import type { PublicMenu } from '@/lib/types';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getPublicMenu(slug.toLowerCase());
  if (!menu)
    return {
      title: 'Menu not found',
      robots: { index: false, follow: false },
    };
  const title = `${menu.shop.name} Menu`;
  const description =
    menu.shop.description || `Browse the menu and latest offerings at ${menu.shop.name}.`;
  const canonical = absoluteUrl(`/${menu.shop.slug}`).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: 'website', title, description, url: canonical },
    twitter: { card: 'summary', title, description },
    robots: { index: true, follow: true },
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
  return (
    <>
      <JsonLd data={menuStructuredData(menu)} />
      <MenuClient menu={menu} />
    </>
  );
}

function menuStructuredData(menu: PublicMenu): Record<string, unknown> {
  const restaurantTypes = {
    restaurant: 'Restaurant',
    grocery: 'GroceryStore',
    furniture: 'Store',
    hotel: 'Hotel',
    store: 'Store',
    other: 'LocalBusiness',
  } as const;
  const isRestaurant = menu.shop.type === 'restaurant';

  return {
    '@context': 'https://schema.org',
    '@type': restaurantTypes[menu.shop.type],
    name: menu.shop.name,
    description: menu.shop.description || undefined,
    url: absoluteUrl(`/${menu.shop.slug}`).toString(),
    telephone: menu.shop.phone || undefined,
    address: menu.shop.address
      ? { '@type': 'PostalAddress', streetAddress: menu.shop.address }
      : undefined,
    ...(isRestaurant && {
      hasMenu: {
        '@type': 'Menu',
        hasMenuSection: menu.groups.map((group) => ({
          '@type': 'MenuSection',
          name: group.name,
          hasMenuItem: group.items.map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description || undefined,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: menu.shop.currency,
              availability: item.available
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          })),
        })),
      },
    }),
  };
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
