"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { PROJECTS } from "@/data/PROJECTS";
import Image from "next/image";
import { useState } from "react";
import ViewCase from "./ViewCase";

export interface Project {
  id: string;
  numeral: string;
  title: string;
  punchline: string;
  description: string;
  features: string[];
  techStack: string[];
  imageSrc?: string;
  lightIcon: string;
  darkIcon: string;
  hoverGif: string;
  mainImage: string;
  type: string;
  role: string;
  timeline: string;
  status: string;
  repoUrl: string;
  citation: {
    author: string;
    year: string;
    title: string;
    subtitle: string;
    pages: string;
  };
  tooltipClass?: string;
  problem?: string;
  solution?: string;
  implementation?: string;
  intent?: string;
}


export function ProjectCard({
  project,
  className = "",
  onReadCaseAction,
}: {
  project: Project;
  className?: string;
  onReadCaseAction: (project: Project) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  return (
    <div className={`flex flex-col w-full h-full border ${className}`} style={{ borderColor: dividerColor }}>
      {/* Title Row */}
      <div
        className="px-4 py-2 border-b flex justify-between items-center"
        style={{ borderColor: dividerColor }}
      >
        <h3 className="text-3xl md:text-3xl lg:text-5xl font-normal" style={{ fontFamily: "'Italiana', serif" }}>
          {project.numeral}. {project.title}
        </h3>
        <button
          onClick={() => onReadCaseAction(project)}
          className="text-base md:text-lg lg:text-xl font-light opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap ml-4"
          style={{ fontFamily: "'Arapey', serif" }}
        >
          [Read case]
        </button>
      </div>

      {/* Content Row: Description and Logo */}
      <div className="grow grid grid-cols-1 min-[600px]:grid-cols-[1fr_200px] lg:grid-cols-[1fr_240px]">
        <div
          className="px-4 py-6 min-[600px]:border-r flex items-center"
          style={{ borderColor: dividerColor }}
        >
          <p
            className="text-lg md:text-xl lg:text-2xl font-light leading-snug opacity-90 line-clamp-3 md:line-clamp-4"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {project.description}
          </p>
        </div>

        <div
          className="px-4 py-8 flex items-center justify-center relative group"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 relative">
            <Image
              src={isDark ? project.darkIcon : project.lightIcon}
              alt={project.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Tech Stack and Read Case Row */}
      <div
        className="px-4 py-3 border-t flex justify-between items-center"
        style={{ borderColor: dividerColor }}
      >
        <div className="flex flex-wrap gap-2 py-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="text-sm md:text-base font-normal px-3 py-1 border rounded-full"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                borderColor: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-lg lg:text-xl font-light opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap ml-4"
          style={{ fontFamily: "'Arapey', serif" }}
        >
          [View Repo]
        </a>
      </div>
    </div>
  );
}


export function ProjectsList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [p1, p2, p3] = PROJECTS;
  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleReadCase = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className={`min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-12 transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <div
        className="w-full max-w-[1800px] grid grid-cols-1 min-[1631px]:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
      >

        {/* Quadrant 1: Header */}
        <div
          className="p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-6 "
          style={{ borderColor: dividerColor }}
        >

          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl lg:text-[120px] font-normal tracking-tight" style={{ fontFamily: "'Italiana', serif" }}>
              Projects
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl font-light italic opacity-100" style={{ fontFamily: "'Arapey', serif" }}>
              Chapter One~
            </p>
          </div>
          <p
            className="text-lg md:text-xl lg:text-2xl font-light italic opacity-70 max-w-xl leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            &ldquo;These projects began as structured explorations in interface architecture and interaction design. Each one refined my approach to clarity, feedback, and constraint.&rdquo;
          </p>
        </div>

        {/* Quadrant 2: Project 1 */}
        <div>
          {p1 && <ProjectCard project={p1} onReadCaseAction={handleReadCase} />}
        </div>

        {/* Quadrant 3: Project 2 */}
        <div>
          {p2 && <ProjectCard project={p2} onReadCaseAction={handleReadCase} />}
        </div>


        {/* Quadrant 4: Project 3 */}
        <div>
          {p3 && <ProjectCard project={p3} onReadCaseAction={handleReadCase} />}
        </div>
      </div>

      <ViewCase
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
}




