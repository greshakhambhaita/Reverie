"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ReverieHero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen, isMounted]);

  return (
    <div
      className={`min-h-0 sm:min-h-[95vh] md:min-h-screen flex flex-col items-center justify-start px-6 md:px-12 lg:px-24 pt-12 md:pt-16 pb-4 md:pb-12 transition-colors duration-300 ${isDark ? "text-white" : "text-black"
        }`}
    >
      {/* ── Full-screen overlay (mobile only) ── */}
      {isMounted && overlayOpen &&
        createPortal(
          <div
            onClick={() => setOverlayOpen(false)}
            className={`
              fixed inset-0 z-50 flex flex-col items-center justify-center
              px-10 py-20 cursor-pointer md:hidden
              transition-colors duration-300
              ${isDark ? "bg-black text-white" : "bg-white text-black"}
            `}
          >
            <div className="max-w-lg w-full space-y-8">
              <h2
                className="text-3xl font-light italic border-b pb-4"
                style={{ fontFamily: "'Arapey', serif", borderColor: dividerColor }}
              >
                Author~
              </h2>
              <p
                className="text-2xl leading-relaxed font-light"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                I'm a computer engineering graduate who enjoys building things that
                feel clear, intentional, and useful. I focus on front-end
                development, UI clarity, and the kind of small design details that
                make an interface feel natural. Reverie brings together a few
                projects I've built while learning how to design, structure, and
                ship complete features across mobile and web.
              </p>
            </div>

            {/* Dismiss hint */}
            <p
              className="absolute bottom-6 text-sm font-light opacity-40"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              tap anywhere to close
            </p>
          </div>,
          document.body
        )}

      {/* Header Section */}
      <div className="text-center mb-10 md:mb-12 space-y-4">
        <h1
          className="text-7xl md:text-9xl lg:text-[10rem] font-normal tracking-tight"
          style={{ fontFamily: "'Italiana', serif" }}
        >
          Reverie
        </h1>
        <h2
          className="text-xl md:text-xl lg:text-3xl font-light tracking-wide uppercase"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Gresha Khambhaita~
        </h2>
        <p
          className="text-xl md:text-3xl lg:text-4xl font-light italic opacity-90 pt-4"
          style={{ fontFamily: "'Arapey', serif" }}
        >
          "To know is to admit how much remains unknown."
        </p>
      </div>

      {/* Content Grid */}
      <div
        className="w-full max-w-[1800px] grid grid-cols-1 xl:grid-cols-[70%_30%] gap-0 border"
        style={{ borderColor: dividerColor }}
      >
        {/* Left Column: Author */}
        <div
          className="flex flex-col space-y-6 md:space-y-10 p-6 md:p-10 xl:border-r border-b xl:border-b-0"
          style={{ borderColor: dividerColor }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-light italic border-b pb-4 inline-block self-start w-full"
            style={{ fontFamily: "'Arapey', serif", borderColor: dividerColor }}
          >
            Author~
          </h2>

          {/* Full text on md+, truncated on mobile */}
          <p
            className="text-lg sm:text-2xl md:text-3xl xl:text-4xl leading-relaxed font-light line-clamp-4 sm:line-clamp-none"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            I'm a computer engineering graduate who enjoys building things that
            feel clear, intentional, and useful. I focus on front-end
            development, UI clarity, and the kind of small design details that
            make an interface feel natural. Reverie brings together a few
            projects I've built while learning how to design, structure, and
            ship complete features across mobile and web.
          </p>

          {/* Opens overlay on mobile */}
          <button
            onClick={() => setOverlayOpen(true)}
            className={`sm:hidden text-sm font-light opacity-50 hover:opacity-80 transition-opacity duration-200 -mt-2 text-left ${isDark ? "text-white" : "text-black"
              }`}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            ↓ read more
          </button>
        </div>

        {/* Right Column: Chapters — hidden on mobile */}
        <div className="hidden sm:flex flex-col space-y-6 md:space-y-10 p-6 md:p-10">
          <h2
            className="text-2xl sm:text-2xl md:text-4xl font-light italic border-b pb-4 inline-block self-start w-full"
            style={{ fontFamily: "'Arapey', serif", borderColor: dividerColor }}
          >
            Chapters~
          </h2>
          <nav className="flex flex-col space-y-4 md:space-y-6">
            {[
              { name: "Projects", href: "/#projects" },
              { name: "About", href: "/#about" },
              { name: "Contact", href: "/#contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative w-fit text-xl sm:text-2xl md:text-3xl xl:text-4xl font-light transition-colors duration-200 hover:text-[#800020] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-[#800020] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

    </div>
  );
}
