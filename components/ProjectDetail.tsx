"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { motion, useMotionValue } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Project } from "./Projects";

interface ProjectDetailProps {
  project?: Project;
  onClose?: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isFullPage, setIsFullPage] = useState(false);

  // DRAG LOGIC
  const y = useMotionValue(0);

  const handleDragEnd = (_: any, info: any) => {
    const dragDistance = info.offset.y;
    const velocity = info.velocity.y;

    if (dragDistance < -150 || velocity < -500) {
      setIsFullPage(true);
      y.set(0);
    } else if (dragDistance > 150 || velocity > 500) {
      if (isFullPage) {
        setIsFullPage(false);
        y.set(0);
      } else {
        onClose?.();
      }
    } else {
      y.set(0);
    }
  };

  useEffect(() => {
    if (!project) {
      setIsFullPage(false);
      y.set(0);
    }
  }, [project, y]);

  if (!project) return null;

  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return (
    <>
      <motion.div
        key="project-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-10000 bg-black/40 backdrop-blur-sm cursor-pointer"
      />

      <motion.div
        key="project-panel"
        initial={{ y: "100%" }}
        animate={{
          y: 0,
          height: isFullPage ? "100vh" : "90vh",
          borderTopLeftRadius: isFullPage ? "0px" : "32px",
          borderTopRightRadius: isFullPage ? "0px" : "32px"
        }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.5 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ y }}
        className={`fixed bottom-0 left-0 right-0 z-10001 w-full border-t overflow-hidden shadow-2xl flex flex-col transition-colors duration-300 ${isDark ? "bg-[#0a0a0a] text-white border-white/10" : "bg-white text-black border-black/10"}`}
      >
        {/* Drag Handle & Close */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <div className="w-10" /> {/* Spacer */}
          <div className="w-16 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 cursor-grab active:cursor-grabbing" />
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 py-8 w-full max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-12 border-b pb-6" style={{ borderColor }}>
            <div className="flex items-baseline gap-4 md:gap-6">
              <span className="text-4xl md:text-6xl lg:text-7xl font-light " style={{ fontFamily: "'Italiana', serif" }}>
                {project.numeral}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal" style={{ fontFamily: "'Italiana', serif" }}>
                {project.title}
              </h1>
            </div>
            <div className="text-xl md:text-2xl font-light italic opacity-80" style={{ fontFamily: "'Arapey', serif" }}>
              {project.type}
            </div>
          </div>

          {/* 3x3 Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

            {/* Row 1, Col 1-2: Problem Statement (Span 2) */}
            <div
              className={`md:col-span-2 p-6 md:p-10 flex flex-col justify-center`}
            >
              <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light">The Problem</h3>
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed"
                style={{ fontFamily: "'Arapey', serif" }}
              >
                "{project.problem || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}"
              </p>
            </div>

            {/* Row 1, Col 3: Logo */}
            <div
              className={`aspect-square flex justify-center items-center relative group p-8 `}
            >
              <div className="w-full h-full relative">
                <Image
                  src={isDark ? project.darkIcon : project.lightIcon}
                  alt={`${project.title} logo`}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Row 2, Col 1: Screenshot */}
            <div
              className={`aspect-square flex justify-center items-center relative p-8`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={project.mainImage}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 2, Col 2-3: Description & Features Stacked (Span 2) */}
            <div
              className={`md:col-span-2 p-6 md:p-8 flex flex-col justify-start overflow-y-auto space-y-8`}
            >
              {/* Description */}
              <div>
                <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light">Description</h3>
                <p
                  className="text-lg md:text-xl font-light leading-relaxed opacity-90"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {project.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light">Features</h3>
                <ul className="space-y-3 font-light opacity-90 text-sm md:text-base" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="opacity-50 mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Row 3, Col 1-2: Thought Process (Span 2) */}
            <div
              className={`md:col-span-2 p-6 md:p-10 flex flex-col justify-center overflow-y-auto space-y-4`}
            >
              <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light">Thought Process</h3>
              <p
                className="text-lg md:text-xl font-light leading-relaxed opacity-90"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {project.intent || "Detailed thought process for this project goes here."}
              </p>
              {project.implementation && (
                <p
                  className="text-lg md:text-xl font-light leading-relaxed opacity-90"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {project.implementation}
                </p>
              )}
            </div>

            {/* Row 3, Col 3: GIF */}
            <div
              className={`aspect-square flex justify-center items-center relative p-8`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={project.hoverGif}
                  alt={`${project.title} gif`}
                  fill
                  className="object-contain"
                  unoptimized // GIFs often require this
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
