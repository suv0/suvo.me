<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Workspace layout (required on every machine)

This site, the private facts repo, and the CV workspace must sit in this relative shape. Scripts and agent rules assume it.

```
<work>/
  career-data/                 private  git@github.com:suv0/career-data.git
  CV/                          git@github.com:suv0/personal-cv-generation.git
  pet-projects/suvo.me/        this repo
```

If `../../career-data/career-profile.yaml` is missing, clone that private repo before changing career facts. See `career-data/README.md`.

## Career data (hard rules)

Career facts are **not** edited in this repo directly. They live in the sibling package:

`../../career-data/career-profile.yaml`

| File | Role | Hand-edit? |
|------|------|------------|
| `../../career-data/career-profile.yaml` | Canonical facts (profile, experience, projects, founded hiring copy, skills) | **Yes** — when user confirms a durable change |
| `lib/career-profile.generated.ts` | Generated from YAML | **Never** |
| `lib/cv-data.json` | Generated CV content for `/cv` and PDF | **Never** |
| `lib/portfolio-enrichment.ts` | UI-only (images, badges, card links, founded diagrams) | **Yes** |
| `lib/portfolio-data.ts` | Merges generated facts + UI enrichment | **Rarely** — prefer YAML or enrichment |

### Sync after fact changes

When `career-profile.yaml` changes:

```bash
npm run sync:career
```

Optionally regenerate the downloadable PDF:

```bash
npm run cv:pdf
```

Commit generated artifacts on the **active feature branch**. Also commit and **push `career-data`** so the YAML is not only on this machine. Review locally before merge.

### Deployment guardrail

**Do not push `master`** unless the user explicitly asks. Pushing `master` triggers production release on Vercel.

Routine CV generation for a job description happens in the **CV workspace** (`../../CV`) and does **not** require changes here.

### What agents must not do

- Edit `lib/career-profile.generated.ts` or `lib/cv-data.json` by hand
- Duplicate career facts into `portfolio-data.ts` instead of updating YAML
- Push `master` or deploy without user confirmation
- Run `sync:career` during JD-only CV work (no durable fact change)

When unsure whether a change is a portfolio fact or a one-off CV tailoring, **ask the user**.

## Stories (Payload)

Public life writing lives at `/stories`, edited in `/admin`. It is **not** career data. Do not invent stories, and do not copy life posts into `career-profile.yaml`.

Free stack: Payload OSS, local SQLite + `media/` uploads, production Neon Postgres + Vercel Blob (hobby). Video is YouTube/Vimeo embeds only — no paid transcoding.

### Founded products and GitHub

The Founded section lists YAML entries plus public GitHub repos tagged `portfolio` (owner `suv0`). Hiring copy and custom diagrams still come from YAML / `portfolio-enrichment.ts` when present. To add a repo to the site without a YAML card, add the `portfolio` topic on GitHub. The homepage refreshes that list about daily.
