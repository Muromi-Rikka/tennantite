import {
  EioAlloySmelterScreenDemo,
  EioCapacitorBankScreenDemo,
  EioSagMillScreenDemo,
  EioSoulBinderScreenDemo,
  EioStirlingGeneratorScreenDemo,
} from "@tennantite/enderio/demos";

export function EnderioPage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Ender IO（末影接口）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Ender IO 26.3 原始贴图复刻（数据注入、无游戏逻辑）。
      </p>
      <Section title="EioAlloySmelterScreen — 合金炉">
        <EioAlloySmelterScreenDemo />
      </Section>
      <Section title="EioSagMillScreen — SAG 磨粉机">
        <EioSagMillScreenDemo />
      </Section>
      <Section title="EioStirlingGeneratorScreen — 斯特林发电机">
        <EioStirlingGeneratorScreenDemo />
      </Section>
      <Section title="EioSoulBinderScreen — 灵魂绑定器">
        <EioSoulBinderScreenDemo />
      </Section>
      <Section title="EioCapacitorBankScreen — 电容组">
        <EioCapacitorBankScreenDemo />
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
