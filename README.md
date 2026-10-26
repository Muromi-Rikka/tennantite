# Verdigris

> Minecraft 风格 UI 组件库，基于 shadcn/ui 哲学构建：复制进项目、自由裁剪。

npm 包名 `@verdigris/ui`（scope `@verdigris`）。规格文档见 [spec/minecraft-shadcn-ui-spec.md](./spec/minecraft-shadcn-ui-spec.md)。

## 技术栈

- React 19 · Base UI（`@base-ui/react`）· Tailwind CSS v4（`@theme` 令牌）
- shadcn 官方 `cn` 包（类名合并）· class-variance-authority（变体）
- Turborepo + pnpm 工作区 · rslib（库构建：ESM + d.ts）· rsbuild（应用构建）
- ESLint 10 flat config · `@renton/eslint-config-react` · Vitest 5 + React Testing Library + axe-core
- Node ≥ 26 · 支持 SSR（Next.js App Router 与 TanStack Start 双框架验证，兼容 RSC）

## 开发

```bash
pnpm install
pnpm build       # 构建全部包与应用
pnpm dev         # 启动 playground 开发预览
pnpm lint        # ESLint
pnpm typecheck   # TypeScript
pnpm test        # Vitest
```

## 结构

```
apps/
  playground/     # 组件开发预览（rsbuild）
  next-app/       # SSR 验证：Next.js App Router / RSC
  tanstack-app/   # SSR 验证：TanStack Start
packages/
  ui/             # @verdigris/ui 组件库（L1 原语 / L2 容器 / L3 界面）
  tokens/         # @verdigris/tokens 设计令牌（L0）
  textures/       # @verdigris/textures 像素纹理素材（L0，全部重绘，零 Mojang 素材）
registry/         # shadcn registry
spec/             # 规格文档
```

## 素材授权

所有纹理、图标均为本项目重绘，不包含任何 Mojang 官方素材。字体使用开源替代（Press Start 2P、VT323，均为 OFL 授权）。详见 `packages/textures/LICENSE-ASSETS.md`。
