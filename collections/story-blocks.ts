import type { Block } from "payload";

export const richTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Text", plural: "Text" },
  imageAltText: "Paragraphs, headings, links",
  fields: [
    {
      name: "body",
      type: "richText",
      required: true,
      admin: { description: "Normal writing. Highlight text for bold, lists, headings, and links." },
    },
  ],
};

export const photoBlock: Block = {
  slug: "photo",
  labels: { singular: "Photo", plural: "Photos" },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "caption",
      type: "text",
      admin: { description: "Optional line under the photo." },
    },
    {
      name: "fullBleed",
      type: "checkbox",
      defaultValue: false,
      label: "Full width",
    },
  ],
};

export const photoPairBlock: Block = {
  slug: "photoPair",
  labels: { singular: "Photo pair", plural: "Photo pairs" },
  fields: [
    {
      name: "left",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "right",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};

export const galleryBlock: Block = {
  slug: "gallery",
  labels: { singular: "Gallery", plural: "Galleries" },
  fields: [
    {
      name: "images",
      type: "array",
      required: true,
      minRows: 2,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
  ],
};

export const videoEmbedBlock: Block = {
  slug: "videoEmbed",
  labels: { singular: "Video", plural: "Videos" },
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
      admin: {
        description: "Paste a YouTube or Vimeo link. Do not upload video files.",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};

export const pullQuoteBlock: Block = {
  slug: "pullQuote",
  labels: { singular: "Pull quote", plural: "Pull quotes" },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "attribution",
      type: "text",
    },
  ],
};

export const storyLayoutBlocks = [
  richTextBlock,
  photoBlock,
  photoPairBlock,
  galleryBlock,
  videoEmbedBlock,
  pullQuoteBlock,
];
