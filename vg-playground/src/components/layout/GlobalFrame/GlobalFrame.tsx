"use client";
import { useEffect } from "react";
import { attachGlobalFrame } from "@/utils/globalMouse";

export default function GlobalFrame() {
  useEffect(() => {
    const detach = attachGlobalFrame({ base: 0.9, boost: 0.6 });
    return detach;
  }, []);
  return <div className="global-frame" aria-hidden="true" />;
}
