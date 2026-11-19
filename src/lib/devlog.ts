import { getCollection, type CollectionEntry } from "astro:content";
import { getGame } from "../data/games";

export type DevlogPost = CollectionEntry<"devlog">;

const sortPosts = (posts: DevlogPost[]) =>
  [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const getDevlogPosts = async () => {
  const posts = await getCollection("devlog", ({ data }) => !data.draft);

  for (const post of posts) {
    if (post.data.game && !getGame(post.data.game)) {
      throw new Error(
        `Не найдена игра для заметки «${post.data.title}»: ${post.data.game}`,
      );
    }
  }

  return sortPosts(posts);
};

export const getGameNotes = async (slug: string, limit = 3) =>
  (await getDevlogPosts()).filter((post) => post.data.game === slug).slice(0, limit);

export const getRelatedPosts = async (postId: string, limit = 3) => {
  const posts = await getDevlogPosts();
  const current = posts.find((post) => post.id === postId);

  if (!current) return [];

  const others = posts.filter((post) => post.id !== postId);
  const sameGame = current.data.game
    ? others.filter((post) => post.data.game === current.data.game)
    : [];
  const rest = others.filter((post) => !sameGame.includes(post));

  return [...sameGame, ...rest].slice(0, limit);
};
