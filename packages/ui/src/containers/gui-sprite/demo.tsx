import { GuiSprite } from "./index";

/**
 * GuiSprite 预览用例（规格 §6）
 */
export function GuiSpriteDemo() {
  return (
    <div className="flex items-end gap-8">
      <GuiSprite name="container/inventory.png" src={{ height: 166, width: 176, x: 0, y: 0 }} />
      <GuiSprite height={20} name="sprites/widget/button.png" slice={3} width={160} />
      <GuiSprite height={18} name="sprites/recipe_book/button.png" width={20} />
    </div>
  );
}
