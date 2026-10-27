# 素材授权声明（Assets Licensing）

本项目（Verdigris）遵守规格 §3.2 / §8.4：**不包含、不打包、不衍生分发任何 Mojang
官方纹理、字体或音效**。

视觉基准为 Minecraft Java 26.3 稳定版的 GUI 布局与配色采样值；所有纹理与图标均为
本项目按该基准重新绘制的内联 SVG，不含 Mojang 像素数据。

## 纹理与图标

- `packages/textures/css/textures.css` 中的按钮、面板、槽位、滑条、标签页、滚动条、
  Tooltip、热键栏、经验条、Boss 条、容器进度精灵：本项目原创重绘的内联 SVG
  （模仿 Minecraft GUI 的“观感”而非复刻其贴图），遵循 Mojang 的内容使用指南中
  “不得复制素材本体”的边界。
- `packages/textures/src/index.ts` 中的像素图标（字符画 → SVG）：本项目原创像素画。

## 字体

| 字体 | 来源 | 授权 |
| ---- | ---- | ---- |
| Minecraft | [IdreesInc/Minecraft-Font](https://github.com/IdreesInc/Minecraft-Font) | SIL Open Font License 1.1（见 `packages/tokens/fonts/LICENSE-Minecraft-Font.txt`） |

字体度量：`unitsPerEm=18`、`ascent=16`、`descent=-2`、`lineGap=2`，故
`font-size: 9 × GUI scale` 时字高 8 GUI px、行高 9 GUI px，与原版一致。

规格已确认：不做中文字体适配；字体仅覆盖拉丁字符，中文回退到系统无衬线字体。

## 声明

"Minecraft" 是 Mojang Synergies AB 的商标。本项目与 Mojang / Microsoft 无关，
也不是官方产品。本包中的全部视觉素材均为独立重绘，供像素风格 UI 使用。
