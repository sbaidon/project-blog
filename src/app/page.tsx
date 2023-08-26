import React from "react";

import BlogSummaryCard from "@/components/blog-summary-card";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";

async function Home() {
  const blogs = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content</h1>

      {blogs.map((blog) => (
        <BlogSummaryCard {...blog} key={blog.slug} />
      ))}
    </div>
  );
}

export default Home;
