import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { AbstractFurnaceScreen } from "../abstract-furnace-screen/index";

export interface BlastFurnaceScreenProps {
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
 * 高炉界面（规格 §6）：`container/blast_furnace.png` 176×166。
 */
export function BlastFurnaceScreen(properties: BlastFurnaceScreenProps) {
  return (
    <AbstractFurnaceScreen
      background="container/blast_furnace.png"
      progressPrefix="sprites/container/blast_furnace"
      {...properties}
    />
  );
}
