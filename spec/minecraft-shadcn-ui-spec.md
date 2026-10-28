# Minecraft 风格 UI 组件库・规格文档

> 版本：v0.14 ｜ 状态：草案 ｜ 载体：基于 shadcn/ui 的 React 19 + Tailwind 组件库
> 变更记录：v0.2 —— 技术栈更新：React 19、Base UI 替代 Radix、shadcn 官方新版 
>
> `cn()`
>
> 、Turborepo + pnpm 工作区、Rspack 生态构建
> v0.3 —— 新增硬约束：必须支持 SSR（SSR 安全渲染 + 客户端水合增强，兼容 RSC）
> v0.4 —— 决策落实：SSR 目标框架 TanStack Start / Next.js；不做中文字体适配；发布 npm 包（仅 ESM + d.ts）；首版全面覆盖；排除拖拽交互
> v0.5 —— 决策落实：Tailwind v4；Node 26 基线；包 scope 初定 
>
> `@copper-ui`
>
> （双平台占名探测见 §11）
> v0.6 —— 包 scope 确定为 
>
> `@tennantite`
>
> （铜化合物方向，双平台占名探测见 §11）
> v0.7 —— 包名确定为 
>
> `@tennantite/ui`
>
> （scope 
>
> `@tennantite`
>
> ，npm 侧空闲可用；GitHub org 
>
> `tennantite`
>
>  已被占用，如需一致 org 名见 §11）
> v0.8 —— 新增 ESLint 规则约定：flat config，基于 
>
> `@renton/eslint-config`
>
> （详见 1.2）
> v0.9 —— ESLint 升级为 React 方案：采用 
>
> `@renton/eslint-config-react`
>
> （rentonReact ()，含 Next.js/ TanStack / Tailwind 选项，详见 1.2）
> v0.11 —— 全量 GUI 改用 Minecraft 26.4-snapshot-3 原版 PNG（577 精灵）
> v0.12 —— 新增尺寸适配约定（§7.1）：三层适配策略、ScaledBox 组件、mc-scale-scope 作用域
> v0.13 —— 新增 Mod 界面层（§6.5）：IC2（工业时代 2）原始贴图组件、ic2-textures 纹理层、ScreenPanel `backgroundClassName` 扩展与 IC2 文字色令牌
> v0.14 —— §6.5 扩展 Mekanism 26.3：26 台机器 + 8 个储罐/存储屏、mekanism-textures 纹理层、11 个共享件（精灵/槽/仪表/进度/条形/标签/文本控件/窗口/侧配置/升级/界面基座）与 Mekanism 文字色令牌
> 目标：在保持 shadcn"复制进项目、自由裁剪" 哲学的前提下，尽量还原 Minecraft 游戏内主要界面的视觉与交互。



***

## 0. 设计原则



1. **分层组合，而非整屏大组件**。游戏界面一律由底层原语组合而成，不提供 "物品栏整屏组件" 这类黑盒。

2. **UI 与游戏逻辑解耦**。库只负责 "展示 + 交互手势"，库存数据、合成校验、附魔随机、交易计价等逻辑由使用方注入。

3. **风格走令牌，不走硬编码**。所有颜色、字体、间距、纹理经 Design Tokens 暴露，允许主题覆盖。

4. **像素风格基调**。启用 `image-rendering: pixelated`，字体、纹理、边框均以像素为单位对齐。

5. **静态优先，动画可选**。核心组件在无动画时也完整成立，动画 / 音效作为可选扩展。



***

## 1. 技术栈与工程结构



| 项    | 约定                                                                                      |
| ---- | --------------------------------------------------------------------------------------- |
| 框架   | React 19                                                                                |
| SSR  | 必须支持：TanStack Start 与 Next.js 双框架验证；SSR 安全渲染 + 客户端水合增强，兼容 RSC（详见 1.1）                   |
| 样式   | Tailwind CSS v4（tokens 经 `@theme` / CSS 变量定义）                                           |
| 类名合并 | shadcn 官方新版 `cn()`（替代 `tailwind-merge` + `clsx`）                                        |
| 基础原语 | Base UI（`@base-ui/react`，替代 Radix UI）                                                   |
| 工作区  | Turborepo + pnpm workspace（monorepo）                                                    |
| 运行环境 | Node 26（engines 基线）                                                                     |
| Lint | ESLint 9/10 flat config，基于 `@renton/eslint-config`（详见 1.2）                              |
| 构建工具 | Rspack 生态：rslib 构建库（ESM + d.ts）、rsbuild 构建应用（apps）、底层引擎 rspack                          |
| 组件组织 | 每个组件一个目录：`组件名/index.tsx` + 样式 / 类型 /story                                               |
| 发布形态 | 发布 npm 包：包名 `@tennantite/ui`（scope `@tennantite`），仅 ESM + d.ts（rslib 正式 pipeline），保留源码级分发 |



