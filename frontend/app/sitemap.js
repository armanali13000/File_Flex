import { siteConfig, tools } from '../lib/site';

export default function sitemap() {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now },
    ...tools.map((tool) => ({ url: `${siteConfig.url}/${tool.slug}`, lastModified: now })),
    { url: `${siteConfig.url}/privacy-policy`, lastModified: now },
    { url: `${siteConfig.url}/terms-and-conditions`, lastModified: now },
    { url: `${siteConfig.url}/contact`, lastModified: now }
  ];
}
