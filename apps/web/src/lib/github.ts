// apps/web/src/lib/github.ts
const GITHUB_API = "https://api.github.com";

function ghHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  archived: boolean;
  disabled: boolean;
  pushed_at: string; // ISO
  private?: boolean;
  owner?: { login: string };
};

export async function fetchUserRepos(username: string) {
  const authed = Boolean(process.env.GITHUB_TOKEN);

  // ✅ Authenticated call: include private/public repos you have access to.
  // DO NOT include `type` with `affiliation` to avoid 422.
  const url = authed
    ? `${GITHUB_API}/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member`
    // Public-only fallback for unauthenticated requests:
    : `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&type=owner`;

  const res = await fetch(url, {
    method: "GET",
    headers: ghHeaders(),
    cache: "no-store",
    next: { revalidate: 0, tags: ["github-repos"] },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub repos fetch failed: ${res.status} ${text}`);
  }

  let data = (await res.json()) as Repo[];

  // Optional: keep only repos owned by this user (hide org/collab).
  if (authed && username) {
    const me = username.toLowerCase();
    data = data.filter((r) => (r.owner?.login ?? "").toLowerCase() === me);
  }

  // Fetch topics per repo (separate endpoint).
  const withTopics = await Promise.all(
    data.map(async (r) => {
      try {
        const tRes = await fetch(`${GITHUB_API}/repos/${r.full_name}/topics`, {
          headers: {
            ...ghHeaders(),
            // modern media type works; mercy preview kept for compatibility if needed
            Accept: "application/vnd.github+json",
          },
          cache: "no-store",
          next: { revalidate: 0 },
        });
        if (tRes.ok) {
          const t: { names?: string[] } = await tRes.json();
          return { ...r, topics: t.names ?? [] };
        }
      } catch {
        // ignore topic failures and return repo as-is
      }
      return r;
    })
  );

  return withTopics;
}

/* ---------- Pinned (GraphQL) ---------- */

type GqlTopicNode = { topic: { name: string } };
type GqlPinnedRepo = {
  id: string;
  name: string;
  nameWithOwner: string;
  url: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: { name: string } | null;
  updatedAt: string;
  isArchived: boolean;
  isDisabled: boolean;
  repositoryTopics?: { nodes: GqlTopicNode[] } | null;
};
type GqlPinnedResp = {
  data?: {
    user?: {
      pinnedItems?: { nodes?: GqlPinnedRepo[] };
    };
  };
};

export async function fetchPinned(username: string) {
  if (!process.env.GITHUB_TOKEN) return [] as Repo[]; // GraphQL requires auth

  const query = `
    query($login:String!) {
      user(login:$login){
        pinnedItems(first:6, types:[REPOSITORY]){
          nodes{ ... on Repository {
            id
            name
            nameWithOwner
            url
            description
            stargazerCount
            forkCount
            primaryLanguage { name }
            updatedAt
            isArchived
            isDisabled
            repositoryTopics(first:10){ nodes { topic { name } } }
          }}
        }
      }
    }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...ghHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) return [] as Repo[];

  const json = (await res.json()) as GqlPinnedResp;
  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];

  return nodes.map((n) => ({
    // GraphQL id isn't numeric; synthesize a stable-ish number or keep Math.random()
    id: Number(n.id.replace(/[^0-9]/g, "").slice(-9)) || Math.floor(Math.random() * 1e9),
    name: n.name,
    full_name: n.nameWithOwner,
    html_url: n.url,
    description: n.description,
    stargazers_count: n.stargazerCount,
    forks_count: n.forkCount,
    language: n.primaryLanguage?.name ?? null,
    topics: (n.repositoryTopics?.nodes ?? []).map((x) => x.topic.name),
    archived: n.isArchived,
    disabled: n.isDisabled,
    pushed_at: n.updatedAt,
    private: undefined, // not returned by this GraphQL selection
  }));
}
