import type { CollectionConfig } from "payload";
import { storyLayoutBlocks } from "./story-blocks";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "publishedAt"],
    description:
      "Public posts at /stories. Fill title, blurb, and cover, then add blocks in Story body. Publish when it should appear on the site.",
  },
  versions: {
    drafts: true,
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (!data.slug && typeof data.title === "string") {
          data.slug = slugify(data.title);
        } else if (typeof data.slug === "string") {
          data.slug = slugify(data.slug);
        }
        return data;
      },
    ],
    beforeChange: [
      ({ data }) => {
        if (!data) return data;
        if (data._status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "The headline on the public story page." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL: /stories/this-text. Leave blank to generate from the title.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Card blurb",
      admin: {
        description: "One or two sentences on the /stories list. Not the full article.",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      label: "Cover photo",
      admin: {
        description: "Hero image at the top of the story, and the thumbnail on /stories.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "Shown on the public page. Filled automatically the first time you publish.",
      },
    },
    {
      name: "layout",
      type: "blocks",
      label: "Story body",
      labels: { singular: "block", plural: "blocks" },
      admin: {
        description:
          "The article, top to bottom. Click + Add block. Start with Text. Then add Photo, Photo pair, Gallery, Video (YouTube/Vimeo link), or Pull quote in any order.",
        initCollapsed: false,
      },
      blocks: storyLayoutBlocks,
    },
  ],
};
