"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem("theme") === "dark";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-auto rounded-full px-4 py-2 bg-border text-sm font-medium text-foreground shadow transition hover:bg-foreground hover:text-background"
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
