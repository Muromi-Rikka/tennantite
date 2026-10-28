import type { GuiSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { CroppedProgress, RecipeBookButton } from "../screen-parts";
import { ScreenItemSlot } from "../screen-slot";

export interface AbstractFurnaceScreenProps {
  background: GuiSpriteName;
  burnProgress?: number;
  className?: string;
  cookProgress?: number;
  fuel?: ScreenSlot;
  input?: ScreenSlot;
  onRecipeBook?: () => void;
  onTakeOutput?: () => void;
  output?: ScreenSlot;
  progressPrefix: string;
  title?: ReactNode;
}

/**
 * 熔炉 / 高炉 / 烟熏炉共享布局（规格 §6）：176×166，火焰 14×14 与箭头 24×16。
 */
export function AbstractFurnaceScreen({
  background,
  burnProgress = 0,
  className,
  cookProgress = 0,
  fuel,
  input,
  onRecipeBook,
  onTakeOutput,
  output,
  progressPrefix,
  title,
}: AbstractFurnaceScreenProps) {
  return (
    <ScreenPanel
      background={background}
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot item={input} label="furnace-input" left={55} top={16} />
      <ScreenItemSlot item={fuel} label="furnace-fuel" left={55} top={52} />
      <ScreenItemSlot
        item={output}
        label="furnace-output"
        left={111}
        onActivate={onTakeOutput}
        size={26}
        top={30}
      />
      <CroppedProgress
        direction="up"
        height={14}
        label="燃料燃烧进度"
        left={56}
        name={`${progressPrefix}/lit_progress.png` as GuiSpriteName}
        progress={burnProgress}
        top={34}
        width={14}
      />
      <CroppedProgress
        height={16}
        label="熔炼进度"
        left={79}
        name={`${progressPrefix}/burn_progress.png` as GuiSpriteName}
        progress={cookProgress}
        top={34}
        width={24}
      />
      <RecipeBookButton left={5} onClick={onRecipeBook} top={34} />
      <PlayerInventory bare />
    </ScreenPanel>
  );
}
