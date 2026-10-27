import { Tooltip, TooltipPopup, TooltipTrigger } from "./index";

/**
 * Tooltip 预览用例：物品悬浮提示
*/
export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger className="mc-tex-slot block size-18">
        <span className="sr-only">附魔金苹果</span>
      </TooltipTrigger>
      <TooltipPopup>
        <span className="text-mc-gold">附魔金苹果</span>
        <div className="text-mc-purple">伤害吸收 IV（0:05）</div>
        <div className="text-mc-gray">minecraft:enchanted_golden_apple</div>
      </TooltipPopup>
    </Tooltip>
  );
}
