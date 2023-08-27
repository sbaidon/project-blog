import React from "react";

import styles from "./(not-found)/not-found.module.css";

export const metadata = {
  title: "404 Not found",
};

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
    </div>
  );
}

export default NotFound;
