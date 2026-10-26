# 素材授权声明（Assets Licensing）

本项目（Verdigris）遵守规格 §3.2 / §8.4：**不包含、不打包、不衍生分发任何 Mojang
官方纹理、字体或音效**。

## 纹理与图标

- `packages/textures/css/textures.css` 中的按钮四态、面板、滑条纹理：本项目原创
  重绘的内联 SVG（模仿 Minecraft GUI 的“观感”而非复刻其贴图），遵循
  Mojang 的内容使用指南中“不得复制素材本体”的边界。
- `packages/textures/src/index.ts` 中的像素图标（字符画 → SVG）：本项目原创像素画。

## 字体

| 字体 | 来源 | 授权 |
| ---- | ---- | ---- |
| Press Start 2P | [@fontsource/press-start-2p](https://fontsource.org/fonts/press-start-2p) | SIL Open Font License 1.1 |
| VT323 | [@fontsource/vt323](https://fontsource.org/fonts/vt323) | SIL Open Font License 1.1 |

规格已确认：不做中文字体适配，仅覆盖英文像素字体场景。

## 声明

"Minecraft" 是 Mojang Synergies AB 的商标。本项目与 Mojang / Microsoft 无关，
也不是官方产品。本包中的全部视觉素材均为独立重绘，供像素风格 UI 使用。
