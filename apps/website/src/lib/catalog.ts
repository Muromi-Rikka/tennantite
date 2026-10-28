import type { Locale } from "../i18n";
import { localeHref } from "../i18n";
import { componentDescriptionsEn, componentGroupTextEn } from "./catalog-en";

export interface CatalogEntry {
  description: string;
  exports: string[];
  group: ComponentGroupId;
  /**
  * Mod 归属维度（整屏组件可省略，`group: "mods"` 已隐含）；"common" 为跨 mod 共享件。
  */
  mod?: ModId;
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

export type ComponentGroupId = "containers" | "hud" | "menus" | "mods" | "primitives" | "screens";

export const modIds = ["mekanism", "ic2", "ae2"] as const;

export type ModTarget = (typeof modIds)[number];

export type ModId = ModTarget | "common";

export const componentGroups: ComponentGroup[] = [
  { description: "无状态或 Base UI 封装的基础控件。", id: "primitives", level: "L1", title: "原语" },
  { description: "面板、槽位、图标等组合基元。", id: "containers", level: "L2", title: "容器" },
  { description: "叠在游戏画面上的状态层。", id: "hud", level: "L3", title: "HUD" },
  { description: "按原版坐标拼装的容器整屏。", id: "screens", level: "L3", title: "容器界面" },
  { description: "标题、设置、聊天等全屏菜单。", id: "menus", level: "L3", title: "菜单界面" },
  { description: "工业时代 2 / 应用能源 2 等 mod 界面：AE2 终端使用原版贴图，其余手绘复刻（数据注入、无游戏逻辑）。", id: "mods", level: "L3", title: "Mod 界面" },
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
  {
    description: "IC2 EU 能量表（1.12.2 原版贴图）：机器用红色闪电自下而上填充，储电箱用红色横条自左向右填充；悬浮显示 X / Y EU。",
    exports: ["Ic2EnergyGauge"],
    group: "containers",
    mod: "ic2",
    name: "Ic2EnergyGauge",
    slug: "ic2-energy-gauge",
    sourceDir: "packages/ic2/src/ic2-energy-gauge",
  },
  {
    description: "IC2 磨矿机界面（1.12.2 原版贴图）：输入 / 放电 / 26×26 产物槽、4 个升级槽、红色 EU 闪电与粉碎进度。",
    exports: ["MaceratorScreen"],
    group: "mods",
    mod: "ic2",
    name: "MaceratorScreen",
    slug: "macerator-screen",
    sourceDir: "packages/ic2/src/macerator-screen",
  },
  {
    description: "IC2 电炉界面（1.12.2 原版贴图）：输入 / 放电 / 26×26 产物槽、4 个升级槽、红色 EU 闪电与熔炼箭头进度。",
    exports: ["ElectricFurnaceScreen"],
    group: "mods",
    mod: "ic2",
    name: "ElectricFurnaceScreen",
    slug: "electric-furnace-screen",
    sourceDir: "packages/ic2/src/electric-furnace-screen",
  },
  {
    description: "IC2 提取机界面（1.12.2 原版贴图）：输入 / 放电 / 26×26 产物槽、4 个升级槽、红色 EU 闪电与滴落进度。",
    exports: ["ExtractorScreen"],
    group: "mods",
    mod: "ic2",
    name: "ExtractorScreen",
    slug: "extractor-screen",
    sourceDir: "packages/ic2/src/extractor-screen",
  },
  {
    description: "IC2 压缩机界面（1.12.2 原版贴图）：输入 / 放电 / 26×26 产物槽、4 个升级槽、红色 EU 闪电与三角进度。",
    exports: ["CompressorScreen"],
    group: "mods",
    mod: "ic2",
    name: "CompressorScreen",
    slug: "compressor-screen",
    sourceDir: "packages/ic2/src/compressor-screen",
  },
  {
    description: "IC2 储电箱界面（1.12.2 原版贴图）：4 个装备槽、充电 / 放电槽、红色 EU 横条、原版红石按钮与状态文字。",
    exports: ["BatBoxScreen"],
    group: "mods",
    mod: "ic2",
    name: "BatBoxScreen",
    slug: "batbox-screen",
    sourceDir: "packages/ic2/src/batbox-screen",
  },
  {
    description: "AE2 ME 终端（原版 terminal.png 切片，默认 6 行 195×222）：9 列物品网格、搜索框、滚动条、玩家背包与左侧工具栏。",
    exports: ["Ae2TerminalScreen"],
    group: "mods",
    mod: "ae2",
    name: "Ae2TerminalScreen",
    slug: "ae2-terminal-screen",
    sourceDir: "packages/ae2/src/ae2-terminal-screen",
  },
  {
    description: "AE2 合成终端（原版 crafting.png 切片，默认 6 行 195×295）：物品网格 + 3×3 合成格、清空按钮、26×26 结果槽与玩家背包。",
    exports: ["Ae2CraftingTerminalScreen"],
    group: "mods",
    mod: "ae2",
    name: "Ae2CraftingTerminalScreen",
    slug: "ae2-crafting-terminal-screen",
    sourceDir: "packages/ae2/src/ae2-crafting-terminal-screen",
  },
  {
    description: "AE2 压印器（原版 inscriber.png 切片，177×176 + 右侧升级槽条）：3 个压印/输入槽、26×26 输出槽、竖向进度条与玩家背包。",
    exports: ["Ae2InscriberScreen"],
    group: "mods",
    mod: "ae2",
    name: "Ae2InscriberScreen",
    slug: "ae2-inscriber-screen",
    sourceDir: "packages/ae2/src/ae2-inscriber-screen",
  },
  {
    description: "176×201 ME 驱动器界面：2×5 存储元件槽、优先级标签与玩家背包。",
    exports: ["Ae2DriveScreen"],
    group: "mods",
    mod: "ae2",
    name: "Ae2DriveScreen",
    slug: "ae2-drive-screen",
    sourceDir: "packages/ae2/src/ae2-drive-screen",
  },
  {
    description: "176×168 ME 箱子界面：单个存储元件槽、优先级标签与玩家背包。",
    exports: ["Ae2ChestScreen"],
    group: "mods",
    mod: "ae2",
    name: "Ae2ChestScreen",
    slug: "ae2-chest-screen",
    sourceDir: "packages/ae2/src/ae2-chest-screen",
  },
  {
    description: "Mekanism 26.3 机器总览：26 台单方块机器共用一套布局表（槽位 / 仪表 / 进度 / 标签 / 侧配置 / 升级窗口）。",
    exports: ["MekanismMachineScreen", "MEKANISM_MACHINES", "MEKANISM_MACHINE_TITLES"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismMachineScreen",
    slug: "mekanism-machine-screen",
    sourceDir: "packages/mekanism/src/mekanism-machine-screen",
  },
  {
    description: "Mekanism 能量立方：176×166，WIDE 能量仪表、充放电槽、右侧 4 甲 + 副手装备栏与安全标签。",
    exports: ["MekanismEnergyCubeScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismEnergyCubeScreen",
    slug: "mekanism-energy-cube-screen",
    sourceDir: "packages/mekanism/src/mekanism-energy-cube-screen",
  },
  {
    description: "Mekanism 流体储罐：176×166，WIDE 流体仪表、输入/输出槽、左侧装备栏与安全/编辑标签。",
    exports: ["MekanismFluidTankScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismFluidTankScreen",
    slug: "mekanism-fluid-tank-screen",
    sourceDir: "packages/mekanism/src/mekanism-fluid-tank-screen",
  },
  {
    description: "Mekanism 化学储罐：176×166，横向化学条、内屏、倾倒模式、输入/输出槽与左侧装备栏。",
    exports: ["MekanismChemicalTankScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismChemicalTankScreen",
    slug: "mekanism-chemical-tank-screen",
    sourceDir: "packages/mekanism/src/mekanism-chemical-tank-screen",
  },
  {
    description: "Mekanism 感应矩阵：176×166，34×56 能量仪表、内屏、两个元件槽、左侧装备栏与能量/矩阵标签。",
    exports: ["MekanismInductionMatrixScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismInductionMatrixScreen",
    slug: "mekanism-induction-matrix-screen",
    sourceDir: "packages/mekanism/src/mekanism-induction-matrix-screen",
  },
  {
    description: "Mekanism 动态储罐：176×166，34×56 合并流体/化学仪表、内屏、两个内容槽与左侧装备栏。",
    exports: ["MekanismDynamicTankScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismDynamicTankScreen",
    slug: "mekanism-dynamic-tank-screen",
    sourceDir: "packages/mekanism/src/mekanism-dynamic-tank-screen",
  },
  {
    description: "Mekanism 热力锅炉：218×166，四联化学/流体仪表、两条竖向速率条、内屏与警告标签。",
    exports: ["MekanismThermoelectricBoilerScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismThermoelectricBoilerScreen",
    slug: "mekanism-thermoelectric-boiler-screen",
    sourceDir: "packages/mekanism/src/mekanism-thermoelectric-boiler-screen",
  },
  {
    description: "Mekanism 热力蒸发控制器：196×166，输入/输出流体仪表、横向速率条、内屏与警告标签。",
    exports: ["MekanismThermalEvaporationScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismThermalEvaporationScreen",
    slug: "mekanism-thermal-evaporation-screen",
    sourceDir: "packages/mekanism/src/mekanism-thermal-evaporation-screen",
  },
  {
    description: "Mekanism 个人箱子：176×222，9×6 槽位、安全标签与玩家背包。",
    exports: ["MekanismPersonalStorageScreen"],
    group: "mods",
    mod: "mekanism",
    name: "MekanismPersonalStorageScreen",
    slug: "mekanism-personal-storage-screen",
    sourceDir: "packages/mekanism/src/mekanism-personal-storage-screen",
  },
  {
    description: "Mekanism 精灵渲染器：按上游 .mcmeta 的 nine_slice / tile 规则绘制，支持染色与动画首帧。",
    exports: ["MekanismSprite"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismSprite",
    slug: "mekanism-sprite",
    sourceDir: "packages/mekanism/src/mekanism-sprite",
  },
  {
    description: "Mekanism 物品槽：槽框贴图 + 16×16 物品 + 可选覆盖图标，坐标为槽框左上角。",
    exports: ["MekanismSlot"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismSlot",
    slug: "mekanism-slot",
    sourceDir: "packages/mekanism/src/mekanism-slot",
  },
  {
    description: "Mekanism 纵向仪表：standard / small / small-med / medium / wide 外框 + 自下而上填充 + 覆盖层。",
    exports: ["MekanismGauge"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismGauge",
    slug: "mekanism-gauge",
    sourceDir: "packages/mekanism/src/mekanism-gauge",
  },
  {
    description: "Mekanism 进度条：12 种 ProgressType，严格复刻 BAR 内缩、反向与垂直裁剪方向。",
    exports: ["MekanismProgress"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismProgress",
    slug: "mekanism-progress",
    sourceDir: "packages/mekanism/src/mekanism-progress",
  },
  {
    description: "Mekanism 功率/速率/动态条：九宫格外框 + 方向裁剪填充 + 可选渐变染色。",
    exports: ["MekanismBar"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismBar",
    slug: "mekanism-bar",
    sourceDir: "packages/mekanism/src/mekanism-bar",
  },
  {
    description: "Mekanism 侧边标签：18/26 高按钮、图标变体、两侧排布与装备栏侧条。",
    exports: ["MekanismTab", "MekanismTabBar", "MekanismSideHolder", "MekanismElementHolder"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismTab",
    slug: "mekanism-tab",
    sourceDir: "packages/mekanism/src/mekanism-tab",
  },
  {
    description: "Mekanism 文本与控件：标题/标签/内屏/按钮/图标按钮/开关/箭头/气体模式/警告灯/输入框/装备槽。",
    exports: ["MekanismTitle", "MekanismLabel", "MekanismInnerScreen", "MekanismButton", "MekanismImageButton", "MekanismSwitch", "MekanismArrow", "MekanismGasMode", "MekanismWarningLight", "MekanismSecurityLight", "MekanismTextField", "MekanismArmorSlots"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismParts",
    slug: "mekanism-parts",
    sourceDir: "packages/mekanism/src",
  },
  {
    description: "Mekanism 可拖动窗口：shadow + base 九宫格 + 标题 + 关闭/固定按钮。",
    exports: ["MekanismWindow"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismWindow",
    slug: "mekanism-window",
    sourceDir: "packages/mekanism/src/mekanism-window",
  },
  {
    description: "Mekanism 侧面配置窗口：156×135，6 个 22×22 面按钮、传输类型标签与自动弹出/清空按钮。",
    exports: ["MekanismSideConfigWindow"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismSideConfigWindow",
    slug: "mekanism-side-config-window",
    sourceDir: "packages/mekanism/src/mekanism-side-config-window",
  },
  {
    description: "Mekanism 升级窗口：198×100，升级列表、7 个支持图标、安装/卸载进度与两个虚拟槽。",
    exports: ["MekanismUpgradeWindow"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismUpgradeWindow",
    slug: "mekanism-upgrade-window",
    sourceDir: "packages/mekanism/src/mekanism-upgrade-window",
  },
  {
    description: "Mekanism 面板基座：base 九宫格、标题、背包标签、Mekanism 风格玩家背包、标签/窗口层与窗口开关 hook。",
    exports: ["MekanismScreen", "MekanismPlayerInventory", "useMekanismWindows"],
    group: "containers",
    mod: "mekanism",
    name: "MekanismScreen",
    slug: "mekanism-screen",
    sourceDir: "packages/mekanism/src/mekanism-screen",
  },
];

export const blocks = components.filter(component =>
  ["menus", "mods", "screens"].includes(component.group),
);

/**
 * 官网独立 Mod 区域：显式标记 `mod` 的条目（整屏的 `group: "mods"` 也都标了 `mod`）。
 */
export function isModEntry(entry: CatalogEntry): boolean {
  return entry.mod !== undefined;
}

export const modEntries = components.filter(component => isModEntry(component));
export const coreComponents = components.filter(component => !isModEntry(component));
export const primaryBlocks = blocks.filter(block => block.group !== "mods");
export const modBlocks = blocks.filter(block => block.group === "mods");

export interface ModCatalog {
  blocks: CatalogEntry[];
  components: CatalogEntry[];
}

/** 按 mod 维度拆分的整屏与组件集合（官网 /mods/<mod>/ 子页数据源）。 */
export const modCatalog = Object.fromEntries(
  modIds.map(id => [
    id,
    {
      blocks: modBlocks.filter(block => block.mod === id),
      components: modEntries.filter(item => item.mod === id && item.group !== "mods"),
    } satisfies ModCatalog,
  ]),
) as Record<ModTarget, ModCatalog>;

/** 跨 mod 共享件（Mod* 通用件尚未编目，集合当前为空）。 */
export const commonComponents = components.filter(component => component.mod === "common");

/** mod 条目的返回索引页：/mods/<mod>/，跨 mod 通用件回 /mods/。 */
export function modIndexHref(entry: CatalogEntry, locale: Locale): string {
  return localeHref(locale, entry.mod !== undefined && entry.mod !== "common" ? `/mods/${entry.mod}/` : "/mods/");
}

/** 与条目同 mod 的全部条目（详情页 pager 用）。 */
export function modScopeEntries(entry: CatalogEntry): CatalogEntry[] {
  if (entry.mod === undefined || entry.mod === "common") {
    return modEntries;
  }
  return modEntries.filter(item => item.mod === entry.mod);
}

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

export function getBlockPager(
  slug: string,
  locale: Locale,
  entries: CatalogEntry[] = blocks,
): CatalogPager {
  const index = entries.findIndex(block => block.slug === slug);
  if (index === -1) {
    return {};
  }
  const prev = entries[index - 1];
  const next = entries[index + 1];
  return {
    ...(prev && { prev: { href: blockHref(prev.slug, locale), title: componentTitle(prev, locale) } }),
    ...(next && { next: { href: blockHref(next.slug, locale), title: componentTitle(next, locale) } }),
  };
}

export function getComponentPager(
  slug: string,
  locale: Locale,
  entries: CatalogEntry[] = components,
): CatalogPager {
  const index = entries.findIndex(component => component.slug === slug);
  if (index === -1) {
    return {};
  }
  const prev = entries[index - 1];
  const next = entries[index + 1];
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
  return { href: componentHref(entry.slug, locale), title: componentTitle(entry, locale) };
}

/**
 * 中文界面名；组件页与 Block 页共用。代码标识（类名、导出、源码路径）保持英文。
 */
export const componentTitlesZh: Record<string, string> = {
  "ae2-chest-screen": "ME 箱子界面",
  "ae2-crafting-terminal-screen": "合成终端界面",
  "ae2-drive-screen": "ME 驱动器界面",
  "ae2-inscriber-screen": "压印器界面",
  "ae2-terminal-screen": "ME 终端界面",
  "anvil-screen": "铁砧界面",
  "attack-indicator": "攻击蓄力指示器",
  "badge": "徽标",
  "batbox-screen": "储电箱界面",
  "beacon-screen": "信标界面",
  "blast-furnace-screen": "高炉界面",
  "boss-bar": "Boss 血条",
  "brewing-stand-screen": "酿造台界面",
  "button": "按钮",
  "card": "卡片",
  "cartography-table-screen": "制图台界面",
  "chat-screen": "聊天界面",
  "checkbox": "复选框",
  "chest-screen": "箱子界面",
  "compressor-screen": "压缩机界面",
  "crafter-screen": "合成器界面",
  "crafting-screen": "工作台界面",
  "creative-inventory-screen": "创造物品栏",
  "crosshair": "十字准星",
  "dialog": "对话框",
  "dispenser-screen": "发射器界面",
  "divider": "分隔线",
  "electric-furnace-screen": "电炉界面",
  "enchanting-screen": "附魔台界面",
  "experience-bar": "经验条",
  "extractor-screen": "提取机界面",
  "furnace-screen": "熔炉界面",
  "gamemode-switcher": "游戏模式切换器",
  "grid": "网格",
  "grindstone-screen": "砂轮界面",
  "gui-sprite": "GUI 精灵",
  "health-hunger-bar": "状态栏",
  "hopper-screen": "漏斗界面",
  "horse-screen": "马界面",
  "hotbar": "快捷栏",
  "ic2-energy-gauge": "EU 能量表",
  "icon": "图标",
  "input": "输入框",
  "inventory-screen": "物品栏",
  "item-stack": "物品堆叠",
  "jump-bar": "跳跃蓄力条",
  "locator-bar": "定位条",
  "loom-screen": "织布机界面",
  "macerator-screen": "磨矿机界面",
  "main-menu": "主菜单",
  "mekanism-bar": "Mekanism 条形",
  "mekanism-chemical-tank-screen": "化学储罐",
  "mekanism-dynamic-tank-screen": "动态储罐",
  "mekanism-energy-cube-screen": "能量立方",
  "mekanism-fluid-tank-screen": "流体储罐",
  "mekanism-gauge": "Mekanism 仪表",
  "mekanism-induction-matrix-screen": "感应矩阵",
  "mekanism-machine-screen": "Mekanism 机器",
  "mekanism-parts": "Mekanism 文本与控件",
  "mekanism-personal-storage-screen": "个人箱子",
  "mekanism-progress": "Mekanism 进度条",
  "mekanism-screen": "Mekanism 界面基座",
  "mekanism-side-config-window": "侧面配置窗口",
  "mekanism-slot": "Mekanism 槽位",
  "mekanism-sprite": "Mekanism 精灵",
  "mekanism-tab": "Mekanism 标签",
  "mekanism-thermal-evaporation-screen": "热力蒸发控制器",
  "mekanism-thermoelectric-boiler-screen": "热力锅炉",
  "mekanism-upgrade-window": "升级窗口",
  "mekanism-window": "Mekanism 窗口",
  "nautilus-screen": "鹦鹉螺界面",
  "panel": "面板",
  "player-inventory": "玩家物品栏",
  "progress": "进度条",
  "radio-group": "单选组",
  "screen-panel": "界面基座",
  "scroll-area": "滚动区域",
  "select": "下拉选择",
  "shulker-box-screen": "潜影盒界面",
  "slider": "滑块",
  "slot": "物品格",
  "smithing-screen": "锻造台界面",
  "smoker-screen": "烟熏炉界面",
  "status-effects": "状态效果",
  "stonecutter-screen": "切石机界面",
  "switch": "开关",
  "tabs": "标签页",
  "title-bar": "标题栏",
  "toast": "通知提示",
  "tooltip": "提示气泡",
  "trading-screen": "村民交易界面",
};

export function componentTitle(entry: CatalogEntry, locale: Locale): string {
  return locale === "zh" ? componentTitlesZh[entry.slug] ?? entry.name : entry.name;
}
