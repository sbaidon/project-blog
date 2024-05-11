import React from "react";
import clsx from "clsx";
import { Rss } from "react-feather";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

import Logo from "@/components/logo";
import VisuallyHidden from "@/components/visually-hidden";
import Toggle from "./theme-toggle";

import styles from "./header.module.css";
import { DelegatedProps } from "@/utility-types";
import { locales } from "@/navigation";
import LanguageMenu from "./language-menu";

type Props = DelegatedProps<{
  theme: "light" | "dark" | string;
  className?: string;
}>;

function Header({ theme, className, ...delegated }: Props) {
  const t = useTranslations("index");

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <NextLink href="/rss.xml" className={styles.action} prefetch={false}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>{t("rss")}</VisuallyHidden>
        </NextLink>
        <Toggle initialTheme={theme} />
        <LanguageMenu locales={locales} />
      </div>
    </header>
  );
}

export default Header;
