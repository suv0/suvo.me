import { getPayload } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import config from "../payload.config";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SLUG = "how-a-story-is-built";

type TextFormat = 0 | 1;

function textNode(text: string, format: TextFormat = 0) {
  return {
    type: "text",
    text,
    detail: 0,
    format,
    mode: "normal",
    style: "",
    version: 1,
  };
}

function paragraph(parts: Array<string | ReturnType<typeof textNode>>) {
  return {
    type: "paragraph",
    children: parts.map((part) => (typeof part === "string" ? textNode(part) : part)),
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: "",
  };
}

function heading(tag: "h2" | "h3", text: string) {
  return {
    type: "heading",
    tag,
    children: [textNode(text)],
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
  };
}

type LexicalNode = {
  type: unknown;
  version: number;
  [key: string]: unknown;
};

function richText(...children: LexicalNode[]) {
  return {
    root: {
      type: "root",
      children,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

async function ensureMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  relativeFile: string,
  alt: string,
) {
  const filePath = path.join(root, relativeFile);
  const filename = path.basename(filePath);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) return existing.docs[0].id;

  const created = await payload.create({
    collection: "media",
    overrideAccess: true,
    data: { alt },
    filePath,
  });
  return created.id;
}

async function main() {
  const payload = await getPayload({ config });

  const cover = await ensureMedia(
    payload,
    "public/hero-portrait-editorial.png",
    "Sample cover photo for the demo story",
  );
  const photoA = await ensureMedia(
    payload,
    "public/projects/chaldal-shopper.png",
    "Sample single photo block",
  );
  const photoB = await ensureMedia(
    payload,
    "public/projects/protocol.png",
    "Sample photo pair, left",
  );
  const photoC = await ensureMedia(
    payload,
    "public/projects/gogobangla.png",
    "Sample photo pair, right",
  );
  const photoD = await ensureMedia(
    payload,
    "public/projects/chalao-rideshare.png",
    "Sample gallery photo",
  );

  const data = {
    title: "How a story is built",
    slug: SLUG,
    excerpt:
      "A dummy post that uses every layout block so you can see the public page — then delete it and write a real one.",
    cover,
    publishedAt: new Date().toISOString(),
    _status: "published" as const,
    layout: [
      {
        blockType: "richText" as const,
        body: richText(
          heading("h2", "This is a dummy. It is not a real memory."),
          paragraph([
            "The admin screen is a stack of blocks, not a Word document. Title, card blurb, and cover photo sit at the top. Everything else lives under ",
            textNode("Story body", 1),
            ". Click + Add block and pick a type. The order there is the order on the public page.",
          ]),
          paragraph([
            "Open this live page at /stories/how-a-story-is-built. When you are done looking, unpublish or delete this post so it never ships.",
          ]),
        ),
      },
      {
        blockType: "photo" as const,
        image: photoA,
        caption: "A single Photo block. Use Full width if you want it to span the page.",
        fullBleed: false,
      },
      {
        blockType: "richText" as const,
        body: richText(
          heading("h2", "Write in Text blocks"),
          paragraph([
            "Put ordinary writing in Text. You can mix headings, bold, lists, and links. Split the article into several Text blocks if you want photos to sit between paragraphs.",
          ]),
          paragraph([
            "A story can be a family afternoon, a trip, a photo set, or a short film with a few lines around it. Career facts still belong in the YAML resume — this page is for life writing.",
          ]),
        ),
      },
      {
        blockType: "pullQuote" as const,
        quote: "A pull quote is the line you want someone to remember when they only skim.",
        attribution: "Sample — replace with a real line",
      },
      {
        blockType: "photoPair" as const,
        left: photoB,
        right: photoC,
        caption: "Photo pair: two images side by side. These are placeholders from the portfolio.",
      },
      {
        blockType: "gallery" as const,
        images: [
          { image: photoA, caption: "Gallery slot 1" },
          { image: photoB, caption: "Gallery slot 2" },
          { image: photoC, caption: "Gallery slot 3" },
          { image: photoD, caption: "Gallery slot 4" },
        ],
      },
      {
        blockType: "videoEmbed" as const,
        url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
        caption: "Video block: paste a YouTube or Vimeo link. This one is Big Buck Bunny, public demo footage.",
      },
      {
        blockType: "richText" as const,
        body: richText(
          heading("h2", "What you can make"),
          paragraph([
            "A short memory with one photo. A longer piece that alternates writing and pictures. A photo-first gallery with captions. A film you already posted on YouTube, framed with a few paragraphs. Mix those on one page.",
          ]),
          paragraph([
            "To write your own: Collections → Stories → Create new. Fill title and card blurb, pick a cover, add Text first, then photos or video as you go. Press Publish changes. The public URL is /stories/ plus the slug in the sidebar.",
          ]),
        ),
      },
    ],
  };

  const existing = await payload.find({
    collection: "stories",
    where: { slug: { equals: SLUG } },
    limit: 1,
    overrideAccess: true,
    draft: true,
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: "stories",
      id: existing.docs[0].id,
      overrideAccess: true,
      draft: false,
      data,
    });
    console.log(`Updated demo story: /stories/${SLUG}`);
  } else {
    await payload.create({
      collection: "stories",
      overrideAccess: true,
      draft: false,
      data,
    });
    console.log(`Created demo story: /stories/${SLUG}`);
  }
}

await main();
