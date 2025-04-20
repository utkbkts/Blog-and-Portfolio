import fs from "fs";
import path from "path";
import Post from "../models/post.model.js";
import { generateMapSlug } from "../utils/generateSlug.js";
import dotenv from "dotenv";

dotenv.config();

export const generateSitemap = async () => {
  try {
    const products = await Post.find().select('_id title updatedAt'); // Sadece ihtiyacımız olan alanları seçiyoruz

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://utkubektasoglu.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${products
    .map((page) => {
      return `
  <url>
    <loc>https://utkubektasoglu.com/detail/${generateMapSlug(page.title)}/${page._id}</loc>
    <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("")}
</urlset>`;

    const __dirname = path.resolve();
    const sitemapPath = path.join(__dirname, "frontend/public/sitemap.xml");
    
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    
    console.log('Sitemap successfully generated');
    return true;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return false;
  }
};