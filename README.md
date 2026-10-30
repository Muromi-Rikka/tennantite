# Tennantite

> Minecraft 风格 UI 组件库，基于 shadcn/ui 哲学构建：复制进项目、自由裁剪。

npm 包名 `@tennantite/ui`（scope `@tennantite`）。规格文档见 [spec/minecraft-shadcn-ui-spec.md](./spec/minecraft-shadcn-ui-spec.md)。

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
import { Button, Panel, Slot, Hotbar, InventoryScreen } from "@tennantite/ui";
import "@tennantite/tokens/css/tokens.css"; // Tailwind 入口内：@import "tailwindcss" 之后
import "@tennantite/textures/css/textures.css";
import "@tennantite/textures/css/mekanism-textures.css";
import "@tennantite/textures/css/farmersdelight-textures.css";
import "@tennantite/ui/css/scroll-area.css";

// 所有界面均为数据注入、无游戏逻辑（规格 §8）
<InventoryScreen mainItems={items} onSlotClick={(area, index) => {}} />
```

主题覆盖：在应用 Tailwind 入口的 `@theme` 中覆盖 `--color-mc-*` 变量即可（全部令牌见 `packages/tokens/css/tokens.css`）。

## 分层结构（规格 §2）

```
apps/
  playground/     # 组件开发预览（rsbuild，60 个组件 + GUI parity 页）
  next-app/       # SSR 验证：Next.js 16 App Router（pnpm --filter @tennantite/next-app dev）
  tanstack-app/   # SSR 验证：TanStack Start 1.169（pnpm --filter @tennantite/tanstack-app dev）
packages/
  ui/             # @tennantite/ui 组件库（rslib，ESM + d.ts）
  mods-core/      # @tennantite/mods-core 跨 mod 共享原语（Mod* 组件 + progressClipPath）
  mekanism/       # @tennantite/mekanism Mekanism 26.3 界面与组件
  ic2/            # @tennantite/ic2 工业时代 2 界面与组件
  ae2/            # @tennantite/ae2 应用能源 2 界面与组件
  create/         # @tennantite/create 机械动力界面与组件
  thermal/        # @tennantite/thermal 热力膨胀界面与组件
  ie/             # @tennantite/ie 沉浸工程界面与组件
  enderio/        # @tennantite/enderio Ender IO 26.3 界面与组件
  industrialforegoing/ # @tennantite/industrialforegoing Industrial Foregoing 1.21 界面与组件
  farmersdelight/ # @tennantite/farmersdelight Farmer's Delight 1.21 界面与组件
  tokens/         # @tennantite/tokens 设计令牌（L0）
  textures/       # @tennantite/textures 像素纹理（L0）
