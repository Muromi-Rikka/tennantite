import {
  ThermalBottlerScreenDemo,
  ThermalBrewerScreenDemo,
  ThermalCacheScreenDemo,
  ThermalCentrifugeScreenDemo,
  ThermalChargeBenchScreenDemo,
  ThermalChillerScreenDemo,
  ThermalCollectorScreenDemo,
  ThermalComposterScreenDemo,
  ThermalCrafterScreenDemo,
  ThermalCrucibleScreenDemo,
  ThermalCrystallizerScreenDemo,
  ThermalEnergyCellScreenDemo,
  ThermalFisherScreenDemo,
  ThermalFluidCacheScreenDemo,
  ThermalHiveExtractorScreenDemo,
  ThermalInsolatorScreenDemo,
  ThermalNullifierScreenDemo,
  ThermalPotionDiffuserScreenDemo,
  ThermalPressScreenDemo,
  ThermalPulverizerScreenDemo,
  ThermalPyrolyzerScreenDemo,
  ThermalRedstoneFurnaceIdleDemo,
  ThermalRedstoneFurnaceScreenDemo,
  ThermalRefineryScreenDemo,
  ThermalRockGenScreenDemo,
  ThermalSawmillScreenDemo,
  ThermalSmelterScreenDemo,
  ThermalSoilInfuserScreenDemo,
  ThermalTinkerBenchScreenDemo,
  ThermalTreeExtractorScreenDemo,
  ThermalWaterGenScreenDemo,
  ThermalXpCondenserScreenDemo,
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
      <Section title="ThermalPulverizerScreen — 粉碎机">
        <ThermalPulverizerScreenDemo />
      </Section>
      <Section title="ThermalSawmillScreen — 锯木机">
        <ThermalSawmillScreenDemo />
      </Section>
      <Section title="ThermalSmelterScreen — 感应冶炼炉">
        <ThermalSmelterScreenDemo />
      </Section>
      <Section title="ThermalCrucibleScreen — 熔解炉">
        <ThermalCrucibleScreenDemo />
      </Section>
      <Section title="ThermalCentrifugeScreen — 离心机">
        <ThermalCentrifugeScreenDemo />
      </Section>
      <Section title="ThermalRefineryScreen — 精炼机">
        <ThermalRefineryScreenDemo />
      </Section>
      <Section title="ThermalBottlerScreen — 灌装机">
        <ThermalBottlerScreenDemo />
      </Section>
      <Section title="ThermalBrewerScreen — 酿造机">
        <ThermalBrewerScreenDemo />
      </Section>
      <Section title="ThermalCrafterScreen — 组装机">
        <ThermalCrafterScreenDemo />
      </Section>
      <Section title="ThermalCrystallizerScreen — 结晶机">
        <ThermalCrystallizerScreenDemo />
      </Section>
      <Section title="ThermalInsolatorScreen — 光合增幅机">
        <ThermalInsolatorScreenDemo />
      </Section>
      <Section title="ThermalChillerScreen — 冷冻机">
        <ThermalChillerScreenDemo />
      </Section>
      <Section title="ThermalPressScreen — 压缩机">
        <ThermalPressScreenDemo />
      </Section>
      <Section title="ThermalPyrolyzerScreen — 热解炉">
        <ThermalPyrolyzerScreenDemo />
      </Section>
      <Section title="ThermalComposterScreen — 堆肥机">
        <ThermalComposterScreenDemo />
      </Section>
      <Section title="ThermalNullifierScreen — 销毁器">
        <ThermalNullifierScreenDemo />
      </Section>
      <Section title="ThermalCollectorScreen — 收集器">
        <ThermalCollectorScreenDemo />
      </Section>
      <Section title="ThermalFluidCacheScreen — 流体缓存仓">
        <ThermalFluidCacheScreenDemo />
      </Section>
      <Section title="ThermalTinkerBenchScreen — 强化工作台">
        <ThermalTinkerBenchScreenDemo />
      </Section>
      <Section title="ThermalChargeBenchScreen — 充能台">
        <ThermalChargeBenchScreenDemo />
      </Section>
      <Section title="ThermalFisherScreen — 捕鱼装置">
        <ThermalFisherScreenDemo />
      </Section>
      <Section title="ThermalTreeExtractorScreen — 树液采集器">
        <ThermalTreeExtractorScreenDemo />
      </Section>
      <Section title="ThermalHiveExtractorScreen — 蜂巢采集器">
        <ThermalHiveExtractorScreenDemo />
      </Section>
      <Section title="ThermalSoilInfuserScreen — 土壤培肥机">
        <ThermalSoilInfuserScreenDemo />
      </Section>
      <Section title="ThermalRockGenScreen — 岩石生成器">
        <ThermalRockGenScreenDemo />
      </Section>
      <Section title="ThermalWaterGenScreen — 集水器">
        <ThermalWaterGenScreenDemo />
      </Section>
      <Section title="ThermalXpCondenserScreen — 经验冷凝器">
        <ThermalXpCondenserScreenDemo />
      </Section>
      <Section title="ThermalPotionDiffuserScreen — 药水扩散器">
        <ThermalPotionDiffuserScreenDemo />
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
