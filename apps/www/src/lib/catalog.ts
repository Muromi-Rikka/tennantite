import type { Locale } from "../i18n";
import { localeHref } from "../i18n";
import { componentDescriptionsEn, componentGroupTextEn } from "./catalog-en";

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
    description: "原版 20×20 checkbox / checkbox_selected 精灵复选框。",
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
    description: "原版 text_field / text_field_highlighted 1px 边框文本输入。",
    exports: ["Input"],
    group: "primitives",
    name: "Input",
    slug: "input",
    sourceDir: "packages/ui/src/primitives/input",
  },
  {
    description: "原版 182×5 经验条与 7 色 / 4 种 notched Boss 条，按比例裁剪。",
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
    description: "原版 20px slider 轨道 + 8×20 slider_handle 把手。",
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
    description: "130×24 原版 tab / tab_selected / highlighted 标签页。",
    exports: ["Tabs", "TabsList", "TabsPanel", "TabsTab"],
    group: "primitives",
    name: "Tabs",
    slug: "tabs",
    sourceDir: "packages/ui/src/primitives/tabs",
  },
  {
    description: "原版 tooltip/background + frame 九宫格 + 白字投影的物品提示。",
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
    description: "32×2 header / inworld / footer separator 平铺。",
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
    description: "230×219 信标面板 + 5 主 / 1 辅助效果按钮 + 支付材料行 + 支付槽 + 完成 / 取消。",
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
    description: "无面板的消息历史 + 200×20 输入框。",
    exports: ["ChatScreen"],
    group: "menus",
    name: "ChatScreen",
    slug: "chat-screen",
    sourceDir: "packages/ui/src/screens/menus/chat-screen",
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
    description: "原版 GUI PNG 渲染器：裁剪、平铺、九宫格与缩放。",
    exports: ["GuiSprite"],
    group: "containers",
    name: "GuiSprite",
    slug: "gui-sprite",
    sourceDir: "packages/ui/src/containers/gui-sprite",
  },
  {
    description: "准星/快捷栏攻击蓄力指示器。",
    exports: ["AttackIndicator"],
    group: "hud",
    name: "AttackIndicator",
    slug: "attack-indicator",
    sourceDir: "packages/ui/src/screens/hud/attack-indicator",
  },
  {
    description: "原版 182×5 跳跃蓄力条。",
    exports: ["JumpBar"],
    group: "hud",
    name: "JumpBar",
    slug: "jump-bar",
    sourceDir: "packages/ui/src/screens/hud/jump-bar",
  },
  {
    description: "原版定位条与 9×9 方向点位。",
    exports: ["LocatorBar"],
    group: "hud",
    name: "LocatorBar",
    slug: "locator-bar",
    sourceDir: "packages/ui/src/screens/hud/locator-bar",
  },
  {
    description: "176×166 高炉界面，火焰/箭头进度。",
    exports: ["BlastFurnaceScreen"],
    group: "screens",
    name: "BlastFurnaceScreen",
    slug: "blast-furnace-screen",
    sourceDir: "packages/ui/src/screens/containers/blast-furnace-screen",
  },
  {
    description: "176×166 烟熏炉界面。",
    exports: ["SmokerScreen"],
    group: "screens",
    name: "SmokerScreen",
    slug: "smoker-screen",
    sourceDir: "packages/ui/src/screens/containers/smoker-screen",
  },
  {
    description: "176×166 潜影盒界面，3×9 内容格。",
    exports: ["ShulkerBoxScreen"],
    group: "screens",
    name: "ShulkerBoxScreen",
    slug: "shulker-box-screen",
    sourceDir: "packages/ui/src/screens/containers/shulker-box-screen",
  },
  {
    description: "176×133 漏斗界面，5 槽 + 2 行背包。",
    exports: ["HopperScreen"],
    group: "screens",
    name: "HopperScreen",
    slug: "hopper-screen",
    sourceDir: "packages/ui/src/screens/containers/hopper-screen",
  },
  {
    description: "176×166 发射器/投掷器界面，3×3 槽。",
    exports: ["DispenserScreen"],
    group: "screens",
    name: "DispenserScreen",
    slug: "dispenser-screen",
    sourceDir: "packages/ui/src/screens/containers/dispenser-screen",
  },
  {
    description: "176×166 马/羊驼界面，鞍、马铠与可选箱子。",
    exports: ["HorseScreen"],
    group: "screens",
    name: "HorseScreen",
    slug: "horse-screen",
    sourceDir: "packages/ui/src/screens/containers/horse-screen",
  },
  {
    description: "176×166 制图台界面与地图覆盖层。",
    exports: ["CartographyTableScreen"],
    group: "screens",
    name: "CartographyTableScreen",
    slug: "cartography-table-screen",
    sourceDir: "packages/ui/src/screens/containers/cartography-table-screen",
  },
  {
    description: "176×166 砂轮界面与错误叉。",
    exports: ["GrindstoneScreen"],
    group: "screens",
    name: "GrindstoneScreen",
    slug: "grindstone-screen",
    sourceDir: "packages/ui/src/screens/containers/grindstone-screen",
  },
  {
    description: "176×166 织布机界面，旗帜/染料/图案与结果槽。",
    exports: ["LoomScreen"],
    group: "screens",
    name: "LoomScreen",
    slug: "loom-screen",
    sourceDir: "packages/ui/src/screens/containers/loom-screen",
  },
  {
    description: "176×166 锻造台界面，模板/底物/添加物与结果。",
    exports: ["SmithingScreen"],
    group: "screens",
    name: "SmithingScreen",
    slug: "smithing-screen",
    sourceDir: "packages/ui/src/screens/containers/smithing-screen",
  },
  {
    description: "176×166 切石机界面与配方列表。",
    exports: ["StonecutterScreen"],
    group: "screens",
    name: "StonecutterScreen",
    slug: "stonecutter-screen",
    sourceDir: "packages/ui/src/screens/containers/stonecutter-screen",
  },
  {
    description: "176×166 合成器界面，3×3 网格与红石状态。",
    exports: ["CrafterScreen"],
    group: "screens",
    name: "CrafterScreen",
    slug: "crafter-screen",
    sourceDir: "packages/ui/src/screens/containers/crafter-screen",
  },
  {
    description: "176×166 鹦鹉螺界面，鞍/鹦鹉螺铠槽。",
    exports: ["NautilusScreen"],
    group: "screens",
    name: "NautilusScreen",
    slug: "nautilus-screen",
    sourceDir: "packages/ui/src/screens/containers/nautilus-screen",
  },
  {
    description: "195×196 创造物品栏，上下 7 标签与 9×5 网格。",
    exports: ["CreativeInventoryScreen"],
    group: "screens",
    name: "CreativeInventoryScreen",
    slug: "creative-inventory-screen",
    sourceDir: "packages/ui/src/screens/containers/creative-inventory-screen",
  },
  {
    description: "125×75 游戏模式切换器与选中框。",
    exports: ["GamemodeSwitcher"],
    group: "screens",
    name: "GamemodeSwitcher",
    slug: "gamemode-switcher",
    sourceDir: "packages/ui/src/screens/containers/gamemode-switcher",
  },
  {
    description: "160×32 Toast、堆栈与 8×8 通知角标。",
    exports: ["Toast", "ToastStack", "NotificationBadge"],
    group: "menus",
    name: "Toast",
    slug: "toast",
    sourceDir: "packages/ui/src/screens/menus/toast",
  },
];

