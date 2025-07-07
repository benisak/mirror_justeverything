const {
  getAllRecipeSlugs,
  getAllPostCategorySlugs
} = require("./lib/sanity/sanityClient"); // Asegúrate de que la ruta sea correcta

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.justeverything.net",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 10000,
  generateIndexSitemap: false,
  additionalPaths: async config => {
    try {
      // Agregar log para debugging
      console.log("Iniciando fetch de slugs...");

      const recipeSlugs = await getAllRecipeSlugs();
      console.log(`Recetas encontradas: ${recipeSlugs.length}`);

      const postCategorySlugs = await getAllPostCategorySlugs();
      console.log(
        `Categorías encontradas: ${postCategorySlugs.length}`
      );

      const urls = [
        ...recipeSlugs.map(slug => ({
          loc: `/blog/post/${slug.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.7
        })),
        ...postCategorySlugs.map(category => ({
          loc: `/category/${category.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.7
        }))
      ];

      console.log(`Total URLs generadas: ${urls.length}`);
      return urls;
    } catch (error) {
      console.error("Error generando sitemap:", error);
      return [];
    }
  }
};
