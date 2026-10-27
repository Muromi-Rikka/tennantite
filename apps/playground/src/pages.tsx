import type { ReactNode } from "react";
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
import { CrosshairPage } from "./pages/crosshair";
import { DialogPage } from "./pages/dialog";
import { EnchantingScreenPage } from "./pages/enchanting-screen";
import { ExperienceBarPage } from "./pages/experience-bar";
import { FurnaceScreenPage } from "./pages/furnace-screen";
import { GuiParityPage } from "./pages/gui-parity";
import { HealthHungerBarPage } from "./pages/health-hunger-bar";
import { HotbarPage } from "./pages/hotbar";
import { IconPage } from "./pages/icon";
import { InputPage } from "./pages/input";
import { InventoryScreenPage } from "./pages/inventory-screen";
import { ItemStackPage } from "./pages/item-stack";
import { L0Page } from "./pages/l0";
import { MainMenuPage } from "./pages/main-menu";
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
import { TooltipPage } from "./pages/tooltip";
import { TradingScreenPage } from "./pages/trading-screen";

export interface PageEntry {
  render: () => ReactNode;
  title: string;
}

/**
 * 预览页注册表：每个组件 / 层级一个路由（hash = 键）
*/
export const pageRegistry = new Map<string, PageEntry>([
  ["anvil-screen", { render: () => <AnvilScreenPage />, title: "AnvilScreen" }],
  ["badge", { render: () => <BadgePage />, title: "Badge" }],
  ["beacon-screen", { render: () => <BeaconScreenPage />, title: "BeaconScreen" }],
  ["boss-bar", { render: () => <BossBarPage />, title: "BossBar (HUD)" }],
  ["brewing-stand-screen", { render: () => <BrewingStandScreenPage />, title: "BrewingStandScreen" }],
  ["button", { render: () => <ButtonPage />, title: "Button" }],
  ["card", { render: () => <CardPage />, title: "Card (L2)" }],
  ["chat-screen", { render: () => <ChatScreenPage />, title: "ChatScreen (Menu)" }],
  ["checkbox", { render: () => <CheckboxPage />, title: "Checkbox" }],
  ["chest-screen", { render: () => <ChestScreenPage />, title: "ChestScreen" }],
  ["crafting-screen", { render: () => <CraftingScreenPage />, title: "CraftingScreen" }],
  ["crosshair", { render: () => <CrosshairPage />, title: "Crosshair (HUD)" }],
  ["dialog", { render: () => <DialogPage />, title: "Dialog" }],
  ["enchanting-screen", { render: () => <EnchantingScreenPage />, title: "EnchantingScreen" }],
  ["experience-bar", { render: () => <ExperienceBarPage />, title: "ExperienceBar (HUD)" }],
  ["furnace-screen", { render: () => <FurnaceScreenPage />, title: "FurnaceScreen" }],
  ["gui-parity", { render: () => <GuiParityPage />, title: "GUI Parity (all)" }],
  ["health-hunger-bar", { render: () => <HealthHungerBarPage />, title: "HealthHungerBar (HUD)" }],
  ["hotbar", { render: () => <HotbarPage />, title: "Hotbar (HUD)" }],
  ["icon", { render: () => <IconPage />, title: "Icon (L2)" }],
  ["input", { render: () => <InputPage />, title: "Input" }],
  ["inventory-screen", { render: () => <InventoryScreenPage />, title: "InventoryScreen" }],
  ["item-stack", { render: () => <ItemStackPage />, title: "ItemStack (L2)" }],
  ["l0", { render: () => <L0Page />, title: "L0 · Tokens & Textures" }],
  ["main-menu", { render: () => <MainMenuPage />, title: "MainMenu (Menu)" }],
  ["panel", { render: () => <PanelPage />, title: "Panel (L2)" }],
  ["progress", { render: () => <ProgressPage />, title: "Progress" }],
  ["radio-group", { render: () => <RadioGroupPage />, title: "RadioGroup" }],
  ["scroll-area", { render: () => <ScrollAreaPage />, title: "ScrollArea" }],
  ["select", { render: () => <SelectPage />, title: "Select" }],
  ["slider", { render: () => <SliderPage />, title: "Slider" }],
  ["slot", { render: () => <SlotPage />, title: "Slot / Grid (L2)" }],
  ["status-effects", { render: () => <StatusEffectsPage />, title: "StatusEffects (HUD)" }],
  ["switch", { render: () => <SwitchPage />, title: "Switch" }],
  ["tabs", { render: () => <TabsPage />, title: "Tabs" }],
  ["tooltip", { render: () => <TooltipPage />, title: "Tooltip" }],
  ["trading-screen", { render: () => <TradingScreenPage />, title: "TradingScreen" }],
]);
