import React from "react";
import clsx from "clsx";
import { Rss } from "react-feather";
import Link from "next/link";

import Logo from "@/components/logo";
import VisuallyHidden from "@/components/visually-hidden";
import Toggle from "./theme-toggle";

import styles from "./Header.module.css";

function Header({ theme, className, ...delegated }) {
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link href="/rss.xml" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <Toggle initialTheme={theme} />
      </div>
    </header>
  );
}

export default Header;
