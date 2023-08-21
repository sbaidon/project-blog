import React from "react";

import Slider from "@/components/slider";
import styles from "./slider-control.module.css";
import { DelegatedProps } from "@/utility-types";

type Props = DelegatedProps<{
  label: string;
  value: number;
}>;

function SliderControl({ label, value, ...delegated }: Props) {
  const id = React.useId();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <span className={styles.value}>{value}</span>
      </div>
      <Slider {...delegated} value={value} id={id} />
    </div>
  );
}

export default SliderControl;
