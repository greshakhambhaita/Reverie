"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useInView } from "framer-motion";
import { FileText, Github, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import rough from "roughjs";
import ResumeModal from "./ResumeModal";

// Draws a rough ellipse and returns an array of SVG path descriptors
function getRoughEllipsePaths(
  cx: number,
  cy: number,
  w: number,
  h: number,
  isDark: boolean
) {
  const gen = rough.generator();
  const shape = gen.ellipse(cx, cy, w, h, {
    roughness: 2.2,
    strokeWidth: 1.4,
    stroke: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
    fill: "none",
    seed: 42,
  });
  return gen.toPaths(shape);
}

function RoughCircle({
  targetRef,
  containerRef,
  isDark,
  trigger,
}: {
  targetRef: React.RefObject<HTMLSpanElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isDark: boolean;
  trigger: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathData, setPathData] = useState<{ d: string; stroke: string }[]>([]);
  const [svgBox, setSvgBox] = useState({ w: 0, h: 0 });
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setDrawn(false);
      setPathData([]);
      return;
    }

    if (!targetRef.current || !containerRef.current) return;

    const spanRect = targetRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const padX = 40;
    const padY = 10;
    const cx = spanRect.left - containerRect.left + spanRect.width / 2;
    const cy = spanRect.top - containerRect.top + spanRect.height / 2;
    const w = spanRect.width + padX * 2;
    const h = spanRect.height + padY * 2;

    const paths = getRoughEllipsePaths(cx, cy, w, h, isDark);
    setPathData(
      paths.map((p) => ({ d: p.d, stroke: p.stroke ?? (isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)") }))
    );
    setSvgBox({ w: containerRect.width, h: containerRect.height });

    // Small delay so the SVG path is in the DOM before we animate
    const t = setTimeout(() => setDrawn(true), 80);
    return () => clearTimeout(t);
  }, [trigger, isDark]);

  if (!pathData.length) return null;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: svgBox.w,
        height: svgBox.h,
        pointerEvents: "none",
        overflow: "visible",
      }}
      aria-hidden="true"
    >
      {pathData.map((p, i) => (
        <AnimatedPath key={i} d={p.d} stroke={p.stroke} animate={drawn} />
      ))}
    </svg>
  );
}

function AnimatedPath({
  d,
  stroke,
  animate,
}: {
  d: string;
  stroke: string;
  animate: boolean;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      setLen(ref.current.getTotalLength());
    }
  }, [d]);

  const dashStyle =
    len !== null
      ? {
        strokeDasharray: len,
        strokeDashoffset: animate ? 0 : len,
        transition: animate
          ? "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)"
          : "none",
      }
      : { opacity: 0 };

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={0.8}
      strokeLinecap="round"
      style={dashStyle}
    />
  );
}

