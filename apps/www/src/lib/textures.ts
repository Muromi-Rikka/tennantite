export interface TextureRow {
  className: string;
  usage: string;
}

export const textureRows: TextureRow[] = [
  { className: "mc-tex-btn", usage: "按钮常态" },
  { className: "mc-tex-btn--hover", usage: "按钮悬停 / 聚焦" },
  { className: "mc-tex-btn--disabled", usage: "按钮禁用" },
  { className: "mc-tex-btn-success", usage: "主行动按钮" },
  { className: "mc-tex-panel", usage: "窗口面板" },
  { className: "mc-tex-panel-dark", usage: "半透明暗底" },
  { className: "mc-tex-slot", usage: "物品格槽位" },
  { className: "mc-slot-selected", usage: "选中槽位" },
  { className: "mc-tex-text-field", usage: "文本输入框" },
  { className: "mc-tex-slider-track", usage: "滑条轨道" },
  { className: "mc-tex-slider-thumb", usage: "滑条把手" },
  { className: "mc-tex-checkbox", usage: "复选框" },
  { className: "mc-tex-tab", usage: "标签页" },
  { className: "mc-tex-tooltip", usage: "Tooltip" },
  { className: "mc-tex-hotbar", usage: "热键栏" },
  { className: "mc-tex-hotbar-selection", usage: "热键选中框" },
  { className: "mc-tex-xp-bg", usage: "经验条背景" },
  { className: "mc-tex-xp-fill", usage: "经验条填充" },
  { className: "mc-tex-boss-bg", usage: "Boss 条背景" },
  { className: "mc-tex-boss-fill", usage: "Boss 条填充" },
  { className: "mc-tex-flame", usage: "熔炉火焰" },
  { className: "mc-tex-arrow", usage: "熔炉箭头" },
  { className: "mc-tex-craft-arrow", usage: "合成箭头" },
  { className: "mc-tex-brew-arrow", usage: "酿造箭头" },
  { className: "mc-tex-bubbles", usage: "酿造气泡" },
  { className: "mc-tex-dirt", usage: "泥土平铺" },
];
