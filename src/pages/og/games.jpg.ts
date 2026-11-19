import type { APIRoute } from "astro";
import { games, stats } from "../../data/games";
import { renderOg } from "../../lib/og";
import { plural } from "../../lib/plural";

export const GET: APIRoute = async () => {
  const jpg = await renderOg({
    label: "Каталог",
    eyebrow: "Все проекты команды",
    title: "Все игры",
    meta: `${games.length} ${plural(games.length, ["игра", "игры", "игр"])} · ${stats.genres} ${plural(stats.genres, ["жанр", "жанра", "жанров"])}`,
    mascot: true,
  });

  return new Response(new Uint8Array(jpg), {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=86400",
    },
  });
};
