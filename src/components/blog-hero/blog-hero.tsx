import React from "react";
import clsx from "clsx";

import styles from "./blog-hero.module.css";
import { DelegatedProps } from "@/utility-types";
import { Blog } from "@/models/blogs";
import { useFormatter, useTranslations } from "next-intl";

type Props = DelegatedProps<
  Pick<Blog, "publishedOn" | "title"> & {
    className?: string;
  }
>;

function BlogHero({ title, publishedOn, className, ...delegated }: Props) {
  const humanizedDate = new Date(publishedOn);
  const formatter = useFormatter();
  const t = useTranslations("index");

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>
          {t("published-on")}&nbsp;
          <time dateTime={publishedOn}>
            {formatter.dateTime(humanizedDate, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </p>
      </div>
    </header>
  );
}

export default BlogHero;
