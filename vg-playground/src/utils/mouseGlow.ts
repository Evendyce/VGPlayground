export type GlobalBorderOpts = {
  boost?: number;     // 0..1 – extra intensity near cursor (default .7)
  strength?: number;  // 0..1 – global multiplier (default 1)
  radius?: number;    // px – glow radius (default 380)
};

export function attachGlobalBorder(opts: GlobalBorderOpts = {}) {
  const boost = opts.boost ?? 0.7;
  const strength = opts.strength ?? 1;
  const radius = opts.radius ?? 380;

  const root = document.documentElement;
  root.style.setProperty("--global-glow-boost", String(boost));
  root.style.setProperty("--global-glow-strength", String(strength));
  root.style.setProperty("--global-glow-radius", `${radius}px`);

  const onMove = (e: MouseEvent) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // position in %
    const xPct = (e.clientX / vw) * 100;
    const yPct = (e.clientY / vh) * 100;

    // proximity boost based on distance to nearest edge (stronger near edges)
    const edgeDist = Math.min(e.clientX, e.clientY, vw - e.clientX, vh - e.clientY);
    const maxEdge = Math.min(vw, vh) / 2;
    const proximity = 1 - Math.min(1, edgeDist / maxEdge); // 0 center -> 1 edges
    const intensity = 1 + proximity * boost;

    root.style.setProperty("--global-glow-x", `${xPct}%`);
    root.style.setProperty("--global-glow-y", `${yPct}%`);
    root.style.setProperty("--global-glow-strength", `${strength * intensity}`);
  };

  window.addEventListener("mousemove", onMove);
  // initial center
  root.style.setProperty("--global-glow-x", "50%");
  root.style.setProperty("--global-glow-y", "50%");

  return () => window.removeEventListener("mousemove", onMove);
}
