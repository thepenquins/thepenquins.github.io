import { games } from "./games";

export type TimelineEntry = {
  /** Дата в формате "ГГГГ-ММ". */
  date: string;
  title: string;
  text: string;
  tag: string;
  href: string;
};

/** Короткие описания игр для таймлайна. */
const gameStories: Record<string, string> = {
  advorkolodets:
    "Мистическая визуальная новелла о переезде в дом с внутренним двором, чужих взглядах и неживом.",
  "piece-of-knight":
    "Короткий экшен о том, как собрать себя по частям и добраться до заклятого врага.",
  "absolute-brain-rot":
    "Абсурдная головоломка, где предыдущие испытуемые оставляют сообщения следующим.",
  "nibras-play-deluxe":
    "Визуальная новелла о проклятии провинциального театра и убийстве на глазах консультанта по изгнанию.",
  shigger:
    "Ритм-игра про путь к центру Земли: копайте вниз, ищите сыр и не забывайте кормить котиков.",
  bikerunner:
    "Зимняя поездка домой по короткой дороге, о которой у местных ходят страшные байки.",
  insight:
    "Визуальная новелла о старом доме, последней просьбе деда и загадках, которые в нём остались.",
  "night-in-the-antarctica":
    "Атмосферная головоломка от первого лица про одну ночь на станции в Антарктиде.",
  "meta-detective":
    "Детектив, в котором убийца, мотивы и жертвы меняются от прохождения к прохождению.",
};

const gameEntries: TimelineEntry[] = games.flatMap((game) => {
  if (!game.releaseDate) {
    return [];
  }

  const text = gameStories[game.slug];
  if (!text) {
    throw new Error(`Не найдено описание игры для таймлайна: ${game.slug}`);
  }

  return [
    {
      date: game.releaseDate,
      title: game.title,
      text,
      tag: game.jam?.split(" · ")[0] ?? "Релиз",
      href: `/games/${game.slug}/`,
    },
  ];
});

const firstJam: TimelineEntry = {
  date: "2021-08",
  title: "Project Kilhuman",
  text: "Первый джем команды: за 72 часа собрали игру о том, как уничтожить мир, и довели её до прохождения.",
  tag: "theBatya Game Jam 2021.2",
  href: "/devlog/istoriya-igr-s-dzhemov-project-kilhuman/",
};

/** Хронология команды: от первого джема до последних релизов. */
export const timeline: TimelineEntry[] = [firstJam, ...gameEntries].sort((a, b) =>
  a.date.localeCompare(b.date),
);
