import { notFound } from "next/navigation";
import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import MotionConfig from "@/components/motion-config";
import { LIGHT_TOKENS, DARK_TOKENS, LOCALES } from "@/constants";
import { createTranslator } from "next-intl";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { useLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ProgressBar from "@/components/progress-bar/progress-bar";

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

export async function generateMetadata({ params }) {
  const { locale } = params;

  if (!locale) {
    return notFound();
  }
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });

  return {
    title: t("index.blog-title"),
    description: t("index.blog-description"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const theme = cookies().get("theme")?.value ?? "light";
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      /* @ts-ignore */
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <ProgressBar />
        <MotionConfig>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header theme={theme} />
            <main>{children}</main>
            <Footer />
            <Analytics />
          </NextIntlClientProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
