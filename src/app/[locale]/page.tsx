import React from "react";

import BlogSummaryCard from "@/components/blog-summary-card";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import { useLocale, useTranslations } from "next-intl";

async function Home() {
  const locale = useLocale();
  const blogs = await getBlogPostList(locale);

  return (
    <div className={styles.wrapper}>
      <Title />
      {blogs.map((blog) => (
        <BlogSummaryCard {...blog} key={blog.slug} />
      ))}
    </div>
  );
}

function Title() {
  const t = useTranslations("index");

  return <h1 className={styles.mainHeading}>{t("posts")}</h1>;
}

export default Home;
