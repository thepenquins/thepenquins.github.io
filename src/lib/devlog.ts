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
