export type Screenshot = {
  src: string;
  alt: string;
};

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string[];
  genre: string;
  /** Движок, на котором сделана игра. Например: "Godot Engine". */
  engine: string;
  platforms: string[];
  browser?: boolean;
  itchUrl: string;
  cover: string;
  screenshots: Screenshot[];
  credits: string[];
  jam?: string;
  controls?: string;
  /** Дата выхода в формате "ГГГГ-ММ". Отображается как «март 2025». */
  releaseDate?: string;
  /** Статус игры. Отображается бейджем на странице игры. */
  status: "released" | "in-development";
  /** Ссылка на трейлер: YouTube или готовый embed-адрес. */
  trailerUrl?: string;
  /** Ссылка на саундтрек (VK Музыка, Bandcamp, YouTube и т.п.). */
  soundtrackUrl?: string;
  vkPlayUrl?: string;
  /**
   * Ссылка на исходный код игры (репозиторий на GitHub и т.п.).
   * Например: "https://github.com/thepenquins/nibras-theater"
   */
  sourceUrl?: string;
  /**
   * Локальная веб-сборка, если она лежит в public/games/<slug>/.
   * Например: "/games/advorkolodets/play/"
   */
  playUrl?: string;
};

const shot = (slug: string, n: number, title: string): Screenshot => ({
  src: `/shots/${slug}-${n}.webp`,
  alt: `Скриншот из игры «${title}»`,
});

/**
 * Порядок в массиве = порядок в каталоге: сверху новые игры,
 * как в профиле penquins.itch.io. Новую игру добавляйте в начало.
 */
