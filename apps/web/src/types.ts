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