```
minecraft-ui/                     # monorepo 根（Turborepo + pnpm）
├── pnpm-workspace.yaml           # workspace: apps/*, packages/*
├── turbo.json                    # pipeline、依赖拓扑、远程缓存
├── eslint.config.ts              # ESLint flat config（基于 @renton/eslint-config）
├── apps/
│   ├── playground/               # 组件开发预览（rsbuild 构建）
│   │   ├── rsbuild.config.ts
│   │   └── src/
│   ├── next-app/                 # SSR 验证：Next.js（App Router / RSC）
│   └── tanstack-app/             # SSR 验证：TanStack Start
├── packages/
│   ├── ui/                       # 组件库（rslib 构建：ESM only + d.ts）
│   │   ├── rslib.config.ts
│   │   ├── src/primitives/       # L1 基础原语
│   │   ├── src/containers/       # L2 容器与图标
│   │   ├── src/screens/          # L3 复合界面（组合层）
│   │   └── src/hooks/            # 共享交互钩子（悬浮、滚动等）
│   ├── tokens/                   # L0 设计令牌（CSS 变量 + TS 常量）
│   └── textures/                 # L0 像素纹理素材（原版 GUI PNG + 生成 CSS）
├── registry/                     # shadcn registry 入口（可选）
├── examples/                     # 组合用例
└── spec/                         # 本文档及后续扩展规格
```

### 1.1 SSR 与 RSC 约束（硬约束）



* **必须支持 SSR**：所有组件服务端渲染不报错、不访问浏览器 API（`window` / `document` / `localStorage`），水合无警告。

* **双框架验证**：SSR 兼容性在 TanStack Start 与 Next.js（App Router）两套应用内验证（均为 React 19 / RSC 场景）。

* **客户端组件标注**：含交互状态（悬浮、键盘、焦点）的组件文件顶部加 `"use client"`；纯展示组件（`Panel`、`Slot`、`Icon` 等）保持 Server 组件兼容。

* **渲染策略**：服务端输出初始静态结构（像素风格天然无需 JS 即可成型）；交互能力经水合后增强 —— 与 "静态优先" 原则一致。

* **副作用隔离**：滚动监听、`matchMedia` 等副作用集中在 `useEffect` 或独立客户端子组件内，避免在 SSR 期执行（拖拽已排除，见 §8）。

* **样式安全**：Tailwind 类与 CSS 变量均支持 SSR；动画默认禁用，不依赖浏览器 API。

* **Base UI 说明**：Base UI 为无头库、SSR 友好，水合增强属客户端行为；封装时统一遵循上述规则。

### 1.2 ESLint 与代码规范



* **来源**：`@renton/eslint-config` 系列（monorepo：`github.com/Muromi-Rikka/eslint-config`，默认分支 master，包含 `base` / `react` / `frontend` / `vue` / `cli` 五个包；npm 上 `@renton/eslint-config`、`@renton/eslint-config-react`、`@renton/eslint-config-frontend` 均可用）。

* **基础配置**：flat config（ESLint 9/10），`@renton/eslint-config` 的 `renton()` 提供 TypeScript 基底规则面（typescript-eslint、@stylistic、unicorn、perfectionist、regexp、jsdoc、n、jsonc/yml/markdown、unused-imports、import-lite 等）。

* **React 配置**：本项目为 React 技术栈，采用 `@renton/eslint-config-react` 的 `rentonReact()`，内置 React（`@eslint-react`）、Hooks（`eslint-plugin-react-hooks`）、Fast Refresh（`eslint-plugin-react-refresh`）规则，并可开启 `next`、`tanstackRouter`（TanStack Start）、`tanstackQuery`、`tailwindcss` 选项。

* **依赖**：`@renton/eslint-config-react`（v1.2.x）内部依赖 `@renton/eslint-config` 与 `@renton/eslint-config-frontend`（Tailwind 支持）；peer 依赖 `eslint`。

* **本项目配置示例**（根级 `eslint.config.ts`）：



```
import { rentonReact } from "@renton/eslint-config-react";

export default rentonReact({
  next: true,                 // apps/next-app（Next.js 规则）
  tanstackRouter: true,       // apps/tanstack-app（TanStack Start / Router）
  tanstackQuery: false,       // 按需开启
  tailwindcss: true,
  tailwindcssConfigPath: "./tailwind.config.ts", // Tailwind v4 CSS-first 时适配
});
```



* **作用域**：根级统一配置；`apps/next-app` 与 `apps/tanstack-app` 如规则冲突（next vs router），在子包内覆盖；turbo 任务管线挂 `lint`。



