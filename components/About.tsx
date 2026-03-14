"use client";

import { useTheme } from "@/contexts/ThemeContext";

const fields = [
  { label: "Alias", value: "Gresha Khambhaita" },
  { label: "Primary Directive", value: "Engineer, Designer, Analyst" },
  { label: "Location", value: "Rajkot, India" },
  { label: "Availability", value: "Open to full-time roles", showsDot: true },
  { label: "Languages", value: "Python, JavaScript, HTML/CSS" },
  { label: "Stack", value: "React Native, Node.js, Tailwind, Express" },
  { label: "Data", value: "MongoDB, PostgreSQL" },
  { label: "Tooling", value: "Git, Figma, Postman" },
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dividerColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";

  return (
    <section
      id="about"
      className={`min-h-screen py-24 flex flex-col items-center px-6 md:px-12 lg:px-24 transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
    >
      <div className="w-full max-w-[1800px] flex flex-col relative">

        {/* Main Two-Column Spread */}
        <div
          className="grid grid-cols-1 xl:grid-cols-[5fr_5fr] gap-12 xl:gap-24 lg:border lg:p-12 xl:p-16"
          style={{ borderColor: dividerColor }}
        >
          {/* Left Column — Header and Dossier */}
          <div
            className="flex flex-col items-start xl:pr-24 xl:border-r border-b xl:border-b-0 pb-16 xl:pb-0"
            style={{ borderColor: dividerColor }}
          >
            {/* Title block */}
            <div className="flex flex-col items-start mb-10">
              <h2
                className="text-5xl md:text-7xl lg:text-[110px] font-normal tracking-tight leading-none"
                style={{ fontFamily: "'Italiana', serif" }}
              >
                Appendix III
              </h2>
              <p
                className="text-xl md:text-2xl lg:text-3xl font-light italic mt-4 opacity-60"
                style={{ fontFamily: "'Arapey', serif" }}
              >
                On Origin & Disposition
              </p>
            </div>

            {/* Dossier fields — ruled, no card box */}
            <div className="flex flex-col w-full">
              {fields.map((item, i) => (
                <div
                  key={item.label}
                  className="group flex flex-col space-y-1 py-3 border-t transition-opacity duration-200"
                  style={{
                    borderTopColor: dividerColor,
                    borderBottomWidth: i === fields.length - 1 ? "1px" : "0px",
                    borderBottomStyle: i === fields.length - 1 ? "solid" : "none",
                    borderBottomColor: i === fields.length - 1 ? dividerColor : "transparent",
                  }}
                >
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase opacity-40 group-hover:opacity-70 transition-opacity duration-200"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.showsDot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    )}
                    <span
                      className="text-lg font-light italic opacity-90"
                      style={{ fontFamily: "'Arapey', serif" }}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-12 xl:pt-16">
            {/* Illustration */}
            <div className="flex items-center justify-center w-full">
              <img
                src="/images/about_crow.jpeg"
                alt="Crow Illustration"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto opacity-75 transition-all duration-300 hover:scale-105"
                style={{ filter: "none" }}
              />
            </div>

            {/* Body copy */}
            <div className="flex flex-col space-y-6">
              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light opacity-90"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >



                I'm a full-stack developer who thinks just as hard about the decisions behind the code as the code itself — the architecture, the interaction, the small thing that makes an interface feel right instead of just functional.              </p>
              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light opacity-90"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >

                The user is always the measure. Not a box to check, but the actual reason any of it matters. That's what I come back to on every project, from the structure down to the last detail on screen.              </p>
            </div>
          </div>
        </div>

        {/* Page number */}
        <div
          className="absolute -bottom-8 md:-bottom-16 right-0 font-light opacity-30 text-sm md:text-base"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          142
        </div>

      </div>
    </section>
  );
}