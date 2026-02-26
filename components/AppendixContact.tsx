"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import { useState } from "react";

export default function AppendixContact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dividerColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

  // Form State
  const [formData, setFormData] = useState({
    filedBy: "",
    returnAddress: "",
    statement: "",
  });

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [archiveRef, setArchiveRef] = useState("RV-APP-IV-2026");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.filedBy || !formData.returnAddress || !formData.statement) {
      setStatus("error");
      setMessage("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Correspondence received.");
        setArchiveRef(data.archiveRef);
        setFormData({ filedBy: "", returnAddress: "", statement: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to submit.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { label: "Email", value: "greshakhambhaita@gmail.com", href: "mailto:greshakhambhaita@gmail.com" },
    { label: "GitHub", value: "github.com/reykhambhaita", href: "https://github.com/reykhambhaita" },
    { label: "LinkedIn", value: "linkedin.com/in/gresha-khambhaita", href: "https://linkedin.com/in/gresha-khambhaita" },
    { label: "Cal.com", value: "cal.com/gresha-khambhaita", href: "https://cal.com/gresha-khambhaita" },
    { label: "Location", value: "Available for remote work", href: "#" },
  ];

  return (
    <section
      id="contact"
      className={`min-h-screen py-24 md:py-15 flex flex-col items-center px-6 md:px-12 lg:px-24 transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="w-full max-w-[1800px] flex flex-col relative">

        {/* 1. Header Block (Centered, Sparse) */}
        <div className="flex flex-col items-start justify-start mb-10 md:mb-18">
          <h2
            className="text-5xl md:text-7xl lg:text-[110px] font-normal tracking-tight leading-none"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            Appendix IV
          </h2>
          <p
            className="text-xl md:text-2xl lg:text-3xl font-light italic mt-4 md:mt-6 opacity-80 ml-10"
            style={{ fontFamily: "'Arapey', serif" }}
          >
            On Professional Correspondence
          </p>
          <div
            className="w-full md:w-3/4 max-w-2xl h-px mt-6 md:mt-14"
            style={{ backgroundColor: dividerColor }}
          />
        </div>

        {/* 2. Main Two-Column Spread */}
        <div
          className="grid grid-cols-1 xl:grid-cols-[7fr_5fr] gap-12 xl:gap-24 lg:border lg:p-12 xl:p-16"
          style={{ borderColor: dividerColor }}
        >

          {/* Left Column — Formal Text Block */}
          <div className="flex flex-col space-y-16 xl:pr-24 xl:border-r border-b xl:border-b-0 pb-16 xl:pb-0" style={{ borderColor: dividerColor }}>
            <p
              className="text-base sm:text-lg md:text-xl xl:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              For professional inquiries, collaborations, or technical discussion, correspondence may be directed through the channels listed below.
            </p>

            <div className="flex flex-col space-y-8 md:space-y-12">
              {contactLinks.map((link) => (
                <div key={link.label} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 group">
                  <span
                    className="text-xs md:text-sm tracking-[0.2em] uppercase opacity-50 w-24 shrink-0"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl md:text-2xl font-light relative w-fit transition-opacity hover:opacity-70 after:content-[''] after:absolute after:left-0 after:-bottom-1 md:after:-bottom-2 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                    style={{ fontFamily: "'Arapey', serif" }}
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Archive Panel */}
          <div className="relative flex flex-col justify-start">
            <div
              className="border p-8 md:p-12 lg:p-16 flex flex-col space-y-10 relative overflow-hidden"
              style={{ borderColor: dividerColor }}
            >

              {/* The Archive Stamp */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 opacity-[0.12] -rotate-12 pointer-events-none"
              >
                <Image
                  src={isDark ? "/images/Frame 2.svg" : "/images/Frame 2black.svg"}
                  alt="Archive Stamp"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Submission Status</span>
                  <span className="text-xl md:text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>
                    {status === "success" ? "Received & Archived" : "Open"}
                  </span>
                </div>


                <div className="flex flex-col space-y-1">
                  <span className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Preferred Topics</span>
                  <span className="text-xl md:text-2xl font-light italic" style={{ fontFamily: "'Arapey', serif" }}>Frontend architecture, UI systems, experimental interfaces</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Archive Code</span>
                  <span className="text-lg md:text-xl font-light" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{archiveRef}</span>
                </div>
              </div>

              <div className="pt-8 border-t" style={{ borderColor: dividerColor }}>
                <p
                  className="text-sm md:text-base font-light italic opacity-60"
                  style={{ fontFamily: "'Arapey', serif" }}
                >
                  All correspondence is reviewed and archived.
                </p>
              </div>

            </div>

            {/* Optional Contact Form / Submission Record */}
            <div className="mt-16 border-l pl-8 md:pl-12" style={{ borderColor: dividerColor }}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col">
                  <label className="text-xs tracking-widest uppercase opacity-50 mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Filed By:</label>
                  <input
                    type="text"
                    value={formData.filedBy}
                    onChange={(e) => setFormData({ ...formData, filedBy: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="border-b bg-transparent outline-none py-2 text-lg md:text-xl font-light focus:border-opacity-100 transition-colors"
                    style={{ borderColor: dividerColor, fontFamily: "'Arapey', serif" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs tracking-widest uppercase opacity-50 mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Return Address:</label>
                  <input
                    type="email"
                    value={formData.returnAddress}
                    onChange={(e) => setFormData({ ...formData, returnAddress: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="border-b bg-transparent outline-none py-2 text-lg md:text-xl font-light focus:border-opacity-100 transition-colors"
                    style={{ borderColor: dividerColor, fontFamily: "'Arapey', serif" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs tracking-widest uppercase opacity-50 mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Statement:</label>
                  <textarea
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="border-b bg-transparent outline-none py-2 text-lg md:text-xl font-light resize-none h-24 focus:border-opacity-100 transition-colors"
                    style={{ borderColor: dividerColor, fontFamily: "'Arapey', serif" }}
                  />
                </div>

                {status !== "idle" && (
                  <p className={`text-sm italic ${status === "success" ? "text-green-500" : "text-red-500"}`} style={{ fontFamily: "'Arapey', serif" }}>
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 text-xs tracking-widest uppercase transition-opacity ${isSubmitting ? "opacity-20" : "opacity-50 hover:opacity-100"}`}
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {isSubmitting ? "[ Processing... ]" : "[ Submit Record ]"}
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Small Details - Page Number */}
        <div className="absolute -bottom-8 md:-bottom-16 right-0 font-light opacity-40 text-sm md:text-base" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          143
        </div>

      </div>
    </section>
  );
}