***

## 2. 分层架构总览



```
L3 复合界面   HUD / 容器交互 / 菜单流程
                ▲ 组合
L2 容器与图标  Panel · Slot · ItemStack · Icon · Card
                ▲ 组合
L1 基础原语    Button · Input · Slider · Checkbox/Switch · Select
               · Tabs · Dialog · Progress · Tooltip · ScrollArea
                ▲ 依赖
L0 基础素材    Design Tokens · 像素字体 · 像素纹理 · 渲染基调
```

依赖方向严格自下而上；上层不得反向引用下层内部实现，只能消费其公开 API。



***

## 3. L0 基础与素材

### 3.1 设计令牌（Design Tokens）

**色板**（以 Tailwind v4 `@theme` 定义 CSS 变量暴露）：



| Token              | 值                           | 用途         |
| ------------------ | --------------------------- | ---------- |
| `mc-tooltip-bg`    | `#100010` / 经典 `#FFF8E7` 文本 | 物品悬浮提示     |
| `mc-accent-green`  | `#7EC850`                   | 成就 / 主行动按钮 |
| `mc-stone`         | `#8B8B8B` 系                 | 面板、按钮基底    |
| `mc-panel-overlay` | `rgba(0,0,0,0.6)`           | 半透明界面背景    |
| `mc-text-main`     | `#FFFFFF`                   | 主文本        |
| `mc-text-dim`      | `#A0A0A0`                   | 次文本 / 禁用   |
| `mc-gold`          | `#E2B84B`                   | 标题、稀有标识    |

**字体**：像素字体（见 3.2），建议全局 `font-family` 与 `letter-spacing` 令牌化。

**间距 / 描边**：以 1px 像素步进对齐；阴影用 "硬阴影"（无模糊），模拟贴图浮雕感。

**渲染基调**：对所有像素纹理设置 `image-rendering: pixelated;`，禁止缩放模糊。

### 3.2 字体与素材授权



* 字体使用开源替代：`Minecraftia`、`VT323`、`Press Start 2P`。已确认**不做中文字体适配**，仅需覆盖英文像素字体场景。

* GUI / 物品 / 方块 / HUD / 图标全部使用固定版本（GUI 26.4-snapshot-3，物品与 HUD 26.3）的 Mojang 原版素材；授权与来源声明见 `packages/textures/LICENSE-ASSETS.md`。

* GUI 纹理由 `packages/textures/scripts/sync-gui-sprites.mjs` 生成并提交，运行时零网络；像素渲染依赖 `image-rendering: pixelated`，不做无损缩放。

### 3.3 纹理清单



| 素材                      | 尺寸参考     | 说明                  |
| ----------------------- | -------- | ------------------- |
| 按钮纹理（常态 / 悬停 / 按下 / 禁用） | 9 宫格切片   | 石纹渐变 + 硬阴影          |
| 面板背景                    | 9 宫格切片   | 半透明灰 + 边框           |
| 槽位 Slot 边框              | 1×1 可平铺  | 物品格凹槽感              |
| 像素图标集                   | 16×16 基底 | 方块 / 物品 / 状态图标（原版 26.3 素材；方块使用平面贴图，不做 3D 物品渲染） |
| 滑条轨道与把手                 | 切片       | 音量 / 难度滑杆           |



***

## 4. L1 基础原语（Privimites）

对齐 shadcn/ui 的封装方式：`Base UI 行为层 + 自定义 className 样式层`。样式层全部走 tokens，行为层复用 Base UI 的无障碍与键盘导航；Base UI 未覆盖的组件（如 `ScrollArea`、`Badge`）自行实现。



| #  | 组件           | 对齐 Base UI / 自研             | 状态 / 变体                                                                       | 备注              |
| -- | ------------ | --------------------------- | ----------------------------------------------------------------------------- | --------------- |
| 1  | `Button`     | Base UI `Button`            | 变体：`default`(石纹) / `success`(绿) / `ghost` / `disabled`；状态：normal/hover/active | 核心件，纹理九宫格       |
| 2  | `Input`      | Base UI `Input` + `Field`   | 聚焦态高亮边框                                                                       | 告示牌 / 铁砧 / 聊天输入 |
| 3  | `Slider`     | Base UI `Slider`            | 轨道 + 像素把手                                                                     | 音量、难度、灵敏度       |
| 4  | `Checkbox`   | Base UI `Checkbox`          | 勾选 / 未勾选                                                                      | 设置项             |
| 5  | `Switch`     | Base UI `Switch`            | 开 / 关                                                                         | 快速开关            |
| 6  | `RadioGroup` | Base UI `Radio`（Group/Root） | 单选组                                                                           | 选项面板            |
| 7  | `Select`     | Base UI `Select`            | 下拉 + 滚动列表                                                                     | 语言、模式           |
| 8  | `Tabs`       | Base UI `Tabs`              | 顶部 / 侧边标签                                                                     | 配方书、设置分页        |
| 9  | `Dialog`     | Base UI `Dialog` / `Modal`  | 模态弹窗 + 半透明底                                                                   | 暂停菜单、确认框        |
| 10 | `Progress`   | Base UI `Progress`          | 确定 / 不确定                                                                      | 经验条、加载条         |
| 11 | `Tooltip`    | Base UI `Tooltip`           | 悬浮物品说明                                                                        | 经典黄底 / 黑底       |
| 12 | `ScrollArea` | 自研                          | 像素滚动条                                                                         | 服务器 / 聊天列表      |
| 13 | `Badge`      | 自研（纯样式）                     | 计数徽标                                                                          | 物品数量等           |

