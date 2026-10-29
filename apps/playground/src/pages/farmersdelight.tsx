import {
  FdComfortOverlayDemo,
  FdCookingPotScreenDemo,
  FdCookingProgressDemo,
  FdHeatIndicatorDemo,
  FdHungerOverlayDemo,
  FdRecipeBookButtonDemo,
  FdSpriteDemo,
} from "@tennantite/farmersdelight/demos";

export function FarmersDelightPage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Farmer's Delight（农夫乐事）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Farmer's Delight 1.21 原始贴图复刻（数据注入、无游戏逻辑）。
      </p>
      <Section title="FdCookingPotScreen — 厨锅">
        <FdCookingPotScreenDemo />
      </Section>
      <Section title="FdHeatIndicator — 受热图标">
        <FdHeatIndicatorDemo />
      </Section>
      <Section title="FdCookingProgress — 烹饪进度">
        <FdCookingProgressDemo />
      </Section>
      <Section title="FdRecipeBookButton — 配方书按钮">
        <FdRecipeBookButtonDemo />
      </Section>
      <Section title="FdHungerOverlay — 饱食覆盖层">
        <FdHungerOverlayDemo />
      </Section>
      <Section title="FdComfortOverlay — 舒适覆盖层">
        <FdComfortOverlayDemo />
      </Section>
      <Section title="FdSprite — 精灵">
        <FdSpriteDemo />
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
