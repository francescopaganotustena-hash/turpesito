import { writeFileSync } from 'node:fs';

const vercelDetected =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  '';
const vercelBaseUrl = vercelDetected
  ? `https://${vercelDetected.replace(/^https?:\/\//, '')}`
  : '';

const rawBaseUrl =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  vercelBaseUrl ||
  'https://gianlucascala.vercel.app';
const baseUrl = rawBaseUrl.replace(/\/$/, '');

const routes = ['/', '/biografia', '/video', '/galleria', '/contatti', '/privacy-cookie'];
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route) => `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>`)
  .join('\n')}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

writeFileSync('public/sitemap.xml', sitemap, 'utf8');
writeFileSync('public/robots.txt', robots, 'utf8');

if (baseUrl === 'https://gianlucascala.vercel.app') {
  console.warn('[sitemap] SITE_URL non impostata. Uso default https://gianlucascala.vercel.app');
} else {
  console.log(`[sitemap] Generata sitemap per ${baseUrl}`);
}
