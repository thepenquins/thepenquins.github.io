import fs from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

export interface OgCard {
  /** Метка в правом верхнем углу: «Игра», «Девлог» или «Каталог». */
  label: string;
  /** Строка над заголовком: жанр и дата или дата заметки. */
  eyebrow: string;
  title: string;
  /** Строка под заголовком: платформы и движок или игра заметки. */
  meta?: string;
  /** Необязательная плашка: название джема. */
  chip?: string;
  /** Путь к обложке относительно public, например /covers/insight.webp. */
  cover?: string;
  /** Показать маскота вместо обложки. */
  mascot?: boolean;
}

interface Node {
  type: string;
  props: { style?: Record<string, unknown>; [key: string]: unknown };
}

const ROOT = process.cwd();
const FONTS_DIR = path.join(ROOT, "src/assets/fonts");
const WIDTH = 1200;
const HEIGHT = 630;

const div = (style: Record<string, unknown>, children?: unknown): Node => ({
  type: "div",
  props: { style, children },
});

const img = (
  src: string,
  width: number,
  height: number,
  style: Record<string, unknown> = {},
): Node => ({ type: "img", props: { src, width, height, style } });

let assetsPromise: Promise<{
  fonts: { name: string; data: Buffer; weight: 400 | 600 | 800; style: "normal" }[];
  logo: string;
  mascot: string;
}> | null = null;

const loadAssets = () => {
  assetsPromise ??= (async () => {
    const [unbounded, golos400, golos600, logo, mascot] = await Promise.all([
      fs.readFile(path.join(FONTS_DIR, "unbounded-800.ttf")),
      fs.readFile(path.join(FONTS_DIR, "golos-text-400.ttf")),
      fs.readFile(path.join(FONTS_DIR, "golos-text-600.ttf")),
      sharp(path.join(ROOT, "public/logo.png")).resize({ height: 200 }).png().toBuffer(),
      sharp(path.join(ROOT, "public/penguin.png")).resize({ height: 480 }).png().toBuffer(),
    ]);

    return {
      fonts: [
        { name: "Unbounded", data: unbounded, weight: 800 as const, style: "normal" as const },
        { name: "Golos Text", data: golos400, weight: 400 as const, style: "normal" as const },
        { name: "Golos Text", data: golos600, weight: 600 as const, style: "normal" as const },
      ],
      logo: `data:image/png;base64,${logo.toString("base64")}`,
      mascot: `data:image/png;base64,${mascot.toString("base64")}`,
    };
  })();

  return assetsPromise;
};

const coverCache = new Map<string, Promise<string>>();

const coverDataUri = (publicPath: string) => {
  let cached = coverCache.get(publicPath);

  if (!cached) {
    cached = (async () => {
      const file = path.join(ROOT, "public", publicPath);
      const size = 636;

      // Размытая заливка из самой обложки, чтобы кадр оставался квадратным
      // и не обрезал важные части вертикальных или широких картинок.
      const backdrop = await sharp(file)
        .resize(size, size, { fit: "cover" })
        .blur(30)
        .modulate({ brightness: 0.45 })
        .png()
        .toBuffer();

      const front = await sharp(file)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();

      const composed = await sharp(backdrop)
        .composite([{ input: front }])
        .png()
        .toBuffer();

      return `data:image/png;base64,${composed.toString("base64")}`;
    })();

    coverCache.set(publicPath, cached);
  }

  return cached;
};

const titleSize = (title: string) => {
  const length = title.length;

  if (length <= 10) return 82;
  if (length <= 14) return 70;
  if (length <= 18) return 50;
  if (length <= 24) return 48;
  if (length <= 32) return 42;
  return 38;
};

