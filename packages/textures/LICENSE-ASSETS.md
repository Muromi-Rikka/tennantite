# 素材授权声明（Assets Licensing）

本项目（Verdigris）的视觉素材分两类，授权不同。

## GUI 精灵（Minecraft Java 26.4-snapshot-3 原版素材）

`packages/textures/css/gui-sprites.generated.css` 与
`packages/textures/src/gui-sprites.generated.ts` 中的 577 个 GUI 精灵取自
Resource Pack Creator 的 GUI 分类（Mojang 原版 GUI PNG）：

- 目录：<https://resourcepackcreator.com/browse-v2?category=gui>
- manifest：<https://resourcepackcreator.com/texture-manifest.json>
- 版本：`26.4-snapshot-3`
- 路径：`https://resourcepackcreator.com/textures/gui/<path>`
- 生成脚本：`packages/textures/scripts/sync-gui-sprites.mjs`；重新生成/校验：
  `pnpm --filter @verdigris/textures sync:gui-sprites` /
  `pnpm verify:assets`。

仓库不包含原始散图，只包含生成文件中的 base64 data URI。GUI 纹理版权归
Mojang Synergies AB，**不在本项目授权范围内**。使用需遵守
[Minecraft EULA](https://www.minecraft.net/en-us/eula) 与
[Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines)。
本项目不提供、也不暗示任何来自 Mojang 的授权。

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

`packages/textures/src/gui-icons.generated.ts` 另有 23 个 GUI 图标与 41 个
`mob_effect` 图标，来自同一 GUI 目录；与 GUI 精灵同一授权与来源。

这些图标版权归 Mojang Synergies AB，**不在本项目授权范围内**。复制、使用或再分发
需遵守 [Minecraft EULA](https://www.minecraft.net/en-us/eula) 与
[Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines)。
本项目不提供、也不暗示任何来自 Mojang 的授权。

## IC2（工业时代 2）风格纹理（手工复刻，非原始素材）

`packages/textures/css/ic2-textures.css` 中的 `.mc-tex-ic2-*` 纹理（机器窗口、
EU 能量槽、闪电图标、进度箭头、红石模式图标等）为参考 IndustrialCraft 2 视觉的
**手绘 SVG 像素复刻**，按本项目约定以 `--mc-gui` 缩放。文件不包含、也不分发
IC2 mod 的任何原始 PNG / 二进制素材；"IndustrialCraft" 相关名称与商标归其
原作者所有。组件仅作视觉展示用途（数据注入，无游戏逻辑）。

## AE2（应用能源 2）原始 GUI 贴图

终端家族（`Ae2TerminalScreen` / `Ae2CraftingTerminalScreen`）与 `Ae2DriveScreen` /
`Ae2ChestScreen` 的优先级角标直接使用 Applied Energistics 2 的原始 GUI 贴图：

- 上游（1.12.2）：<https://github.com/AE2-UEL/Applied-Energistics-2>（AE2 1.12.2 维护分支）
- 提交：`724ffaebe3a8ba7d2320431acf03a8c2f6345d9e`
- 文件：`assets/appliedenergistics2/textures/guis/{terminal,crafting,states}.png`
- 上游（1.21.10）：<https://github.com/AppliedEnergistics/Applied-Energistics-2>
- 提交：`f0935a94b490397361e0c08e2bfd27f923af0f23`
- 文件：`assets/ae2/textures/guis/states.png` → 生成名 `statesModern`
  （1.12.2 贴图不含标签按钮底与优先级图标，`Ae2DriveScreen` / `Ae2ChestScreen`
  右上角 `openPriority` 角标只能取现代贴图）
- 产物：`packages/textures/css/ae2-sprites.generated.css` 与
  `packages/textures/src/ae2-sprites.generated.ts`（base64 data URI，仓库不含散图）
- 生成脚本：`packages/textures/scripts/sync-ae2-sprites.mjs`；重新生成/校验：
  `pnpm --filter @verdigris/textures sync:ae2-sprites` /
  `pnpm verify:assets`。

AE2 以 **GNU LGPL-3.0** 发布（<https://github.com/AE2-UEL/Applied-Energistics-2/blob/master/LICENSE>）。
对应贴图版权归 Applied Energistics 2 作者所有；再分发需保留本声明并遵守 LGPL-3.0。
"Applied Energistics" 相关名称与商标归其原作者所有。

其余 AE2 部件（压印进度条、工具栏按钮底、清空按钮、部分图标）仍为
`packages/textures/css/ae2-textures.css` 中的手绘 SVG 像素复刻，不含原始素材。

## 字体

| 字体 | 来源 | 授权 |
| ---- | ---- | ---- |
| Minecraft | [IdreesInc/Minecraft-Font](https://github.com/IdreesInc/Minecraft-Font) | SIL Open Font License 1.1（见 `packages/tokens/fonts/LICENSE-Minecraft-Font.txt`） |

字体度量：`unitsPerEm=18`、`ascent=16`、`descent=-2`、`lineGap=2`，故
`font-size: 9 × GUI scale` 时字高 8 GUI px、行高 9 GUI px，与原版一致。

规格已确认：不做中文字体适配；字体仅覆盖拉丁字符，中文回退到系统无衬线字体。

## 声明

"Minecraft" 是 Mojang Synergies AB 的商标。本项目与 Mojang / Microsoft 无关，
也不是官方产品。GUI、物品、方块、HUD、图标与字体按上述来源与授权使用。
