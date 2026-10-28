import type { ComponentProps, CSSProperties } from "react";
import { Button, ChestScreen, MainMenu, ScaledBox } from "@tennantite/ui";
import { useState } from "react";

const MANUAL_SCALES = [1, 2, 3] as const;

type ChestItems = NonNullable<ComponentProps<typeof ChestScreen>["items"]>;

const CHEST_ITEMS: ChestItems = [
  { count: 27, icon: "dirt-block", tooltip: "泥土 ×27" },
  { count: 8, icon: "apple" },
  { icon: "sword" },
];

/**
 * GUI Scale 演示页：验证 `--mc-scale` 令牌的三种缩放路径 ——
 * ① 手动覆盖档位；② ScaledBox integer 自动档（随容器宽取整数档）；
 * ③ ScaledBox fit（定高容器内 transform 连续填充）。
 */
export function GuiScalePage() {
  const [scale, setScale] = useState(2);
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        GUI Scale
      </h1>
      <p className="mb-24 max-w-400 font-mc mc-text text-mc-text-dim">
        一切尺寸锚定 --mc-scale（1 GUI px = scale CSS px）。整树覆盖该令牌即可
        让组件按倍率整体重排；容器自适应用 ScaledBox，弹层（portal）不随子树
        档位缩放，应用级缩放请改 :root。
      </p>

      <section>
        <h2 className="mb-8 font-mc mc-text text-mc-gold mc-text-shadow">
          手动档位：--mc-scale =
          {" "}
          {scale}
        </h2>
        <div className="mb-16 flex gap-8">
          {MANUAL_SCALES.map(value => (
            <Button
              key={value}
              onClick={() => setScale(value)}
              variant={scale === value ? "success" : "default"}
            >
              {value}
              ×
            </Button>
          ))}
        </div>
        <div
          className="w-fit border border-white/20 p-8 mc-scale-scope"
          style={{ "--mc-scale": String(scale) } as CSSProperties}
        >
          <ChestScreen items={CHEST_ITEMS} title="箱子" />
        </div>
      </section>

      <section className="mt-32">
        <h2 className="mb-8 font-mc mc-text text-mc-gold mc-text-shadow">
          ScaledBox integer：容器宽 → 最大整数档（左 300px → 1 档，右 420px →
          2 档）
        </h2>
        <div className="flex flex-wrap items-start gap-16">
          <ScaledBox align="start" className="w-150 border border-white/20 p-4" width={176}>
            <ChestScreen items={CHEST_ITEMS} title="箱子" />
          </ScaledBox>
          <ScaledBox align="start" className="w-210 border border-white/20 p-4" width={176}>
            <ChestScreen items={CHEST_ITEMS} title="箱子" />
          </ScaledBox>
          <ScaledBox align="start" className="w-400 border border-white/20 p-4" maxScale={3} width={176}>
            <ChestScreen items={CHEST_ITEMS} title="箱子" />
          </ScaledBox>
        </div>
      </section>

      <section className="mt-32">
        <h2 className="mb-8 font-mc mc-text text-mc-gold mc-text-shadow">
          ScaledBox fit：定高 180px 容器内等比填充
        </h2>
        <ScaledBox
          className="max-w-400 border border-white/20"
          height={240}
          maxScale={1}
          mode="fit"
          width={400}
        >
          <MainMenu />
        </ScaledBox>
      </section>
    </div>
  );
}