export const games: Game[] = [
  {
    slug: "advorkolodets",
    engine: "Godot Engine",
    releaseDate: "2026-04",
    status: "released",
    title: "A DVOR-KOLODETS",
    tagline: "Каждый двор-колодец имеет двойное дно",
    description: [
      "Семья переезжает в дом с внутренним двором. Но в квартире всё чаще что-то меняется, а сосед напротив слишком внимательно смотрит из окна. Каждый двор-колодец имеет двойное дно.",
    ],
    genre: "Визуальная новелла",
    platforms: ["Windows"],
    itchUrl: "https://penquins.itch.io/advorkolodets",
    sourceUrl: "https://github.com/thepenquins/courtyard-project",
    cover: "/covers/advorkolodets.webp",
    screenshots: [
      shot("advorkolodets", 1, "A DVOR-KOLODETS"),
      shot("advorkolodets", 2, "A DVOR-KOLODETS"),
      shot("advorkolodets", 3, "A DVOR-KOLODETS"),
    ],
    credits: ["Rankel", "lex4nder", "danya_balakhnin", "LehanFox", "Oz Fox"],
    jam: "VN JAM CA: Городские легенды",
  },
  {
    slug: "piece-of-knight",
    engine: "Godot Engine",
    releaseDate: "2025-11",
    status: "released",
    title: "Piece of Knight",
    tagline: "Соберись!",
    description: [
      "Собирайте конечности в попытках добраться до своего заклятого врага. Что наступит раньше: отчаяние или прозрение?",
    ],
    genre: "Экшен",
    platforms: ["Windows"],
    itchUrl: "https://penquins.itch.io/piece-of-knight",
    soundtrackUrl: "https://vk.ru/music/playlist/-221731834_17_b9f591b7d7f9899e71",
    cover: "/covers/piece-of-knight.webp",
    screenshots: [
      shot("piece-of-knight", 1, "Piece of Knight"),
      shot("piece-of-knight", 2, "Piece of Knight"),
      shot("piece-of-knight", 3, "Piece of Knight"),
    ],
    credits: ["lex4nder", "Oz Fox", "BACR", "Rankel"],
    jam: "Siberian Game Jam · ноябрь 2025",
    controls: "WASD — движение · ЛКМ / ПКМ — атака · Q / E / R — подбор «предметов»",
  },
  {
    slug: "absolute-brain-rot",
    engine: "Godot Engine",
    releaseDate: "2025-05",
    status: "released",
    title: "Absolute Brain: rot",
    tagline: "Absurdist puzzle game",
    description: [
      "Абсурдная головоломка, в которой вас проверяют на остроту ума. Пройти в одиночку вряд ли получится — но предыдущие испытуемые могли оставить вам сообщения. А вы можете оставить сообщение им. Или себе.",
    ],
    genre: "Головоломка",
    platforms: ["Windows"],
    itchUrl: "https://penquins.itch.io/absolute-brain-rot",
    cover: "/covers/absolute-brain-rot.webp",
    screenshots: [
      shot("absolute-brain-rot", 1, "Absolute Brain: rot"),
      shot("absolute-brain-rot", 2, "Absolute Brain: rot"),
      shot("absolute-brain-rot", 3, "Absolute Brain: rot"),
    ],
    credits: ["Oz Fox", "BACR", "lex4nder", "Rankel", "danya_balakhnin"],
    jam: "Mystery Game Jam 2025",
    controls: "WASD — движение · E — действие",
  },
  {
    slug: "nibras-play-deluxe",
    engine: "Godot Engine",
    releaseDate: "2024-08",
    status: "released",
    title: "Театр Нибраса",
    tagline: "Вся жизнь — театр, а театр — Нибраса!",
    description: [
      "В провинциальном театре происходит череда загадочных происшествий, и «консультант по изгнанию» берётся снять проклятие. Прямо на его глазах случается убийство — и герой уверен, что всему есть рациональное объяснение. Осталось найти виновного.",
      "Версия с двумя разными трактовками одной истории и бонусом.",
    ],
    genre: "Визуальная новелла",
    platforms: ["Windows"],
    itchUrl: "https://penquins.itch.io/nibras-play-deluxe",
    vkPlayUrl: "https://vkplay.ru/play/game/nibras-play-39828",
    sourceUrl: "https://github.com/thepenquins/nibras-theater",
    soundtrackUrl: "https://vk.ru/music/playlist/-221731834_16_0ef754f4a2454ab23f",
    cover: "/covers/nibras-play-deluxe.webp",
    screenshots: [
      shot("nibras-play-deluxe", 1, "Театр Нибраса"),
      shot("nibras-play-deluxe", 2, "Театр Нибраса"),
      shot("nibras-play-deluxe", 3, "Театр Нибраса"),
    ],
    credits: ["lex4nder", "Rankel", "BACR", "Oz Fox"],
    jam: "Джем Ста Цветов",
  },
  {
    slug: "shigger",
    engine: "Godot Engine",
    releaseDate: "2024-05",
    status: "released",
    title: "Лопатель",
    tagline: "Раньше все хотели в космос, а сейчас — к центру Земли!",
    description: [
      "Раньше все хотели в космос, а теперь — к центру Земли. Копайте вниз, ищите сыр и не забывайте вовремя кормить котиков.",
    ],
    genre: "Ритм-игра",
    platforms: ["Браузер", "Windows"],
    browser: true,
    itchUrl: "https://penquins.itch.io/shigger",
    sourceUrl: "https://github.com/thepenquins/shigger",
    soundtrackUrl: "https://vk.ru/music/playlist/-221731834_15_58e7320b03a0e0409e",
    playUrl: "/games/shigger/play/",
    cover: "/covers/shigger.webp",
    screenshots: [
      shot("shigger", 1, "Лопатель"),
      shot("shigger", 2, "Лопатель"),
      shot("shigger", 3, "Лопатель"),
    ],
    credits: ["Rankel", "BACR", "lex4nder", "Aki_ona", "Oz Fox"],
    jam: "Siberian Game Jam · май 2024",
    controls: "A / D или ← / → — движение · S или ↓ — копать · не забывайте кормить котиков",
  },
  {
    slug: "bikerunner",
    engine: "Godot Engine",
    releaseDate: "2024-02",
    status: "released",
    title: "Глухой велосипедист",
    tagline: "Велосипедист глухой, но нужно ехать домой.",
    description: [
      "Слабослышащему Аркадию предстоит сдать важный экзамен, а он проспал. Теперь придётся ехать на велосипеде зимой по короткой дороге, о которой у местных ходят страшные байки. Сумеет ли он преодолеть опасный участок — или нечисть ему только привиделась?",
    ],
    genre: "Выживание",
    platforms: ["Windows"],
    itchUrl: "https://penquins.itch.io/bikerunner",
    cover: "/covers/bikerunner.webp",
    screenshots: [
      shot("bikerunner", 1, "Глухой велосипедист"),
      shot("bikerunner", 2, "Глухой велосипедист"),
      shot("bikerunner", 3, "Глухой велосипедист"),
    ],
    credits: ["BACR", "Rankel", "lex4nder", "Genius_Generator", "Oz Fox"],
    jam: "Social Game Jam",
    controls:
      "AD — поворот · W — ускорение · Q — обернуться · E — звонок · R — радио · F — приборная панель",
  },
  {
    slug: "insight",
    engine: "Godot Engine",
    releaseDate: "2024-01",
    status: "released",
    title: "Insight",
    tagline: "Что такое сокровище?",
    description: [
      "Перед смертью дедушка оставляет герою письмо с просьбой приехать на одну ночь в старый дом, где тот прожил жизнь, а герой провёл детство. Родители собираются продать дом — это последняя возможность исполнить волю деда. Но дом полон загадок.",
    ],
    genre: "Визуальная новелла",
    platforms: ["Windows", "Android"],
    itchUrl: "https://penquins.itch.io/insight",
    soundtrackUrl: "https://vk.ru/music/playlist/-221731834_5_21e19da93d15724e70",
    cover: "/covers/insight.webp",
    screenshots: [
      shot("insight", 1, "Insight"),
      shot("insight", 2, "Insight"),
      shot("insight", 3, "Insight"),
    ],
    credits: ["Rankel", "BACR", "HellOlio", "lex4nder", "Genius_Generator", "Oz Fox"],
    jam: "Капелла Джем",
  },
  {
    slug: "night-in-the-antarctica",
    engine: "Godot Engine",
    releaseDate: "2021-12",
    status: "released",
    title: "Night in the Antarctica",
    tagline: "Одна ночь на станции в Антарктиде",
    description: [
      "Вы наслаждаетесь одинокой жизнью на станции в Антарктиде, но внезапно что-то нарушает уют.",
    ],
    genre: "Головоломка",
    platforms: ["Windows", "macOS", "Linux"],
    itchUrl: "https://penquins.itch.io/night-in-the-antarctica",
    cover: "/covers/night-in-the-antarctica.webp",
    screenshots: [
      shot("night-in-the-antarctica", 1, "Night in the Antarctica"),
      shot("night-in-the-antarctica", 2, "Night in the Antarctica"),
      shot("night-in-the-antarctica", 3, "Night in the Antarctica"),
    ],
    credits: ["TyHDyK", "Rankel", "Oz Fox"],
    jam: "Godot Wild Jam #40",
    controls:
      "WASD — движение · F — фонарик · E — использовать · Shift — бег · I — инвентарь · колесо мыши — радио",
  },
  {
    slug: "meta-detective",
    engine: "Godot Engine",
    releaseDate: "2021-11",
    status: "released",
    title: "Meta Detective",
    tagline: "Разгадай серию убийств, используя дедукцию",
    description: [
      "Исследуйте место преступления, находите улики и соединяйте факты в компьютере, чтобы получить новые. Не все факты правдивы — решать, кто убийца, придётся вам."
    ],
    genre: "Приключение",
    platforms: ["Браузер", "Windows"],
    browser: true,
    itchUrl: "https://penquins.itch.io/meta-detective",
    cover: "/covers/meta-detective.webp",
    screenshots: [
      shot("meta-detective", 1, "Meta Detective"),
      shot("meta-detective", 2, "Meta Detective"),
      shot("meta-detective", 3, "Meta Detective"),
    ],
    credits: ["Rankel", "Oz Fox"],
    jam: "джем на DTF",
    controls: "Стрелки — движение · J — журнал · ЛКМ — перелистывание диалогов",
  },
];

