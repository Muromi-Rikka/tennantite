# @tennantite/industrialforegoing

[![npm version](https://img.shields.io/npm/v/@tennantite/industrialforegoing)](https://www.npmjs.com/package/@tennantite/industrialforegoing)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

React components that recreate Industrial Foregoing (1.21) machine screens in the style of the Minecraft GUI.

`@tennantite/industrialforegoing` provides pixel-accurate recreations of Industrial Foregoing's interfaces — machines such as the Dissolution Chamber, Fluid Extractor, Mob Crusher, Laser Base, and the Mycelial generator family — plus shared primitives (slots, tanks, progress bars, redstone buttons) that follow the mod's gray-panel look. Built on `@tennantite/mods-core` and `@tennantite/ui`.

## Installation

```sh
npm install @tennantite/industrialforegoing
```

or `pnpm add @tennantite/industrialforegoing`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the base layers once in this order, then the Industrial Foregoing textures:

```ts
import "@tennantite/tokens/css/tokens.css";
import "@tennantite/textures/css/textures.css";
import "@tennantite/textures/css/industrialforegoing-textures.css";
```

The `industrialforegoing-textures.css` file already pulls in its generated sprite CSS, so a single import is enough.

## Usage

```tsx
import { useState } from "react";
import { IfDissolutionChamberScreen } from "@tennantite/industrialforegoing";

export function DissolutionChamber() {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <IfDissolutionChamberScreen
      energy={{ max: 1000, value: 620 }}
      inputFluid={{ max: 1000, tint: "#41CD34", value: 480 }}
      inputs={[
        { icon: "diamond" },
        { count: 8, icon: "wheat" },
        { icon: "emerald" },
        { count: 16, icon: "gunpowder" },
      ]}
      isLocked={isLocked}
      onLockChange={setIsLocked}
      output={{ icon: "potion" }}
      outputFluid={{ max: 1000, tint: "#B24CD8", value: 260 }}
      progress={0.45}
    />
  );
}
```

`IfMachineScreen` renders any machine in the layout table from a spec, and `IfMachineGallery` previews the whole machine family:

```tsx
import { IfMachineGallery } from "@tennantite/industrialforegoing";

export function Gallery() {
  return <IfMachineGallery className="flex max-w-full flex-wrap gap-12" />;
}
```

## Components

### Screens

- `IfBiofuelGeneratorScreen`, `IfBioreactorScreen`, `IfDissolutionChamberScreen`
- `IfDyeMixerScreen`, `IfFermentationStationScreen`, `IfFluidExtractorScreen`
- `IfLaserBaseScreen`, `IfMobCrusherScreen`, `IfMycelialGeneratorScreen`, `IfPotionBrewerScreen`

### Shared building blocks

- `IfMachineScreen`, `IfMachineGallery`, `IfEnergyBar`, `IfFluidTank`, `IfTankPanel`
- `IfSlot`, `IfProgress`, `IfRedstoneButton`, `IfIconButton`, `IfSprite`
- `IfAugmentPanel`, `IfTextField`

### Layout, markers, and metrics

- `IF_MACHINES`, `IF_MACHINE_KEYS`, `IF_MYCEALIAL_VARIANTS`, `mycelialGeneratorSpec`, `resolveIfMachineLayout`
- `IF_REDSTONE_LABELS`, `IF_REDSTONE_ORDER`, `ifButtonCrop`, `ifNextRedstone`, `ifRedstoneCrop`
- Metric constants: `IF_ENERGY`, `IF_PROGRESS_SIZES`, `IF_SCREEN_WIDTH`, `IF_SLOT_SIZE`, `IF_TEXT_COLOR`, and more
- Types: `IfMachineKey`, `IfMachineSpec`, `IfFamily`, `IfRedstoneMode`, `IfEnergyState`, `IfFluidState`, and per-screen `*Props` types

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — core Minecraft-style primitives (slots, panels, inventory)
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod-UI building blocks
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — sprite CSS for vanilla and mod GUIs

## Assets

Interface textures in this package are redrawn from Industrial Foregoing's original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
