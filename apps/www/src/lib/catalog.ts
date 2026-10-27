export interface CatalogEntry {
  description: string;
  exports: string[];
  group: ComponentGroupId;
  name: string;
  slug: string;
  sourceDir: string;
}

export interface CatalogPager {
  next?: CatalogPagerItem;
  prev?: CatalogPagerItem;
}

export interface CatalogPagerItem {
  href: string;
  title: string;
}

export interface ComponentGroup {
  description: string;
  id: ComponentGroupId;
  level: "L1" | "L2" | "L3";
  title: string;
}

export type ComponentGroupId = "containers" | "hud" | "menus" | "primitives" | "screens";

export const componentGroups: ComponentGroup[] = [
  { description: "无状态或 Base UI 封装的基础控件。", id: "primitives", level: "L1", title: "原语" },
  { description: "面板、槽位、图标等组合基元。", id: "containers", level: "L2", title: "容器" },
  { description: "叠在游戏画面上的状态层。", id: "hud", level: "L3", title: "HUD" },
  { description: "按原版坐标拼装的容器整屏。", id: "screens", level: "L3", title: "容器界面" },
  { description: "标题、设置、聊天等全屏菜单。", id: "menus", level: "L3", title: "菜单界面" },
];

export const components: CatalogEntry[] = [
  {
    description: "物品数量与稀有标识的计数徽标，纯样式，含 default / dim / gold 三种变体。",
    exports: ["Badge"],
    group: "primitives",
    name: "Badge",
    slug: "badge",
    sourceDir: "packages/ui/src/primitives/badge",
  },
  {
    description: "原版几何的石纹按钮，含 default / success / ghost 三种视觉变体。",
    exports: ["Button"],
    group: "primitives",
    name: "Button",
    slug: "button",
    sourceDir: "packages/ui/src/primitives/button",
  },
  {
    description: "深灰槽 + 1 GUI px 黑框的复选框，选中态绘制白色对勾。",
    exports: ["Checkbox"],
    group: "primitives",
    name: "Checkbox",
    slug: "checkbox",
    sourceDir: "packages/ui/src/primitives/checkbox",
  },
  {
    description: "基于 Base UI Dialog 的模态弹窗：半透明遮罩 + 暗面板。",
    exports: ["Dialog", "DialogBackdrop", "DialogClose", "DialogDescription", "DialogPopup", "DialogTitle", "DialogTrigger"],
    group: "primitives",
    name: "Dialog",
    slug: "dialog",
    sourceDir: "packages/ui/src/primitives/dialog",
  },
  {
    description: "黑底 + 1 GUI px 灰框的文本输入，聚焦时边框变白。",
    exports: ["Input"],
    group: "primitives",
    name: "Input",
    slug: "input",
    sourceDir: "packages/ui/src/primitives/input",
  },
  {
    description: "原版 5 GUI px 高、按 182 GUI px 定宽裁剪的进度条，含经验 / Boss 纹理。",
    exports: ["Progress"],
    group: "primitives",
    name: "Progress",
    slug: "progress",
    sourceDir: "packages/ui/src/primitives/progress",
  },
  {
    description: "黑框选项 + 8×8 白色方块指示器的单选组。",
    exports: ["Radio", "RadioGroup"],
    group: "primitives",
    name: "RadioGroup",
    slug: "radio-group",
    sourceDir: "packages/ui/src/primitives/radio-group",
  },
  {
    description: "原生滚动 + 像素滚动条样式，无额外 JS。",
    exports: ["ScrollArea"],
    group: "primitives",
    name: "ScrollArea",
    slug: "scroll-area",
    sourceDir: "packages/ui/src/primitives/scroll-area",
  },
  {
    description: "石纹触发器 + 窗口面板下拉列表（Base UI Select）。",
    exports: ["Select", "SelectIcon", "SelectItem", "SelectList", "SelectPopup", "SelectTrigger", "SelectValue"],
    group: "primitives",
    name: "Select",
    slug: "select",
    sourceDir: "packages/ui/src/primitives/select",
  },
  {
    description: "深灰轨道 + 按钮浮雕把手的原版滑条。",
    exports: ["Slider"],
    group: "primitives",
    name: "Slider",
    slug: "slider",
    sourceDir: "packages/ui/src/primitives/slider",
  },
  {
    description: "槽位凹槽轨道 + 20×20 浮雕把手的开关。",
    exports: ["Switch"],
    group: "primitives",
    name: "Switch",
    slug: "switch",
    sourceDir: "packages/ui/src/primitives/switch",
  },
  {
    description: "24 GUI px 高的原版标签页，用于配方书 / 设置分页。",
    exports: ["Tabs", "TabsList", "TabsPanel", "TabsTab"],
    group: "primitives",
    name: "Tabs",
    slug: "tabs",
    sourceDir: "packages/ui/src/primitives/tabs",
  },
  {
    description: "94% 深紫底 + 渐变边框 + 白字投影的物品提示。",
    exports: ["Tooltip", "TooltipPopup", "TooltipTrigger"],
    group: "primitives",
    name: "Tooltip",
    slug: "tooltip",
    sourceDir: "packages/ui/src/primitives/tooltip",
  },
  {
    description: "Panel + TitleBar + 内容区块的三段式卡片。",
    exports: ["Card"],
    group: "containers",
    name: "Card",
    slug: "card",
    sourceDir: "packages/ui/src/containers/card",
  },
  {
    description: "Base UI Separator 的像素浮雕分隔线，含 strong 单实线变体。",
    exports: ["Divider"],
    group: "containers",
    name: "Divider",
    slug: "divider",
    sourceDir: "packages/ui/src/containers/divider",
  },
  {
    description: "按列数 / 行数 / 间距编排物品格的纯布局网格。",
    exports: ["Grid"],
    group: "containers",
    name: "Grid",
    slug: "grid",
    sourceDir: "packages/ui/src/containers/grid",
  },
  {
    description: "16×16 像素图标容器，按 GUI px 放大且不模糊。",
    exports: ["Icon"],
    group: "containers",
    name: "Icon",
    slug: "icon",
    sourceDir: "packages/ui/src/containers/icon",
  },
  {
    description: "图标 + 数量徽标的最小物品单元。",
    exports: ["ItemStack"],
    group: "containers",
    name: "ItemStack",
    slug: "item-stack",
    sourceDir: "packages/ui/src/containers/item-stack",
  },
  {
    description: "九宫格纹理窗口容器，default 灰底 / dark 半透明两种变体。",
    exports: ["Panel"],
    group: "containers",
    name: "Panel",
    slug: "panel",
    sourceDir: "packages/ui/src/containers/panel",
  },
  {
    description: "主背包 3×9 + 快捷栏 1×9 的复用区块。",
    exports: ["PlayerInventory"],
    group: "containers",
    name: "PlayerInventory",
    slug: "player-inventory",
    sourceDir: "packages/ui/src/containers/player-inventory",
  },
  {
    description: "按原版容器尺寸（GUI px）定位的绝对坐标基座。",
    exports: ["ScreenPanel"],
    group: "containers",
    name: "ScreenPanel",
    slug: "screen-panel",
    sourceDir: "packages/ui/src/containers/screen-panel",
  },
  {
    description: "凹槽视觉的最小物品格，可选选中白框。",
    exports: ["Slot"],
    group: "containers",
    name: "Slot",
    slug: "slot",
    sourceDir: "packages/ui/src/containers/slot",
  },
  {
    description: "像素字体窗口标题，支持左 / 中 / 右对齐。",
    exports: ["TitleBar"],
    group: "containers",
    name: "TitleBar",
    slug: "title-bar",
    sourceDir: "packages/ui/src/containers/title-bar",
  },
  {
    description: "紫色标题 + 血条的 Boss 血条（overlay 语义）。",
    exports: ["BossBar"],
    group: "hud",
    name: "BossBar",
    slug: "boss-bar",
    sourceDir: "packages/ui/src/screens/hud/boss-bar",
  },
  {
    description: "纯 CSS 十字准星，可隐藏。",
    exports: ["Crosshair"],
    group: "hud",
    name: "Crosshair",
    slug: "crosshair",
    sourceDir: "packages/ui/src/screens/hud/crosshair",
  },
  {
    description: "绿色经验进度 + 中央等级徽标。",
    exports: ["ExperienceBar"],
    group: "hud",
    name: "ExperienceBar",
    slug: "experience-bar",
    sourceDir: "packages/ui/src/screens/hud/experience-bar",
  },
  {
    description: "生命 / 饥饿 / 护甲 / 氧气状态栏。",
    exports: ["HealthHungerBar"],
    group: "hud",
    name: "HealthHungerBar",
    slug: "health-hunger-bar",
    sourceDir: "packages/ui/src/screens/hud/health-hunger-bar",
  },
  {
    description: "原版 182×22、9 个 20×20 槽位的快捷栏。",
    exports: ["Hotbar"],
    group: "hud",
    name: "Hotbar",
    slug: "hotbar",
    sourceDir: "packages/ui/src/screens/hud/hotbar",
  },
  {
    description: "18×18 槽位 + 16×16 图标的纵向状态效果栏。",
    exports: ["StatusEffects"],
    group: "hud",
    name: "StatusEffects",
    slug: "status-effects",
    sourceDir: "packages/ui/src/screens/hud/status-effects",
  },
  {
    description: "110×16 名称输入 + 物品 / 材料 / 产物槽 + 等级费用。",
    exports: ["AnvilScreen"],
    group: "screens",
    name: "AnvilScreen",
    slug: "anvil-screen",
    sourceDir: "packages/ui/src/screens/containers/anvil-screen",
  },
  {
    description: "230×219 信标面板 + 主 / 副效果选择 + 支付槽 + 确认按钮。",
    exports: ["BeaconScreen"],
    group: "screens",
    name: "BeaconScreen",
    slug: "beacon-screen",
    sourceDir: "packages/ui/src/screens/containers/beacon-screen",
  },
  {
    description: "燃料 / 原料 / 3 瓶位 + 气泡与箭头裁剪进度。",
    exports: ["BrewingStandScreen"],
    group: "screens",
    name: "BrewingStandScreen",
    slug: "brewing-stand-screen",
    sourceDir: "packages/ui/src/screens/containers/brewing-stand-screen",
  },
  {
    description: "176×(114+18×rows) 面板，单箱 3 行 / 大箱 6 行。",
    exports: ["ChestScreen"],
    group: "screens",
    name: "ChestScreen",
    slug: "chest-screen",
    sourceDir: "packages/ui/src/screens/containers/chest-screen",
  },
  {
    description: "176×166 面板 + 3×3 合成格 + 26×26 结果槽与箭头。",
    exports: ["CraftingScreen"],
    group: "screens",
    name: "CraftingScreen",
    slug: "crafting-screen",
    sourceDir: "packages/ui/src/screens/containers/crafting-screen",
  },
  {
    description: "物品 + 青金石 + 3 个 108×19 选项按钮。",
    exports: ["EnchantingScreen"],
    group: "screens",
    name: "EnchantingScreen",
    slug: "enchanting-screen",
    sourceDir: "packages/ui/src/screens/containers/enchanting-screen",
  },
  {
    description: "输入 / 燃料 / 26×26 产物 + 火焰与箭头进度。",
    exports: ["FurnaceScreen"],
    group: "screens",
    name: "FurnaceScreen",
    slug: "furnace-screen",
    sourceDir: "packages/ui/src/screens/containers/furnace-screen",
  },
  {
    description: "176×166 面板 + 护甲 / 2×2 合成 / 背包 / 热键栏 / 副手。",
    exports: ["InventoryScreen"],
    group: "screens",
    name: "InventoryScreen",
    slug: "inventory-screen",
    sourceDir: "packages/ui/src/screens/containers/inventory-screen",
  },
  {
    description: "276×166 面板 + 98×116 交易列表 + 价签槽。",
    exports: ["TradingScreen"],
    group: "screens",
    name: "TradingScreen",
    slug: "trading-screen",
    sourceDir: "packages/ui/src/screens/containers/trading-screen",
  },
  {
    description: "Tabs 分类 + 26 GUI px 节点槽 + 缩进列表 + Tooltip 详情。",
    exports: ["AdvancementsScreen"],
    group: "menus",
    name: "AdvancementsScreen",
    slug: "advancements-screen",
    sourceDir: "packages/ui/src/screens/menus/advancements-screen",
  },
  {
    description: "无面板的消息历史 + 200×20 输入框。",
    exports: ["ChatScreen"],
    group: "menus",
    name: "ChatScreen",
    slug: "chat-screen",
    sourceDir: "packages/ui/src/screens/menus/chat-screen",
  },
  {
    description: "全屏暗红遮罩 + 白色标题 + 200×20 按钮栈（Dialog）。",
    exports: ["DeathScreen"],
    group: "menus",
    name: "DeathScreen",
    slug: "death-screen",
    sourceDir: "packages/ui/src/screens/menus/death-screen",
  },
  {
    description: "ScrollArea 语言列表 + 单选白色内框。",
    exports: ["LanguageScreen"],
    group: "menus",
    name: "LanguageScreen",
    slug: "language-screen",
    sourceDir: "packages/ui/src/screens/menus/language-screen",
  },
  {
    description: "泥土背景 + 标题 + 200×20 按钮栈。",
    exports: ["MainMenu"],
    group: "menus",
    name: "MainMenu",
    slug: "main-menu",
    sourceDir: "packages/ui/src/screens/menus/main-menu",
  },
  {
    description: "ScrollArea + Button 的服务器列表。",
    exports: ["MultiplayerScreen"],
    group: "menus",
    name: "MultiplayerScreen",
    slug: "multiplayer-screen",
    sourceDir: "packages/ui/src/screens/menus/multiplayer-screen",
  },
  {
    description: "全屏遮罩 + 居中标题与 200×20 按钮栈（Dialog）。",
    exports: ["PauseMenu"],
    group: "menus",
    name: "PauseMenu",
    slug: "pause-menu",
    sourceDir: "packages/ui/src/screens/menus/pause-menu",
  },
  {
    description: "Tabs 分类 + 9 列 18 GUI px 配方网格 + 解锁态。",
    exports: ["RecipeBook"],
    group: "menus",
    name: "RecipeBook",
    slug: "recipe-book",
    sourceDir: "packages/ui/src/screens/menus/recipe-book",
  },
  {
    description: "Tabs + Slider + Checkbox + RadioGroup 的设置分页。",
    exports: ["SettingsScreen"],
    group: "menus",
    name: "SettingsScreen",
    slug: "settings-screen",
    sourceDir: "packages/ui/src/screens/menus/settings-screen",
  },
  {
    description: "逐行 200×20 居中 Input，1..4 行。",
    exports: ["SignEdit"],
    group: "menus",
    name: "SignEdit",
    slug: "sign-edit",
    sourceDir: "packages/ui/src/screens/menus/sign-edit",
  },
];

export const blocks = components.filter(component => component.group === "screens" || component.group === "menus");

export function findBlock(slug: string) {
  return blocks.find(block => block.slug === slug);
}

export function findComponent(slug: string) {
  return components.find(component => component.slug === slug);
}

export function findComponentByName(name: string) {
  return components.find(component => component.name === name);
}

export function getBlockPager(slug: string): CatalogPager {
  const index = blocks.findIndex(block => block.slug === slug);
  if (index === -1) {
    return {};
  }
  const prev = blocks[index - 1];
  const next = blocks[index + 1];
  return {
    ...(prev && { prev: { href: `/blocks/${prev.slug}/`, title: prev.name } }),
    ...(next && { next: { href: `/blocks/${next.slug}/`, title: next.name } }),
  };
}

export function getComponentPager(slug: string): CatalogPager {
  const index = components.findIndex(component => component.slug === slug);
  if (index === -1) {
    return {};
  }
  const prev = components[index - 1];
  const next = components[index + 1];
  return {
    ...(prev && { prev: pagerItem(prev) }),
    ...(next && { next: pagerItem(next) }),
  };
}

function pagerItem(entry: CatalogEntry): CatalogPagerItem {
  return { href: `/components/${entry.slug}/`, title: entry.name };
}
