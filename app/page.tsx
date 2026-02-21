"use client";

import About from "@/components/About";
import AppendixContact from "@/components/AppendixContact";
import Navbar from "@/components/Navbar";
import { ProjectsList } from "@/components/Projects";
import ReverieHero from "@/components/ReverieHero";
import { useTheme } from "@/contexts/ThemeContext";

export default function Page() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <Navbar />
      <div className="overflow-x-hidden">
        <ReverieHero />
        <div className="w-full h-px bg-zinc-600 dark:bg-zinc-800 hidden lg:block opacity-40" />
        <ProjectsList />
        <div className="w-full h-px bg-zinc-600 dark:bg-zinc-800 hidden lg:block opacity-40" />
        <About />
        <div className="w-full h-px bg-zinc-600 dark:bg-zinc-800 hidden lg:block opacity-40" />
        <AppendixContact />
      </div>
    </div>
  );
}
