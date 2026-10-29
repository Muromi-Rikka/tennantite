import { IfSprite } from "./index";

export function IfSpriteDemo() {
  return (
    <div className="flex items-start gap-4">
      <IfSprite crop="slot" height={18} name="titanium_background" width={18} />
      <IfSprite crop="tankNormal" height={56} name="titanium_background" width={18} />
      <IfSprite crop="augmentPanel" height={84} name="titanium_background" width={30} />
      <IfSprite crop="donateIcon" height={15} name="donate" width={15} />
    </div>
  );
}
