"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";

// Icons for each nav link
const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: (
      // Home icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    name: "Projects",
    href: "/#projects",
    icon: (
      // Grid / folder icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
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
    <>
      <nav className={`sticky top-0 left-0 w-full flex justify-between items-center px-6 py-3 z-10000 transition-colors duration-300 ${isDark ? "bg-black/50 backdrop-blur-md" : "bg-white/50 backdrop-blur-md"}`}>
        {/* Left: Compass logo (Mobile: Left, Desktop: Right - swapped logic) */}
        <div className="pointer-events-auto md:order-3">
          <Image
            src={isDark ? "images/Frame 2.svg" : "images/Frame 2black.svg"}
            alt="Compass"
            width={40}
            height={40}
            className={`w-10 h-10 transition-opacity duration-300 ${isDark ? "opacity-80" : "opacity-100"}`}
          />
        </div>

        {/* Right: Theme toggle (Mobile: Right, Desktop: Left) */}
        <button
          onClick={toggleTheme}
          className={`pointer-events-auto p-2 rounded-full transition-all duration-300 ${iconColor} md:order-1`}
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

        {/* Middle spacer for desktop to maintain layout if needed, but flex justify-between handles it */}
        <div className="hidden md:block md:order-2"></div>
      </nav>

      {/* Bottom Navigation (Mobile only) */}
      <div className={`fixed bottom-0 left-0 w-full md:hidden flex justify-around items-center py-4 px-6 z-10000 border-t ${isDark ? "bg-black/80 border-white/10" : "bg-white/80 border-black/10"} backdrop-blur-lg`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            aria-label={link.name}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 ${iconColor}`}
          >
            {link.icon}
            <span className="text-[10px] uppercase tracking-widest">{link.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}