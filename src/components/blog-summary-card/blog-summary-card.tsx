import React from "react";
import Link from "next/link";
import { format } from "date-fns";

import Card from "@/components/card";

import styles from "./blog-summary-card.module.css";
import { Blog } from "@/models/blogs";

type Props = Blog;

function BlogSummaryCard({ slug, title, publishedOn, abstract }: Props) {
  const href = `/${slug}`;
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");

  return (
    <Card className={styles.wrapper}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={publishedOn}>{humanizedDate}</time>
      <p>
        {abstract}{" "}
        <Link href={href} className={styles.continueReadingLink}>
          Continue reading <span className={styles.arrow}>→</span>
        </Link>
      </p>
    </Card>
  );
}

export default BlogSummaryCard;
