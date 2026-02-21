"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  return (
    <section
      id="about"
      className={`min-h-screen py-24 md:py-15 flex flex-col items-center px-6 md:px-12 lg:px-24 transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="w-full max-w-[1800px] flex flex-col relative">

        {/* 1. Header Block (Centered, Sparse) */}
        <div className="flex flex-col items-start justify-start mb-10 md:mb-18">
          <h2
            className="text-4xl md:text-6xl lg:text-[120px] font-normal tracking-tight ml-10"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            Appendix III
          </h2>
          <p
            className="text-xl md:text-2xl lg:text-3xl font-light italic mt-4 md:mt-6 opacity-80 ml-10"
            style={{ fontFamily: "'Arapey', serif" }}
          >
            On Origin & Disposition
          </p>
          <div
            className="w-full md:w-3/4 max-w-2xl h-px mt-16 md:mt-24"
            style={{ backgroundColor: dividerColor }}
          />
        </div>

        {/* 2. Main Two-Column Spread */}
        <div
          className="grid grid-cols-1 xl:grid-cols-[7fr_5fr] gap-12 xl:gap-24 lg:border lg:p-12 xl:p-16"
          style={{ borderColor: dividerColor }}
        >

          {/* Left Column — Formal Text Block */}
          <div className="flex flex-col space-y-12 xl:pr-24 xl:border-r border-b xl:border-b-0 pb-16 xl:pb-0" style={{ borderColor: dividerColor }}>
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              I am a software engineer grad with a distinct focus on the intersection of systematic logic and aesthetic execution. My practice resides where disciplined architecture meets experimental expression.
            </p>

            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              I believe interfaces should not merely display information, but orchestrate interaction. The tools and applications I construct prioritize structural integrity, nuanced feedback, and absolute typographic restraint.
            </p>

            <div className="pt-8 border-t space-y-8" style={{ borderColor: dividerColor }}>
              <h3 className="text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>
                Areas of Inquiry
              </h3>

              <ul className="space-y-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <li className="flex gap-4 items-baseline">
                  <span className="text-xs tracking-widest uppercase opacity-50 shrink-0 w-24">01</span>
                  <span className="text-lg md:text-xl font-light">
                    Full-Stack Web & Mobile Development (React, Next.js, React Native, Node.js)
                  </span>
                </li>

                <li className="flex gap-4 items-baseline">
                  <span className="text-xs tracking-widest uppercase opacity-50 shrink-0 w-24">02</span>
                  <span className="text-lg md:text-xl font-light">
                    Backend Systems, REST APIs & Database Architecture (MongoDB, PostgreSQL)
                  </span>
                </li>

                <li className="flex gap-4 items-baseline">
                  <span className="text-xs tracking-widest uppercase opacity-50 shrink-0 w-24">03</span>
                  <span className="text-lg md:text-xl font-light">
                    Scalable UI Systems & End-to-End Feature Implementation
                  </span>
                </li>


              </ul>
            </div>
          </div>

          {/* Right Column — Archive Panel */}
          <div className="relative flex flex-col justify-start">
            <div
              className="border p-8 md:p-12 lg:p-16 flex flex-col space-y-10 relative overflow-hidden"
              style={{ borderColor: dividerColor }}
            >

              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Alias</span>
                  <span className="text-xl md:text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>Gresha Khambhaita</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Primary Directive</span>
                  <span className="text-xl md:text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>Engineer, Designer, Analyst</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Location Status</span>
                  <span className="text-xl md:text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>Remote Repository</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Operating Systems</span>
                  <span className="text-xl md:text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>React, Next.js, TypeScript, Node</span>
                </div>
              </div>

            </div>

            <div className="mt-16 border-l pl-8 md:pl-12" style={{ borderColor: dividerColor }}>
              <p
                className="text-sm md:text-base font-light italic opacity-60 max-w-sm"
                style={{ fontFamily: "'Arapey', serif" }}
              >
                "The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it."
              </p>
              <p className="mt-4 text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                — M. Weiser (Referenced)
              </p>
            </div>
          </div>

        </div>

        {/* Small Details - Page Number */}
        <div className="absolute -bottom-8 md:-bottom-16 right-0 font-light opacity-40 text-sm md:text-base" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          142
        </div>

      </div>
    </section>
  );
}
