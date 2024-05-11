import RSS from "rss";

import { DOMAIN, LOCALES } from "@/constants";
import { headers } from "next/headers";
import { getBlogPostList } from "@/helpers/file-helpers";
import { getMessages } from "next-intl/server";
import { createTranslator } from "next-intl";

const LOCALES_SET = new Set(LOCALES);

export async function GET() {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  // Default to english
  let locale = "en";

  if (LOCALES_SET.has(acceptLanguage)) {
    locale = acceptLanguage;
  }

  const messages = await getMessages({
    locale,
  });
  const t = createTranslator({ locale, messages });

  const rss = {
    title: t("index.blog-title"),
    description: t("index.blog-description"),
  };

  const feed = new RSS(rss);

  const blogPosts = await getBlogPostList();

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `https://${DOMAIN}/${post.slug}`,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