**通用 API 约定**：全部组件接受 `className`，通过 `cn()` 合并；尺寸、颜色、变体尽量用语义 prop（`size`、`variant`、`disabled`），不暴露裸 DOM 细节。



***

## 5. L2 容器与图标



| # | 组件                              | 说明                  | 关键 API                              |
| - | ------------------------------- | ------------------- | ----------------------------------- |
| 1 | `Panel`                         | 半透明界面面板，9 宫格背景      | `variant`(default/dark)、`className` |
| 2 | `Slot` / `Grid`                 | 物品格与栅格布局，支持尺寸 / 行列数 | `size`、`columns`、`rows`、`selected`  |
| 3 | `ItemStack`                     | 图标 + 数量徽标组合         | `icon`、`count`、`selected`、`tooltip` |
| 4 | `Icon`                          | 像素图标容器（16px 基底放大）   | `name`/`src`、`size`、`pixelated`     |
| 5 | `Card` / `TitleBar` / `Divider` | 区块容器、标题栏、分隔线        | `title`、`align`、`variant`           |

**重点：**`Slot`**&#x20;与&#x20;**`ItemStack`**&#x20;是容器类界面的最小复用单元**，物品栏 / 箱子 / 快捷栏 / 合成台都建立其上。



***

## 6. L3 复合界面（Screens）

每个界面独立成目录，只做 "原语编排 + 数据注入"，不内置游戏逻辑。分三族：

### 6.1 HUD 类（常驻覆盖层，overlay 语义，无聚焦）



| 界面                | 组成原语                  | 说明            |
| ----------------- | --------------------- | ------------- |
| `HealthHungerBar` | 像素图标 + Progress       | 生命 / 饥饿 / 氧气值 |
| `ExperienceBar`   | Progress              | 经验条（含等级徽标）    |
| `Hotbar`          | Slot/Grid + ItemStack | 底部快捷栏，选中态高亮   |
| `Crosshair`       | 纯 CSS/SVG             | 准星（可隐藏）       |
| `StatusEffects`   | Icon + Tooltip        | 状态效果图标栏       |
| `BossBar`         | Progress + 标题         | Boss 血条       |

### 6.2 容器交互类（Dialog / 焦点语义，网格布局）



| 界面                   | 组成原语                                   | 说明          |
| -------------------- | -------------------------------------- | ----------- |
| `InventoryScreen`    | Dialog + Panel + Slot/Grid + ItemStack | 物品栏         |
| `ChestScreen`        | 同上 + 标题                                | 箱子 / 潜影盒    |
| `CraftingScreen`     | Grid + Slot                            | 工作台 3×3     |
| `FurnaceScreen`      | Slot + Progress                        | 熔炉（进度 / 燃料） |
| `BrewingStandScreen` | Slot                                   | 酿造台         |
| `EnchantingScreen`   | Slot + Button + 符文                     | 附魔台         |
| `BeaconScreen`       | Slot + Tabs                            | 信标          |
| `AnvilScreen`        | Input + Slot + 经验                      | 铁砧（改名）      |
| `TradingScreen`      | Slot + ScrollArea + 计价                 | 村民交易        |

### 6.3 菜单流程类



| 界面                        | 组成原语                                  | 说明       |
| ------------------------- | ------------------------------------- | -------- |
| `MainMenu`                | Logo + Button 栈                       | 主菜单      |
| `PauseMenu`               | Dialog + Button                       | 暂停 / 返回  |
| `SettingsScreen`          | Tabs + Slider + Checkbox + RadioGroup | 设置分页     |
| `MultiplayerScreen`       | ScrollArea + Button                   | 服务器列表    |
| `LanguageScreen`          | ScrollArea + Select                   | 语言选择     |
| `AdvancementsScreen`      | 树形 + Tabs + Tooltip                   | 成就 / 进度  |
| `RecipeBook`              | Tabs + Slot + 筛选                      | 配方书      |
| `ChatScreen` / `SignEdit` | Input + ScrollArea + Tooltip          | 聊天 / 告示牌 |
| `DeathScreen`             | Dialog + 文案 + Button                  | 死亡界面     |

