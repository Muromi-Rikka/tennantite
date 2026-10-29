import {
  IeArcFurnaceScreenDemo,
  IeCapacitorHvScreenDemo,
  IeCokeOvenScreenDemo,
  IeMetalPressScreenDemo,
} from "@tennantite/ie/demos";

export function IePage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Immersive Engineering（沉浸工程）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Immersive Engineering 1.21.1 原始贴图复刻（数据注入、无游戏逻辑）。
      </p>
      <Section title="IeCokeOvenScreen — 焦炉">
        <IeCokeOvenScreenDemo />
      </Section>
      <Section title="IeArcFurnaceScreen — 弧光炉">
        <IeArcFurnaceScreenDemo />
      </Section>
      <Section title="IeMetalPressScreen — 金属压机">
        <IeMetalPressScreenDemo />
      </Section>
      <Section title="IeCapacitorHvScreen — 高压电容">
        <IeCapacitorHvScreenDemo />
      </Section>
    </div>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 font-mc mc-text text-white mc-text-shadow">{title}</h2>
      {children}
    </section>
  );
}
