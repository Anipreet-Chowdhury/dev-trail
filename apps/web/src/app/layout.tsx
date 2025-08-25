import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";


export const metadata: Metadata = {
  title: "DevTrail - Portfolio + Coding Routine Gamifier",
  description: "Anipreet’s projects, journey, and coding tracker.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-12 text-xs text-white/50">
          © {new Date().getFullYear()} Anipreet Chowdhury
        </footer>
      </body>
    </html>
  );
}
