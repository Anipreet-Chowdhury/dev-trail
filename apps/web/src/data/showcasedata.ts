import { ShowcaseProject } from "@/types";
const GITHUB_USERNAME = "Anipreet-Chowdhury";

export const SEED: ShowcaseProject[] = [
    {
        slug: "projectpath",
        title: "ProjectPath",
        summary:
        "Syllabus-to-schedule engine: extract tasks from PDFs, classify, generate subtasks, allocate across teammates using availability.",
        status: "building",
        repo: `${GITHUB_USERNAME}/ProjectPath`,
        loomUrl: "", // add when ready
        screenshots: [
        "https://placehold.co/1600x900/png?text=ProjectPath+UI+Mock",
        "https://placehold.co/1600x900/png?text=Classifier+API+Demo",
        ],
        tags: ["FastAPI", "Firebase", "NLP", "PDF", "Team Allocation"],
    },
    {
        slug: "resource",
        title: "ReSource",
        summary:
        "Supply-chain resilience & sourcing rules with Firestore + FastAPI: rule engine, vendor scoring, dashboards, and audit trails.",
        status: "alpha",
        repo: `${GITHUB_USERNAME}/ReSource`,
        loomUrl: "",
        screenshots: [
        "https://placehold.co/1600x900/png?text=ReSource+Dashboard",
        "https://placehold.co/1600x900/png?text=Rule+Builder",
        ],
        tags: ["Supply Chain", "Firestore", "FastAPI", "Dashboards"],
    },
    {
        slug: "citysense",
        title: "CitySense",
        summary:
        "Smart urban insights: ETL to BigQuery, geospatial clustering to find areas needing food/shelter; public-data forecasting.",
        status: "planning",
        repo: `${GITHUB_USERNAME}/CitySense`,
        loomUrl: "",
        screenshots: [
        "https://placehold.co/1600x900/png?text=CitySense+Maps",
        "https://placehold.co/1600x900/png?text=Forecasting+Prototype",
        ],
        tags: ["BigQuery", "Geospatial", "ETL", "Forecasting"],
    },
    // {
    //     slug: "riskcast",
    //     title: "RiskCast",
    //     summary:
    //     "Forecasting transaction volume & fraud risk for digital wallets: anomaly detection, risk scoring, Streamlit validation.",
    //     status: "planning",
    //     repo: `${GITHUB_USERNAME}/RiskCast`,
    //     loomUrl: "",
    //     screenshots: [
    //     "https://placehold.co/1600x900/png?text=RiskCast+Risk+Scores",
    //     "https://placehold.co/1600x900/png?text=Model+Pipeline",
    //     ],
    //     tags: ["ML", "Forecasting", "AWS", "Streamlit", "CI/CD"],
    // },
];