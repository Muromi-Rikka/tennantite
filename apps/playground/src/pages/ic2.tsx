import {
  BatBoxScreenDemo,
  CompressorScreenDemo,
  ElectricFurnaceScreenDemo,
  ExtractorScreenDemo,
  Ic2EnergyGaugeDemo,
  MaceratorScreenDemo,
} from "@verdigris/ui/demos";

export function Ic2Page() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        IC2（工业时代 2）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        IC2 1.12.2 原始贴图复刻（数据注入、无游戏逻辑），数据注入、无游戏逻辑。
      </p>
      <Section title="Ic2EnergyGauge — EU 能量表">
        <Ic2EnergyGaugeDemo />
      </Section>
      <Section title="MaceratorScreen — 磨矿机">
        <MaceratorScreenDemo />
      </Section>
      <Section title="ElectricFurnaceScreen — 电炉">
        <ElectricFurnaceScreenDemo />
      </Section>
      <Section title="ExtractorScreen — 提取机">
        <ExtractorScreenDemo />
      </Section>
      <Section title="CompressorScreen — 压缩机">
        <CompressorScreenDemo />
      </Section>
      <Section title="BatBoxScreen — 储电箱">
        <BatBoxScreenDemo />
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
