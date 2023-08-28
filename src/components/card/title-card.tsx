import React, { ReactElement } from "react";
import clsx from "clsx";
import { Twitter, GitHub, Linkedin, Mail } from "react-feather";

import styles from "./card.module.css";
import { DelegatedProps } from "@/utility-types";

const icons: Record<Link["type"], ReactElement> = {
  github: <GitHub />,
  linkedin: <Linkedin />,
  twitter: <Twitter />,
};

type Link = {
  type: "linkedin" | "github" | "twitter";
  href: string;
};

type Props = DelegatedProps<{
  title: string;
  location: string;
  className?: string;
  email: string;
  links: Link[];
}>;

export function TitleCard({
  className,
  title,
  location,
  links,
  email,
  ...delegated
}: Props) {
  return (
    <article
      className={clsx(styles["title-card-wrapper"], className)}
      {...delegated}
    >
      <section className={styles["title-card-main"]}>
        <h2>{title}</h2>
        <p>{location}</p>
      </section>
      <div className={styles["title-card-body"]}>
        <a href={`mailto: ${email}`}>
          <Mail />
          <span>{email}</span>
        </a>
        <ul className={styles["title-card-links"]}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer noopener">
                {icons[link.type]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
