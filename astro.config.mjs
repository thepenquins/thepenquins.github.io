import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Адрес сайта по умолчанию. Свой домен можно задать при сборке:
// SITE_URL=https://penquins.software npm run build
const site = process.env.SITE_URL || "https://thepenquins.github.io";

export default defineConfig({
  site,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [sitemap()],
});
