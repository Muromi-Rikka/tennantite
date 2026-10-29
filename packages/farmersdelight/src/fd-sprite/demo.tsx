import { FdSprite } from "./index";

export function FdSpriteDemo() {
  return (
    <div className="relative size-64">
      <FdSprite crop={{ height: 166, width: 176, x: 0, y: 0 }} name="cooking_pot" />
    </div>
  );
}
