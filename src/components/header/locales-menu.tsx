"use client";

import { LOCALES } from "@/constants";
import Link from "next-intl/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import styles from "./header.module.css";
import { Globe } from "react-feather";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import clsx from "clsx";
import { useId, useState } from "react";

type Props = {
  locales: typeof LOCALES;
};

export default function LocalesMenu({ locales }: Props) {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations("index");
  const [active, setActive] = useState(false);
  const id = useId();

  return (
    <LayoutGroup>
      <div
        className={styles["language-dropdown"]}
        onMouseLeave={() => setActive(false)}
        onMouseEnter={() => setActive(true)}
      >
        <button className={clsx(styles.action)}>
          <Globe size="1.5rem" />
        </button>
        <AnimatePresence>
          {active && (
            <motion.ul
              key={`menu-${id}`}
              className={clsx(styles["language-menu"])}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.1 },
              }}
            >
              {locales.map((locale) => (
                <li
                  key={locale}
                  className={locale === activeLocale ? styles.active : ""}
                >
                  <Link locale={locale} href={pathname}>
                    {t(locale)}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
