import AboutHero from "./AboutHero";
import HopMap from "./HopMap";
import SkillTrees from "./SkillTrees";
import { Hops as HOPS, SkillTrees as SKILL_TREES } from "@/data/aboutme";

export default function AboutPage() {
    return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
            <AboutHero />
            <HopMap hops={HOPS} />
            <SkillTrees trees={SKILL_TREES} />
        </main>
    );
}