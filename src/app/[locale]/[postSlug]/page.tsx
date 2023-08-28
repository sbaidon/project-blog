import React from "react";

import BlogHero from "@/components/blog-hero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { TitleCard } from "@/components/card";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm"; // Tables, footnotes, strikethrough, task lists, literal URLs.

type Props = {
  params: {
    locale: string;
    postSlug: string;
  };
};

export function generateMetadata({ params }) {
  const post = loadBlogPost(params.locale, params.postSlug);

  if (!post) {
    return null;
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract,
  };
}

const components = {
  TitleCard: (props) => <TitleCard {...props} />,
};

/** Cannot be used until: https://github.com/vercel/next.js/issues/45979 is fixed.
export async function generateStaticParams() {
  const posts = await getBlogPostList();
  return posts.map(post => ({
      params: {
        slug: post.slug
      }
    }))
}
 * 
 */

async function BlogPost({ params }: Props) {
  const post = loadBlogPost(params.locale, params.postSlug);

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
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
