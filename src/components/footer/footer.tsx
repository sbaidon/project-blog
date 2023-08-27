import React from "react";
import Link from "next/link";

import Logo from "@/components/logo";
import {useTranslations} from 'next-intl';

import DecorativeSwoops from "./decorative-swoops";
import styles from "./footer.module.css";

function Footer() {
  const t = useTranslations('Index');

  return (
    <div className={styles.wrapper}>
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
            Sergio Baidon
          </p>
        </div>
        <nav>
          <h2 className={styles.linkHeading}>Links</h2>
          <ul className={styles.linkList}>
            <li>
              <Link href="/rss.xml">{t("rss")}</Link>
            </li>
            <li>
              <Link href="/todo">{t("terms-of-use")}</Link>
            </li>
            <li>
              <Link href="/todo">{t("privacy-policy")}</Link>
            </li>
            <li>
              <a href="https://twitter.com/sbaidon">Twitter</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
