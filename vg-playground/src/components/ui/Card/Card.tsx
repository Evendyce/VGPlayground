import React from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  useNeonColor?: boolean;
  noNeon?: boolean;
  hover?: boolean;
};

export default function Card({
  children,
  className = "",
  useNeonColor = false,
  noNeon = false,
  hover = true,
}: CardProps) {
  const neonClass = noNeon
    ? ""
    : `${styles.neon} ${useNeonColor ? styles.accent : styles.mono}`;

  const hoverClass = hover ? styles.hoverable : "";

  return (
    <div className={[styles.base, styles.mist, neonClass, hoverClass, className].join(" ").trim()}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
