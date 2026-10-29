import {
  ThermalCacheScreenDemo,
  ThermalEnergyCellScreenDemo,
  ThermalRedstoneFurnaceIdleDemo,
  ThermalRedstoneFurnaceScreenDemo,
} from "@tennantite/thermal/demos";

export function ThermalPage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Thermal Expansion（热力膨胀）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Thermal 1.20.x 原始贴图复刻（数据注入、无游戏逻辑）。
      </p>
      <Section title="ThermalRedstoneFurnaceScreen — 红石炉">
        <ThermalRedstoneFurnaceScreenDemo />
      </Section>
      <Section title="ThermalRedstoneFurnaceScreen — 红石炉（待机）">
        <ThermalRedstoneFurnaceIdleDemo />
      </Section>
      <Section title="ThermalEnergyCellScreen — 储能仓">
        <ThermalEnergyCellScreenDemo />
      </Section>
      <Section title="ThermalCacheScreen — 物品缓存仓">
        <ThermalCacheScreenDemo />
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