### 6.4 原版 GUI 对齐不变量

容器界面坐标系以原版 `container/*.png` 的 **18×18 槽框左上角**为准，而不是原版 `Slot.x/y`（物品坐标）：

- 18 槽：物品 = 槽框 + 1；26 槽：物品 = 槽框 + 5（居中）。`ScreenItemSlot` / `Slot` 的 `left/top` 一律传槽框左上角。
- 槽位坐标必须来自 `@tennantite/textures` 的 `containerSlots`（由 `sync:gui-layouts` 扫描生成），或为界面新增一条与 `containerSlots` 对照的测试；不允许只按原版源码的 `Slot.x/y` 手抄。
- 256×256 / 512×256 的 GUI sheet 必须用 `GuiSprite` 的 `src` 裁剪有效区域；`ScreenPanel` 的 `background` 已内置该行为，手工 `GuiSprite` 背景必须显式传 `src`，不能依赖 `100% 100%` 拉伸。
- 选中态只切换 sprite / 颜色，不改变几何位置；需要与背景叠压时按原版绘制顺序（未选中标签 → 背景 → 选中标签）实现，而不是靠 y 偏移“挤进去”。
- 像素箭头/指示器用整数矩形或台阶路径绘制，不使用 Unicode 字形（字体回退会改变宽度与基线）。
- 不要在同一个元素上混用 `scrollbar-width` / `scrollbar-color` 与 `::-webkit-scrollbar`：Chromium 会忽略 webkit 伪元素样式，标准属性只放在 `@supports not selector(::-webkit-scrollbar)` 的 Firefox 回退里。

### 6.5 Mod 界面（视觉复刻扩展）

以 IndustrialCraft 2（工业时代 2）与 Applied Energistics 2（应用能源 2）为对象，在原版体系上扩展 mod GUI 的视觉复刻：

