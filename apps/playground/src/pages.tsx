import type { ReactNode } from "react";

import { L0Page } from "./pages/l0";

export interface PageEntry {
  render: () => ReactNode;
  title: string;
}

/**
 * 预览页注册表：每个组件 / 层级一个路由（hash = 键）
*/
export const pageRegistry = new Map<string, PageEntry>([
  ["l0", { render: () => <L0Page />, title: "L0 · Tokens & Textures" }],
]);
