import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { AbstractFurnaceScreen } from "../abstract-furnace-screen/index";

export interface FurnaceScreenProps {
  burnProgress?: number;
  className?: string;
  cookProgress?: number;
  fuel?: ScreenSlot;
  input?: ScreenSlot;
  onRecipeBook?: () => void;
  onTakeOutput?: () => void;
  output?: ScreenSlot;
  title?: ReactNode;
}

/**
 * 熔炉界面（规格 §6）：`container/furnace.png` 176×166。
 */
export function FurnaceScreen(properties: FurnaceScreenProps) {
  return (
    <AbstractFurnaceScreen
      background="container/furnace.png"
      progressPrefix="sprites/container/furnace"
      {...properties}
    />
  );
}
