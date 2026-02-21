import ThemeWrapper from "@/components/ThemeWrapper";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gresha Khambaita - Portfolio",
  description: "Designer, developer, problem solver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Arapey:ital@0;1&family=Italiana&family=Inter:wght@100;300;400&family=Source+Sans+3:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeWrapper>
          {/* Grid Borders */}
          <div className="fixed top-8 md:top-12 lg:top-16 left-0 right-0 h-px bg-zinc-600 dark:bg-zinc-600 z-9999 pointer-events-none hidden lg:block opacity-40" />
          <div className="fixed left-12 md:left-12 lg:left-16 top-0 bottom-0 w-px bg-zinc-600 dark:bg-zinc-600 z-9999 pointer-events-none hidden lg:block opacity-40" />
          <div className="fixed right-12 md:right-12 lg:right-16 top-0 bottom-0 w-px bg-zinc-600 dark:bg-zinc-600 z-9999 pointer-events-none hidden lg:block opacity-40" />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
