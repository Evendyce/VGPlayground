// src/components/layout/Footer.tsx
import styles from "./footer.module.css";

export type FooterProps = {
  leftSlot?: React.ReactNode;   // small text or links
  rightSlot?: React.ReactNode;  // build/version badge, etc.
  className?: string;
};

export default function Footer({ leftSlot, rightSlot, className }: FooterProps) {
  return (
    <footer className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {leftSlot ?? <>© {new Date().getFullYear()} VG Playground</>}
        </div>
        <div className={styles.right}>
          {rightSlot ?? <>Built with Next.js</>}
        </div>
      </div>
    </footer>
  );
}
