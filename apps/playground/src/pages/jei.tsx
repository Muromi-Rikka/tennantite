import {
  JeiBookmarkPanelDemo,
  JeiItemListPanelDemo,
  JeiRecipeGuiScreenDemo,
  JeiRecipeGuiSmeltingDemo,
} from "@tennantite/jei/demos";

export function JeiPage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        JEI（Just Enough Items）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        JEI 26.3 原始贴图复刻（数据注入、无游戏逻辑）。
      </p>
      <Section title="JeiItemListPanel — 物品列表面板">
        <JeiItemListPanelDemo />
      </Section>
      <Section title="JeiBookmarkPanel — 书签面板">
        <JeiBookmarkPanelDemo />
      </Section>
      <Section title="JeiRecipeGuiScreen — 配方查看界面（合成）">
        <JeiRecipeGuiScreenDemo />
      </Section>
      <Section title="JeiRecipeGuiScreen — 配方查看界面（熔炼）">
        <JeiRecipeGuiSmeltingDemo />
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
