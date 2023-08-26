"use client";

import React from "react";
import { Sun, Moon } from "react-feather";
import Cookies from "js-cookie";
import VisuallyHidden from "@/components/visually-hidden";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";
import styles from "./header.module.css";

function Toggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";

    Cookies.set("theme", nextTheme);

    setTheme(nextTheme);

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button type="button" onClick={toggleTheme} className={styles.action}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default Toggle;
