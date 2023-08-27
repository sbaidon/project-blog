import React from "react";

import BlogSummaryCard from "@/components/blog-summary-card";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import { useTranslations } from "next-intl";

function Home() {
  const blogs = getBlogPostList();
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
