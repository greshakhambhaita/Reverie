"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const tabs = [
  { name: "Home", href: "/#", sectionId: "hero" },
  { name: "Projects", href: "/#projects", sectionId: "projects" },
  { name: "About", href: "/#about", sectionId: "about" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function SideNav() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track which section is in view
  useEffect(() => {
    const sectionIds = ["hero", "projects", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    const visibleRatios = new Map<string, number>();

    const updateActiveSection = () => {
      let maxRatio = 0;
      let mostVisible = "hero";

      sectionIds.forEach((id) => {
        const ratio = visibleRatios.get(id) || 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisible = id;
        }
      });

      const idx = sectionIds.indexOf(mostVisible);
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    };

    sectionIds.forEach((id) => {
      const el = id === "hero" ? document.querySelector("h1")?.parentElement?.parentElement : document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleRatios.set(id, entry.intersectionRatio);
          updateActiveSection();
        },
        {
          // Use multiple thresholds to get more frequent ratio updates
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!isMounted) return null;

  const strokeColor = isDark ? "#a1a1aa" : "#333333";
  const textColor = isDark ? "text-zinc-300" : "text-zinc-800";
  const activeTextColor = isDark ? "text-white" : "text-black";
  const bgColor = isDark ? "#000000" : "#ffffff";

  // SVG dimensions for vertical layout (right side)
  const W = 80;
  const H = 800; // Represents the relative height proportions
  const restLeftX = 40; // The resting tab starts at x=40
  const activeLeftX = 30; // The active tab comes out further to x=20 (was 30)
  const notchX = W - 6; // base line is on the right
  const r = 10;
  const startY = 100; // brought down by 40px
  const tabH = 175;  // reduced from 160
  const slopeRatio = 0.45;

  const buildTabPath = (active: number) => {
    const parts: string[] = [];

    parts.push(`M ${notchX},0`);
    parts.push(`L ${notchX},${startY}`);

    for (let i = 0; i < tabs.length; i++) {
      const top = startY + i * tabH;
      const bottom = top + tabH;
      const leftX = i === active ? activeLeftX : restLeftX;

      const dx = notchX - leftX;
      const dy = dx * slopeRatio;

      const hyp = Math.sqrt(dx * dx + dy * dy);
      const rx = dx * (r / hyp);
      const ry = dy * (r / hyp);

      // top slope
      parts.push(`L ${leftX + rx},${top + dy - ry}`);
      parts.push(`Q ${leftX},${top + dy} ${leftX},${top + dy + r}`);

      // vertical flat edge
      parts.push(`L ${leftX},${bottom - dy - r}`);

      // bottom slope
      parts.push(`Q ${leftX},${bottom - dy} ${leftX + rx},${bottom - dy + ry}`);
      parts.push(`L ${notchX},${bottom}`);
    }

    parts.push(`L ${notchX},${H}`);
    return parts.join(" ");
  };

  const tabPath = buildTabPath(activeIndex);

  return (
    <nav
      className="fixed right-0 top-0 bottom-0 z-10000 pointer-events-none hidden md:flex flex-col items-end justify-center"
      style={{ fontFamily: "'Italiana', serif" }}
    >
      <div className="pointer-events-auto mt-auto mb-auto relative mr-0" style={{ height: "min(800px, 85vh)", width: "80px" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full block"
          style={{ width: "80px" }}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background fill */}
          <path
            d={`${tabPath} L ${W},${H} L ${W},0 Z`}
            fill={bgColor}
          />
          {/* Tab outline */}
          <path
            d={`${tabPath} L ${W},${H} L ${W},0 Z`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ transition: "d 0.3s ease" }}
          />
        </svg>

        {/* Tab labels */}
        <div className="absolute inset-0">
          {tabs.map((tab, i) => {
            const isActive = i === activeIndex;
            const leftX = isActive ? activeLeftX : restLeftX;

            return (
              <div
                key={tab.name}
                className="absolute flex items-center justify-center pointer-events-none transition-all duration-300"
                style={{
                  top: `${(startY + i * tabH) / H * 100}%`,
                  height: `${tabH / H * 100}%`,
                  left: `${(leftX / W) * 100}%`,
                  width: `${((notchX - leftX) / W) * 100}%`,
                }}
              >
                <Link
                  href={tab.href}
                  className={`flex items-center justify-center transition-opacity duration-300 ${isActive ? activeTextColor : textColor} hover:opacity-60 pointer-events-auto`}
                  style={{
                    fontFamily: "'Arapey', serif",
                    fontSize: "clamp(16px, 2.2vh, 22px)",
                    letterSpacing: "0.03em",
                    transform: "rotate(90deg)",
                    whiteSpace: "nowrap"
                  }}
                >
                  {tab.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
