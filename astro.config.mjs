import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Домен можно переопределить при сборке: SITE_URL=https://example.com npm run build
const site = process.env.SITE_URL || "https://penquins.software";

export default defineConfig({
  site,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [sitemap()],
});
