export function attachGlobalFrame(opts?: { boost?: number; base?: number }) {
  const boost = opts?.boost ?? 0.7;   // how much to boost near edges (0..1)
  const base  = opts?.base  ?? 0.9;   // baseline intensity (0..1)

  const root = document.documentElement;

  const onMove = (e: MouseEvent) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Distance to nearest edge (0 at center, 1 at edge)
    const edgeDist = Math.min(e.clientX, e.clientY, vw - e.clientX, vh - e.clientY);
    const maxEdge  = Math.min(vw, vh) / 2;
    const proximity = 1 - Math.min(1, edgeDist / maxEdge); // 0 center -> 1 edges

    const strength = Math.max(0, Math.min(1, base + proximity * boost));
    root.style.setProperty("--global-glow-strength", strength.toFixed(3));
  };

  // initialize
  root.style.setProperty("--global-glow-strength", String(base));
  window.addEventListener("mousemove", onMove);
  return () => window.removeEventListener("mousemove", onMove);
}
