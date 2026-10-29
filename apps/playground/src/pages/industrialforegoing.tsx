import {
  IfBiofuelGeneratorScreenDemo,
  IfBioreactorScreenDemo,
  IfDissolutionChamberScreenDemo,
  IfDyeMixerScreenDemo,
  IfFermentationStationScreenDemo,
  IfFluidExtractorScreenDemo,
  IfLaserBaseScreenDemo,
  IfMachineGalleryDemo,
  IfMobCrusherScreenDemo,
  IfMycelialGeneratorScreenDemo,
  IfPotionBrewerScreenDemo,
} from "@tennantite/industrialforegoing/demos";

export function IndustrialForegoingPage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Industrial Foregoing（工业前哨）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Industrial Foregoing 1.21 + Titanium 4.x 原始贴图复刻（数据注入、无游戏逻辑）。
        48 台机器布局，10 个主要机型具名屏。
      </p>
      <Section title="IfDissolutionChamberScreen — 溶解成型机">
        <IfDissolutionChamberScreenDemo />
      </Section>
      <Section title="IfFluidExtractorScreen — 液体提取机">
        <IfFluidExtractorScreenDemo />
      </Section>
      <Section title="IfBioreactorScreen — 生物质炉">
        <IfBioreactorScreenDemo />
      </Section>
      <Section title="IfBiofuelGeneratorScreen — 生物燃油发电机">
        <IfBiofuelGeneratorScreenDemo />
      </Section>
      <Section title="IfMobCrusherScreen — 屠宰机">
        <IfMobCrusherScreenDemo />
      </Section>
      <Section title="IfDyeMixerScreen — 颜料调色器">
        <IfDyeMixerScreenDemo />
      </Section>
      <Section title="IfFermentationStationScreen — 发酵站">
        <IfFermentationStationScreenDemo />
      </Section>
      <Section title="IfMycelialGeneratorScreen — 菌丝网络发电机（史莱姆）">
        <IfMycelialGeneratorScreenDemo />
      </Section>
      <Section title="IfLaserBaseScreen — 镭射钻基座">
        <IfLaserBaseScreenDemo />
      </Section>
      <Section title="IfPotionBrewerScreen — 自动炼药机">
        <IfPotionBrewerScreenDemo />
      </Section>
      <Section title="IfMachineGallery — 全部 48 台机器">
        <IfMachineGalleryDemo />
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
