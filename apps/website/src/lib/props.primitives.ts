import type { PropDoc } from "./props-types";

export const primitivesProps: Record<string, PropDoc[]> = {
  "badge": [
    {
      default: `"default"`,
      description: "视觉变体：default 物品数量（白字黑影）/ dim 次要信息（暗灰）/ gold 稀有或标题（金色）。",
      descriptionEn: "Visual variant: default item count (white text with shadow) / dim secondary info / gold rare or title.",
      name: "variant",
      type: `"default" | "dim" | "gold"`,
    },
  ],
  "button": [
    {
      description: "视觉变体：default 石纹 / success 主行动绿 / ghost 透明。",
      descriptionEn: "Visual variant: default stone / success primary-action green / ghost transparent.",
      name: "variant",
      type: `"default" | "ghost" | "realms" | "success"`,
    },
  ],
  "checkbox": [],
  "dialog": [
    {
      default: `"panel"`,
      description: "弹窗外观：panel 居中窗口面板 / overlay 全屏无底板（暂停、死亡界面）。仅 DialogPopup。",
      descriptionEn: "Popup appearance: panel centered window panel / overlay fullscreen without backdrop (pause, death screen). DialogPopup only.",
      name: "variant",
      type: `"overlay" | "panel"`,
    },
  ],
  "input": [],
  "progress": [
    {
      default: `"purple"`,
      description: "Boss 条颜色（仅 variant=\"boss\"）。",
      descriptionEn: "Boss bar color (variant=\"boss\" only).",
      name: "color",
      type: `"blue" | "green" | "pink" | "purple" | "red" | "white" | "yellow"`,
    },
    {
      description: "Boss 条分段数（仅 variant=\"boss\"；省略为连续条）。",
      descriptionEn: "Boss bar notch count (variant=\"boss\" only; omit for a continuous bar).",
      name: "notched",
      type: `6 | 10 | 12 | 20`,
    },
    {
      default: `"xp"`,
      description: "填充变体：xp 经验条 / boss Boss 条。",
      descriptionEn: "Fill variant: xp experience bar / boss boss bar.",
      name: "variant",
      type: `"boss" | "xp"`,
    },
  ],
  "radio-group": [],
  "scroll-area": [],
  "select": [
    {
      description: "追加到触发器与根元素的类名。",
      descriptionEn: "Class name appended to the root and trigger elements.",
      name: "className",
      type: "string",
    },
  ],
  "slider": [],
  "switch": [],
  "tabs": [
    {
      default: `"plain"`,
      description: "面板外观：panel 自带窗口面板纹理 / plain 无纹理无内边距（嵌在已有面板内时用）。仅 TabsPanel。",
      descriptionEn: "Panel appearance: panel with window panel texture / plain without texture or padding (for embedding in an existing panel). TabsPanel only.",
      name: "variant",
      type: `"panel" | "plain"`,
    },
  ],
  "tooltip": [],
};
