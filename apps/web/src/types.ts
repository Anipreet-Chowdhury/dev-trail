export type Project = {
    slug: string;
    name: string;
    repoUrl: string;
    status: "planning" | "building" | "paused" | "shipped";
    nextUpdateISO? : string;
    tags: string[];
    short: string;
}

export type Hop = {
    city: string;
    label: string; // eg: elementary, middle school, high school
    name: string; // eg: Lincoln High School
    country: string;
    year?: string;
    x: number;
    y: number;
}

export type SkillLeaf = {
    name: string;
    mastery: number; // 0–100
    future?: boolean; // future leaf toggles dashed style & muted color
    note?: string;
}

export type SkillTree = {
    title: string;
    description?: string;
    leaves: SkillLeaf[];
}

export type ShowcaseProject = {
    slug: "projectpath" | "resource" | "citysense" | "riskcast";
    title: string;
    summary: string;
    status: "planning" | "building" | "alpha" | "beta" | "launched";
    repo?: string; // e.g., "anipreetc/projectpath"
    loomUrl?: string; // Loom share URL (can be empty until ready)
    screenshots?: string[]; // public image URLs; placeholders for now
    tags: string[];
};

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
  pushed_at: string;
  private?: boolean; 
};