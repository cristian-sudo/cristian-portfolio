import fs from 'fs';
import fetch from 'node-fetch';

const generateSitemap = async () => {
    const baseUrl = 'https://cristianplop.com';
    try {
        const pagesRes = await fetch('https://cms.cristianplop.com/api/collections/pages/entries');
        if (!pagesRes.ok) throw new Error('Failed to fetch pages');
        const pagesData = await pagesRes.json();

        const blogsRes = await fetch('https://cms.cristianplop.com/api/collections/blogs/entries');
        if (!blogsRes.ok) throw new Error('Failed to fetch blogs');
        const blogsData = await blogsRes.json();

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        const staticPages = ['/', '/about', '/contact'];
        staticPages.forEach((page) => {
            sitemap += `  <url>\n`;
            sitemap += `    <loc>${baseUrl}${page}</loc>\n`;
            sitemap += `  </url>\n`;
        });

        pagesData.data.forEach((page) => {
            if (page.slug !== 'home') {
                sitemap += `  <url>\n`;
                sitemap += `    <loc>${baseUrl}/${page.slug}</loc>\n`;
                sitemap += `  </url>\n`;
            }
        });

        blogsData.data.forEach((blog) => {
            sitemap += `  <url>\n`;
            sitemap += `    <loc>${baseUrl}/blogs/${blog.slug}</loc>\n`;
            sitemap += `  </url>\n`;
        });

        sitemap += `</urlset>`;

        fs.writeFileSync('public/sitemap.xml', sitemap);

        console.log('Sitemap generated successfully.');
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
};

generateSitemap().catch((error) => {
    console.error('Error in generateSitemap:', error);
});