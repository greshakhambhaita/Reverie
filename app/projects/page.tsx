"use client";

import { ProjectCard, Project } from "@/components/Projects";
import { PROJECTS } from "@/data/PROJECTS";
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import ViewCase from "@/components/ViewCase";
import { useState } from "react";
import Link from "next/link";

export default function AllProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  const handleReadCase = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      
      <main className="pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="w-full h-px bg-zinc-600 dark:bg-zinc-800 opacity-30 mb-12" />
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
          <Link 
            href="/#projects" 
            className="text-lg md:text-xl font-light opacity-60 hover:opacity-100 transition-all flex items-center gap-2 mb-12 group"
            style={{ fontFamily: "'Arapey', serif" }}
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> [Back to projects]
          </Link>

          {/* Projects Grid - Same format as landing page */}
          <div className="grid grid-cols-1 min-[1631px]:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            
            {/* Slot 1: Header */}
            <div
              className="p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-6 "
              style={{ borderColor: dividerColor }}
            >
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl lg:text-[120px] font-normal tracking-tight" style={{ fontFamily: "'Italiana', serif" }}>
                  Archive
                </h1>
                <p className="text-base sm:text-lg lg:text-2xl font-light italic opacity-100" style={{ fontFamily: "'Arapey', serif" }}>
                  Chapter Two~
                </p>
              </div>
              <p
                className="text-lg md:text-xl lg:text-2xl font-light italic opacity-70 max-w-xl leading-relaxed"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                &ldquo;A comprehensive catalog of works, ranging from commercial interfaces to experiments in creative engineering.&rdquo;
              </p>
            </div>

            {PROJECTS.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} onReadCaseAction={handleReadCase} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-zinc-600 dark:bg-zinc-800 opacity-30 mt-24" />
      </main>

      <ViewCase
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
      
      <SideNav />
    </div>
  );
}
