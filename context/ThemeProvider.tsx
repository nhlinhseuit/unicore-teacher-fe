"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  const setValue = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  const getValue = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  const handleThemeChange = () => {
    // if (typeof window !== "undefined") {
    //   const theme = getValue("theme");
    //   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    //   if (theme === "dark" || (!theme && prefersDark)) {
    //     setMode("dark");
    //     document.documentElement.classList.add("dark");
    //   } else {
    //     setMode("light");
    //     document.documentElement.classList.remove("dark");
    //   }
    // }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  } else {
    return context;
  }
}
