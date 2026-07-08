export default function robots() {
  const sitemapUrl = "https://www.magicglovecleaning.com/sitemap.xml";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: sitemapUrl,
  };
}
