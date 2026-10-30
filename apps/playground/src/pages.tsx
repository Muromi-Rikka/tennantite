import type { ReactNode } from "react";
import { Ae2Page } from "./pages/ae2";
import { AnvilScreenPage } from "./pages/anvil-screen";
import { BadgePage } from "./pages/badge";
import { BeaconScreenPage } from "./pages/beacon-screen";
import { BossBarPage } from "./pages/boss-bar";
import { BrewingStandScreenPage } from "./pages/brewing-stand-screen";
import { ButtonPage } from "./pages/button";
import { CardPage } from "./pages/card";
import { ChatScreenPage } from "./pages/chat-screen";
import { CheckboxPage } from "./pages/checkbox";
import { ChestScreenPage } from "./pages/chest-screen";
import { CraftingScreenPage } from "./pages/crafting-screen";
import { CreatePage } from "./pages/create";
import { CrosshairPage } from "./pages/crosshair";
import { DialogPage } from "./pages/dialog";
import { EnchantingScreenPage } from "./pages/enchanting-screen";
import { EnderioPage } from "./pages/enderio";
import { ExperienceBarPage } from "./pages/experience-bar";
import { FarmersDelightPage } from "./pages/farmersdelight";
import { FurnaceScreenPage } from "./pages/furnace-screen";
import { GuiParityPage } from "./pages/gui-parity";
import { GuiScalePage } from "./pages/gui-scale";
import { HealthHungerBarPage } from "./pages/health-hunger-bar";
import { HotbarPage } from "./pages/hotbar";
import { Ic2Page } from "./pages/ic2";
import { IconPage } from "./pages/icon";
import { IePage } from "./pages/ie";
import { IndustrialForegoingPage } from "./pages/industrialforegoing";
import { InputPage } from "./pages/input";
import { InventoryScreenPage } from "./pages/inventory-screen";
import { ItemStackPage } from "./pages/item-stack";
import { L0Page } from "./pages/l0";
import { MainMenuPage } from "./pages/main-menu";
import { MekanismPage } from "./pages/mekanism";
import { ModsCorePage } from "./pages/mods-core";
import { PanelPage } from "./pages/panel";
import { ProgressPage } from "./pages/progress";
import { RadioGroupPage } from "./pages/radio-group";
import { ScrollAreaPage } from "./pages/scroll-area";
import { SelectPage } from "./pages/select";
import { SliderPage } from "./pages/slider";
import { SlotPage } from "./pages/slot";
import { StatusEffectsPage } from "./pages/status-effects";
import { SwitchPage } from "./pages/switch";
import { TabsPage } from "./pages/tabs";
import { ThermalPage } from "./pages/thermal";
import { TooltipPage } from "./pages/tooltip";
import { TradingScreenPage } from "./pages/trading-screen";

export interface NavEntry {
  group: PageGroupId;
  id: string;
  title: string;
}

export interface NavSection {
  entries: NavEntry[];
  group: PageGroup;
}

export interface PageEntry {
  group: PageGroupId;
  render: () => ReactNode;
  title: string;
}

export interface PageGroup {
  id: PageGroupId;
  title: string;
}

export type PageGroupId = "hud" | "l0" | "mods" | "primitives" | "screens";

// 侧栏分组，次序即侧栏与上一页/下一页的次序
export const pageGroups: readonly PageGroup[] = [
  { id: "l0", title: "L0 · 基础与诊断" },
  { id: "primitives", title: "通用组件" },
  { id: "hud", title: "HUD" },
  { id: "screens", title: "原版界面" },
  { id: "mods", title: "Mod 界面" },
];

