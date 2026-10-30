import { IeSprite } from "./index";

/**
 * IeSprite 预览用例：焦炉整屏贴图（左上角 GUI 区裁剪）与 20×51 罐 overlay。
 */
export function IeSpriteDemo() {
  return (
    <div className="relative h-[180px] w-[200px] overflow-hidden">
      <IeSprite
        height={166}
        name="coke_oven"
        src={{ height: 166, width: 176, x: 0, y: 0 }}
        width={176}
      />
      <IeSprite left={150} name="sprites/coke_oven/tank_overlay" top={20} />
    </div>
  );
}
