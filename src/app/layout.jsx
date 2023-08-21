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
import "./styles.css";
import { cookies } from "next/headers";

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

function RootLayout({ children }) {
  const theme = cookies().get("theme")?.value ?? "light";

  return (
    <MotionConfig>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header theme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </MotionConfig>
  );
}

export default RootLayout;