* **定位**：视觉复刻 + 数据注入，不含 mod 游戏逻辑（EU/能量计算、配方校验、存储检索），与 §0.2 / §8 边界一致。
* **素材**：IC2 直接使用 IndustrialCraft 2 Experimental 2.8.99-ex112（Minecraft 1.12.2）的原始 GUI 贴图（`common.png` / `guielectricblock.png` / `infobutton.png`），界面内的原版按钮、红石粉与空装备图标取同版本 Minecraft 客户端；机器窗口由 `GuiDefaultBackground` 的九宫格算法合成为 176×166。AE2 终端家族（`Ae2TerminalScreen` / `Ae2CraftingTerminalScreen`）直接使用 AE2 1.12.2 原始 GUI 贴图（`terminal.png` / `crafting.png` / `states.png`）；ME 驱动器 / ME 箱子右上角优先级角标取 AE2 1.21.10 的 `states.png`（生成名 `statesModern`，1.12.2 贴图没有标签底与优先级图标）。各贴图固定上游版本 / 提交与 SHA-1 / SHA-256，生成 `ic2-sprites.generated.css` / `ae2-sprites.generated.css`；其余 AE2 部件仍为手绘复刻。全部纹理随 `--mc-gui` 缩放；授权声明见 `packages/textures/LICENSE-ASSETS.md`。
* **坐标**：IC2 机器沿用 176×166 容器坐标系，储电箱为 176×196；槽框、EU 表、进度与按钮坐标取自 `assets/ic2/guidef/*.xml` 与反编译的 `GuiDefaultBackground` / `ContainerStandardMachine` / `GuiElectricBlock` / `ContainerElectricBlock`，集中在 `ic2-layout.ts`，测试引用同一常量。AE2 终端按贴图切片纵向拼接（header 17 + 18×rows + bottom：ME 终端 97、合成终端 170，`rows` 可调、最小 2 行），槽框 / 滚动条轨道 / 合成区全部由贴图烘焙，组件只叠加交互热区；压印器直接使用 `inscriber.png`（177×176 面板 + 右侧 35 px 升级槽条，版式同 1.12 `GuiInscriber`），ME 驱动器 176×201、ME 箱子 176×168 仍按 1.21 `assets/ae2/screens/*.json`。两者均遵守 §6.4 的 18/26 槽物品偏移不变量；AE2 坐标集中在 `ae2-layout.ts`，测试引用同一常量。
* **组件**：`Ic2EnergyGauge`（EU 能量表，可复用件：机器红色闪电自下而上 / 储电箱红色横条自左向右）；`Ic2MachineScreen`（机器共享布局基类，对标 `AbstractFurnaceScreen`）；`MaceratorScreen` / `ElectricFurnaceScreen` / `ExtractorScreen` / `CompressorScreen` / `BatBoxScreen`（L3）；`Ae2TerminalScreen` / `Ae2CraftingTerminalScreen` / `Ae2InscriberScreen` / `Ae2DriveScreen` / `Ae2ChestScreen`（L3）。共享件：`ic2-parts.tsx`（Ic2Title / Ic2Label / Ic2InfoIcon / Ic2Progress / Ic2RedstoneButton）、`ic2-layout.ts`、`ic2-types.ts`、通用 `mod-parts.tsx`（ModProgress / ModIconButton / ModSlotGrid / ModSprite / ModToolbar / ModTabButton / ModScrollbar / ModSearchField / ModTitle）、`ae2-panel.tsx`（贴图切片拼接）、`ae2-parts.tsx`（Ae2PriorityTab：右上角优先级角标，复用 `ModSprite` 裁剪 `statesModern`）与 `ae2-types.ts`；`ModSprite` 接受任意 `{ cssVar, width, height }` 贴图注册表条目，AE2 / IC2 共用。
* **基座扩展**：`ScreenPanel` 新增 `backgroundClassName` —— 未传原版精灵时以自定义纹理类替代 `.mc-tex-panel` 回退（mod 复刻界面的通用入口）；`Slot` / `PlayerInventory` / `ScreenItemSlot` 新增 `frameClassName`，允许 mod 槽框纹理，默认仍为 `mc-tex-slot`。
* **色板**：IC2 仅保留文字色令牌 `--color-mc-ic2-text`（`#404040`，与 1.12.2 界面文字一致）；能量、槽框与按钮颜色全部来自原始贴图。AE2 面板/槽/高光/阴影/进度色走 `--color-mc-ae2-*` 令牌，允许主题覆盖（§0.3）。
* **website 分组**：目录新增 `mods` 组（"Mod 界面"），IC2 / AE2 整屏界面同时进入 blocks 索引；`Ic2EnergyGauge` 作为可复用件归入 `containers` 组。
* **Mekanism 26.3（v0.14）**：固定上游 `mekanism/Mekanism` 提交 `d4df9b354c209c85713bdc8a017bfe54aa044e40`，MIT（Copyright (c) 2017-2025 Aidan C. Brady）；`sync-mekanism-sprites.mjs` 从 codeload zip 提取 `textures/gui/sprites/**`（297 个 PNG，含 `.mcmeta` 的 `nine_slice` / `tile` 缩放）、`item/upgrade/*`、`mek_liquid/*`、`mek_chemical/{infuse_type,pigment,slurry}/*`，生成 `mekanism-sprites.generated.css` / `.ts` 与 `mekanism-textures.css`。
* **Mekanism 基座**：`base` 16×16 / border 4 九宫格，默认面板 176×166；槽位坐标为容器 `slot.x - 1` / `slot.y - 1`，物品 16×16 居中；`MekanismSprite` 目标小于两倍边框时退化为整图拉伸（`inner_screen` 200×256 / border 32），液体/化学 16×512 动画条只显示首帧；`MekanismPlayerInventory` 用 Mekanism 槽框渲染 27+9 格。
* **Mekanism 组件**：`MekanismMachineScreen` + 26 个命名导出（富集仓…反质子核合成器）；`MekanismEnergyCubeScreen` / `MekanismFluidTankScreen` / `MekanismChemicalTankScreen` / `MekanismInductionMatrixScreen` / `MekanismDynamicTankScreen` / `MekanismThermoelectricBoilerScreen` / `MekanismThermalEvaporationScreen` / `MekanismPersonalStorageScreen`（L3，共 34 屏）；共享件 `MekanismSprite` / `MekanismSlot` / `MekanismGauge` / `MekanismProgress` / `MekanismBar` / `MekanismTab` + `MekanismTabBar` + `MekanismSideHolder` + `MekanismElementHolder` / `MekanismTitle` 等文本控件 / `MekanismWindow` / `MekanismSideConfigWindow` / `MekanismUpgradeWindow` / `MekanismScreen` + `useMekanismWindows`。
* **Mekanism 色板**：新增 `--color-mc-mekanism-title`（`#404040`）、`--color-mc-mekanism-subheading`（`#787878`）、`--color-mc-mekanism-screen`（`#3cfe9a`）、`--color-mc-mekanism-button`（`#ffffff`）、`--color-mc-mekanism-button-inactive`（`#a0a0a0`）；槽框、仪表、按钮颜色仍来自原始贴图。
* **Mekanism website**：`mods` 组新增机器总览 + 8 个储罐/存储屏，`containers` 组新增 11 个共享件（均标记 `mod: true`），共 20 条；`blocks.ts` 为 9 个整屏补组合说明，preview 注册对应 demo。

