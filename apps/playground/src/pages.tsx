import type { ReactNode } from "react";
import { AdvancementsScreenPage } from "./pages/advancements-screen";
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
import { DeathScreenPage } from "./pages/death-screen";
import { DialogPage } from "./pages/dialog";
import { EnchantingScreenPage } from "./pages/enchanting-screen";
import { ExperienceBarPage } from "./pages/experience-bar";
import { FurnaceScreenPage } from "./pages/furnace-screen";
import { HealthHungerBarPage } from "./pages/health-hunger-bar";
import { HotbarPage } from "./pages/hotbar";
import { IconPage } from "./pages/icon";
import { InputPage } from "./pages/input";
import { InventoryScreenPage } from "./pages/inventory-screen";
import { ItemStackPage } from "./pages/item-stack";
import { L0Page } from "./pages/l0";
import { LanguageScreenPage } from "./pages/language-screen";
import { MainMenuPage } from "./pages/main-menu";
import { MultiplayerScreenPage } from "./pages/multiplayer-screen";
import { PanelPage } from "./pages/panel";
import { PauseMenuPage } from "./pages/pause-menu";
import { ProgressPage } from "./pages/progress";
import { RadioGroupPage } from "./pages/radio-group";
import { RecipeBookPage } from "./pages/recipe-book";
import { ScrollAreaPage } from "./pages/scroll-area";
import { SelectPage } from "./pages/select";
import { SettingsScreenPage } from "./pages/settings-screen";
import { SignEditPage } from "./pages/sign-edit";
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
  ["advancements-screen", { render: () => <AdvancementsScreenPage />, title: "AdvancementsScreen (Menu)" }],
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
  ["death-screen", { render: () => <DeathScreenPage />, title: "DeathScreen (Menu)" }],
  ["dialog", { render: () => <DialogPage />, title: "Dialog" }],
  ["enchanting-screen", { render: () => <EnchantingScreenPage />, title: "EnchantingScreen" }],
  ["experience-bar", { render: () => <ExperienceBarPage />, title: "ExperienceBar (HUD)" }],
  ["furnace-screen", { render: () => <FurnaceScreenPage />, title: "FurnaceScreen" }],
  ["health-hunger-bar", { render: () => <HealthHungerBarPage />, title: "HealthHungerBar (HUD)" }],
  ["hotbar", { render: () => <HotbarPage />, title: "Hotbar (HUD)" }],
  ["icon", { render: () => <IconPage />, title: "Icon (L2)" }],
  ["input", { render: () => <InputPage />, title: "Input" }],
  ["inventory-screen", { render: () => <InventoryScreenPage />, title: "InventoryScreen" }],
  ["item-stack", { render: () => <ItemStackPage />, title: "ItemStack (L2)" }],
  ["l0", { render: () => <L0Page />, title: "L0 · Tokens & Textures" }],
  ["language-screen", { render: () => <LanguageScreenPage />, title: "LanguageScreen (Menu)" }],
  ["main-menu", { render: () => <MainMenuPage />, title: "MainMenu (Menu)" }],
  ["multiplayer-screen", { render: () => <MultiplayerScreenPage />, title: "MultiplayerScreen (Menu)" }],
  ["panel", { render: () => <PanelPage />, title: "Panel (L2)" }],
  ["pause-menu", { render: () => <PauseMenuPage />, title: "PauseMenu (Menu)" }],
  ["progress", { render: () => <ProgressPage />, title: "Progress" }],
  ["radio-group", { render: () => <RadioGroupPage />, title: "RadioGroup" }],
  ["recipe-book", { render: () => <RecipeBookPage />, title: "RecipeBook (Menu)" }],
  ["scroll-area", { render: () => <ScrollAreaPage />, title: "ScrollArea" }],
  ["select", { render: () => <SelectPage />, title: "Select" }],
  ["settings-screen", { render: () => <SettingsScreenPage />, title: "SettingsScreen (Menu)" }],
  ["sign-edit", { render: () => <SignEditPage />, title: "SignEdit (Menu)" }],
  ["slider", { render: () => <SliderPage />, title: "Slider" }],
  ["slot", { render: () => <SlotPage />, title: "Slot / Grid (L2)" }],
  ["status-effects", { render: () => <StatusEffectsPage />, title: "StatusEffects (HUD)" }],
  ["switch", { render: () => <SwitchPage />, title: "Switch" }],
  ["tabs", { render: () => <TabsPage />, title: "Tabs" }],
  ["tooltip", { render: () => <TooltipPage />, title: "Tooltip" }],
  ["trading-screen", { render: () => <TradingScreenPage />, title: "TradingScreen" }],
]);
