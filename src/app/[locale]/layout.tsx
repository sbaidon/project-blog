import { notFound } from "next/navigation";
import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import MotionConfig from "@/components/motion-config";
import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  BLOG_TITLE,
  BLOG_DESCRIPTION,
} from "@/constants";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { useLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";

import "./styles.css";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

export default async function LocaleLayout({ children, params }) {
  const theme = cookies().get("theme")?.value ?? "light";
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <MotionConfig>
      <html
        lang={locale}
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        /* @ts-ignore */
        style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header theme={theme} />
            <main>{children}</main>
            <Footer />
            <Analytics />
          </NextIntlClientProvider>
        </body>
      </html>
    </MotionConfig>
  );
}
