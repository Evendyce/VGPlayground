import Card from "@/components/ui/Card";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function CardsDefault() {
  return (
    <main className="container" style={{ display: "grid", gap: "24px", paddingTop: "32px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Dark-first Playground</h1>
        <ThemeToggle />
      </div>

      {/* Neon accent glow (blue) */}
      <Card useNeonColor>
        <h2 style={{ marginTop: 0 }}>Accent Neon</h2>
        <p>This card uses the <code>useNeonColor</code> prop for an accent glow.</p>
      </Card>

      {/* Monochrome neon (white in dark, black in light) */}
      <Card>
        <h2 style={{ marginTop: 0 }}>Monochrome Neon</h2>
        <p>By default, <code>useNeonColor</code> is false, so it uses monochrome neon.</p>
      </Card>

      {/* Plain card (no neon at all) */}
      <Card noNeon>
        <h2 style={{ marginTop: 0 }}>Plain Card</h2>
        <p>This card has no neon — just a clean background and shadow.</p>
      </Card>

      {/* Accent Neon + Hover disabled */}
      <Card useNeonColor hover={false}>
        <h2 style={{ marginTop: 0 }}>Accent Neon, No Hover</h2>
        <p>This card glows blue but doesn’t lift on hover.</p>
      </Card>
    </main>
  );
}
