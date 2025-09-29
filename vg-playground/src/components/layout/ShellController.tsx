// src/components/layout/ShellController.tsx
"use client";
import { usePathname, useSearchParams } from "next/navigation";
import AppShell from "./AppShell/AppShell";
import { ROUTES } from "@/routes";

function boolParam(sp: URLSearchParams, key: string, def: boolean) {
  const v = sp.get(key);
  return v == null ? def : v === "1" || v === "true";
}

export default function ShellController({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sp = useSearchParams();

  // 1) resolve defaults from manifest
  // find matching screen first; otherwise fall back to section by prefix
  const groups = Object.values(ROUTES.groups);
  const allSections = groups.flatMap(g => Object.values(g.sections));
  const allScreens = allSections.flatMap(s => s.screens);

  const screen = allScreens.find(s => s.path === pathname);
  const section = screen
    ? allSections.find(sec => pathname.startsWith(sec.base))
    : allSections.find(sec => pathname.startsWith(sec.base));

  const defaults = {
    header: true,
    sidebar: true,
    footer: true,
    ...(section?.layout ?? {}),
    ...(screen?.layout ?? {}),
  };

  // 2) query param overrides
  // quick “bare” preset OR fine-grained flags
  const isBare = sp.get("layout") === "bare";
  const includeHeader = isBare ? false : boolParam(sp, "header", defaults.header);
  const includeSidebar = isBare ? false : boolParam(sp, "sidebar", defaults.sidebar);
  const includeFooter = isBare ? false : boolParam(sp, "footer", defaults.footer);

  return (
    <AppShell
      includeHeader={includeHeader}
      includeSidebar={includeSidebar}
      includeFooter={includeFooter}
    >
      {children}
    </AppShell>
  );
}
