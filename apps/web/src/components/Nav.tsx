"use client";
import Link from "next/link";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "tracker", label: "Tracker" },
    { href: "/resume", label: "Resume" },
];

export default function Nav() {
    return (
        <header className="stick top-0 z-50 w-full bg-black/60 backdrop-blur border-b border-white/10"> 
            <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold">DevTrail</Link>
                <div className="flex gap-6 text-sm">
                    { links.map(l => (
                        <Link key={l.href} href={l.href} className="hover: text-white/90 text-white/70">
                            {l.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}