"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { PROJECTS } from "@/data/PROJECTS";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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
}


export function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);
  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  return (
    <div className={`flex flex-col w-full h-full ${className}`}>
      {/* Title Row */}

      <div
        className="px-4 py-1.5 md:py-2 border-b"
        style={{ borderColor: dividerColor }}
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal" style={{ fontFamily: "'Italiana', serif" }}>
          {project.numeral}. {project.title}
        </h3>
      </div>

      {/* Content Row: Description and Logo */}
      <div className="flex flex-col min-[600px]:grid min-[600px]:grid-cols-[1fr_auto]">
        <div
          className="order-2 min-[600px]:order-1 px-4 py-5 min-[600px]:py-2 min-[600px]:border-r flex items-center"
          style={{ borderColor: dividerColor }}
        >
          <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-90" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {project.description}
          </p>
        </div>

        <div
          className="order-1 min-[600px]:order-2 px-4 py-8 min-[600px]:px-6 min-[600px]:py-3 border-b min-[600px]:border-b-0 flex items-center justify-center relative group min-h-[100px]"
          style={{ borderColor: dividerColor }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full h-64 min-[600px]:w-40 min-[600px]:h-40 lg:w-48 lg:h-48 relative">
            <Image
              src={isDark ? project.darkIcon : project.lightIcon}
              alt={project.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <AnimatePresence>
            {isHovered && project.hoverGif && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 z-50 pointer-events-none"
              >
                <div className={`${project.tooltipClass || "w-40 md:w-56"} rounded-lg overflow-hidden border shadow-2xl ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <img
                    src={project.hoverGif}
                    alt={`${project.title} preview`}
                    className="w-full h-auto block"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button Row */}
      <div
        className="px-4 py-1.5 md:py-2 border-t"
        style={{ borderColor: dividerColor }}
      >
        <button className="text-lg md:text-xl font-light italic tracking-[0.2em] uppercase hover:opacity-70 transition-opacity" style={{ fontFamily: "'Arapey', serif" }}>
          [View case]
        </button>
      </div>
    </div>
  );
}


export function ProjectsList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [p1, p2, p3] = PROJECTS;
  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  return (
    <section id="projects" className={`min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-12 transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <div
        className="w-full max-w-[1800px] grid grid-cols-1 min-[1631px]:grid-cols-2 border"
        style={{ borderColor: dividerColor }}
      >

        {/* Quadrant 1: Header */}
        <div
          className="p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-6 min-[1631px]:border-r border-b"
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
            &ldquo;These projects started as exercises in understanding systems. They taught me how to think like both the developer and the user.&rdquo;
          </p>
        </div>

        {/* Quadrant 2: Project 1 */}
        <div className="border-b" style={{ borderColor: dividerColor }}>
          {p1 && <ProjectCard project={p1} />}
        </div>

        {/* Quadrant 3: Project 2 */}
        <div className="min-[1631px]:border-r border-b min-[1631px]:border-b-0" style={{ borderColor: dividerColor }}>
          {p2 && <ProjectCard project={p2} />}
        </div>


        {/* Quadrant 4: Project 3 */}
        <div className="">
          {p3 && <ProjectCard project={p3} />}
        </div>
      </div>
    </section>

  );
}