/**
 * 预览页注册表：每个组件 / 层级一个路由（hash = 键）
*/
export const pageRegistry = new Map<string, PageEntry>([
  ["ae2", { group: "mods", render: () => <Ae2Page />, title: "AE2 (Mod)" }],
  ["anvil-screen", { group: "screens", render: () => <AnvilScreenPage />, title: "AnvilScreen" }],
  ["badge", { group: "primitives", render: () => <BadgePage />, title: "Badge" }],
  ["beacon-screen", { group: "screens", render: () => <BeaconScreenPage />, title: "BeaconScreen" }],
  ["boss-bar", { group: "hud", render: () => <BossBarPage />, title: "BossBar (HUD)" }],
  ["brewing-stand-screen", { group: "screens", render: () => <BrewingStandScreenPage />, title: "BrewingStandScreen" }],
  ["button", { group: "primitives", render: () => <ButtonPage />, title: "Button" }],
  ["card", { group: "primitives", render: () => <CardPage />, title: "Card (L2)" }],
  ["chat-screen", { group: "screens", render: () => <ChatScreenPage />, title: "ChatScreen (Menu)" }],
  ["checkbox", { group: "primitives", render: () => <CheckboxPage />, title: "Checkbox" }],
  ["chest-screen", { group: "screens", render: () => <ChestScreenPage />, title: "ChestScreen" }],
  ["crafting-screen", { group: "screens", render: () => <CraftingScreenPage />, title: "CraftingScreen" }],
  ["create", { group: "mods", render: () => <CreatePage />, title: "Create (Mod)" }],
  ["crosshair", { group: "hud", render: () => <CrosshairPage />, title: "Crosshair (HUD)" }],
  ["dialog", { group: "primitives", render: () => <DialogPage />, title: "Dialog" }],
  ["enchanting-screen", { group: "screens", render: () => <EnchantingScreenPage />, title: "EnchantingScreen" }],
  ["enderio", { group: "mods", render: () => <EnderioPage />, title: "Ender IO (Mod)" }],
  ["experience-bar", { group: "hud", render: () => <ExperienceBarPage />, title: "ExperienceBar (HUD)" }],
  ["farmersdelight", { group: "mods", render: () => <FarmersDelightPage />, title: "Farmer's Delight (Mod)" }],
  ["furnace-screen", { group: "screens", render: () => <FurnaceScreenPage />, title: "FurnaceScreen" }],
  ["gui-parity", { group: "l0", render: () => <GuiParityPage />, title: "GUI Parity (all)" }],
  ["gui-scale", { group: "l0", render: () => <GuiScalePage />, title: "GUI Scale (auto)" }],
  ["health-hunger-bar", { group: "hud", render: () => <HealthHungerBarPage />, title: "HealthHungerBar (HUD)" }],
  ["hotbar", { group: "hud", render: () => <HotbarPage />, title: "Hotbar (HUD)" }],
  ["ic2", { group: "mods", render: () => <Ic2Page />, title: "IC2 (Mod)" }],
  ["icon", { group: "primitives", render: () => <IconPage />, title: "Icon (L2)" }],
  ["ie", { group: "mods", render: () => <IePage />, title: "Immersive Engineering (Mod)" }],
  ["industrialforegoing", { group: "mods", render: () => <IndustrialForegoingPage />, title: "Industrial Foregoing (Mod)" }],
  ["input", { group: "primitives", render: () => <InputPage />, title: "Input" }],
  ["inventory-screen", { group: "screens", render: () => <InventoryScreenPage />, title: "InventoryScreen" }],
  ["item-stack", { group: "primitives", render: () => <ItemStackPage />, title: "ItemStack (L2)" }],
  ["l0", { group: "l0", render: () => <L0Page />, title: "L0 · Tokens & Textures" }],
  ["main-menu", { group: "screens", render: () => <MainMenuPage />, title: "MainMenu (Menu)" }],
  ["mekanism", { group: "mods", render: () => <MekanismPage />, title: "Mekanism (Mod)" }],
  ["mods-core", { group: "mods", render: () => <ModsCorePage />, title: "Mod 共用原语" }],
  ["panel", { group: "primitives", render: () => <PanelPage />, title: "Panel (L2)" }],
  ["progress", { group: "primitives", render: () => <ProgressPage />, title: "Progress" }],
  ["radio-group", { group: "primitives", render: () => <RadioGroupPage />, title: "RadioGroup" }],
  ["scroll-area", { group: "primitives", render: () => <ScrollAreaPage />, title: "ScrollArea" }],
  ["select", { group: "primitives", render: () => <SelectPage />, title: "Select" }],
  ["slider", { group: "primitives", render: () => <SliderPage />, title: "Slider" }],
  ["slot", { group: "primitives", render: () => <SlotPage />, title: "Slot / Grid (L2)" }],
  ["status-effects", { group: "hud", render: () => <StatusEffectsPage />, title: "StatusEffects (HUD)" }],
  ["switch", { group: "primitives", render: () => <SwitchPage />, title: "Switch" }],
  ["tabs", { group: "primitives", render: () => <TabsPage />, title: "Tabs" }],
  ["thermal", { group: "mods", render: () => <ThermalPage />, title: "Thermal Expansion (Mod)" }],
  ["tooltip", { group: "primitives", render: () => <TooltipPage />, title: "Tooltip" }],
  ["trading-screen", { group: "screens", render: () => <TradingScreenPage />, title: "TradingScreen" }],
]);

// 按分组派生侧栏数据（注册表次序即组内次序）
export const navSections: readonly NavSection[] = pageGroups.map(group => ({
  entries: [...pageRegistry]
    .filter(([, entry]) => entry.group === group.id)
    .map(([id, entry]) => ({ group: group.id, id, title: entry.title })),
  group,
}));

// 侧栏与顶栏上一页/下一页共用的线性次序：分组次序 → 组内注册表次序
export const navEntries: readonly NavEntry[] = navSections.flatMap(
  section => section.entries,
);

export function pageGroupOf(pageId: string): PageGroup | undefined {
  const groupId = pageRegistry.get(pageId)?.group;
  return pageGroups.find(group => group.id === groupId);
}