const featuredSlugs = ["nibras-play-deluxe", "shigger", "advorkolodets"];

export const featuredGames = featuredSlugs.map((slug) => {
  const game = games.find((item) => item.slug === slug);
  if (!game) {
    throw new Error(`Не найдена игра для главной: ${slug}`);
  }
  return game;
});

export const genres = [...new Set(games.map((game) => game.genre))];

const memberProfiles: Record<string, string> = {
  Aki_ona: "https://aki-ona.itch.io",
  BACR: "https://morbacr.itch.io",
  danya_balakhnin: "https://danya-balakhnin.itch.io",
  Genius_Generator: "https://genius-generator.itch.io",
  HellOlio: "https://hellolio.itch.io",
  LehanFox: "https://lehanfox.itch.io",
  lex4nder: "https://lex4nder.itch.io",
  "Oz Fox": "https://ozkitsune.itch.io",
  Rankel: "https://rankel.itch.io",
  TyHDyK: "https://tyhdyk.itch.io",
};

const sortNames = (names: string[]) => [...names].sort((a, b) => a.localeCompare(b, "en"));

const getMemberUrl = (name: string) => {
  const url = memberProfiles[name];
  if (!url) {
    throw new Error(`Не найден itch-профиль для участника: ${name}`);
  }
  return url;
};

