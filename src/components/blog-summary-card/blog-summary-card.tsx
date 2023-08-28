import React from "react";
import Link from "next-intl/link";

import Card from "@/components/card";

import styles from "./blog-summary-card.module.css";
import { Blog } from "@/models/blogs";
import { useFormatter, useTranslations } from "next-intl";

type Props = Blog;

function BlogSummaryCard({ slug, title, publishedOn, abstract }: Props) {
  const href = `/${slug}`;
  const format = useFormatter();
  const t = useTranslations("index");
  const humanizedDate = new Date(publishedOn);

  return (
    <Card className={styles.wrapper}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={publishedOn}>
        {format.dateTime(humanizedDate, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
      <p>
        {abstract}&nbsp;
        <Link href={href} className={styles.continueReadingLink}>
          {t("continue-reading")}
          <span className={styles.arrow}>→</span>
        </Link>
      </p>
    </Card>
  );
}

export default BlogSummaryCard;
