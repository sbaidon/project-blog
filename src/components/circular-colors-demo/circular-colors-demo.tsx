"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/card";
import VisuallyHidden from "@/components/visually-hidden";

import styles from "./circular-colors-demo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

type Status = "playing" | "stopped";

function CircularColorsDemo() {
  const id = React.useId();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [status, setStatus] = useState<Status>("stopped");

  React.useEffect(() => {
    if (status === "stopped") return;

    const id = setInterval(() => {
      setTimeElapsed((time) => time + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [status]);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={id}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {status === "playing" && (
            <button onClick={() => setStatus("stopped")}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          {status === "stopped" && (
            <button onClick={() => setStatus("playing")}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          <button
            onClick={() => {
              setStatus("stopped");
              setTimeElapsed(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
