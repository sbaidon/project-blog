import React from "react";
import Link from "next/link";

import Logo from "@/components/logo";
import { useTranslations } from "next-intl";

import DecorativeSwoops from "./decorative-swoops";
import styles from "./footer.module.css";

function Footer() {
  const t = useTranslations("index");

  return (
    <footer className={styles.wrapper}>
      <DecorativeSwoops />
      <div className={styles.content}>
        <div>
          <Logo mobileAlignment="center" />
          {/*
            NOTE: If you'd like to build your blog on top
            of this code, the license requires that you leave
            this paragraph untouched. Check out LICENSE.md
            for more information.
          */}
          <p className={styles.attribution}>
            Blog template created by{" "}
            <a href="https://www.joshwcomeau.com/">Josh W. Comeau</a>. Check out{" "}
            <a href="https://www.joyofreact.com/">The Joy of React</a> to learn
            how to build dynamic React apps like this one!
          </p>
        </div>
        <nav>
          <h2 className={styles.linkHeading}>Links</h2>
          <ul className={styles.linkList}>
            <li>
              <Link href="/rss.xml">{t("rss")}</Link>
            </li>
            <li>
              <a href="https://twitter.com/sbaidon">Twitter</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
