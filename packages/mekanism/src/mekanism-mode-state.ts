import type {
  MekanismDataType,
  MekanismEditMode,
  MekanismRedstoneMode,
  MekanismSecurityMode,
} from "./mekanism-types";

export const MEKANISM_EDIT_ORDER: MekanismEditMode[] = ["both", "fill", "empty"];
export const MEKANISM_REDSTONE_ORDER: MekanismRedstoneMode[] = ["disabled", "high", "low", "pulse"];
export const MEKANISM_SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];
export const MEKANISM_SIDE_ORDER: MekanismDataType[] = ["NONE", "INPUT", "OUTPUT", "ENERGY"];

export const MEKANISM_SECURITY_LABELS: Record<MekanismSecurityMode, string> = {
  private: "私有",
  protected: "受信任",
  public: "公开",
};

export function mekanismNextEdit(mode: MekanismEditMode): MekanismEditMode {
  return MEKANISM_EDIT_ORDER[(MEKANISM_EDIT_ORDER.indexOf(mode) + 1) % MEKANISM_EDIT_ORDER.length] ?? "both";
}

export function mekanismNextRedstone(mode: MekanismRedstoneMode): MekanismRedstoneMode {
  return MEKANISM_REDSTONE_ORDER[
    (MEKANISM_REDSTONE_ORDER.indexOf(mode) + 1) % MEKANISM_REDSTONE_ORDER.length
  ] ?? "disabled";
}

export function mekanismNextSecurity(mode: MekanismSecurityMode): MekanismSecurityMode {
  return MEKANISM_SECURITY_ORDER[
    (MEKANISM_SECURITY_ORDER.indexOf(mode) + 1) % MEKANISM_SECURITY_ORDER.length
  ] ?? "public";
}

export function mekanismNextSide(side: MekanismDataType): MekanismDataType {
  return MEKANISM_SIDE_ORDER[
    (MEKANISM_SIDE_ORDER.indexOf(side) + 1) % MEKANISM_SIDE_ORDER.length
  ] ?? "NONE";
}
