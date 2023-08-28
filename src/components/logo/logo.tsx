import React from "react";
import Link from "next-intl/link";

import styles from "./Logo.module.css";
import { useTranslations } from "next-intl";

type Props = {
  mobileAlignment?: "center" | "left" | "right";
};

function Logo({ mobileAlignment = "left" }: Props) {
  const t = useTranslations("index");

  return (
    <Link
      href="/"
      className={styles.wrapper}
      data-mobile-alignment={mobileAlignment}
    >
      {t("blog-title")}
    </Link>
  );
}

export default Logo;
