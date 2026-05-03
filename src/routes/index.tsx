import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Scene3D } from "@/components/Scene3D";

export const Route = createFileRoute("/")({
  component: Index,
});

const BG_PRESETS = ["#0f172a", "#1e3a8a", "#064e3b", "#7c2d12", "#581c87", "#fef3c7"];
const CHAR_PRESETS = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#a855f7"];

function Index() {
  const [bgColor, setBgColor] = useState("#1e3a8a");
  const [characterColor, setCharacterColor] = useState("#ef4444");
  const [ambient, setAmbient] = useState(0.5);
  const [directional, setDirectional] = useState(1.2);
  const [lightColor, setLightColor] = useState("#ffffff");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      <aside className="lg:w-80 w-full p-6 border-b lg:border-b-0 lg:border-r border-border bg-card overflow-y-auto">
        <h1 className="text-2xl font-bold mb-1">Iluminación 3D</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Configuración visual del videojuego
        </p>

        <Section title="Color de fondo del entorno">
          <ColorRow value={bgColor} onChange={setBgColor} presets={BG_PRESETS} />
        </Section>

        <Section title="Color del personaje">
          <ColorRow value={characterColor} onChange={setCharacterColor} presets={CHAR_PRESETS} />
        </Section>

        <Section title="Color de la luz">
          <input
            type="color"
            value={lightColor}
            onChange={(e) => setLightColor(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-transparent cursor-pointer"
          />
        </Section>

        <Section title={`Luz ambiental: ${ambient.toFixed(2)}`}>
          <input
            type="range"
            min={0}
            max={2}
            step={0.05}
            value={ambient}
            onChange={(e) => setAmbient(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </Section>

        <Section title={`Luz direccional: ${directional.toFixed(2)}`}>
          <input
            type="range"
            min={0}
            max={3}
            step={0.05}
            value={directional}
            onChange={(e) => setDirectional(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </Section>

        <div className="mt-6 p-3 rounded-md bg-muted text-xs text-muted-foreground">
          Arrastra en la escena para rotar la cámara. Usa la rueda para hacer zoom.
        </div>
      </aside>

      <main className="flex-1 min-h-[60vh] lg:min-h-screen">
        <Scene3D
          bgColor={bgColor}
          characterColor={characterColor}
          ambientIntensity={ambient}
          directionalIntensity={directional}
          lightColor={lightColor}
        />
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium mb-2">{title}</label>
      {children}
    </div>
  );
}

function ColorRow({
  value,
  onChange,
  presets,
}: {
  value: string;
  onChange: (v: string) => void;
  presets: string[];
}) {
  return (
    <div className="space-y-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-border bg-transparent cursor-pointer"
      />
      <div className="flex flex-wrap gap-2">
        {presets.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="h-7 w-7 rounded-full border-2 border-border hover:scale-110 transition-transform"
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>
    </div>
  );
}
