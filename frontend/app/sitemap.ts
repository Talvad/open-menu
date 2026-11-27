import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/').toString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/demo-menu').toString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
