export type Project = {
    slug: string;
    name: string;
    repoUrl: string;
    status: "planning" | "building" | "paused" | "shipped";
    nextUpdateISO? : string;
    tags: string[];
    short: string;
}