***

## 7. 交互规格（全局约定）



| 维度       | 约定                                                     |
| -------- | ------------------------------------------------------ |
| 拖拽       | 不做（已确认排除）；Slot 间搬运由使用方自行实现                             |
| 键盘       | 复用 Base UI 无障碍：Tab 焦点环、方向键移动选中、Enter/Space 确认；自研组件自行补齐 |
| 焦点 / 选中态 | 所有可交互组件必须有清晰 `selected`/`focus` 视觉态（白色像素描边）            |
| 悬浮       | hover 仅作桌面增强，不得承载核心功能                                  |
| 动画       | 可选扩展层，默认关闭；不依赖动画成立                                     |
| 滚动条      | 像素风格自定义滚动条（ScrollArea 内实现）                             |
| SSR      | 服务端渲染初始静态结构；悬浮 / 键盘等交互水合后增强（与 "静态优先" 一致）               |

### 7.1 尺寸适配（多容器 / 多视口）

按组件分层的适配策略：

| 组件层 | 策略 |
| ---- | ---- |
| L3 固定几何（容器界面 / HUD / 菜单） | **整体等比缩放**，永不重排、不拉伸（§6.4 原版坐标不变量）；整数倍率优先，像素最锐利 |
| L1 / L2 原语与容器 | 流式适配：九宫格 / 平铺纹理天然可拉伸，宽度跟随容器；补小屏防护（Dialog `max-width`）、长标签裁切（Button）与溢出滚动（Tabs） |
| 展示层（网站 / playground） | `ScaledBox` 按容器宽自动取档；营销定高预览用 fit 连续填充 |

**机制约束**：

* 一切缩放锚定 `--mc-scale`（1 GUI px = scale CSS px）。原版缩放为整数档，禁止 < 1 的整数档；容器窄于档位 1 最低宽度时由预览容器自行裁切或滚动（宁裁切不变形）。
* **CSS 自定义属性链在声明元素上解析固化后继承**：子树仅覆盖 `--mc-scale` 不会重新解析 `--mc-gui` / `--spacing` / `--text-mc` 等派生值。局部缩放必须配合 tokens 包的 `mc-scale-scope` 工具类（在作用域元素上重声明整条派生链）；`ScaledBox` 已内置。`--mc-scale` / `--mc-gui` 必须定义在普通 `:root` 规则 —— Tailwind v4 `@theme` 会把主题变量间的引用在构建期内联成字面量。
* `ScaledBox`（L2 容器）：`integer` 模式按容器宽取最大整数档写入 `--mc-scale` 并整树重排（等价游戏内 "GUI Scale: Auto"）；`fit` 模式在自身盒内 transform 等比缩放居中（内容按 `--mc-scale: 1` 渲染），用于营销预览。`width` / `height` 省略时按内容实测。
* **Portal 边界**：Dialog / Select / Tooltip 弹层挂 `body`，不随子树 `--mc-scale` 缩放 —— 局部缩放场景应保证弹层不展开（如 inert 预览）；应用级整体缩放在 `:root` 覆盖。
* SSR：缩放组件渲染期不访问浏览器 API，服务端按档位 1 输出，水合后测量修正（§1.1）。



***

## 8. 不建议做的事（边界声明）



1. 不做 "整屏单体大组件"—— 克制组合拆分，保证复用。

2. 不做依赖游戏引擎逻辑的功能：真实库存、合成配方校验、附魔随机、交易计价、AI 行为。

3. 不做 3D / 模型渲染：玩家 / 生物模型预览属渲染层，最多提供占位插槽。

4. GUI、物品、HUD 与状态图标使用原版素材并附来源声明；字体与音效按各自授权处理。

5. 不做纯动画 / 音效还原；核心交付在无动画时也完整成立。

6. 不把 HUD（overlay）与屏幕界面（Dialog / 焦点）混在同一个组件包 —— 交互模型不同，需分离。



***

## 9. 落地顺序与里程碑



