import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { Stories } from "./collections/Stories";
import { Users } from "./collections/Users";
import { migrations as postgresMigrations } from "./migrations/postgres";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** Neon Marketplace often sets DATABASE_URL; our docs/scripts use POSTGRES_URL. */
const postgresUrl =
  process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim() || undefined;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
const sqliteUrl = process.env.DATABASE_URI?.trim() || "file:./data/payload.db";

if (!postgresUrl && !process.env.VERCEL) {
  mkdirSync(path.resolve(dirname, "data"), { recursive: true });
  mkdirSync(path.resolve(dirname, "media"), { recursive: true });
}

function serverURL(): string {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  // Stable branch alias (e.g. …-git-qa-…) — better for admin CSRF than the unique deploy host.
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://127.0.0.1:3010";
}

function trustedOrigins(): string[] {
  const origins = new Set<string>([
    serverURL(),
    "https://suvo.me",
    "https://www.suvo.me",
    "http://127.0.0.1:3010",
    "http://localhost:3010",
  ]);
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_BRANCH_URL) origins.add(`https://${process.env.VERCEL_BRANCH_URL}`);
  return [...origins];
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "· suvo.me",
    },
  },
  collections: [Users, Media, Stories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: serverURL(),
  csrf: trustedOrigins(),
  cors: trustedOrigins(),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresUrl
    ? vercelPostgresAdapter({
        // Never push against the shared Neon DB — only bundled migrations.
        // Push left a batch=-1 row that made Vercel hang on an interactive migrate prompt.
        migrationDir: path.resolve(dirname, "migrations/postgres"),
        prodMigrations: postgresMigrations,
        push: false,
      })
    : sqliteAdapter({
        client: { url: sqliteUrl },
        migrationDir: path.resolve(dirname, "migrations/sqlite"),
        push: true,
      }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: { media: true },
      token: blobToken,
      clientUploads: Boolean(blobToken),
    }),
  ],
  sharp,
});
