# Verdigris

> Minecraft 风格 UI 组件库，基于 shadcn/ui 哲学构建：复制进项目、自由裁剪。

npm 包名 `@verdigris/ui`（scope `@verdigris`）。规格文档见 [spec/minecraft-shadcn-ui-spec.md](./spec/minecraft-shadcn-ui-spec.md)。

## 技术栈与版本策略

全部依赖采用 2026-10-27 时点的最新稳定版（详见 `pnpm-lock.yaml`），两处例外与原因：

- **TypeScript 6.x**（latest 7.x 为原生编译器，无 JS Compiler API，rslib d.ts 生成与 typescript-eslint 依赖 JS API；待生态适配后升级）
- **React 19.2.8 精确锁定**（19.3 与 Next 16 预渲染器存在 `useContext` 崩溃兼容问题）

核心：React 19 · Base UI（`@base-ui/react` 1.9）· Tailwind CSS v4（`@theme` 令牌）· shadcn 官方 `cn` 包 · class-variance-authority · Turborepo + pnpm 12 · rslib（ESM + d.ts）· ESLint 10 flat config（`@renton/eslint-config-react`）· Vitest 5 + React Testing Library + axe-core · Node ≥ 26。

## 快速开始

```bash
pnpm install
pnpm build       # 构建全部包与应用
pnpm dev         # playground 开发预览（http://localhost:3000）
pnpm lint        # ESLint
pnpm typecheck   # TypeScript
pnpm test        # Vitest（jsdom 单测 + axe 可访问性 + node 环境 SSR 冒烟）
pnpm registry    # 重新生成 shadcn registry.json
```

## 使用组件

```tsx
import { Button, Panel, Slot, Hotbar, InventoryScreen } from "@verdigris/ui";
import "@verdigris/tokens/css/tokens.css"; // Tailwind 入口内：@import "tailwindcss" 之后
import "@verdigris/textures/css/textures.css";
import "@verdigris/ui/css/scroll-area.css";

// 所有界面均为数据注入、无游戏逻辑（规格 §8）
<InventoryScreen mainItems={items} onSlotClick={(area, index) => {}} />
```

主题覆盖：在应用 Tailwind 入口的 `@theme` 中覆盖 `--color-mc-*` 变量即可（全部令牌见 `packages/tokens/css/tokens.css`）。

## 分层结构（规格 §2）

```
apps/
  playground/     # 组件开发预览（rsbuild，44 个组件页）
  next-app/       # SSR 验证：Next.js 16 App Router（pnpm --filter @verdigris/next-app dev）
  tanstack-app/   # SSR 验证：TanStack Start 1.169（pnpm --filter @verdigris/tanstack-app dev）
packages/
  ui/             # @verdigris/ui 组件库（rslib，ESM + d.ts）
  tokens/         # @verdigris/tokens 设计令牌（L0）
  textures/       # @verdigris/textures 像素纹理（L0）
registry/         # shadcn registry（node registry/build.mjs 生成）
spec/             # 规格文档
```

组件清单：

- **L1 原语（13）**：Button · Input · Slider · Checkbox · Switch · RadioGroup · Select · Tabs · Dialog · Progress · Tooltip · ScrollArea（自研）· Badge（自研）
- **L2 容器（10）**：Panel · ScreenPanel · Slot / Grid · ItemStack · PlayerInventory · Icon · Card · TitleBar · Divider
- **L3 HUD（6）**：HealthHungerBar · ExperienceBar · Hotbar · Crosshair · StatusEffects · BossBar
- **L3 容器界面（9）**：InventoryScreen · ChestScreen · CraftingScreen · FurnaceScreen · BrewingStandScreen · EnchantingScreen · BeaconScreen · AnvilScreen · TradingScreen
- **L3 菜单界面（10）**：MainMenu · PauseMenu · SettingsScreen · MultiplayerScreen · LanguageScreen · AdvancementsScreen · RecipeBook · ChatScreen · SignEdit · DeathScreen

## SSR / RSC

硬约束（规格 §1.1）：全部组件在 Next.js App Router 与 TanStack Start 双框架下服务端渲染无报错、无浏览器 API 访问、水合无警告。含交互状态的 Base UI 封装层按需 `"use client"`（由 Base UI 内部指令承载），纯展示组件（Panel / Slot / Icon / Badge / HUD）保持 RSC 兼容。每个组件的 node 环境 SSR 冒烟测试见 `packages/ui/src/ssr.test.tsx`。

## 素材授权

所有纹理、图标均为本项目重绘（字符画 → SVG），不包含任何 Mojang 官方素材；视觉基准为 Minecraft Java 26.3 稳定版 GUI（颜色 / 九宫格 / 字体度量 / 布局均按原版采样值重建）。字体使用开源替代（Minecraft font by Idrees Hassan，SIL OFL 1.1）。详见 `packages/textures/LICENSE-ASSETS.md`。

## 供应链策略说明

pnpm 12 的 `trustPolicy: no-downgrade` 会将 semver@6.3.1 等发布于 provenance 机制之前的经典包误判为"信任降级"而阻断安装（[pnpm discussion #10706](https://github.com/pnpm/pnpm/discussions/10706)），本项目将其设为 `off`，并在 `eslint.config.ts` 中同步覆盖 `pnpm/yaml-enforce-settings` 的期望值。
