import { createContext, useContext, useEffect, useState } from "react";

/*
  Create context
*/

const ThemeContext = createContext(null);

/*
  Theme Provider
*/

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  /*
    On first load:
    - check localStorage
    - fallback to system preference
  */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  /*
    Apply theme to <html>
    + persist it
  */

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  /*
    Toggle function
  */

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/*
  Custom hook
*/

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
