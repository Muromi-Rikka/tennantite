import type { ScreenSlot } from "@verdigris/ui";
import { Ae2DriveScreen } from "./index";

const STORAGE_ITEMS: ScreenSlot[] = [
  { icon: "diamond", tooltip: "存储元件" },
  { icon: "iron-ingot", tooltip: "存储元件" },
  { icon: "gold-ingot", tooltip: "存储元件" },
  { icon: "lapis-lazuli", tooltip: "存储元件" },
  { icon: "nether-wart", tooltip: "存储元件" },
  { count: 2, icon: "diamond", tooltip: "存储元件" },
  { count: 3, icon: "iron-ingot", tooltip: "存储元件" },
  { count: 4, icon: "gold-ingot", tooltip: "存储元件" },
  { count: 5, icon: "lapis-lazuli", tooltip: "存储元件" },
  { count: 8, icon: "nether-wart", tooltip: "存储元件" },
];

/**
 * Ae2DriveScreen 预览用例：10 个存储元件槽。
 */
export function Ae2DriveScreenDemo() {
  return (
    <Ae2DriveScreen
      items={STORAGE_ITEMS}
      mainItems={[
        { count: 64, icon: "stone-block", tooltip: "石头" },
        { count: 16, icon: "emerald", tooltip: "绿宝石" },
      ]}
    />
  );
}
