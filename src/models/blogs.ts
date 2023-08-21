export type Blog = {
  slug: string;
  title: string;
  abstract: string;
  publishedOn: string;
};

export type Frontmatter = Omit<Blog, "slug">;
