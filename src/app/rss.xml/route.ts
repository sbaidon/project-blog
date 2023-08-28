import RSS from "rss";

import { DOMAIN, LOCALES } from "@/constants";
import { headers } from 'next/headers'
import { getMessages } from "@/helpers/file-helpers";
import { createTranslator } from "next-intl";

import { getBlogPostList } from "@/helpers/file-helpers";

const LOCALES_SET = new Set(LOCALES);

export async function GET() {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language')
  // Default to english
  let locale = "en";

  if (LOCALES_SET.has(acceptLanguage)) {
    locale = acceptLanguage;
  }

  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });

  const rss = {
    title: t("index.blog-title"),
    description: t("index.blog-description"),
  };

  const feed = new RSS(rss);

  const blogPosts = getBlogPostList();

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
