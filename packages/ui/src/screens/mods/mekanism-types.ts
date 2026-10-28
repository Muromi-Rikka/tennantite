export type MekanismDataType
  = | "ENERGY"
    | "EXTRA"
    | "INPUT"
    | "INPUT_2"
    | "INPUT_OUTPUT"
    | "NONE"
    | "OUTPUT"
    | "OUTPUT_2";

export type MekanismEditMode = "both" | "empty" | "fill";

export type MekanismGaugeKind = "chemical" | "energy" | "fluid";

export type MekanismGaugeType = "medium" | "small" | "small-med" | "standard" | "wide";

export type MekanismProgressType
  = | "BAR"
    | "BI"
    | "DOWN"
    | "FLAME"
    | "INSTALLING"
    | "LARGE_LEFT"
    | "LARGE_RIGHT"
    | "RIGHT"
    | "SMALL_LEFT"
    | "SMALL_RIGHT"
    | "TALL_RIGHT"
    | "UNINSTALLING";

export type MekanismRedstoneMode = "disabled" | "high" | "low" | "pulse";

export type MekanismSecurityMode = "private" | "protected" | "public";

export type MekanismSide = "back" | "bottom" | "front" | "left" | "right" | "top";

export type MekanismSlotOverlay
  = | "check"
    | "formula"
    | "input"
    | "minus"
    | "output"
    | "plus"
    | "power"
    | "select"
    | "upgrade"
    | "x";

export type MekanismSlotType
  = | "dark"
    | "extra"
    | "inner-holder"
    | "input"
    | "input-2"
    | "normal"
    | "output"
    | "output-2"
    | "power";

export type MekanismTabKind
  = | "boiler"
    | "config"
    | "edit"
    | "energy"
    | "heat"
    | "matrix"
    | "redstone"
    | "security"
    | "sorting"
    | "transporter"
    | "upgrade"
    | "visuals"
    | "warning";

export type MekanismTransmission = "chemical" | "energy" | "fluid" | "heat" | "item";

export type MekanismWindowKind = "side-config" | "upgrade";
