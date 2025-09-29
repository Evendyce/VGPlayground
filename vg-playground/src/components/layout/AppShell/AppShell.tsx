// src/components/layout/AppShell.tsx
"use client";

import Header from "@/components/layout/Header/header";
import Footer from "@/components/layout/Footer/footer";
import { NavMenu } from "@/components/layout/Sidebar/sidebar"; // or "@/components/layout/Sidebar/sidebar" if that's your file
import React from "react";

export type AppShellProps = {
  includeHeader: boolean;
  includeSidebar: boolean;
  includeFooter: boolean;
  children: React.ReactNode;
};

export default function AppShell({
  includeHeader,
  includeSidebar,
  includeFooter,
  children,
}: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {includeHeader && (
        <Header
          onToggleSidebar={() => setCollapsed((p) => !p)}
          rightActions={
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          }
        />
      )}

      <div className="flex flex-1">
        {includeSidebar && (
          <NavMenu
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed((p) => !p)}
            isDockMode
          />
        )}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {includeFooter && <Footer />}
    </div>
  );
}
