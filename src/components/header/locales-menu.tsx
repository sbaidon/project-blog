"use client";

import { LOCALES } from "@/constants";
import Link from "next-intl/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import styles from "./header.module.css";
import { Globe } from "react-feather";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useId } from "react";

type Props = {
  locales: typeof LOCALES;
};

export default function LocalesMenu({ locales }: Props) {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const id = useId();
  const t = useTranslations("Index");

  return (
    <div className={styles["language-dropdown"]}>
      <button className={clsx(styles.action)}>
        <Globe size="1.5rem" />
      </button>
      <motion.ul className={clsx(styles["language-menu"])} layoutId={id}>
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
    </div>
  );
}
