import { ChestScreen } from "../../screens/containers/chest-screen/index";
import { MainMenu } from "../../screens/menus/main-menu/index";
import { ScaledBox } from "./index";

/**
 * ScaledBox 预览用例（规格 §6.4 尺寸适配）：
 * integer 模式随容器宽度取整数档（档位 1 / 档位 2 对照），fit 模式在定高容器内等比填充。
 */
export function ScaledBoxDemo() {
  return (
    <div className="flex w-200 flex-col gap-8">
      <p className="font-mc mc-text text-mc-text-dim">
        integer 模式：同一内容随容器宽度取整数档（左：档位 1 / 右：档位 2）
      </p>
      <div className="flex items-start gap-8">
        <ScaledBox align="start" className="w-170" width={176}>
          <ChestScreen items={[{ count: 27, icon: "dirt-block" }]} title="箱子" />
        </ScaledBox>
        <ScaledBox align="end" className="w-200" width={176}>
          <ChestScreen items={[{ count: 27, icon: "dirt-block" }]} title="箱子" />
        </ScaledBox>
      </div>
      <p className="font-mc mc-text text-mc-text-dim">fit 模式：定高容器内 transform 等比填充</p>
      <ScaledBox
        className="h-90 bg-[#1f1f1f]"
        height={240}
        maxScale={1}
        mode="fit"
        width={400}
      >
        <MainMenu />
      </ScaledBox>
    </div>
  );
}
