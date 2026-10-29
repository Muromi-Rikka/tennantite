# 素材授权声明（Assets Licensing）

本项目（Tennantite）的视觉素材分两类，授权不同。

## GUI 精灵（Minecraft Java 26.4-snapshot-3 原版素材）

`packages/textures/css/gui-sprites.generated.css` 与
`packages/textures/src/gui-sprites.generated.ts` 中的 577 个 GUI 精灵取自
Resource Pack Creator 的 GUI 分类（Mojang 原版 GUI PNG）：

- 目录：<https://resourcepackcreator.com/browse-v2?category=gui>
- manifest：<https://resourcepackcreator.com/texture-manifest.json>
- 版本：`26.4-snapshot-3`
- 路径：`https://resourcepackcreator.com/textures/gui/<path>`
- 生成脚本：`packages/textures/scripts/sync-gui-sprites.mjs`；重新生成/校验：
  `pnpm --filter @tennantite/textures sync:gui-sprites` /
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
  `pnpm --filter @tennantite/textures sync:icons`。

`packages/textures/src/gui-icons.generated.ts` 另有 23 个 GUI 图标与 41 个
`mob_effect` 图标，来自同一 GUI 目录；与 GUI 精灵同一授权与来源。

这些图标版权归 Mojang Synergies AB，**不在本项目授权范围内**。复制、使用或再分发
需遵守 [Minecraft EULA](https://www.minecraft.net/en-us/eula) 与
[Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines)。
本项目不提供、也不暗示任何来自 Mojang 的授权。

## IC2（工业时代 2）与 Minecraft 1.12.2 原始 GUI 贴图

IC2 机器界面与储电箱界面直接使用 IndustrialCraft 2 Experimental 2.8.99-ex112
（Minecraft 1.12.2）的原始 GUI 贴图，以及同版本 Minecraft 客户端的原版按钮 /
红石粉 / 空装备图标：

- IC2 下载：<https://maven.ic2.player.to/net/industrial-craft/industrialcraft-2/2.8.99-ex112/industrialcraft-2-2.8.99-ex112.jar>
  - SHA-1：`3dc2c457ce0fd73bb70d9240ab45e092e06b0e8a`（8,065,969 bytes）
  - 提取路径：`assets/ic2/textures/gui/{common,guielectricblock,infobutton}.png`
  - 生成名：`common`（原样 256×256）、`electricBlock`（裁剪 176×196）、
    `infoButton`（裁剪 10×10）、`machineBackground`（按
    `GuiDefaultBackground` 九宫格合成的 176×166）
- Minecraft 1.12.2 client 下载：<https://piston-data.mojang.com/v1/objects/0f275bc1547d01fa5f56ba34bdc87d981ee12daf/client.jar>
  - SHA-1：`0f275bc1547d01fa5f56ba34bdc87d981ee12daf`（10,180,113 bytes）
  - 提取路径：`assets/minecraft/textures/gui/widgets.png`（按钮切片 20×20，
    v=66 常态 / v=86 悬停）、`assets/minecraft/textures/items/redstone_dust.png`
    与 `empty_armor_slot_{boots,leggings,chestplate,helmet}.png`
- 产物：`packages/textures/css/ic2-sprites.generated.css` 与
  `packages/textures/src/ic2-sprites.generated.ts`（base64 data URI，仓库不含散图）
- 生成脚本：`packages/textures/scripts/sync-ic2-sprites.mjs`；重新生成/校验：
  `pnpm --filter @tennantite/textures sync:ic2-sprites` /
  `pnpm verify:assets`。

IC2 贴图版权归 IndustrialCraft 2 作者所有，**不在本项目授权范围内**，本项目不授予
任何再分发授权；"IndustrialCraft" 相关名称与商标归其原作者所有。Minecraft 1.12.2
贴图版权归 Mojang Synergies AB，使用需遵守
[Minecraft EULA](https://www.minecraft.net/en-us/eula) 与
[Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines)。
组件仅作视觉展示用途（数据注入，无游戏逻辑）。

## Mekanism 原始 GUI 贴图

Mekanism 26.3 界面与共享件直接使用 Mekanism 上游的原始 GUI 贴图：

- 上游：<https://github.com/mekanism/Mekanism>
- 提交：`d4df9b354c209c85713bdc8a017bfe54aa044e40`
- 提取路径：
  - `src/main/resources/assets/mekanism/textures/gui/sprites/**`（297 个 PNG，
    含 `.mcmeta` 的 `gui.scaling`：`nine_slice` / `tile`）
  - `src/main/resources/assets/mekanism/textures/item/upgrade/*.png`（7 个升级图标）
  - `src/main/resources/assets/mekanism/textures/mek_liquid/*.png`（仪表填充）
  - `src/main/resources/assets/mekanism/textures/mek_chemical/{infuse_type,pigment,slurry}/*.png`
- 产物：`packages/textures/css/mekanism-sprites.generated.css` 与
  `packages/textures/src/mekanism-sprites.generated.ts`（base64 data URI，仓库不含散图）
- 生成脚本：`packages/textures/scripts/sync-mekanism-sprites.mjs`；重新生成/校验：
  `pnpm --filter @tennantite/textures sync:mekanism-sprites` /
  `pnpm verify:assets`。

Mekanism 以 **MIT** 发布，Copyright (c) 2017-2025 Aidan C. Brady。生成的 data URI
属于派生分发，再分发需保留本声明与 MIT 许可文本。"Mekanism" 相关名称与商标归其
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
  `pnpm --filter @tennantite/textures sync:ae2-sprites` /
  `pnpm verify:assets`。

AE2 以 **GNU LGPL-3.0** 发布（<https://github.com/AE2-UEL/Applied-Energistics-2/blob/master/LICENSE>）。
对应贴图版权归 Applied Energistics 2 作者所有；再分发需保留本声明并遵守 LGPL-3.0。
"Applied Energistics" 相关名称与商标归其原作者所有。

其余 AE2 部件（压印进度条、工具栏按钮底、清空按钮、部分图标）仍为
`packages/textures/css/ae2-textures.css` 中的手绘 SVG 像素复刻，不含原始素材。

## Create（机械动力）原始 GUI 贴图

Create 界面（过滤器、工具箱、蓝图桌、数值面板的 GUI 图集与物品栏贴图）直接使用
Create 上游的原始 GUI 贴图：

- 上游：<https://github.com/Creators-of-Create/Create>（分支 `mc1.21.1/dev`）
- 提交：`4148fd8d5b05c85d88947edc00fb495a5074f57d`
- 提取路径：`src/main/resources/assets/create/textures/gui/{filters,filters_2,icons,player_inventory,schematics,schematics_2,toolbox,value_settings}.png`
  （8 个 256×256 图集；`machine-background`（176×166）为按原版
  `player_inventory.png` 顶带 + 平整横带 + 倒置顶带合成的合成图——Create 磨石 /
  粉碎机上游无 GUI Screen，照 IC2 `machineBackground` 先例合成）
- 产物：`packages/textures/css/create-sprites.generated.css` 与
  `packages/textures/src/create-sprites.generated.ts`（base64 data URI，仓库不含散图）
- 生成脚本：`packages/textures/scripts/sync-create-sprites.mjs`；重新生成/校验：
  `pnpm --filter @tennantite/textures sync:create-sprites` / `pnpm verify:assets`。

Create 代码以 **MIT** 发布，但其 `src/main/resources/assets/` 下贴图版权归
The Create Team / The Creators of Create 所有（**All Rights Reserved**），**不在
本项目授权范围内**，本项目不授予任何再分发授权。"Create" / "Mechanical Mastery"
相关名称与商标归其原作者所有。组件仅作视觉展示用途（数据注入，无游戏逻辑）。

## Thermal Expansion（热力膨胀）原始 GUI 贴图

Thermal Expansion 界面（机器容器背景、能量/容量表、进度箭头、按钮与过滤器图标）
直接使用 CoFH 上游的原始 GUI 贴图。1.20.x 时代 CoFH 将素材拆分至 ThermalCore 与
CoFHCore 仓库，故脚本固定三个提交：

- 代码（Screen 类坐标来源）：<https://github.com/CoFH/ThermalExpansion>（分支 `1.20.x`）
  - 提交：`24a26758694ba32eb96a8105f080c36e768cd02f`
- 容器背景：<https://github.com/CoFH/ThermalCore>
  - 提交：`cc7c230146a71d177767a8f9d6b26f0a52e9aeed`
  - 提取路径：`assets/thermal/textures/gui/container/*.png`（39 个）
- 共享部件：<https://github.com/CoFH/CoFHCore>
  - 提交：`dcd7bd6703418ee2e8eb2185957de83925fa89fe`
  - 提取路径：`assets/cofh_core/textures/gui/{elements,icons,filters}/**` 与
    `generic.png` / `generic_extension.png`
- 产物：`packages/textures/css/thermal-sprites.generated.css` 与
  `packages/textures/src/thermal-sprites.generated.ts`（base64 data URI，仓库不含散图）
- 生成脚本：`packages/textures/scripts/sync-thermal-sprites.mjs`；重新生成/校验：
  `pnpm --filter @tennantite/textures sync:thermal-sprites` / `pnpm verify:assets`。

CoFH 仓库以 "Don't Be a Jerk" License v2 发布（默认 All Rights Reserved），贴图版权归
Team CoFH 所有，**不在本项目授权范围内**，本项目不授予任何再分发授权。"Thermal
Expansion" / "CoFH" 相关名称与商标归其原作者所有。组件仅作视觉展示用途（数据注入，
无游戏逻辑）。

## Immersive Engineering（沉浸工程）原始 GUI 贴图

Immersive Engineering 界面（焦炉 / 电弧炉 / 压机 / 电容窗口、HUD 方形按钮、
machine_interface 部件）直接使用 Immersive Engineering 上游的原始 GUI 贴图：

- 上游：<https://github.com/BluSunrize/ImmersiveEngineering>（分支 `1.21.1`）
- 提交：`75a27f03e4243544243567e8d5c38d336f4f10f4`
- 提取路径：`src/main/resources/assets/immersiveengineering/textures/gui/**`
  （130 个 PNG，含 `sprites/` 子目录；唯一 `.mcmeta` 为
  `sprites/machine_interface/select_box.png` 的 `nine_slice`）
- 产物：`packages/textures/css/ie-sprites.generated.css` 与
  `packages/textures/src/ie-sprites.generated.ts`（base64 data URI，仓库不含散图）
- 生成脚本：`packages/textures/scripts/sync-ie-sprites.mjs`；重新生成/校验：
  `pnpm --filter @tennantite/textures sync:ie-sprites` / `pnpm verify:assets`。

Immersive Engineering 以 "Blu's License of Common Sense" 发布，贴图版权归
BluSunrize 及各原作者所有，**不在本项目授权范围内**，本项目不授予任何再分发授权；
"Immersive Engineering" 相关名称与商标归其原作者所有。组件仅作视觉展示用途
（数据注入，无游戏逻辑）。

## Ender IO 原始 GUI 贴图

Ender IO 界面（合金炉 / SAG 磨粉机 / 斯特林发电机 / 灵魂绑定器 / 电容组）与共享件
直接使用 Ender IO 上游的原始 GUI 贴图：

- 上游：<https://github.com/Team-EnderIO/EnderIO>（分支 `26.3`）
- 提交：`672d750cd96bf2216fd0edf9e429558681d14191`
- 提取路径：`enderio/src/main/resources/assets/enderio/textures/gui/` 下的
  `screen/**`、`sprites/**` 与 `widgets.png`（150 个 PNG，无 `.mcmeta`）
- 产物：`packages/textures/css/enderio-sprites.generated.css` 与
  `packages/textures/src/enderio-sprites.generated.ts`（base64 data URI，仓库不含散图）
- 生成脚本：`packages/textures/scripts/sync-enderio-sprites.mjs`；重新生成/校验：
  `pnpm --filter @tennantite/textures sync:enderio-sprites` / `pnpm verify:assets`。

Ender IO 以 **Unlicense（public domain）** 发布，贴图属于同一仓库的 public domain
素材。"Ender IO" 相关名称与商标归其原作者所有。组件仅作视觉展示用途（数据注入，
无游戏逻辑）。

## Industrial Foregoing 与 Titanium 原始 GUI 贴图

Industrial Foregoing 机器界面（48 台机器 / 16 种菌丝发电机变体）直接使用上游原始
GUI 贴图，并复用 Titanium 4.x 的通用机器背景：

- Industrial Foregoing：<https://github.com/InnovativeOnlineIndustries/Industrial-Foregoing>
  （分支 `1.21`），提交 `ce2852db4b34af3ab1b9637cff0b327d4bb561d5`；
  提取 `src/main/resources/assets/industrialforegoing/textures/gui/` 下的
  `machines.png`、`machines_extra.png` 与 `donate.png`。
- Titanium：<https://github.com/InnovativeOnlineIndustries/Titanium>（分支 `1.21`），
  提交 `f8f0461458a4a3a54aa0239c9243a7716b7be436`；
  提取 `src/main/resources/assets/titanium/textures/gui/` 下的
  `background.png` 与 `background_alt.png`。
- 产物：`packages/textures/css/industrialforegoing-sprites.generated.css` 与
  `packages/textures/src/industrialforegoing-sprites.generated.ts`（base64 data URI，
  仓库不含散图）。
- 生成脚本：`packages/textures/scripts/sync-industrialforegoing-sprites.mjs`；
  重新生成 / 校验：`pnpm --filter @tennantite/textures sync:industrialforegoing-sprites`
  / `pnpm verify:assets`。

Industrial Foregoing 以 **MIT** 发布（Copyright (c) 2017 Buuz135），Titanium 以
**LGPL-3.0** 发布（Copyright (C) 2026 Horizon Studio）。贴图按上述授权随仓库分发。
"Industrial Foregoing" 相关名称与商标归其原作者所有。组件仅作视觉展示用途
（数据注入，无游戏逻辑）。

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
