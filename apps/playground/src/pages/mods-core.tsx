import {
  ModIconButtonDemo,
  ModLabelDemo,
  ModProgressDemo,
  ModScissorListDemo,
  ModScrollbarDemo,
  ModSearchFieldDemo,
  ModSlotGridDemo,
  ModSpriteDemo,
  ModTabButtonDemo,
  ModTankDemo,
  ModTitleDemo,
  ModToolbarDemo,
} from "@tennantite/mods-core/demos";

export function ModsCorePage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Mod 共用原语 — @tennantite/mods-core
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        跨 mod 复用的按钮、进度条、储罐、文字与贴图渲染件（数据注入、无游戏逻辑）。
      </p>
      <Section title="ModSprite — 贴图裁剪/染色/整图">
        <ModSpriteDemo />
      </Section>
      <Section title="ModProgress — 进度条">
        <ModProgressDemo />
      </Section>
      <Section title="ModTank — 储罐">
        <ModTankDemo />
      </Section>
      <Section title="ModLabel — 像素文字">
        <ModLabelDemo />
      </Section>
      <Section title="ModIconButton — 图标按钮">
        <ModIconButtonDemo />
      </Section>
      <Section title="ModSlotGrid — 槽位网格">
        <ModSlotGridDemo />
      </Section>
      <Section title="ModScrollbar — 滚动条">
        <ModScrollbarDemo />
      </Section>
      <Section title="ModSearchField — 搜索框">
        <ModSearchFieldDemo />
      </Section>
      <Section title="ModTabButton — 标签按钮">
        <ModTabButtonDemo />
      </Section>
      <Section title="ModTitle — 标题">
        <ModTitleDemo />
      </Section>
      <Section title="ModToolbar — 工具栏">
        <ModToolbarDemo />
      </Section>
      <Section title="ModScissorList — 裁剪列表">
        <ModScissorListDemo />
      </Section>
    </div>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="mb-24">
      <h2 className="mb-8 font-mc mc-text text-mc-text-dim">{title}</h2>
      <div className="rounded border border-white/10 bg-black/20 p-8">
        {children}
      </div>
    </section>
  );
}
