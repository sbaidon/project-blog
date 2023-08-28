import React from "react";

import BlogSummaryCard from "@/components/blog-summary-card";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import { useLocale, useTranslations } from "next-intl";

function Home() {
  const locale = useLocale();
  const blogs = getBlogPostList(locale);
  const t = useTranslations("index");

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>{t("posts")}</h1>
      {blogs.map((blog) => (
        <BlogSummaryCard {...blog} key={blog.slug} />
      ))}
    </div>
  );
}

export default Home;
