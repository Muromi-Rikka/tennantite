import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { AbstractFurnaceScreen } from "../abstract-furnace-screen/index";

export interface SmokerScreenProps {
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
 * 烟熏炉界面（规格 §6）：`container/smoker.png` 176×166。
 */
export function SmokerScreen(properties: SmokerScreenProps) {
  return (
    <AbstractFurnaceScreen
      background="container/smoker.png"
      progressPrefix="sprites/container/smoker"
      {...properties}
    />
  );
}
