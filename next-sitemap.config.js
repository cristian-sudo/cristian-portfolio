/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://cristianplop.com',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/admin', '/dashboard'],
};
