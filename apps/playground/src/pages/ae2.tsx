import {
  Ae2ChestScreenDemo,
  Ae2CondenserScreenDemo,
  Ae2CraftingCpuScreenDemo,
  Ae2CraftingTerminalScreenDemo,
  Ae2DriveScreenDemo,
  Ae2GrindstoneScreenDemo,
  Ae2InscriberScreenDemo,
  Ae2InterfaceScreenDemo,
  Ae2IoPortScreenDemo,
  Ae2MolecularAssemblerScreenDemo,
  Ae2PatternAccessTerminalScreenDemo,
  Ae2PatternEncodingTerminalScreenDemo,
  Ae2PriorityDialogDemo,
  Ae2QuantumBridgeScreenDemo,
  Ae2SkyChestScreenDemo,
  Ae2SpatialIoPortScreenDemo,
  Ae2TerminalScreenDemo,
  Ae2TextDemo,
  Ae2TerminalBodyDemo,
} from "@tennantite/ae2/demos";

export function Ae2Page() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        AE2（应用能源 2）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        终端家族直接使用 AE2 原始 GUI 贴图（切片拼接），其余部件为手绘复刻；数据注入、无游戏逻辑。
      </p>
      <Section title="Ae2TerminalScreen — ME 终端">
        <Ae2TerminalScreenDemo />
      </Section>
      <Section title="Ae2Text — 小号文字">
        <Ae2TextDemo />
      </Section>
      <Section title="Ae2TerminalBody — 终端主体">
        <Ae2TerminalBodyDemo />
      </Section>
      <Section title="Ae2CraftingTerminalScreen — 合成终端">
        <Ae2CraftingTerminalScreenDemo />
      </Section>
      <Section title="Ae2InscriberScreen — 压印器">
        <Ae2InscriberScreenDemo />
      </Section>
      <Section title="Ae2DriveScreen — ME 驱动器">
        <Ae2DriveScreenDemo />
      </Section>
      <Section title="Ae2ChestScreen — ME 箱子">
        <Ae2ChestScreenDemo />
      </Section>
      <Section title="Ae2PatternEncodingTerminalScreen — 样式编码终端">
        <Ae2PatternEncodingTerminalScreenDemo />
      </Section>
      <Section title="Ae2PatternAccessTerminalScreen — 样式访问终端（CPU 选择表）">
        <Ae2PatternAccessTerminalScreenDemo />
      </Section>
      <Section title="Ae2CraftingCpuScreen — 合成 CPU 监控">
        <Ae2CraftingCpuScreenDemo />
      </Section>
      <Section title="Ae2MolecularAssemblerScreen — 分子装配室">
        <Ae2MolecularAssemblerScreenDemo />
      </Section>
      <Section title="Ae2QuantumBridgeScreen — 量子链接仓">
        <Ae2QuantumBridgeScreenDemo />
      </Section>
      <Section title="Ae2SpatialIoPortScreen — 空间 IO 端口">
        <Ae2SpatialIoPortScreenDemo />
      </Section>
      <Section title="Ae2IoPortScreen — IO 端口">
        <Ae2IoPortScreenDemo />
      </Section>
      <Section title="Ae2InterfaceScreen — 接口">
        <Ae2InterfaceScreenDemo />
      </Section>
      <Section title="Ae2CondenserScreen — 物质冷凝器">
        <Ae2CondenserScreenDemo />
      </Section>
      <Section title="Ae2GrindstoneScreen — 磨石">
        <Ae2GrindstoneScreenDemo />
      </Section>
      <Section title="Ae2SkyChestScreen — ME 天空石箱">
        <Ae2SkyChestScreenDemo />
      </Section>
      <Section title="Ae2PriorityDialog — 优先级弹窗">
        <Ae2PriorityDialogDemo />
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
