// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import styles from "./header.module.css";
import { resolveIcon } from "@/lib/icons";

export type HeaderProps = {
  title?: string;                // brand text
  onToggleSidebar?: () => void;  // optional hook to toggle sidebar
  rightActions?: React.ReactNode;
  className?: string;
  iconName?: string;             // lucide icon name for brand
};

export default function Header({
  title = "VG Playground",
  onToggleSidebar,
  rightActions,
  className,
  iconName = "FlaskConical",
}: HeaderProps) {
  const BrandIcon = resolveIcon(iconName);
  return (
    <header className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <span aria-hidden>≡</span>
        </button>

        <Link href="/" className={styles.brand}>
          <BrandIcon size={18} strokeWidth={2} />
          <span>{title}</span>
        </Link>

        <div className={styles.right}>
          {rightActions /* e.g., ThemeToggle, GitHub link */}
        </div>
      </div>
    </header>
  );
}
