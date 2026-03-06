"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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

  if (!isOpen) return null;

  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 ${isDark ? "bg-black/10" : "bg-white/10"} backdrop-blur-sm`}
        aria-hidden="true"
      />

      <div
        className={`relative w-full max-w-6xl md:max-w-[calc(100vw-120px)] lg:max-w-[calc(100vw-160px)] h-full max-h-[90vh] border shadow-sm flex flex-col ${isDark ? "bg-black border-white/20 text-white" : "bg-white border-black/20 text-black"
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: "0" }}
      >
        <div className="flex justify-end p-6 shrink-0 border-b" style={{ borderColor }}>
          <button
            onClick={onClose}
            className="text-base md:text-lg font-light opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Close"
          >
            [Close]
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 lg:px-24 xl:px-48 py-8 md:py-12 w-full max-w-[1400px] mx-auto space-y-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-8" style={{ borderColor }}>
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal tracking-tight" style={{ fontFamily: "'Italiana', serif" }}>
                Gresha Khambhaita
              </h1>
              <p className="text-xl md:text-2xl font-light italic opacity-80" style={{ fontFamily: "'Arapey', serif" }}>
                Rajkot, Gujarat • +91 88490 35731 • greshakhambhaita@gmail.com
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/gresha-khambhaita-40b30b272"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 text-lg md:text-xl font-light transition-opacity hover:opacity-70 after:content-[''] after:block after:w-0 after:h-px after:bg-current after:transition-all hover:after:w-full"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              LinkedIn Profile ↗
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
            {/* Left Column - Meta */}
            <div className="flex flex-col space-y-12">
              <section>
                <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Education</h3>
                <div className="flex flex-col space-y-2">
                  <h4 className="text-xl md:text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>BE Computer Engineering</h4>
                  <p className="text-lg opacity-80 font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Marwadi Education Foundation</p>
                  <p className="text-sm opacity-60 font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Sept 2022 – June 2025 • CGPA: 7.62</p>
                </div>
              </section>

              <section>
                <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Skills & Hobbies</h3>
                <div className="flex flex-col space-y-4 font-light text-base md:text-lg opacity-90 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  <div>
                    <span className="opacity-50">Skills: </span>
                    Problem-solving, project coordination, version control, requirements analysis
                  </div>
                  <div>
                    <span className="opacity-50">Hobbies: </span>
                    Sketching, language learning, fiction writing, tech/design podcasts
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Main Content */}
            <div className="flex flex-col space-y-12">
              <section>
                <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Summary</h3>
                <p className="text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed" style={{ fontFamily: "'Arapey', serif" }}>
                  Computer Engineering graduate with hands-on experience in building mobile and web applications. Skilled in developing end-to-end features, intuitive UI flows, and reliable backend logic using modern frameworks.
                </p>
              </section>

              <section>
                <h3 className="text-sm tracking-widest uppercase opacity-50 mb-4 font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Technical Skills</h3>
                <ul className="space-y-4 font-light text-base md:text-xl opacity-90" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  <li className="flex flex-col sm:flex-row sm:gap-4 border-b pb-4" style={{ borderColor }}>
                    <span className="opacity-50 w-64 shrink-0">Programming & Development</span>
                    <span>Python, JavaScript, HTML, CSS, TailwindCSS, Node.js, React Native</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:gap-4 border-b pb-4" style={{ borderColor }}>
                    <span className="opacity-50 w-64 shrink-0">Databases</span>
                    <span>MongoDB, PostgreSQL, SQL</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:gap-4 border-b pb-4" style={{ borderColor }}>
                    <span className="opacity-50 w-64 shrink-0">Core Concepts</span>
                    <span>Data Structures, Algorithms, REST APIs, CRUD operations</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:gap-4 border-b pb-4" style={{ borderColor }}>
                    <span className="opacity-50 w-64 shrink-0">Tools</span>
                    <span>Git, GitHub, Postman, VS Code, Figma, Express.js</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-sm tracking-widest uppercase opacity-50 mb-6 font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Projects</h3>
                <div className="flex flex-col space-y-10">

                  {/* Orb */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b pb-2 gap-2" style={{ borderColor }}>
                      <div className="flex items-baseline gap-4">
                        <h4 className="text-2xl md:text-3xl font-normal" style={{ fontFamily: "'Italiana', serif" }}>Orb</h4>
                        <span className="text-lg font-light italic opacity-60" style={{ fontFamily: "'Arapey', serif" }}>(On-Road Mechanic Service)</span>
                      </div>
                      <a href="https://github.com/reykhambhaita/Orb" target="_blank" rel="noopener noreferrer" className="text-sm font-light opacity-50 hover:opacity-100 transition-opacity" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>github.com/reykhambhaita/Orb ↗</a>
                    </div>
                    <div className="text-sm font-light opacity-60 uppercase tracking-widest" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      React Native, Node.js, Express.js, MongoDB, TailwindCSS
                    </div>
                    <ul className="space-y-2 mt-2 font-light opacity-90 text-base md:text-lg" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Built a mobile app enabling users to request verified mechanics.</li>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Implemented booking workflows, service-matching logic, and backend APIs.</li>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Developed modular and scalable UI components.</li>
                    </ul>
                  </div>

                  {/* Solace */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b pb-2 gap-2" style={{ borderColor }}>
                      <div className="flex items-baseline gap-4">
                        <h4 className="text-2xl md:text-3xl font-normal" style={{ fontFamily: "'Italiana', serif" }}>Solace</h4>
                        <span className="text-lg font-light italic opacity-60" style={{ fontFamily: "'Arapey', serif" }}>(Personal Project)</span>
                      </div>
                      <a href="https://github.com/reykhambhaita/Solace" target="_blank" rel="noopener noreferrer" className="text-sm font-light opacity-50 hover:opacity-100 transition-opacity" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>github.com/reykhambhaita/Solace ↗</a>
                    </div>
                    <div className="text-sm font-light opacity-60 uppercase tracking-widest" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      Next.js, React, TailwindCSS, Express.js, Node.js
                    </div>
                    <ul className="space-y-2 mt-2 font-light opacity-90 text-base md:text-lg" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Created an AI-powered code learning platform with deep code analysis.</li>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Integrated CodeMirror, Tree-sitter, and Groq LLMs for multi-language support.</li>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Designed structured backend pipelines for analysis, translation, and resource retrieval.</li>
                    </ul>
                  </div>

                  {/* Oriel */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b pb-2 gap-2" style={{ borderColor }}>
                      <div className="flex items-baseline gap-4">
                        <h4 className="text-2xl md:text-3xl font-normal" style={{ fontFamily: "'Italiana', serif" }}>Oriel</h4>
                        <span className="text-lg font-light italic opacity-60" style={{ fontFamily: "'Arapey', serif" }}>(Personal Project)</span>
                      </div>
                      <a href="https://github.com/reykhambhaita/Oriel" target="_blank" rel="noopener noreferrer" className="text-sm font-light opacity-50 hover:opacity-100 transition-opacity" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>github.com/reykhambhaita/Oriel ↗</a>
                    </div>
                    <div className="text-sm font-light opacity-60 uppercase tracking-widest" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      React, Vite, TailwindCSS, Node.js, Express.js, MongoDB
                    </div>
                    <ul className="space-y-2 mt-2 font-light opacity-90 text-base md:text-lg" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Developed a full-stack café billing and ordering system.</li>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Implemented authentication, order tracking, and REST API communication.</li>
                      <li className="flex items-start gap-3"><span className="opacity-50 mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />Built reusable and maintainable frontend components.</li>
                    </ul>
                  </div>

                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
