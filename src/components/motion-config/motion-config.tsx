"use client";

import { MotionConfig } from "framer-motion";

export default function Config({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
