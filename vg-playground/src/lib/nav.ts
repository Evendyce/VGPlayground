// src/lib/nav.ts
import { ROUTES } from "@/routes";

export type NavItem = { label: string; href: string; icon?: string };
export type NavSection = { label: string; base: string; icon?: string; items: NavItem[] };
export type NavGroup = { label: string; sections: NavSection[] };

export function buildNav(): NavGroup[] {
  return Object.entries(ROUTES.groups).map(([_, group]) => ({
    label: group.groupLabel,
    sections: Object.entries(group.sections).map(([_, section]) => ({
      label: section.displayLabel,
      base: section.base,
      icon: section.icon,
      items: section.screens.map((s) => ({
        label: s.displayLabel,
        href: s.path,
        icon: s.icon,
      })),
    })),
  }));
}

export function buildFlatNav(): NavSection[] {
  return buildNav().flatMap(g => g.sections);
}