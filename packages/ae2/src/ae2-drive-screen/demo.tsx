import type { ScreenSlot } from "@tennantite/ui";
import { Ae2DriveScreen } from "./index";

const STORAGE_ITEMS: ScreenSlot[] = [
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
  { count: 1, icon: "emerald", tooltip: "存储元件" },
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
