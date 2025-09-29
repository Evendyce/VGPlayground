"use client";
import Link from "next/link";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";
import { buildNav } from "@/lib/nav";
import { resolveIcon } from "@/lib/icons";

export type NavMenuProps = {
  isDockMode?: boolean;          // when collapsed, show only icons + tooltips if true
  collapsed?: boolean;           // controlled collapsed state
  onToggleCollapsed?: () => void;
  className?: string;
};

export function NavMenu({ isDockMode = true, collapsed = false, onToggleCollapsed, className }: NavMenuProps) {
  const pathname = usePathname();
  const groups = buildNav();

  return (
    <aside
      className={`${styles.root} ${className ?? ""}`}
      aria-label="Primary navigation"
      data-collapsed={collapsed}
    >
      <div className={styles.header}>
        {!collapsed && <span className="font-semibold">Navigation</span>}
        <button onClick={onToggleCollapsed} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <div className={styles.scroll}>
        {groups.map((g) => (
          <div key={g.label}>
            {!collapsed && <div className={styles.group}>{g.label}</div>}
            {g.sections.map((sec) => (
              <div key={sec.base}>
                <div className={styles.section}>
                    <RenderIcon name={sec.icon} className={styles.icon} />
                  <span className={styles.sectionText}>{sec.label}</span>
                </div>
                <ul className={styles.list}>
                  {sec.items.map((it) => {
                    const active = pathname === (sec.base + it.href);
                    return (
                      <li key={it.href}>
                        <Link href={sec.base + it.href} aria-current={active ? "page" : undefined} className={styles.itemLink} {...(collapsed && isDockMode ? { title: it.label } : {})}>
                          <RenderIcon name={it.icon} className={styles.icon} />
                          <span className="label">{/* for a11y if you add sr-only */}</span>
                          {!collapsed && <span className={styles.label}>{it.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

function RenderIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = resolveIcon(name);
  return Icon ? <span className={className}><Icon size={18} strokeWidth={2} /></span> : null;
}