export default function ReverieHero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const gradTextRef = useRef<HTMLSpanElement>(null);
  const paragraphContainerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(paragraphContainerRef, {
    amount: 0.2, // Trigger when 20% is in view, instead of "all"
  });

  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";


  useEffect(() => {
    setIsMounted(true);

    // Check for medium screen or larger (min-width: 768px)
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
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
      className={`min-h-0 sm:min-h-[95vh] md:min-h-screen flex flex-col items-center justify-start px-6 md:px-12 lg:px-24 pt-40 md:pt-16 pb-4 md:pb-12 transition-colors duration-300 ${isDark ? "text-white" : "text-black"
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
                I’m a <span ref={gradTextRef}> full-stack developer</span> designing and shipping <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>end-to-end</span> software systems. I focus on{" "}
                <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>front-end development</span>,{" "}
                <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>UI clarity</span>,{" "}
                and the structural decisions that make complex interfaces feel simple. Reverie highlights projects where I’ve built and delivered{" "}
                <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>complete features across web and mobile</span>.
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
        <div className="flex flex-col md:flex-row items-center md:items-baseline justify-center gap-2 md:gap-6">
          <h2
            className="text-xl md:text-xl lg:text-3xl font-light tracking-wide uppercase"
            style={{ fontFamily: "'Arapey', serif" }}
          >
            Gresha Khambhaita~
          </h2>
          <h2
            className="text-xl md:text-xl lg:text-3xl font-light tracking-widest uppercase italic"
            style={{ fontFamily: "'Arapey', serif" }}
          >
            Full-Stack Developer
          </h2>
        </div>
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

          {/* Paragraph with rough-circle target — relative container for SVG overlay */}
          <div ref={paragraphContainerRef} style={{ position: "relative" }}>
            <p
              className="text-lg sm:text-2xl md:text-3xl xl:text-4xl leading-relaxed font-light line-clamp-4 sm:line-clamp-none"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              I’m a<span ref={gradTextRef}> full-stack developer</span> designing and shipping <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>end-to-end</span> software systems. I focus on{" "}
              <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>front-end development</span>,{" "}
              <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>UI clarity</span>,{" "}
              and the structural decisions that make complex interfaces feel simple. Reverie highlights projects where I’ve built and delivered{" "}
              <span className={`px-1.5 py-0.5 rounded-sm ${isDark ? "bg-white/10" : "bg-black/10"}`}>complete features across web and mobile</span>.
            </p>

            {/* Rough circle SVG overlay - Only on large screens */}
            {isMounted && isLargeScreen && (
              <RoughCircle
                targetRef={gradTextRef}
                containerRef={paragraphContainerRef}
                isDark={isDark}
                trigger={isInView}
              />
            )}
          </div>

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

        {/* Right Column: Connect — hidden on mobile */}
        <div className="hidden md:flex flex-col space-y-6 md:space-y-10 p-6 md:p-10">
          <h2
            className="text-2xl sm:text-2xl md:text-4xl font-light italic border-b pb-4 inline-block self-start w-full"
            style={{ fontFamily: "'Arapey', serif", borderColor: dividerColor }}
          >
            Connect~
          </h2>
          <nav className="flex flex-col space-y-4 md:space-y-6">
            <Link
              href="/#contact"
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-light opacity-70 hover:opacity-100 transition-opacity flex items-center gap-3 w-fit"
              style={{ fontFamily: "'Arapey', serif" }}
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />
              <span>[Hire me]</span>
            </Link>
            <button
              onClick={() => setResumeOpen(true)}
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-light opacity-70 hover:opacity-100 transition-opacity flex items-center gap-3 w-fit"
              style={{ fontFamily: "'Arapey', serif" }}
            >
              <FileText className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />
              <span>[Open Resume]</span>
            </button>
            <a
              href="https://github.com/greshakhambhaita"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-light opacity-70 hover:opacity-100 transition-opacity flex items-center gap-3 w-fit"
              style={{ fontFamily: "'Arapey', serif" }}
            >
              <Github className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />
              <span>[Open GitHub]</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Connect Panel (Hidden on md and up) */}
      <div className="md:hidden w-full mt-12 flex flex-col px-2">
        <h2
          className="text-3xl font-light italic border-b pb-4 w-full"
          style={{ fontFamily: "'Arapey', serif", borderColor: dividerColor }}
        >
          Connect~
        </h2>
        <nav className="flex flex-col mt-4">
          <Link
            href="/#contact"
            className={`w-full flex items-center gap-3 py-3 px-4 font-light text-xl transition-colors duration-200 border-b ${isDark ? "hover:bg-white hover:text-black border-white/10" : "hover:bg-black hover:text-white border-black/10"}`}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Mail className="w-5 h-5 opacity-70" />
            <span>Hire me</span>
          </Link>
          <button
            onClick={() => setResumeOpen(true)}
            className={`w-full flex items-center gap-3 py-3 px-4 font-light text-xl transition-colors duration-200 border-b text-left ${isDark ? "hover:bg-white hover:text-black border-white/10" : "hover:bg-black hover:text-white border-black/10"}`}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <FileText className="w-5 h-5 opacity-70" />
            <span>Open Resume</span>
          </button>
          <a
            href="https://github.com/greshakhambhaita"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center gap-3 py-3 px-4 font-light text-xl transition-colors duration-200 ${isDark ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"}`}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <Github className="w-5 h-5 opacity-70" />
            <span>Open GitHub</span>
          </a>
        </nav>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}