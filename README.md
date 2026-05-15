# suvo.me — personal portfolio (Abdul Hamid Shuvo)

Next.js 16, TypeScript, and Tailwind CSS v4.

## Prerequisites

Use a current [Node.js](https://nodejs.org/) LTS release (this repo does not pin an `engines` field in `package.json`).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Local dev server         |
| `npm run build`   | Production build         |
| `npm run start`   | Run production server    |
| `npm run lint`    | ESLint                   |
| `npm run cv:pdf`  | Generate `public/cv.pdf` from structured CV data |
| `npm run docker:up` | Build image, then recreate container (see [Docker](#docker-on-your-own-host)) |
| `npm run docker:down` | Stop stack (`docker compose down`) |
| `npm run docker:logs` | Follow web container logs |
| `npm run docker:rebuild` | Same as `docker:up` with `--no-cache` build |

After `npm run dev`, open [http://localhost:3000](http://localhost:3000).

## Project layout

- `app/` — routes, layout, and global styles
- `components/` — UI building blocks
- `lib/portfolio-data.ts` — portfolio copy and structured content
- `lib/cv-data.json` — structured content for `/cv` and `public/cv.pdf`
- `public/` — static assets (the hero “Download CV” button uses `public/cv.pdf`)

## Editing content

Primary source for what appears on the site is `lib/portfolio-data.ts`.

## Security and history

Do not commit secrets. If something sensitive was ever pushed to a public remote, deleting the file is not enough—see GitHub’s guide on [removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

## Deployment

Deploy on [Vercel](https://vercel.com/) or any Node-capable host: run `npm run build`, then `npm run start`. For platform-specific options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

Site metadata uses `metadataBase` (`https://suvo.me`) in [`app/layout.tsx`](app/layout.tsx) for canonical URLs and Open Graph. Optional env: `NEXT_PUBLIC_FB_APP_ID` (see [`.env.example`](.env.example)). After changing titles or share images, use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (“Scrape Again”) if previews look stale.

[`next.config.ts`](next.config.ts) uses `output: "standalone"` for Docker; Vercel’s default Next.js flow does not require the Dockerfile.

## Docker on your own host

Optional: build and run with Docker Compose for local production parity or self-hosting. The app is published on **`127.0.0.1:5050`** (container port `5050`); put a reverse proxy or tunnel in front for public access.

`npm run docker:up` builds a new image while the previous container keeps serving, then swaps containers so downtime is only around the replace step. To bake `NEXT_PUBLIC_FB_APP_ID` into the image: `docker compose build --build-arg NEXT_PUBLIC_FB_APP_ID=your_id` (or set the same in CI before `docker build`).

If `docker compose build` fails at `RUN npm run build`, re-run with plain progress to surface the real error, for example: `docker compose build web --progress=plain --no-cache`.

## Next.js in this repo

This project tracks a newer Next.js line with breaking changes versus older docs. For behavior that matches the installed version, read the guides under `node_modules/next/dist/docs/` (see also `AGENTS.md`).
