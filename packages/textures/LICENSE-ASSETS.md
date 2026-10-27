# 素材授权声明（Assets Licensing）

本项目（Verdigris）的视觉素材分两类，授权不同。

## GUI 九宫格与进度条（本项目重绘）

`packages/textures/css/textures.css` 中的按钮、面板、槽位、滑条、标签页、滚动条、
Tooltip、热键栏、经验条、Boss 条、容器进度精灵：本项目原创重绘的内联 SVG
（模仿 Minecraft GUI 的“观感”而非复刻其贴图）。

## 图标（Minecraft Java 26.3 原版素材）

`packages/textures/src/pixel-icons.generated.ts` 中的 31 个图标提取自 Mojang 官方
Minecraft Java 26.3 客户端 `client.jar`：

- 下载：<https://piston-data.mojang.com/v1/objects/e877b6a07acd633fb3bb475002175cec036e7b87/client.jar>
- SHA-1：`e877b6a07acd633fb3bb475002175cec036e7b87`（41,483,720 bytes）
- 提取路径：
  - `assets/minecraft/textures/item/*.png`：14 个物品图标，16×16（苹果、钻石、铁剑、绿宝石、铁锭、青金石、烈焰粉、地狱疣、木炭、小麦、火药、药水、铁胸甲、经验瓶）。
  - `assets/minecraft/textures/block/*.png`：6 个方块图标，16×16（石头、泥土、草方块侧面、铁矿石、工作台正面、橡木木板）。使用平面贴图，不是游戏内 3D 物品渲染。
  - `assets/minecraft/textures/gui/sprites/hud/*.png`：11 个 HUD 状态图标，9×9（生命、饥饿、护甲、氧气及其半格/空槽）。
- 生成脚本：`packages/textures/scripts/sync-vanilla-icons.mjs`；重新生成：
  `pnpm --filter @verdigris/textures sync:icons`。
- 仓库不包含 `client.jar` 或原始 PNG 文件，只包含上述 31 个图标编码后的 base64 data URI。

这些图标版权归 Mojang Synergies AB，**不在本项目授权范围内**。复制、使用或再分发
需遵守 [Minecraft EULA](https://www.minecraft.net/en-us/eula) 与
[Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines)。
本项目不提供、也不暗示任何来自 Mojang 的授权。

## 字体

| 字体 | 来源 | 授权 |
| ---- | ---- | ---- |
| Minecraft | [IdreesInc/Minecraft-Font](https://github.com/IdreesInc/Minecraft-Font) | SIL Open Font License 1.1（见 `packages/tokens/fonts/LICENSE-Minecraft-Font.txt`） |

字体度量：`unitsPerEm=18`、`ascent=16`、`descent=-2`、`lineGap=2`，故
`font-size: 9 × GUI scale` 时字高 8 GUI px、行高 9 GUI px，与原版一致。

规格已确认：不做中文字体适配；字体仅覆盖拉丁字符，中文回退到系统无衬线字体。

## 声明

"Minecraft" 是 Mojang Synergies AB 的商标。本项目与 Mojang / Microsoft 无关，
也不是官方产品。GUI 九宫格与进度条为独立重绘；物品、方块与 HUD 状态图标按上述
来源与授权使用。