registry/         # shadcn registry（node registry/build.mjs 生成）
spec/             # 规格文档
```

组件清单：

- **L1 原语（13）**：Button · Input · Slider · Checkbox · Switch · RadioGroup · Select · Tabs · Dialog · Progress · Tooltip · ScrollArea（自研）· Badge（自研）
- **L2 容器（10）**：GuiSprite · Panel · ScreenPanel · Slot / Grid · ItemStack · PlayerInventory · Icon · Card · TitleBar · Divider
- **L3 HUD（9）**：HealthHungerBar · ExperienceBar · Hotbar · Crosshair · StatusEffects · BossBar · AttackIndicator · JumpBar · LocatorBar
- **L3 容器界面（24）**：InventoryScreen · ChestScreen · CraftingScreen · FurnaceScreen · BlastFurnaceScreen · SmokerScreen · BrewingStandScreen · EnchantingScreen · BeaconScreen · AnvilScreen · TradingScreen · ShulkerBoxScreen · HopperScreen · DispenserScreen · HorseScreen · CartographyTableScreen · GrindstoneScreen · LoomScreen · SmithingScreen · StonecutterScreen · CrafterScreen · NautilusScreen · CreativeInventoryScreen · GamemodeSwitcher
- **L3 菜单界面（3）**：MainMenu · ChatScreen · Toast / ToastStack / NotificationBadge
- **L3 Mod 界面（9）**：Mekanism 26.3 机器 / 储罐 / 存储 34 屏 + 侧配置 / 升级窗口 + 安全台 / 传送器 / 数字采矿机（含配置屏）+ 滚动列表共享件；IC2 机器 / 储电箱 + 回收机 / 金属成型机 / 铁炉 / 发酵机 / CESU / MFSU / 感应炉 / 高炉；AE2 终端 / 驱动器 / 箱子 + 样板编码终端 / CPU 监控 / 分子装配室 / 量子链接仓 / 空间 IO / IO 端口 / 接口 / 冷凝器 / 磨石 / 天空石箱 + 优先级弹窗；Create 磨石 / 过滤器 / 工具箱 / 蓝图桌 / 数值面板 + 蓝图炮 / 包裹过滤器 / 列车时刻表 / 列车站台 / 库存管理员；Thermal 红石炉 / 储能罐 / 缓存仓 + 17 台机器 / 流体缓存仓 / 10 个设备屏（强化工作台 / 充能台 / 捕鱼 / 采集 / 生成器族）；IE 焦炉 / 压机 / 电弧炉 / 高压电容 + 高炉 / 合金炉 / 发酵器 / 压榨机 / 精炼厂 / 搅拌机 / 温室 / 分拣器 / 流体分拣器 / 物品分批器 / 木箱 / 工具箱 / 电路工作台 / 区块加载机 / 自动工作台 / 装配器 / 工程师工作台 / 电钻 / 流体泵站；Ender IO 合金炉 / SAG 磨粉机 / 斯特林发电机 / 灵魂绑定器 / 电容组 + 26 台机器 / 充能器 / 方尖碑族 / 刷怪笼 / 经验机族 + 传送器家族 4 屏；Industrial Foregoing 48 台机器布局（10 个具名屏 + 全预设画廊）；Farmer's Delight 厨锅界面 + 受热 / 进度 / 配方书按钮 + 饱食 / 舒适 HUD 覆盖层

## SSR / RSC

硬约束（规格 §1.1）：全部组件在 Next.js App Router 与 TanStack Start 双框架下服务端渲染无报错、无浏览器 API 访问、水合无警告。含交互状态的 Base UI 封装层按需 `"use client"`（由 Base UI 内部指令承载），纯展示组件（Panel / Slot / Icon / Badge / HUD）保持 RSC 兼容。每个组件的 node 环境 SSR 冒烟测试见 `packages/ui/src/ssr.test.tsx`。

## 素材授权

- 原版 GUI 纹理：Resource Pack Creator 的 GUI 分类（Minecraft Java 26.4-snapshot-3 原版 PNG）；物品、方块与 HUD 状态图标取自 Minecraft Java 26.3 官方客户端（固定版本与 SHA-1）；版权归 Mojang。
- AE2 终端贴图：Applied Energistics 2 1.12.2 原始 GUI 贴图（AE2-UEL 分支固定提交，GNU LGPL-3.0）。
- Mekanism 界面：Mekanism 26.3（提交 `d4df9b3…`）原始 GUI 贴图，MIT（Copyright (c) 2017-2025 Aidan C. Brady）；升级图标 / 液体 / 化学材质同源。
- Create 界面：Create mc1.21.1/dev（提交 `4148fd8…`）原始 GUI 贴图；代码 MIT，贴图 © The Create Team 保留权利。
- Thermal 界面：CoFH ThermalExpansion 1.20.x + ThermalCore + CoFHCore（三个固定提交）原始 GUI 贴图，© Team CoFH 保留权利。
- IE 界面：Immersive Engineering 1.21.1（提交 `75a27f0…`）原始 GUI 贴图，© BluSunrize 及原作者保留权利。
- Ender IO 界面：EnderIO 26.3（提交 `672d750…`）原始 GUI 贴图，Unlicense（public domain）。
- Industrial Foregoing 界面：Industrial Foregoing 1.21（提交 `ce2852d…`，MIT）与 Titanium 1.21（提交 `f8f0461…`，LGPL-3.0）原始 GUI 贴图。
- Farmer's Delight 界面：Farmer's Delight 1.21（提交 `dd8b9b0`）原始 GUI 贴图，MIT（Copyright (c) 2020 vectorwing）。
- IC2 界面：IndustrialCraft 2 Experimental 2.8.99-ex112 的原始 GUI 贴图，按钮 / 红石 / 空装备图标取自 Minecraft 1.12.2 客户端；其余 AE2 部件：手绘 SVG 像素复刻。
- 字体：Minecraft font by Idrees Hassan（SIL OFL 1.1）。

详见 `packages/textures/LICENSE-ASSETS.md`。

## 发布

全部 13 个 `@tennantite/*` 包通过 GitHub Actions 以 npm Trusted Publisher（OIDC）发布，无 NPM_TOKEN：

1. 本地 `pnpm cs` 写 changeset 并随 PR 推送。
2. master 上 CI 的 `version-pr` job 自动创建「chore: version packages」PR（统一全部包版本，linked 强制同步 bump）。
3. 合并版本 PR 后，在 GitHub 上以 `v<版本>`（如 `v0.1.1`）创建 Release——`Publish` workflow 由此触发：校验 tag 与全部包版本一致 → turbo build → `pnpm publish`（`id-token: write` 走 OIDC，已在 npmjs.com 为每个包配置 Trusted Publisher：repo `Muromi-Rikka/tennantite`、workflow `release.yml`）。已发布的相同版本会自动跳过，可安全重跑。

本地排查可用 `node scripts/publish-all.mjs --dry-run` 对比 registry 版本。

## 供应链策略说明

pnpm 12 的 `trustPolicy: no-downgrade` 会将 semver@6.3.1 等发布于 provenance 机制之前的经典包误判为"信任降级"而阻断安装（[pnpm discussion #10706](https://github.com/pnpm/pnpm/discussions/10706)），本项目将其设为 `off`，并在 `eslint.config.ts` 中同步覆盖 `pnpm/yaml-enforce-settings` 的期望值。
