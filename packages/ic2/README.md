# @tennantite/ic2

[![npm version](https://img.shields.io/npm/v/@tennantite/ic2)](https://www.npmjs.com/package/@tennantite/ic2)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

React components that recreate the machine GUIs of IC2 Experimental 2.8.99.

`@tennantite/ic2` provides pixel-faithful, interactive recreations of IndustrialCraft 2's machine and energy storage screens — furnaces, macerators, compressors, the BatBox and MFSU, and more — built on top of the shared primitives in `@tennantite/mods-core` and `@tennantite/ui`.

## Installation

```bash
npm install @tennantite/ic2
```

or `pnpm add @tennantite/ic2`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the stylesheets in this order:

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
@import "@tennantite/textures/css/ic2-textures.css";
```

The `ic2-textures.css` file already pulls in the generated IC2 sprite CSS, so this single import is all you need for the mod-specific sprites.

## Usage

```tsx
import { ElectricFurnaceScreen } from "@tennantite/ic2";

export function ElectricFurnace() {
  return (
    <ElectricFurnaceScreen
      energy={{ max: 2000, value: 1750 }}
      input={{ icon: "iron-ore", tooltip: "Iron ore" }}
      output={{ count: 1, icon: "iron-ingot", tooltip: "Iron ingot" }}
      progress={0.8}
      title="Electric Furnace"
    />
  );
}
```

Energy storage screens follow the same pattern:

```tsx
import { MfsuScreen } from "@tennantite/ic2";

export function Mfsu() {
  return (
    <MfsuScreen
      energy={{ max: 40000000, value: 26000000 }}
      charge={{ icon: "lapis-lazuli", tooltip: "RE battery" }}
      title="MFSU"
    />
  );
}
```

## Components

### Screens

Complete machine and energy storage GUIs:

`IronFurnaceScreen`, `ElectricFurnaceScreen`, `InductionFurnaceScreen`, `MaceratorScreen`, `CompressorScreen`, `ExtractorScreen`, `RecyclerScreen`, `MetalFormerScreen`, `FermentorScreen`, `Ic2BlastFurnaceScreen`, `BatBoxScreen`, `CesuScreen`, `MfsuScreen`.

### Shared primitives

Building blocks for composing custom screens: `Ic2MachineScreen`, `Ic2EnergyGauge`, `Ic2HeatGauge`, `Ic2Progress`, `Ic2RedstoneButton`, `Ic2UpgradeStrip`.

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — vanilla-style Minecraft UI primitives this package builds on
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod GUI building blocks
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — GUI sprite stylesheets, including the IC2 sprite data

## Assets

Interface textures in this package are redrawn from IC2's original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
