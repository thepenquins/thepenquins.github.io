import type { APIRoute } from "astro";
import { getDevlogPosts } from "../../lib/devlog";
import { renderOg } from "../../lib/og";
import { plural } from "../../lib/plural";

export const GET: APIRoute = async () => {
  const posts = await getDevlogPosts();

  const jpg = await renderOg({
    label: "Девлог",
    eyebrow: "Заметки о разработке",
    title: "Заметки о разработке",
    meta: `${posts.length} ${plural(posts.length, ["заметка", "заметки", "заметок"])}`,
    mascot: true,
  });

  return new Response(new Uint8Array(jpg), {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=86400",
    },
  });
};
