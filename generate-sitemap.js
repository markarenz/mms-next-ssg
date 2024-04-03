const fs = require('node:fs');
const join = require('path').join;
const matter = require('gray-matter');

const getContentDirectoryByType = (type, subPath) =>
  join(process.cwd(), `_content/${type}${subPath ? `/${subPath}` : ''}`);

const getAllSlugsByType = (type) => {
  const directory = getContentDirectoryByType(type);
  if (fs.existsSync(directory)) {
    return fs.readdirSync(directory).map((slug) => slug.replace('.md', ''));
  }
  return [];
};

const getContentDetail = (type, slug, subPath) => {
  const directory = getContentDirectoryByType(type, subPath);
  if (fs.existsSync(directory)) {
    const fullPath = join(directory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return matter(fileContents);
    }
  }
  return null;
};

const generateSitemap = () => {
  const contentTypes = ['pages', 'posts', 'projects'];

  const sitemapItems = [];
  const lastModByType = {};
  contentTypes.forEach((type) => {
    lastModByType[type] = '1970-01-01';
    const pageSlugs = getAllSlugsByType(type);
    pageSlugs.forEach((slug) => {
      if (!['404'].includes(slug)) {
        const contentDetail = getContentDetail(type, slug);
        if (contentDetail) {
          const lastMod = new Date(contentDetail.data.datePublished).toISOString();
          if (lastMod > lastModByType[type]) {
            lastModByType[type] = lastMod;
          }
          sitemapItems.push({
            loc: `http://www.markmakesstuff.com/${type === 'pages' ? '' : `${type}/`}${
              slug === 'home' ? '' : slug
            }`,
            lastMod,
          });
        }
      }
    });
    if (type !== 'pages') {
      sitemapItems.push({
        loc: `http://www.markmakesstuff.com/${type}/`,
        lastMod: lastModByType[type],
      });
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems
  .map(
    (item) => `
  <url>
      <loc>${item.loc}</loc>
      <lastmod>${item.lastMod}</lastMod>
  </url>`,
  )
  .join('')}
</urlset>`;
  return sitemap;
};

const sitemapXml = generateSitemap();
fs.writeFileSync(join(process.cwd(), 'public/sitemap.xml'), sitemapXml);
