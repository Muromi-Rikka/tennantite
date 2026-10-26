import { MainMenu } from "./index";

/** MainMenu 预览用例（规格 §6.3） */
export function MainMenuDemo() {
  return (
    <MainMenu
      actions={[
        { label: "单人游戏" },
        { label: "多人游戏" },
        { label: "设置" },
        { disabled: true, label: "最近的世界（无）" },
      ]}
    />
  );
}
