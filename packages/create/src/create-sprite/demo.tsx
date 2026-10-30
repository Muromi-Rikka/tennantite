import { CreateSprite } from "./index";

/**
 * CreateSprite 预览用例：机器整图底版（176×166）与缩放后的图集图标。
 */
export function CreateSpriteDemo() {
  return (
    <div className="relative h-[240px] w-[200px]">
      <CreateSprite name="machine-background" />
      <CreateSprite height={56} left={10} name="icons" top={174} width={56} />
    </div>
  );
}
