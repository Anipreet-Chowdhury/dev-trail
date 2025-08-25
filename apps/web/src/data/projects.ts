import { Project } from "@/types";

export const projects: Project[] = [
    {
        slug: "devtrail",
        name: "DevTrail",
        repoUrl: "https://github.com/Anipreet-Chowdhury/dev-trail",
        status: "building",
        nextUpdateISO: new Date(Date.now()+3*24*3600e3).toISOString(),
        tags: ["nextjs","tailwind","firebase"],
        short: "Portfolio + coding routine tracker."
    },
    {
        slug: "projectpath",
        name: "ProjectPath",
        repoUrl: "https://github.com/<you>/projectpath",
        status: "building",
        nextUpdateISO: new Date(Date.now()+5*24*3600e3).toISOString(),
        tags: ["fastapi","cohere","firestore"],
        short: "Syllabus → tasks → subtasks → allocation."
      },
      {
        slug: "resource",
        name: "ReSource",
        repoUrl: "https://github.com/<you>/resource",
        status: "planning",
        tags: ["react","fastapi","bigquery"],
        short: "Supply-chain resiliency & sourcing rules."
      }
]