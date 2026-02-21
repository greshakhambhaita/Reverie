"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";

// Icons for each nav link
const navLinks = [
  {
    name: "Projects",
    href: "/#projects",
    icon: (
      // Grid / folder icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
    ),
  },
  {
    name: "About",
    href: "/#about",
    icon: (
      // Person icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: "Contact",
    href: "/#contact",
    icon: (
      // Envelope icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const iconColor = isDark
    ? "text-white hover:text-gray-300"
    : "text-black hover:text-gray-600";

  return (
    <nav className={`sticky top-0 left-0 w-full flex justify-between items-center px-6 py-3 z-10000 transition-colors duration-300 ${isDark ? "bg-black/50 backdrop-blur-md" : "bg-white/50 backdrop-blur-md"}`}>
      {/* Left: Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`pointer-events-auto p-2 rounded-full transition-all duration-300 ${iconColor}`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      {/* Center (mobile only): Nav link icons — hidden on md+ where chapters column handles this */}
      <div className="flex md:hidden items-center gap-5 pointer-events-auto">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            aria-label={link.name}
            className={`transition-colors duration-200 ${iconColor}`}
          >
            {link.icon}
          </Link>
        ))}
      </div>

      {/* Right: Compass logo */}
      <div className="pointer-events-auto">
        <Image
          src={isDark ? "images/Frame 2.svg" : "images/Frame 2black.svg"}
          alt="Compass"
          width={40}
          height={40}
          className={`w-10 h-10 transition-opacity duration-300 ${isDark ? "opacity-80" : "opacity-100"}`}
        />
      </div>
    </nav>
  );
}