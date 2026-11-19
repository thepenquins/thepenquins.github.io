import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { getGame } from "../../../data/games";
import { formatLongDate } from "../../../lib/dates";
import { renderOg } from "../../../lib/og";

export const getStaticPaths = (async () => {
  const posts = await getCollection("devlog", ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<"devlog"> };
  const game = post.data.game ? getGame(post.data.game) : undefined;

  const body = post.body ?? "";
  const inlineImage =
    body.match(/<img[^>]+src="(\/devlog\/[^"]+)"/)?.[1] ??
    body.match(/!\[[^\]]*\]\((\/devlog\/[^)]+)\)/)?.[1];

  const cover = game?.cover ?? inlineImage;

  const jpg = await renderOg({
    label: "Девлог",
    eyebrow: formatLongDate(post.data.date),
    title: post.data.title,
    meta: game ? `Об игре: ${game.title}` : undefined,
    cover,
    mascot: !cover,
  });

  return new Response(new Uint8Array(jpg), {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=86400",
    },
  });
};
