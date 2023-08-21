import React, { ElementType, ReactNode } from "react";
import clsx from "clsx";
import { DelegatedProps } from "@/utility-types";

import styles from "./visually-hidden.module.css";

type Props = DelegatedProps<{
  as?: ElementType;
  className?: string;
  children: ReactNode;
}>;

function VisuallyHidden({
  as: Element = "span",
  className,
  children,
  ...delegated
}: Props) {
  return (
    <Element className={clsx(styles.wrapper, className)} {...delegated}>
      {children}
    </Element>
  );
}

export default VisuallyHidden;
