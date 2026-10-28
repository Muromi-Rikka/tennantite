import type { ReactNode } from "react";
import {
  MekanismChemicalTankScreenDemo,
  MekanismDynamicTankScreenDemo,
  MekanismEnergyCubeScreenDemo,
  MekanismFluidTankScreenDemo,
  MekanismGaugeDemo,
  MekanismInductionMatrixScreenDemo,
  MekanismMachineScreensDemo,
  MekanismPersonalStorageScreenDemo,
  MekanismProgressDemo,
  MekanismSideConfigWindowDemo,
  MekanismTabDemo,
  MekanismThermalEvaporationScreenDemo,
  MekanismThermoelectricBoilerScreenDemo,
  MekanismUpgradeWindowDemo,
} from "@verdigris/ui/demos";

export function MekanismPage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Mekanism（通用机械）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Mekanism 26.3 原始贴图复刻（数据注入、无游戏逻辑），34 屏 + 侧配置/升级窗口。
      </p>
      <Section title="共享件 — 仪表 / 进度 / 条形">
        <MekanismGaugeDemo />
        <MekanismProgressDemo />
      </Section>
      <Section title="共享件 — 标签 / 侧配置 / 升级">
        <MekanismTabDemo />
        <div className="mt-8 flex flex-wrap items-start gap-12">
          <MekanismSideConfigWindowDemo />
          <MekanismUpgradeWindowDemo />
        </div>
      </Section>
      <Section title="机器 — 26 屏">
        <MekanismMachineScreensDemo />
      </Section>
      <Section title="储罐 / 存储 — 8 屏">
        <div className="flex flex-wrap items-start gap-x-64 gap-y-12">
          <MekanismEnergyCubeScreenDemo />
          <MekanismFluidTankScreenDemo />
          <MekanismChemicalTankScreenDemo />
          <MekanismInductionMatrixScreenDemo />
          <MekanismDynamicTankScreenDemo />
          <MekanismThermoelectricBoilerScreenDemo />
          <MekanismThermalEvaporationScreenDemo />
          <MekanismPersonalStorageScreenDemo />
        </div>
      </Section>
    </div>
  );
}

function Section({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 font-mc mc-text text-white mc-text-shadow">{title}</h2>
      {children}
    </section>
  );
}
