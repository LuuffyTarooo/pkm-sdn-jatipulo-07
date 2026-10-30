import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * File generator robots.txt otomatis Next.js
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
