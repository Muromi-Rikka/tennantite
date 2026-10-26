import { SignEdit } from "./index";

/** SignEdit 预览用例（规格 §6.3） */
export function SignEditDemo() {
  return (
    <SignEdit
      lines={["欢迎来到", "Verdigris", "", ""]}
      maxLines={2}
      title="编辑告示牌文字"
    />
  );
}