const buildCard = (
  card: OgCard,
  assets: { logo: string; mascot: string },
  cover: string | null,
): Node => {
  const grid: Node[] = [];

  for (let x = 48; x < WIDTH; x += 48) {
    grid.push(
      div({
        display: "flex",
        position: "absolute",
        left: `${x}px`,
        top: 0,
        width: "1px",
        height: `${HEIGHT}px`,
        background: "rgba(143, 227, 255, 0.045)",
      }),
    );
  }

  for (let y = 48; y < HEIGHT; y += 48) {
    grid.push(
      div({
        display: "flex",
        position: "absolute",
        top: `${y}px`,
        left: 0,
        height: "1px",
        width: `${WIDTH}px`,
        background: "rgba(143, 227, 255, 0.045)",
      }),
    );
  }

  return div(
    {
      width: `${WIDTH}px`,
      height: `${HEIGHT}px`,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      boxSizing: "border-box",
      backgroundColor: "#08141c",
      backgroundImage:
        "linear-gradient(128deg, #0a1a24 0%, #07121a 46%, #08151e 72%, #171410 100%)",
      padding: "52px 72px 44px",
      color: "#eaf4fa",
      fontFamily: "Golos Text",
      overflow: "hidden",
    },
    [
      div(
        {
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
        },
        grid,
      ),
      div({
        display: "flex",
        position: "absolute",
        width: "700px",
        height: "700px",
        right: "-220px",
        top: "-320px",
        borderRadius: "50%",
        background: "rgba(43, 183, 217, 0.2)",
        filter: "blur(120px)",
      }),
      div({
        display: "flex",
        position: "absolute",
        width: "520px",
        height: "520px",
        left: "-220px",
        bottom: "-280px",
        borderRadius: "50%",
        background: "rgba(255, 157, 77, 0.11)",
        filter: "blur(110px)",
      }),
      div(
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        },
        [
          img(assets.logo, 132, 53),
          div(
            {
              display: "flex",
              alignItems: "center",
              gap: "9px",
              padding: "8px 16px 8px 13px",
              borderRadius: "999px",
              border: "1px solid rgba(143, 227, 255, 0.24)",
              backgroundColor: "rgba(10, 26, 36, 0.72)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8fe3ff",
            },
            [
              div({
                display: "flex",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#ff9d4d",
              }),
              div({ display: "flex" }, card.label),
            ],
          ),
        ],
      ),
      div(
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "48px",
          flexGrow: 1,
          paddingTop: "22px",
        },
        [
          div(
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexGrow: 1,
              minWidth: 0,
            },
            [
              div(
                {
                  display: "flex",
                  fontSize: "18px",
                  fontWeight: 600,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "#8fe3ff",
                  marginBottom: "20px",
                },
                card.eyebrow,
              ),
              div(
                {
                  display: "flex",
                  fontFamily: "Unbounded",
                  fontWeight: 800,
                  fontSize: `${titleSize(card.title)}px`,
                  lineHeight: 1.04,
                  letterSpacing: "-0.03em",
                  color: "#eaf4fa",
                  maxWidth: "600px",
                },
                card.title,
              ),
              card.meta &&
                div(
                  {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "26px",
                    fontSize: "20px",
                    color: "#92a9bb",
                  },
                  card.meta,
                ),
              card.chip &&
                div(
                  {
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    marginTop: "20px",
                    padding: "7px 14px",
                    border: "1px solid rgba(143, 227, 255, 0.18)",
                    borderRadius: "999px",
                    backgroundColor: "rgba(10, 26, 36, 0.6)",
                    fontSize: "15px",
                    color: "#92a9bb",
                  },
                  card.chip,
                ),
            ].filter(Boolean),
          ),
          div(
            {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "400px",
              height: "400px",
              flexShrink: 0,
              position: "relative",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "24px",
              border: "1px solid rgba(143, 227, 255, 0.2)",
              backgroundColor: "rgba(9, 24, 34, 0.78)",
              boxShadow:
                "inset 0 1px 0 rgba(201, 246, 255, 0.06), 0 40px 80px -45px rgba(0, 0, 0, 0.95)",
            },
            [
              cover
                ? img(cover, 366, 366, { borderRadius: "12px" })
                : div(
                    {
                      display: "flex",
                      position: "relative",
                      width: "366px",
                      height: "366px",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    },
                    [
                      img(assets.mascot, 300, 300, {
                        marginBottom: "54px",
                        filter: "drop-shadow(0 24px 40px rgba(0, 0, 0, 0.5))",
                        transform: "rotate(-4deg)",
                      }),
                      div({
                        display: "flex",
                        position: "absolute",
                        left: "15px",
                        bottom: "38px",
                        width: "336px",
                        height: "66px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(180deg, rgba(201, 246, 255, 0.94), rgba(121, 208, 236, 0.55))",
                        boxShadow: "0 20px 36px -18px rgba(79, 185, 221, 0.55)",
                      }),
                    ],
                  ),
            ],
          ),
        ],
      ),
      div(
        {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
          borderTop: "1px solid rgba(143, 227, 255, 0.14)",
          paddingTop: "18px",
          fontSize: "15px",
          color: "#6c8294",
          letterSpacing: "0.02em",
        },
        [div({ display: "flex" }, "thepenquins.github.io"), div({ display: "flex" }, "Игры из Антарктики")],
      ),
    ],
  );
};

/** Рисует OG-картинку 1200×630 и возвращает JPEG. */
export const renderOg = async (card: OgCard): Promise<Buffer> => {
  const assets = await loadAssets();
  const cover = card.cover ? await coverDataUri(card.cover) : null;

  const svg = await satori(buildCard(card, assets, cover) as unknown as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: assets.fonts,
  });

  return sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
};
