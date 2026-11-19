import type { APIRoute, GetStaticPaths } from "astro";
import { games } from "../../../data/games";
import type { Game } from "../../../data/games";
import { formatMonthYear } from "../../../lib/dates";
import { renderOg } from "../../../lib/og";

export const getStaticPaths = (() =>
  games.map((game) => ({
    params: { slug: game.slug },
    props: { game },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { game } = props as { game: Game };
  const date = game.releaseDate ? formatMonthYear(game.releaseDate) : "в разработке";

  const jpg = await renderOg({
    label: "Игра",
    eyebrow: `${game.genre} · ${date}`,
    title: game.title,
    meta: [...game.platforms, game.engine].join(" · "),
    chip: game.jam,
    cover: game.cover,
  });

  return new Response(new Uint8Array(jpg), {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=86400",
    },
  });
};
