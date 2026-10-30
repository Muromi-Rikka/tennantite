import {
  IeAlloySmelterScreenDemo,
  IeArcFurnaceScreenDemo,
  IeAssemblerScreenDemo,
  IeAutoWorkbenchScreenDemo,
  IeBlastFurnaceScreenDemo,
  IeCapacitorHvScreenDemo,
  IeChunkLoaderScreenDemo,
  IeCircuitTableScreenDemo,
  IeClocheScreenDemo,
  IeCokeOvenScreenDemo,
  IeCrateScreenDemo,
  IeDrillScreenDemo,
  IeFermenterScreenDemo,
  IeFluidProducerScreenDemo,
  IeFluidSorterScreenDemo,
  IeItemBatcherScreenDemo,
  IeMetalPressScreenDemo,
  IeMixerScreenDemo,
  IeModWorkbenchScreenDemo,
  IeRefineryScreenDemo,
  IeSorterScreenDemo,
  IeSqueezerScreenDemo,
  IeToolboxScreenDemo,
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
      <Section title="IeBlastFurnaceScreen — 高炉">
        <IeBlastFurnaceScreenDemo />
      </Section>
      <Section title="IeAlloySmelterScreen — 合金炉">
        <IeAlloySmelterScreenDemo />
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
      <Section title="IeFermenterScreen — 发酵器">
        <IeFermenterScreenDemo />
      </Section>
      <Section title="IeSqueezerScreen — 压榨机">
        <IeSqueezerScreenDemo />
      </Section>
      <Section title="IeRefineryScreen — 精炼厂">
        <IeRefineryScreenDemo />
      </Section>
      <Section title="IeMixerScreen — 搅拌机">
        <IeMixerScreenDemo />
      </Section>
      <Section title="IeClocheScreen — 温室">
        <IeClocheScreenDemo />
      </Section>
      <Section title="IeSorterScreen — 分拣器">
        <IeSorterScreenDemo />
      </Section>
      <Section title="IeFluidSorterScreen — 流体分拣器">
        <IeFluidSorterScreenDemo />
      </Section>
      <Section title="IeItemBatcherScreen — 物品分批器">
        <IeItemBatcherScreenDemo />
      </Section>
      <Section title="IeCrateScreen — 木箱">
        <IeCrateScreenDemo />
      </Section>
      <Section title="IeDrillScreen — 电钻">
        <IeDrillScreenDemo />
      </Section>
      <Section title="IeToolboxScreen — 工具箱">
        <IeToolboxScreenDemo />
      </Section>
      <Section title="IeCircuitTableScreen — 电路工作台">
        <IeCircuitTableScreenDemo />
      </Section>
      <Section title="IeChunkLoaderScreen — 区块加载机">
        <IeChunkLoaderScreenDemo />
      </Section>
      <Section title="IeAutoWorkbenchScreen — 自动工作台">
        <IeAutoWorkbenchScreenDemo />
      </Section>
      <Section title="IeAssemblerScreen — 装配器">
        <IeAssemblerScreenDemo />
      </Section>
      <Section title="IeModWorkbenchScreen — 工程师工作台">
        <IeModWorkbenchScreenDemo />
      </Section>
      <Section title="IeFluidProducerScreen — 流体泵站">
        <IeFluidProducerScreenDemo />
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
