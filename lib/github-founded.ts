import { foundedEnrichment } from "@/lib/portfolio-enrichment";
import { foundedProducts, profile, type FoundedItem } from "@/lib/portfolio-data";

/** GitHub topic that opts a public repo onto the Founded section. */
export const PORTFOLIO_GITHUB_TOPIC = "portfolio";

const REVALIDATE_SECONDS = 86_400;

type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  license: { spdx_id: string } | null;
};

function githubLogin(): string {
  try {
    return new URL(profile.github).pathname.replace(/\//g, "") || "suv0";
  } catch {
    return "suv0";
  }
}

function normalizeRepoUrl(url: string): string {
  return url.replace(/\/+$/, "").toLowerCase();
}

function repoId(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function liveFields(repo: GithubRepo): Pick<FoundedItem, "stars" | "language" | "license" | "pushedAt"> {
  const spdx = repo.license?.spdx_id;
  return {
    stars: repo.stargazers_count,
    language: repo.language ?? undefined,
    license: spdx && spdx !== "NOASSERTION" ? spdx : undefined,
    pushedAt: repo.pushed_at,
  };
}

function cardFromGithub(repo: GithubRepo): FoundedItem {
  const id = repoId(repo.name);
  const ui = foundedEnrichment[id];
  const live = liveFields(repo);

  return {
    id,
    name: repo.name,
    role: "Founder",
    status: "Public",
    description: repo.description?.trim() || "Public tool I started and still ship.",
    impact: "Available on GitHub.",
    github: repo.html_url,
    badge: ui?.badge ?? "Founded",
    diagram: ui?.diagram,
    linkLabel: ui?.linkLabel ?? "View on GitHub →",
    ...live,
  };
}

async function fetchOwnerRepos(): Promise<GithubRepo[]> {
  const login = githubLogin();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "suvo.me",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${login}/repos?per_page=100&type=owner&sort=updated`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`GitHub repos fetch failed: ${response.status}`);
      return [];
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      console.error("GitHub repos fetch returned non-array JSON.");
      return [];
    }

    return data as GithubRepo[];
  } catch (error) {
    console.error("GitHub repos fetch threw:", error);
    return [];
  }
}

export async function getFoundedProductsForSite(): Promise<FoundedItem[]> {
  const repos = await fetchOwnerRepos();
  const owned = repos.filter((repo) => !repo.fork && !repo.archived);
  const byUrl = new Map(owned.map((repo) => [normalizeRepoUrl(repo.html_url), repo]));
  const tagged = owned.filter((repo) => (repo.topics ?? []).includes(PORTFOLIO_GITHUB_TOPIC));

  const yamlItems = foundedProducts.map((item) => {
    const repo = item.github ? byUrl.get(normalizeRepoUrl(item.github)) : undefined;
    return repo ? { ...item, ...liveFields(repo) } : item;
  });

  const yamlUrls = new Set(
    foundedProducts.flatMap((item) => (item.github ? [normalizeRepoUrl(item.github)] : [])),
  );
  const extras = tagged
    .filter((repo) => !yamlUrls.has(normalizeRepoUrl(repo.html_url)))
    .map(cardFromGithub);

  return [...yamlItems, ...extras];
}
