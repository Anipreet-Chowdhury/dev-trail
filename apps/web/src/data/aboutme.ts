import { Hop, SkillTree } from "@/types";

export const Hops: Hop[] = [
    { city: "Hyderabad",label: "Elementary School",name: "Chirec International",country: "India",x: 700,y: 320},
    { city: "Mumbai",label: "Middle School",name: "Bombay Scottish",country: "India",x: 550,y: 320},
    { city: "Gurgaon",label: "High School",name: "Heritage Xperiential Learning School",country: "India",x: 640,y: 250},
    { city: "Toronto",label: "University",name: "University of Toronto",country: "Canada",x: 200,y: 200},
    { city: "Mississauga",label: "Working",name: "Zebra Technologies",country: "Canada",x: 170,y: 180},
];


export const SkillTrees: SkillTree[] = [
{
title: "Full‑Stack & Frontend",
description: "Building fast, clean UIs with modern frameworks.",
leaves: [
{ name: "React / Next.js", mastery: 60 },
{ name: "TypeScript", mastery: 75 },
{ name: "Tailwind CSS", mastery: 75 },
{ name: "Form & State (Zod/React Hook Form)", mastery: 70 },
{ name: "Expo / React Native", mastery: 20, future: true, note: "Ship mobile MVP" },
{ name: "ShadCN Components", mastery: 60 },
],
},
{
title: "Backend & Data Engineering",
description: "APIs, pipelines, modeling, and orchestration.",
leaves: [
{ name: "Python / FastAPI", mastery: 90 },
{ name: "Firebase (Auth/Firestore)", mastery: 76 },
{ name: "SQL / BigQuery", mastery: 95 },
{ name: "ETL / Airflow", mastery: 55, future: true, note: "Stabilize daily jobs" },
{ name: "CI/CD (GitHub Actions)", mastery: 65 },
{ name: "Docker / Containers", mastery: 68 },
],
},
{
title: "ML / AI",
description: "Practical NLP + model deployment.",
leaves: [
{ name: "NLP (Transformers, RNNs)", mastery: 85 },
{ name: "Model Serving (Docker/Cloud Run)", mastery: 60 },
{ name: "Recommenders using Matrix factorization, graph recommenders",future: true, mastery: 38 },
{ name: "Optimization using RL", future:true, mastery: 40 },
{ name: "Time Series / Forecasting", mastery: 35, future: true, note: "RiskCast milestones" },
],
},
{
title: "Analytics & BI",
description: "Decision dashboards and insight generation.",
leaves: [
{ name: "Power BI", mastery: 55 },
{ name: "Streamlit", future: true, mastery: 10 },
{ name: "Data Viz (Recharts/D3)", mastery: 50 },
{ name: "Amundsen / Cataloging", mastery: 10, future: true },
],
},
];