import fs from "fs";
import Post from "../models/post.model.js";
import { generateMapSlug } from "../utils/generateSlug.js";

export const generateSitemap = async () => {
  try {
    const products = await Post.find();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.utkubektasoglu.com/</loc>
  </url>
  ${products
    .map((page) => {
      return `
  <url>
    <loc>https://www.utkubektasoglu.com/detay/${generateMapSlug(page.title)}/${
        page._id
      }</loc>
  </url>`;
    })
    .join("")}
  <url>
    <loc>https://www.utkubektasoglu.com/one-cikan-projeler</loc>
  </url>
  <url>
    <loc>https://www.utkubektasoglu.com/populer-bloglar</loc>
  </url>
  <url>
    <loc>https://www.utkubektasoglu.com/hakkimizda</loc>
  </url>
  <url>
    <loc>https://www.utkubektasoglu.com/kayit-ol</loc>
  </url>
  <url>
    <loc>https://www.utkubektasoglu.com/giris-yap</loc>
  </url>
  <url>
    <loc>https://www.utkubektasoglu.com/iletisim</loc>
  </url>
</urlset>`.trim();

    fs.writeFileSync("./frontend/public/sitemap.xml", sitemap);
    console.log("Generated Sitemap successfully");

    return true;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return false;
  }
};
