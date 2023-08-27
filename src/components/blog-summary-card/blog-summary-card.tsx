import React from "react";
import Link from "next-intl/link";
import { format } from "date-fns";

import Card from "@/components/card";

import styles from "./blog-summary-card.module.css";
import { Blog } from "@/models/blogs";
import { useTranslations } from "next-intl";

type Props = Blog;

function BlogSummaryCard({ slug, title, publishedOn, abstract }: Props) {
  const href = `/${slug}`;
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");
  const t = useTranslations("index");

  return (
    <Card className={styles.wrapper}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={publishedOn}>{humanizedDate}</time>
      <p>
        {abstract}{" "}
        <Link href={href} className={styles.continueReadingLink}>
          {t("continue-reading")}
          <span className={styles.arrow}>→</span>
        </Link>
      </p>
    </Card>
  );
}

export default BlogSummaryCard;
