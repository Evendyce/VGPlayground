import { notFound } from "next/navigation";
import { byPath } from "@/routes";

export default async function CatchAll({ params }: { params: { segments?: string[] } }) {
  const path = "/" + (params.segments?.join("/") ?? "");
  const entry = byPath(path);
  if (!entry) return notFound();
  const mod = await entry.load();
  const Screen = mod.default as React.ComponentType<unknown>;
  return <Screen />;
}
