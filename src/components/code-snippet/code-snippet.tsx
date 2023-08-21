import React from "react";
import { Code } from "bright";

import theme from "./theme";
import styles from "./code-snippet.module.css";

function CodeSnippet(props: Record<string, unknown>) {
  return <Code {...props} theme={theme} className={styles.wrapper} />;
}

export default CodeSnippet;
