import type { ReactNode } from "react";

import { BadgePage } from "./pages/badge";
import { ButtonPage } from "./pages/button";
import { CardPage } from "./pages/card";
import { CheckboxPage } from "./pages/checkbox";
import { DialogPage } from "./pages/dialog";
import { IconPage } from "./pages/icon";
import { InputPage } from "./pages/input";
import { ItemStackPage } from "./pages/item-stack";
import { L0Page } from "./pages/l0";
import { PanelPage } from "./pages/panel";
import { ProgressPage } from "./pages/progress";
import { RadioGroupPage } from "./pages/radio-group";
import { ScrollAreaPage } from "./pages/scroll-area";
import { SelectPage } from "./pages/select";
import { SliderPage } from "./pages/slider";
import { SlotPage } from "./pages/slot";
import { SwitchPage } from "./pages/switch";
import { TabsPage } from "./pages/tabs";
import { TooltipPage } from "./pages/tooltip";

export interface PageEntry {
  render: () => ReactNode;
  title: string;
}

/**
 * 预览页注册表：每个组件 / 层级一个路由（hash = 键）
*/
export const pageRegistry = new Map<string, PageEntry>([
  ["badge", { render: () => <BadgePage />, title: "Badge" }],
  ["button", { render: () => <ButtonPage />, title: "Button" }],
  ["card", { render: () => <CardPage />, title: "Card (L2)" }],
  ["checkbox", { render: () => <CheckboxPage />, title: "Checkbox" }],
  ["dialog", { render: () => <DialogPage />, title: "Dialog" }],
  ["icon", { render: () => <IconPage />, title: "Icon (L2)" }],
  ["input", { render: () => <InputPage />, title: "Input" }],
  ["item-stack", { render: () => <ItemStackPage />, title: "ItemStack (L2)" }],
  ["l0", { render: () => <L0Page />, title: "L0 · Tokens & Textures" }],
  ["panel", { render: () => <PanelPage />, title: "Panel (L2)" }],
  ["progress", { render: () => <ProgressPage />, title: "Progress" }],
  ["radio-group", { render: () => <RadioGroupPage />, title: "RadioGroup" }],
  ["scroll-area", { render: () => <ScrollAreaPage />, title: "ScrollArea" }],
  ["select", { render: () => <SelectPage />, title: "Select" }],
  ["slider", { render: () => <SliderPage />, title: "Slider" }],
  ["slot", { render: () => <SlotPage />, title: "Slot / Grid (L2)" }],
  ["switch", { render: () => <SwitchPage />, title: "Switch" }],
  ["tabs", { render: () => <TabsPage />, title: "Tabs" }],
  ["tooltip", { render: () => <TooltipPage />, title: "Tooltip" }],
]);
