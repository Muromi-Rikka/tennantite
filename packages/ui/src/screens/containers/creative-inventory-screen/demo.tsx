"use client";

import { useState } from "react";
import type { CreativeTab } from "./index";

import { CreativeInventoryScreen } from "./index";

const TABS: CreativeTab[] = [
  { icon: { icon: "stone-block" }, id: "building", label: "建筑" },
  { icon: { icon: "grass-block" }, id: "natural", label: "自然" },
  { icon: { icon: "crafting-table" }, id: "functional", label: "功能" },
  { icon: { icon: "iron-ore" }, id: "redstone", label: "红石" },
  { icon: { icon: "sword" }, id: "tools", label: "工具" },
  { icon: { icon: "iron-chestplate" }, id: "combat", label: "战斗" },
  { icon: { icon: "apple" }, id: "food", label: "食物" },
  { icon: { icon: "iron-ingot" }, id: "ingredients", label: "材料" },
  { icon: { icon: "gunpowder" }, id: "spawn-eggs", label: "刷怪蛋" },
  { icon: { icon: "experience-bottle" }, id: "op", label: "管理员" },
  { icon: { icon: "lapis-lazuli" }, id: "search", label: "搜索" },
  { icon: { icon: "armor" }, id: "inventory", label: "物品栏" },
  { icon: { icon: "heart" }, id: "hotbar", label: "快捷栏" },
  { icon: { icon: "emerald" }, id: "saved", label: "已保存" },
];

/**
 * CreativeInventoryScreen 预览用例（规格 §6.2）
 * 14 个带图标的标签用于验证切换类别时标签条不位移、图标与右对齐列。
 */
export function CreativeInventoryScreenDemo() {
  const [activeTab, setActiveTab] = useState(TABS[0]?.id ?? "building");
  return (
    <CreativeInventoryScreen
      activeTab={activeTab}
      items={Array.from({ length: 45 }, () => ({ count: 64, icon: "stone-block" as const }))}
      onTabSelect={setActiveTab}
      tabs={TABS}
    />
  );
}