export const members = sortNames([...new Set(games.flatMap((game) => game.credits))]).map(
  (name) => ({ name, url: getMemberUrl(name) }),
);

const coreTeamMeta = [
  { name: "Oz Fox", role: "Программист" },
  { name: "Rankel", role: "Художник" },
  { name: "BACR", role: "Художник" },
  { name: "lex4nder", role: "Композитор" },
];

export const coreTeam = coreTeamMeta.map((member) => ({
  ...member,
  url: getMemberUrl(member.name),
}));

const coreTeamNames = new Set(coreTeam.map((member) => member.name));

export const otherMembers = members.filter((member) => !coreTeamNames.has(member.name));

export const getGameCredits = (game: Game) =>
  sortNames(game.credits).map((name) => ({ name, url: getMemberUrl(name) }));

export const stats = {
  games: games.length,
  genres: genres.length,
};

export const filterHref = (type: "genre" | "author", value: string) =>
  `/games/?${type}=${encodeURIComponent(value)}`;

export const getGame = (slug: string) => games.find((game) => game.slug === slug);

export const getOtherGames = (slug: string, count = 3) => {
  const index = games.findIndex((game) => game.slug === slug);
  const ordered = [...games.slice(index + 1), ...games.slice(0, index)];
  return ordered.slice(0, count);
};

export const getTrailerEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id =
        parsed.searchParams.get("v") ??
        parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
    }

    return url;
  } catch {
    return url;
  }
};

export const getSoundtrackLabel = (url: string) => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");

    if (host === "vk.com" || host === "vk.ru" || host.endsWith(".vk.com")) {
      return "VK Музыка";
    }
    if (host === "youtube.com" || host === "youtu.be" || host.endsWith(".youtube.com")) {
      return "YouTube";
    }
    if (host === "bandcamp.com" || host.endsWith(".bandcamp.com")) {
      return "Bandcamp";
    }
    if (host === "spotify.com" || host.endsWith(".spotify.com")) {
      return "Spotify";
    }
    if (host === "soundcloud.com" || host.endsWith(".soundcloud.com")) {
      return "SoundCloud";
    }
    if (host === "music.apple.com") {
      return "Apple Music";
    }

    return "Слушать";
  } catch {
    return "Слушать";
  }
};
