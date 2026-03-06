"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const iconColor = isDark
    ? "text-white hover:text-gray-300"
    : "text-black hover:text-gray-600";

  const dividerStyle = {
    borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex justify-between items-start md:items-center px-6 py-4 z-10000 transition-all duration-300 ${isDark ? "bg-black/20" : "bg-white/20"} backdrop-blur-sm shadow-sm md:shadow-none`}>
        {/* Left: Logo */}
        <div className="md:order-3 pt-1 md:pt-0">
          <Image
            src={isDark ? "images/Frame 2.svg" : "images/Frame 2black.svg"}
            alt="Compass"
            width={40}
            height={40}
            className={`w-8 h-8 md:w-10 md:h-10 transition-opacity duration-300 ${isDark ? "opacity-80" : "opacity-100"}`}
          />
        </div>

        {/* Right: Controls Container */}
        <div className="flex flex-col items-end gap-4 md:order-1">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-1 rounded-full transition-all duration-300 ${iconColor}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation (Center/Right) */}
        <div className="hidden md:flex md:order-2">
          {/* Add desktop nav if needed here, but keeping it flexible */}
        </div>
      </nav>

      {/* Separate Hamburger Menu Button Container (Mobile only) */}
      <div className="fixed top-20 right-6 md:hidden z-[101]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-1 transition-all duration-300 ${iconColor}`}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-6 items-end">
            <span className={`h-[1px] bg-current transition-all duration-300 ${isMenuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`} />
            <span className={`h-[1px] bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-4"}`} />
            <span className={`h-[1px] bg-current transition-all duration-300 ${isMenuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
          </div>
        </button>
      </div>

      {/* Mobile Glassmorphism Menu */}
      <div
        className={`fixed top-32 right-6 w-48 z-[90] md:hidden transition-all duration-500 ease-in-out transform ${isMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className={`
          p-2 border backdrop-blur-xl rounded-sm
          ${isDark ? "bg-black/40 border-white/10" : "bg-white/40 border-black/10"}
          shadow-2xl overflow-hidden
        `}>
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-4 transition-all duration-300 group ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
              >
                <span className={`text-xs uppercase tracking-[0.2em] font-light ${isDark ? "text-white/70 group-hover:text-white" : "text-black/70 group-hover:text-black"}`} style={{ fontFamily: "'Arapey', serif" }}>
                  {link.name}
                </span>
                <span className="opacity-20 group-hover:opacity-100 transition-opacity">
                  {link.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop for closing menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[80] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}