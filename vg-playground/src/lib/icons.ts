// src/lib/icons.ts
import * as Lucide from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS = Lucide as unknown as Record<string, LucideIcon>;

// Fallback key for when no match is found
const FALLBACK_ICON = "CircleHelp";

export function resolveIcon(name?: string): LucideIcon {
  if (!name) return ICONS[FALLBACK_ICON];
  return ICONS[name] ?? ICONS[FALLBACK_ICON];
}