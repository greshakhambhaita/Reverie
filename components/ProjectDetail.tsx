"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { X } from "lucide-react";
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

  // Snap logic when drag ends
  const handleDragEnd = (_: any, info: any) => {
    const dragDistance = info.offset.y;
    const velocity = info.velocity.y;

    if (dragDistance < -150 || velocity < -500) {
      // Dragged up enough -> Full page
      setIsFullPage(true);
      y.set(0);
    } else if (dragDistance > 150 || velocity > 500) {
      // Dragged down enough -> Close
      if (isFullPage) {
        setIsFullPage(false);
        y.set(0);
      } else {
        onClose?.();
      }
    } else {
      // Stay in current state
      y.set(0);
    }
  };

  // Reset full page state when project changes/closes
  useEffect(() => {
    if (!project) {
      setIsFullPage(false);
      y.set(0);
    }
  }, [project, y]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-10000 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{
              y: isFullPage ? 0 : 0,
              height: isFullPage ? "100vh" : "85vh",
              borderTopLeftRadius: isFullPage ? "0px" : "32px",
              borderTopRightRadius: isFullPage ? "0px" : "32px"
            }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 15, stiffness: 200, mass: 0.2 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ y }}
            className={`fixed bottom-0 left-0 right-0 z-10001 w-full border-t overflow-hidden shadow-2xl flex flex-col transition-colors duration-300 ${isDark ? "bg-[#0a0a0a] text-white border-white/10" : "bg-white text-black border-black/10"
              }`}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing group">
              <div className="w-16 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600 transition-colors" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-6 md:px-8 border-b border-inherit">
              <div className="flex items-center gap-4">
                <span className="text-xl md:text-2xl font-light opacity-50" style={{ fontFamily: "'Arapey', serif" }}>
                  {project.numeral}
                </span>
                <h2 className="text-2xl md:text-4xl font-normal" style={{ fontFamily: "'Italiana', serif" }}>
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Close drawer"
              >
                <X size={28} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16 space-y-16">
                <section className="space-y-8">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal leading-tight" style={{ fontFamily: "'Italiana', serif" }}>
                    {project.punchline || "Exploring the boundaries of digital form."}
                  </h1>
                  <p className="text-xl md:text-3xl font-light opacity-80 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {project.description}
                  </p>
                </section>

                {/* Mock sections to demonstrate scrolling */}
                <section className="space-y-6">
                  <h3 className="text-2xl font-normal opacity-50 uppercase tracking-widest" style={{ fontFamily: "'Arapey', serif" }}>[ Objective ]</h3>
                  <p className="text-lg md:text-xl font-light opacity-70 leading-relaxed">
                    The core challenge was to create a system that felt organic yet structured.
                    Every pixel was considered for its relationship to the whole, ensuring a
                    harmonious balance between information density and aesthetic breathing room.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <section className="space-y-6">
                    <h3 className="text-2xl font-normal opacity-50 uppercase tracking-widest" style={{ fontFamily: "'Arapey', serif" }}>[ Tech Stack ]</h3>
                    <ul className="space-y-2 text-lg md:text-xl font-light opacity-70">
                      {project.techStack?.map((tech) => (
                        <li key={tech}>{tech}</li>
                      )) || (
                          <>
                            <li>Next.js / TypeScript</li>
                            <li>Tailwind CSS</li>
                            <li>Framer Motion</li>
                            <li>PostgreSQL</li>
                          </>
                        )}
                    </ul>
                  </section>
                  <section className="space-y-6">
                    <h3 className="text-2xl font-normal opacity-50 uppercase tracking-widest" style={{ fontFamily: "'Arapey', serif" }}>[ Timeline ]</h3>
                    <p className="text-lg md:text-xl font-light opacity-70">
                      {project.timeline || "8 weeks of iterative design and development."}
                    </p>
                  </section>
                </div>

                <section className="space-y-8 border-t border-inherit pt-16 pb-24">
                  <h3 className="text-2xl font-normal opacity-50 uppercase tracking-widest" style={{ fontFamily: "'Arapey', serif" }}>[ Gallery ]</h3>
                  <div className="aspect-video bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-inherit italic opacity-40">
                    Project Visuals Coming Soon
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
