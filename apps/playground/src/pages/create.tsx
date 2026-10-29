import {
  CreateCrusherScreenDemo,
  CreateFilterScreenDemo,
  CreateMillstoneScreenDemo,
  CreateSchematicTableScreenDemo,
  CreateToolboxScreenDemo,
  CreateValueSettingsPanelDemo,
} from "@tennantite/create/demos";

export function CreatePage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Create（机械动力）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Create mc1.21.1/dev 原始贴图复刻（数据注入、无游戏逻辑）。
      </p>
      <Section title="CreateMillstoneScreen — 磨石（progress 0.5）">
        <CreateMillstoneScreenDemo />
      </Section>
      <Section title="CreateCrusherScreen — 粉碎机（共用机器布局）">
        <CreateCrusherScreenDemo />
      </Section>
      <Section title="CreateFilterScreen — 筛选器">
        <CreateFilterScreenDemo />
      </Section>
      <Section title="CreateToolboxScreen — 工具箱">
        <CreateToolboxScreenDemo />
      </Section>
      <Section title="CreateSchematicTableScreen — 蓝图桌">
        <CreateSchematicTableScreenDemo />
      </Section>
      <Section title="CreateValueSettingsPanel — 数值配置浮层">
        <CreateValueSettingsPanelDemo />
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
