import React from "react";

import BlogHero from "@/components/blog-hero";

import styles from "./postSlug.module.css";
import { loadBlogPost, getBlogPostList } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeSnippet from "@/components/code-snippet/code-snippet";
import { notFound } from "next/navigation";

import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(
  () => import("@/components/division-groups-demo")
);
const CircularColorsDemo = dynamic(
  () => import("@/components/circular-colors-demo")
);

type Props = {
  params: {
    postSlug: string;
  };
};

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (!post) {
    return null;
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract,
  };
}

const components = {
  CodeSnippet: (props) => (
    <CodeSnippet {...props}>{props.children}</CodeSnippet>
  ),
  DivisionGroupsDemo: (props) => <DivisionGroupsDemo {...props} />,
  CircularColorsDemo: (props) => <CircularColorsDemo {...props} />,
};

export async function generateStaticParams() {
  const posts = await getBlogPostList();
  return posts.map(post => ({
      params: {
        slug: post.slug
      }
    }))
}

async function BlogPost({ params }: Props) {
  const post = await loadBlogPost(params.postSlug);

  if (!post) {
    notFound();
    return;
  }

  const { frontmatter, content } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
