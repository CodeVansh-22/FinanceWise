export default function sitemap() {
  const baseUrl = 'https://financewise.app';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/pricing',
    '/solutions',
    '/industries',
    '/resources',
    '/blog',
    '/help',
    '/contact',
    '/careers',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
