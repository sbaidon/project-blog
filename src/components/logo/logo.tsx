import React from "react";
import Link from "next-intl/link";

import styles from "./Logo.module.css";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  mobileAlignment?: "center" | "left" | "right";
};

function Logo({ mobileAlignment = "left" }: Props) {
  const t = useTranslations("index");
  const locale = useLocale();
  return (
    <Link
      href="/"
      locale={locale}
      className={styles.wrapper}
      data-mobile-alignment={mobileAlignment}
    >
      {t("blog-title")}
    </Link>
  );
}

export default Logo;
