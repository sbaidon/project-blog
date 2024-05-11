import path from "path";
import matter from "gray-matter";
import { Blog, Frontmatter } from "@/models/blogs";
import React from "react";
import { createReadStream } from "fs";
import { readdir } from "fs/promises";
import { Spans, tracer } from "./trace-helpers";

export const getBlogPostList = React.cache(
  async (locale = "en"): Promise<Blog[]> => {
    try {
      const fileNames = await readDirectory(`/content/${locale}`);

      const blogPosts: Blog[] = [];
      const filePromises = fileNames.map((fileName) =>
        readFile(`/content/${locale}/${fileName}`).then((file) => ({
          fileName,
          contents: file,
        }))
      );
      const files = await Promise.all(filePromises);

      for (let file of files) {
        const content = matter(file.contents);
        // TODO: Figure out how to type this correctly.
        const frontmatter = content.data as unknown as Frontmatter;

        blogPosts.push({
          slug: file.fileName.replace(".mdx", ""),
          ...frontmatter,
        });
      }

      return blogPosts.sort((p1, p2) =>
        p1.publishedOn < p2.publishedOn ? 1 : -1
      );
    } catch (error) {
      return [];
    }
  }
);

export const loadBlogPost = React.cache(
  async (
    locale,
    slug
  ): Promise<{ frontmatter: Frontmatter; content: string } | null> => {
    let rawContent;

    // Wrapping this operation in a try/catch so that it stops
    // throwing an error if the file can't be found. Instead,
    // we'll return `null`, and the caller can figure out how
    // to handle this situation.
    const span = tracer.startSpan(Spans.LoadBlogFile);
    try {
      rawContent = await readFile(`/content/${locale}/${slug}.mdx`);

      const { data, content } = matter(rawContent);

      const frontmatter = data as unknown as Frontmatter;

      return { frontmatter, content };
    } catch (err) {
      return null;
    } finally {
      span.end();
    }
  }
);

function readFile(localPath): Promise<string> {
  const stream = createReadStream(path.join(process.cwd(), localPath));
  const chunks = [];

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      chunks.push(Buffer.from(chunk));
    });

    stream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    stream.on("error", reject);
    stream.on("close", reject);
  });
}

function readDirectory(localPath) {
  return readdir(path.join(process.cwd(), localPath));
}