| 阶段 | 范围                                                  | 出口标准                        |
| -- | --------------------------------------------------- | --------------------------- |
| M0 | L0 令牌 + 像素字体接入 + 原版 GUI 精灵（按钮 / 面板 / 槽位）             | tokens 与纹理在 playground 正确渲染 |
| M1 | L1 通用 4 件套：Button / Panel / Slider / Dialog         | 四个组件有完整变体与状态                |
| M2 | L2：Slot / Grid / ItemStack / Icon / Tooltip         | 能摆出一个可用物品格                  |
| M3 | HUD 验收：Hotbar + HealthHungerBar + Crosshair         | HUD 用例跑通，选中 / 悬浮正常          |
| M4 | 容器验收：InventoryScreen / CraftingScreen / ChestScreen | 三个界面可拼装、可注入数据               |
| M5 | 菜单铺开：Settings / MainMenu / Pause / Multiplayer      | 菜单族完整                       |
| M6 | 补齐其余容器界面 + 文档 / 示例完善                                | 覆盖 "大部分游戏内 UI" 目标           |

> 首版范围已确认：
>
> **全面覆盖**
>
> （§6 全部界面一次性交付）。里程碑仅作为内部开发节奏与出口检查，不按阶段切版本。



***

## 10. 验收标准（Definition of Done）



* 每个组件有：类型定义、变体 / 状态完整、`className` 可合并、story / 示例可运行。

* 像素风格统一：纹理经 `pixelated` 渲染，间距对齐 1px 步进。

* 无障碍达标：键盘可操作，焦点态清晰，语义标签（Base UI 自带；自研组件按同等标准实现）。

* SSR 通过：在 playground 与 TanStack Start / Next.js 两套 SSR 应用中验证 —— 渲染无报错、无浏览器 API 访问、水合无警告。

* 无动画依赖：禁用动画后界面仍完整可用。

* 无未授权素材：全部纹理 / 字体有来源声明。

* 界面可注入数据：任一 Screen 传入模拟数据即可渲染，不依赖全局状态。



***

## 11. 关键决策记录



| 决策点         | 结论                                                                     | 状态     |
| ----------- | ---------------------------------------------------------------------- | ------ |
| 目标 SSR 框架   | TanStack Start 与 Next.js（双框架 SSR 验证）                                   | 已确认    |
| 中文字体适配      | 不做；仅英文像素字体（Minecraftia / VT323 等）                                      | 已确认    |
| 发布形态        | 发布 npm 包（rslib 正式 pipeline），保留源码分发                                     | 已确认    |
| 产物格式        | 仅 ESM + d.ts（`"type": "module"`，exports 仅 import 入口）                   | 已确认    |
| 首版范围        | 全面覆盖 §6 全部界面（6.1 / 6.2 / 6.3）                                          | 已确认    |
| 拖拽交互        | 不做（首版及后续均排除，库保持只读展示 + 手势）                                              | 已确认    |
| Tailwind 版本 | v4（tokens 经 `@theme` / CSS 变量定义）                                       | 已确认    |
| Node 基线     | Node 26（engines 约束）                                                    | 已确认    |
| 包 scope     | `@tennantite`，包名 `@tennantite/ui`（铜绿 / 碱式碳酸铜，对应 MC 铜氧化机制；npm scope 空闲可用） | 已确认    |
| 发布前复核       | npm 官方 registry 发布时最终确认 scope 未被占用（探测基于镜像通道）                           | 待发布时执行 |

**scope 占名探测记录**（2026-10-25；方法：npm 经 npmmirror search API 查 `scope:<name>` 包数，GitHub 经用户页状态码，均以存在 / 不存在对照样本验证）：



* 34 个常用元素名（copper /iron/gold /osmium/sulfur 等）：npm 侧 27 个 scope 无包，GitHub 侧**全部已被占用**。

* 32 个冷门元素全名（bismuth /thorium/plutonium /hafnium 等）：GitHub 侧同样全部占用。

* 铜化合物 / 矿物纯名（tennantite /malachite/azurite /cuprite/patina 等 15 个）：npm 侧全部空闲，GitHub 侧全部占用（`tennantite` 被 [tennantite.org](https://tennantite.org) 占用）。

* 最终采用：npm scope 使用纯名 `@tennantite`（npm 侧空闲，包名 `@tennantite/ui`）；GitHub org 纯名 `tennantite` 已被占用，如需与 npm 一致的 org 名，可用双空闲变体 `tennantite`。

* 双平台均空闲的变体（铜化合物方向）：`tennantite`、`patina-ui`、`malachite-ui`、`azurite-ui`、`cuprite-ui`、`mc-tennantite`、`mc-malachite`、`mc-azurite`、`tennantitecraft`、`malachitecraft`、`cupritecraft`、`tennantitelab`、`patinalab`（`azuritecraft` 已被占用）。

* 双平台均空闲的变体（元素方向，备选）：`copper-ui`、`mc-copper`、`mc-osmium`、`mc-cobalt`、`osmiumcraft`、`osmium-ui`、`nickelmc`、`coppermod`；其余（`coppermc`、`osmiummc`、`cobaltmc` 等）GitHub 已占用。