"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import rough from "roughjs";

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
          ? "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)"
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
  const [isMounted, setIsMounted] = useState(false);
  const [circleReady, setCircleReady] = useState(false);

  const gradTextRef = useRef<HTMLSpanElement>(null);
  const paragraphContainerRef = useRef<HTMLDivElement>(null);

  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const highlightClass = isDark ? "bg-white/15 text-white" : "bg-black/5 text-black";

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
                onMouseEnter={() => setCircleReady(true)}
                onMouseLeave={() => setCircleReady(false)}
              >
                <span ref={gradTextRef}>I'm a computer engineering graduate</span> who{" "}
                <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>enjoys building things</span> that
                feel clear, intentional, and useful. I focus on <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>front-end
                  development</span>, <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>UI clarity</span>, and the kind of small design details that
                make an interface feel natural. Reverie brings together a few
                projects I've built while learning how to design, structure, and
                <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>ship complete features across mobile and web</span>.
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

          {/* Paragraph with rough-circle target — relative container for SVG overlay */}
          <div ref={paragraphContainerRef} style={{ position: "relative" }}>
            <p
              className="text-lg sm:text-2xl md:text-3xl xl:text-4xl leading-relaxed font-light line-clamp-4 sm:line-clamp-none"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              onMouseEnter={() => setCircleReady(true)}
              onMouseLeave={() => setCircleReady(false)}
            >
              <span ref={gradTextRef}>I'm a computer engineering graduate</span> who{" "}
              <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>enjoys building things</span> that
              feel clear, intentional, and useful. I focus on{" "}
              <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>front-end
                development</span>,{" "}
              <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>UI clarity</span>, and the kind of small design details that
              make an interface feel natural. Reverie brings together a few
              projects I've built while learning how to design, structure, and{" "}
              <span className={`${highlightClass} px-1.5 py-0.5 rounded-sm`}>ship complete features across mobile and web</span>.
            </p>

            {/* Rough circle SVG overlay */}
            {isMounted && (
              <RoughCircle
                targetRef={gradTextRef}
                containerRef={paragraphContainerRef}
                isDark={isDark}
                trigger={circleReady}
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
                className="relative w-fit text-xl sm:text-2xl md:text-3xl xl:text-4xl font-light transition-colors duration-200 hover:text-[#000000] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-[#000000] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
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