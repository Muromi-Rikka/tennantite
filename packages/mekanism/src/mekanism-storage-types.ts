import type { MekanismSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import type { ScreenSlot } from "@tennantite/ui";
import type { MekanismEditMode, MekanismSecurityMode, MekanismWindowKind } from "./mekanism-types";

export interface MekanismChemicalContents {
  amount: number;
  capacity: number;
  fill?: MekanismSpriteName;
  tint?: string;
}

export interface MekanismFluidContents {
  amount: number;
  capacity: number;
  fill?: MekanismSpriteName;
  tint?: string;
}

export interface MekanismStorageScreenProps {
  armor?: ScreenSlot[];
  className?: string;
  defaultWindows?: MekanismWindowKind[];
  editMode?: MekanismEditMode;
  offhand?: ScreenSlot;
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  onWindowsChange?: (windows: MekanismWindowKind[]) => void;
  playerName?: ReactNode;
  security?: MekanismSecurityMode;
  title?: ReactNode;
  warning?: boolean;
}
