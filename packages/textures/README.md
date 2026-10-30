# @tennantite/textures

[![npm version](https://img.shields.io/npm/v/@tennantite/textures)](https://www.npmjs.com/package/@tennantite/textures)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

Vanilla Minecraft GUI textures and item/status icons as CSS sprite stylesheets with typed sprite metadata.

`@tennantite/textures` is the texture layer of the Tennantite component family. It ships pixel-perfect vanilla Minecraft GUI sprites (buttons, panels, slots, scrollbars) redrawn as nine-slice `border-image` textures, plus item, HUD, and block icons embedded as PNG data URIs. All texture classes render with `image-rendering: pixelated` and scale with the GUI pixel variable from `@tennantite/tokens`. This package contains no React components.

## Installation

```sh
npm install @tennantite/textures
```

or with pnpm:

```sh
pnpm add @tennantite/textures
```

## Styles

The package publishes one stylesheet per sprite layer under `css/`. Each mod stylesheet already `@import`s its generated sprite data, so importing a single file per layer is enough. Import in this order: tokens first, then vanilla textures, then any mod texture layers.

```css
@import "tailwindcss";
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";

/* Optional per-mod sprite layers, e.g.: */
@import "@tennantite/textures/css/mekanism-textures.css";
@import "@tennantite/textures/css/farmersdelight-textures.css";
```

## Usage

Texture classes such as `mc-tex-btn` become available as soon as the CSS is imported, and the JS entry exposes typed sprite metadata and icon data URIs:

```tsx
import { guiSpriteMeta, isBlockIconName, pixelIcons } from "@tennantite/textures";

export function VanillaButton({ children }: { children: React.ReactNode }) {
  return <button className="mc-tex-btn">{children}</button>;
}

export function AppleIcon() {
  // pixelIcons maps icon names to PNG data URIs
  return <img src={pixelIcons.apple} width={16} height={16} alt="Apple" />;
}

export function GuiSpriteExample() {
  // Sprite metadata includes the generated CSS class and variable for each sprite
  const meta = guiSpriteMeta["advancements/backgrounds/adventure.png"];
  return <div className={meta.className} />;
}

export function isBlock(name: string) {
  return isBlockIconName(name as Parameters<typeof isBlockIconName>[0]);
}
```

## Exports

Per-mod sprite metadata (typed name → class/variable/scaling data):

- `guiSpriteMeta`, `GuiSpriteName`, `GuiSpriteMeta` — vanilla GUI sprites
- `mekanismSpriteMeta`, `MekanismSpriteName`, `MekanismSpriteMeta`, `MekanismSpriteScaling`
- `ae2SpriteMeta`, `Ae2SpriteName`, `Ae2SpriteMeta`
- `createSpriteMeta`, `CreateSpriteName`, `CreateSpriteMeta`, `CreateSpriteScaling`
- `ic2SpriteMeta`, `Ic2SpriteName`, `Ic2SpriteMeta`
- `ieSpriteMeta`, `IeSpriteName`, `IeSpriteMeta`, `IeSpriteScaling`
- `thermalSpriteMeta`, `ThermalSpriteName`, `ThermalSpriteMeta`, `ThermalSpriteScaling`
- `eioSpriteMeta`, `EioSpriteName`, `EioSpriteMeta`
- `industrialForegoingSpriteMeta`, `IndustrialForegoingSpriteName`, `IndustrialForegoingSpriteMeta`
- `farmersDelightSpriteMeta`, `FarmersDelightSpriteName`, `FarmersDelightSpriteMeta`

Icons and layouts:

- `pixelIcons`, `FlatIconName` — flat item/HUD icon data URIs
- `blockFaces`, `BlockIconName` — isometric block icon data
- `PixelIconName` — union of all icon names
- `isBlockIconName` — narrows an icon name to a block icon
- `iconNames` — all icon names, sorted alphabetically
- `guiIcons`, `GuiIconName` — vanilla GUI/hud icons
- `containerSlots`, `ContainerSpriteName` — vanilla container slot layouts

## Assets

Interface textures are redrawn from the original GUI assets of Minecraft and the respective mods and remain the property of their authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).

## Related packages

- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens required by these stylesheets
- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — React component library using these textures
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared building blocks for mod UI packages
