import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Blog, Frontmatter } from "@/models/blogs";
import React from "react";

export const getBlogPostList = React.cache(async (): Promise<Blog[]> => {
  try {
    const fileNames = await readDirectory("/content");

    const blogPosts: Blog[] = [];

    for (let fileName of fileNames) {
      const rawContent = await readFile(`/content/${fileName}`);

      const content = matter(rawContent);
      // TODO: Figure out how to type this correctly.
      const frontmatter = content.data as unknown as Frontmatter;

      blogPosts.push({
        slug: fileName.replace(".mdx", ""),
        ...frontmatter,
      });
    }

    return blogPosts.sort((p1, p2) =>
      p1.publishedOn < p2.publishedOn ? 1 : -1
    );
  } catch (error) {
    return [];
  }
});

export const loadBlogPost = React.cache(
  async (
    slug
  ): Promise<{ frontmatter: Frontmatter; content: string } | null> => {
    let rawContent;

    // Wrapping this operation in a try/catch so that it stops
    // throwing an error if the file can't be found. Instead,
    // we'll return `null`, and the caller can figure out how
    // to handle this situation.
    try {
      rawContent = await readFile(`/content/${slug}.mdx`);

      const { data, content } = matter(rawContent);

      const frontmatter = data as unknown as Frontmatter;

      return { frontmatter, content };
    } catch (err) {
      return null;
    }
  }
);

function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
