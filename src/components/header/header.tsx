import React from "react";
import clsx from "clsx";
import { Rss } from "react-feather";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

import Logo from "@/components/logo";
import VisuallyHidden from "@/components/visually-hidden";
import Toggle from "./theme-toggle";

import styles from "./header.module.css";
import { DelegatedProps } from "@/utility-types";
import { LOCALES } from "@/constants";
import LocalesMenu from "./locales-menu";

type Props = DelegatedProps<{
  theme: "light" | "dark" | string;
  className?: string;
}>;

function Header({ theme, className, ...delegated }: Props) {
  const t = useTranslations("Index");

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
          <VisuallyHidden>{t("rss")}</VisuallyHidden>
        </Link>
        <Toggle initialTheme={theme} />
        <LocalesMenu locales={LOCALES} />
      </div>
    </header>
  );
}

export default Header;
