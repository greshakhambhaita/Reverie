"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import { useEffect } from "react";
import { Project } from "./Projects";

interface ViewCaseProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewCase = ({ project, isOpen, onClose }: ViewCaseProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const mutedColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const tagBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
  const accentColor = isDark ? "#c9a96e" : "#8b6f47";

  // Tech stack color logic (preserved from original)
  const getTechColor = (i: number, count: number) => {
    if (project.id === "orb") {
      return ["#22c55e", "#444444", "#E6E696", "#166534", "#525252"][i % 5];
    } else if (project.id === "oriel") {
      return ["#444444", "#d4d4d4", "#722f37", "#262626", "#a3a3a3", "#581c23"][i % 6];
    } else if (project.id === "solace") {
      return ["#5b21b6", "#2563eb", "#1e40af", "#7c3aed", "#3b82f6"][i % 5];
    }
    return `rgba(${isDark ? "212,212,212" : "68,68,68"}, ${0.8 - i * (0.8 / count)})`;
  };

  const techPercents = [40, 25, 15, 10, 10];

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${isDark ? "bg-black/10" : "bg-white/10"} backdrop-blur-sm`}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative w-full md:max-w-4xl lg:max-w-[1400px] h-full max-h-[90vh] overflow-y-auto border shadow-2xl flex flex-col ${isDark
          ? "bg-[#0a0a0a] border-white/10 text-white"
          : "bg-white border-black/10 text-black"
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: 0 }}
      >
        {/* ── Sticky Top Bar ── */}
        <div
          className={`sticky top-0 z-20 flex items-center justify-between p-8 backdrop-blur-md ${isDark ? "bg-[#0a0a0a]/80" : "bg-white/80"
            }`}
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 relative opacity-90">
            <Image
              src={isDark ? project.darkIcon : project.lightIcon}
              alt={`${project.title} logo`}
              fill
              className="object-contain"
            />
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 text-3xl md:text-5xl lg:text-6xl font-normal"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            <span style={{ opacity: 0.4 }}>{project.numeral}.</span>
            <span>{project.title}</span>
          </div>

          <button
            onClick={onClose}
            className="text-lg md:text-xl font-medium opacity-80 hover:opacity-100 cursor-pointer px-2 py-1"
            style={{ fontFamily: "'Arapey', serif" }}
            aria-label="Close"
          >
            [Close]
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col items-center px-6 md:px-8 pb-20 space-y-0 w-full">

          {/* ── 0. Punchline ── */}
          {project.punchline && (
            <div className="w-full text-center py-5 md:py-6" style={{ borderBottom: `1px solid ${borderColor}`, backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
              <p
                className="text-sm md:text-base font-normal tracking-wide opacity-80"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {project.punchline}
              </p>
            </div>
          )}

          {/* ── 1. Quick-glance Stats Row ── */}
          <div
            className="w-full grid grid-cols-2 md:grid-cols-4"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            {[
              { label: "Type", value: project.type },
              { label: "Timeline", value: project.timeline },
              { label: "Role", value: project.role },
              { label: "Status", value: project.status },
            ].map((stat, i) => (
              <div
                key={i}
                className="px-6 py-5 flex flex-col gap-1"
                style={{
                  borderRight: i < 3 ? `1px solid ${borderColor}` : "none",
                }}
              >
                <span
                  className="text-xs md:text-sm tracking-[0.18em] uppercase"
                  style={{ color: mutedColor, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {stat.label}
                </span>
                <span
                  className="text-base md:text-lg font-normal"
                  style={{ fontFamily: "'Arapey', serif", fontSize: "1.1rem" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* ── 2. Main Banner Image & GIF ── */}
          <div className="w-full p-6 md:p-12 flex items-center justify-center" style={{ borderBottom: `1px solid ${borderColor}`, backgroundColor: cardBg }}>
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">

              {/* Main Screenshot */}
              <div className="relative w-full md:w-[60%] lg:w-[65%] aspect-video overflow-hidden shadow-2xl rounded-sm border shrink-0" style={{ borderColor }}>
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* GIF Animation */}
              {project.hoverGif && (
                <div 
                  className={`relative w-full overflow-hidden shadow-2xl rounded-sm border shrink-0 bg-black/5 dark:bg-white/5 transition-all duration-300 ${
                    project.id === "orb" 
                      ? "aspect-[9/16] md:w-[25%] lg:w-[22%]" 
                      : "aspect-video md:aspect-[4/3] md:w-[40%] lg:w-[35%]"
                  }`} 
                  style={{ borderColor }}
                >
                  <Image
                    src={project.hoverGif}
                    alt={`${project.title} animation`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

            </div>
          </div>

          {/* ── 7. Tech Stack / Language Distribution ── */}
          <div
            className="w-full px-6 md:px-10 py-8 md:py-10 flex flex-col gap-6"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            <p
              className="text-xs md:text-sm tracking-[0.18em] uppercase"
              style={{ color: accentColor, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Tech Stack
            </p>

            {/* Bar */}
            <div className="w-full h-1.5 flex overflow-hidden" style={{ background: tagBg }}>
              {project.techStack.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: `${techPercents[i] || Math.round(100 / project.techStack.length)}%`,
                    backgroundColor: getTechColor(i, project.techStack.length),
                    borderRight: "1px solid rgba(128,128,128,0.1)",
                  }}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {project.techStack.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-base font-normal"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getTechColor(i, project.techStack.length) }}
                  />
                  <span className="opacity-80">{tech}</span>
                  <span style={{ color: mutedColor }}>
                    {techPercents[i] || Math.round(100 / project.techStack.length)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 8. Skills Demonstrated ── */}
          <div
            className="w-full px-6 md:px-10 py-8 flex flex-col gap-4"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            <p
              className="text-xs md:text-sm tracking-[0.18em] uppercase"
              style={{ color: accentColor, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Skills Demonstrated
            </p>
            <div className="flex flex-wrap gap-2">
              {/* Highlighted: always show these */}
              {["Full-Stack", "Solo Project"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-[0.1em] uppercase px-3 py-1.5"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
                    color: isDark ? "#0a0a0a" : "#ffffff",
                  }}
                >
                  {tag}
                </span>
              ))}
              {/* Regular: derived from techStack + type */}
              {[project.type, ...project.techStack].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: tagBg,
                    borderColor,
                    color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>



          {/* ── 4. Problem / Solution ── */}
          {(project.problem || project.solution) && (
            <div
              className="w-full grid grid-cols-1 md:grid-cols-2"
              style={{ borderBottom: `1px solid ${borderColor}` }}
            >
              <div
                className="px-6 md:px-10 py-8 md:py-10 flex flex-col gap-3"
                style={{ borderRight: `1px solid ${borderColor}`, background: cardBg }}
              >
                <p
                  className="text-xs md:text-sm tracking-[0.18em] uppercase"
                  style={{ color: mutedColor, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  The Problem
                </p>
                <p
                  className="text-lg md:text-xl font-normal leading-relaxed opacity-90"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {project.problem || "—"}
                </p>
              </div>
              <div
                className="px-6 md:px-10 py-8 md:py-10 flex flex-col gap-3"
                style={{ background: cardBg }}
              >
                <p
                  className="text-xs md:text-sm tracking-[0.18em] uppercase"
                  style={{ color: mutedColor, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  The Solution
                </p>
                <p
                  className="text-lg md:text-xl font-normal leading-relaxed opacity-90"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {project.solution || "—"}
                </p>
              </div>
            </div>
          )}

          {/* ── 5. Description + Features ── */}
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            {/* Description */}
            <div
              className="px-6 md:px-10 py-8 md:py-10 flex flex-col gap-4"
              style={{ borderRight: `1px solid ${borderColor}` }}
            >
              <p
                className="text-xs md:text-sm tracking-[0.18em] uppercase"
                style={{ color: accentColor, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Description
              </p>
              <p
                className="text-lg md:text-xl font-normal leading-relaxed opacity-90"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div className="px-6 md:px-10 py-8 md:py-10 flex flex-col gap-4">
              <p
                className="text-xs md:text-sm tracking-[0.18em] uppercase"
                style={{ color: accentColor, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Key Features
              </p>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-base md:text-lg font-normal leading-relaxed opacity-90"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <span
                      className="mt-2 w-1 h-1 rounded-full shrink-0"
                      style={{ background: accentColor }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── 6. Thought Process / What I Built ── */}
          {(project.intent || project.implementation) && (
            <div
              className="w-full px-6 md:px-10 py-8 md:py-12 flex flex-col gap-4"
              style={{ borderBottom: `1px solid ${borderColor}` }}
            >
              <p
                className="text-xs md:text-sm tracking-[0.18em] uppercase"
                style={{ color: accentColor, fontFamily: "'Source Sans 3', sans-serif" }}
              >
                What I Built
              </p>
              {project.intent && (
                <p
                  className="text-lg md:text-xl font-normal leading-relaxed opacity-90 max-w-4xl"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {project.intent}
                </p>
              )}
              {project.implementation && (
                <p
                  className="text-lg md:text-xl font-normal leading-relaxed opacity-90 max-w-4xl"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {project.implementation}
                </p>
              )}
            </div>
          )}

          {/* ── 9. Footer Links ── */}
          <div className="w-full px-6 md:px-10 py-6 flex items-center gap-4 flex-wrap">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.13em] uppercase px-5 py-2.5 transition-opacity hover:opacity-70"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                background: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
                color: isDark ? "#0a0a0a" : "#ffffff",
              }}
            >
              GitHub →
            </a>
            <span
              className="ml-auto text-sm font-normal italic opacity-50"
              style={{ fontFamily: "'Arapey', serif" }}
            >
              Built independently, {project.citation?.year || "2024"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewCase;