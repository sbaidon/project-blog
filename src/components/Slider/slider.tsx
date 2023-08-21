import React from "react";
import clsx from "clsx";

import styles from "./Slider.module.css";
import { DelegatedProps } from "@/utility-types";

type Props = DelegatedProps<{
  className?: string;
}>;

function Slider({ className, ...delegated }: Props) {
  return (
    <input
      type="range"
      className={clsx(styles.slider, className)}
      {...delegated}
    />
  );
}

export default Slider;