export const blocks = components.filter(component => component.group === "screens" || component.group === "menus");

export function blockHref(slug: string, locale: Locale): string {
  return localeHref(locale, `/blocks/${slug}/`);
}

export function catalogDescription(entry: CatalogEntry, locale: Locale): string {
  return locale === "en" ? componentDescriptionsEn[entry.slug] ?? entry.description : entry.description;
}

export function componentHref(slug: string, locale: Locale): string {
  return localeHref(locale, `/components/${slug}/`);
}

export function findBlock(slug: string) {
  return blocks.find(block => block.slug === slug);
}

export function findComponent(slug: string) {
  return components.find(component => component.slug === slug);
}

export function findComponentByName(name: string) {
  return components.find(component => component.name === name);
}

export function getBlockPager(slug: string, locale: Locale): CatalogPager {
  const index = blocks.findIndex(block => block.slug === slug);
  if (index === -1) {
    return {};
  }
  const prev = blocks[index - 1];
  const next = blocks[index + 1];
  return {
    ...(prev && { prev: { href: blockHref(prev.slug, locale), title: blockTitle(prev, locale) } }),
    ...(next && { next: { href: blockHref(next.slug, locale), title: blockTitle(next, locale) } }),
  };
}

export function getComponentPager(slug: string, locale: Locale): CatalogPager {
  const index = components.findIndex(component => component.slug === slug);
  if (index === -1) {
    return {};
  }
  const prev = components[index - 1];
  const next = components[index + 1];
  return {
    ...(prev && { prev: pagerItem(prev, locale) }),
    ...(next && { next: pagerItem(next, locale) }),
  };
}

export function groupText(group: ComponentGroup, locale: Locale) {
  return locale === "en" ? componentGroupTextEn[group.id] : { description: group.description, title: group.title };
}

export function previewHref(slug: string, locale: Locale): string {
  return localeHref(locale, `/preview/${slug}/`);
}

function pagerItem(entry: CatalogEntry, locale: Locale): CatalogPagerItem {
  return { href: componentHref(entry.slug, locale), title: entry.name };
}

/**
 * Block 页面使用的中文界面名；组件页仍保留组件类名。
 */
export const blockTitlesZh: Record<string, string> = {
  "anvil-screen": "铁砧界面",
  "beacon-screen": "信标界面",
  "blast-furnace-screen": "高炉界面",
  "brewing-stand-screen": "酿造台界面",
  "cartography-table-screen": "制图台界面",
  "chat-screen": "聊天界面",
  "chest-screen": "箱子界面",
  "crafter-screen": "合成器界面",
  "crafting-screen": "工作台界面",
  "creative-inventory-screen": "创造物品栏",
  "dispenser-screen": "发射器界面",
  "enchanting-screen": "附魔台界面",
  "furnace-screen": "熔炉界面",
  "gamemode-switcher": "游戏模式切换器",
  "grindstone-screen": "砂轮界面",
  "hopper-screen": "漏斗界面",
  "horse-screen": "马界面",
  "inventory-screen": "物品栏",
  "loom-screen": "织布机界面",
  "main-menu": "主菜单",
  "nautilus-screen": "鹦鹉螺界面",
  "shulker-box-screen": "潜影盒界面",
  "smithing-screen": "锻造台界面",
  "smoker-screen": "烟熏炉界面",
  "stonecutter-screen": "切石机界面",
  "toast": "通知提示",
  "trading-screen": "村民交易界面",
};

export function blockTitle(entry: CatalogEntry, locale: Locale): string {
  return locale === "zh" ? blockTitlesZh[entry.slug] ?? entry.name : entry.name;
}
