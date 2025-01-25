import Post from "../models/post.model.js";
import { generateSlug } from "../utils/generateSlug.js";
import { writeFileSync } from "fs";
export const generateSitemap = async () => {
  const products = await Post.find();
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.utkubektasoglu.com/</loc>
    </url>
    </url>
      ${products
        .map((page) => {
          return `
              <url>
                  <loc>${`https://www.utkubektasoglu.com/details/${generateSlug(
                    page.title
                  )}/${page._id}`}</loc>
              </url>
            `;
        })
        .join("")}
    <url>
        <loc>https://www.utkubektasoglu.com/trendingProjects</loc>
    </url>
    <url>
        <loc>https://www.utkubektasoglu.com/trendingBlogs</loc>
    </url>
    <url>
        <loc>https://www.utkubektasoglu.com/about</loc>
    </url>
    <url>
        <loc>https://www.utkubektasoglu.com/auth/signup</loc>
    </url>
    <url>
        <loc>https://www.utkubektasoglu.com/auth/signin</loc>
    </url>
    <url>
        <loc>https://www.utkubektasoglu.com/contact</loc>
    </url>
</urlset>
`;
  writeFileSync("./frontend/public/sitemap.xml", sitemap);
  return true;
};
