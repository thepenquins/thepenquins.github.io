import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getDevlogPosts } from "../lib/devlog";

export async function GET(context: APIContext) {
  const posts = await getDevlogPosts();

  return rss({
    title: "Penquins Software — девлог",
    description:
      "Заметки о разработке игр Penquins Software: находки, решения и мелочи, которые не попадают в описание.",
    site: context.site ?? "https://thepenquins.github.io",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/devlog/${post.id}/`,
    })),
    customData: "<language>ru</language>",
  });
}
