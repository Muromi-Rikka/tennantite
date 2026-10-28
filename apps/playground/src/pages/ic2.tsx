import {
  BatBoxScreenDemo,
  CompressorScreenDemo,
  ElectricFurnaceScreenDemo,
  EuBarDemo,
  ExtractorScreenDemo,
  MaceratorScreenDemo,
} from "@verdigris/ui/demos";

export function Ic2Page() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        IC2（工业时代 2）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        手绘 SVG 视觉复刻（不含 IC2 原始素材），数据注入、无游戏逻辑。
      </p>
      <Section title="EuBar — EU 能量条">
        <EuBarDemo />
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
