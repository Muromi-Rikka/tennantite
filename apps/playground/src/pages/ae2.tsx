import {
  Ae2ChestScreenDemo,
  Ae2DriveScreenDemo,
  Ae2InscriberScreenDemo,
  Ae2TerminalScreenDemo,
} from "@verdigris/ui/demos";

export function Ae2Page() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        AE2（应用能源 2）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        手绘 SVG 视觉复刻（不含 AE2 原始素材），按 1.21 屏幕定义复刻尺寸与槽位坐标。
      </p>
      <Section title="Ae2TerminalScreen — ME 终端">
        <Ae2TerminalScreenDemo />
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
