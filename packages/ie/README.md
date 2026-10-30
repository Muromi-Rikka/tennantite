# @tennantite/ie

[![npm version](https://img.shields.io/npm/v/@tennantite/ie)](https://www.npmjs.com/package/@tennantite/ie)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

Minecraft-style React screen components for Immersive Engineering, built on `@tennantite/ui` and `@tennantite/textures`.

`@tennantite/ie` provides faithful recreations of Immersive Engineering's multiblock and machine GUIs — the arc furnace, blast furnace, coke oven, assembler, metal press, refinery, squeezer, mixer, excavator-adjacent machines, capacitors, the engineer's toolbox and workbenches, and more — as accessible React components with pixel-accurate sprites and the mod's distinctive energy bars.

## Installation

```bash
npm install @tennantite/ie
```

or `pnpm add @tennantite/ie`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the shared stylesheets once at your app entry, in this order (tokens → vanilla textures → Immersive Engineering textures). The mod textures file already pulls in its generated sprite CSS, so this is the only import needed for the IE sprites.

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
@import "@tennantite/textures/css/ie-textures.css";
```

## Usage

```tsx
import { IeArcFurnaceScreen } from "@tennantite/ie";

const graphite = { icon: "charcoal", tooltip: "Graphite Electrode" };

export function ArcFurnace() {
  return (
    <IeArcFurnaceScreen
      additives={[null]}
      electrodes={[graphite, graphite, graphite]}
      energy={{ max: 100000, value: 62000 }}
      inputs={[
        { count: 1, icon: "iron-ore", tooltip: "Iron Ore" },
        ...Array.from({ length: 11 }, () => null),
      ]}
      onDistribute={() => {}}
      onSlotClick={() => {}}
      outputs={[{ count: 2, icon: "iron-ingot", tooltip: "Iron Ingot x2" }, null, null]}
      progresses={[0.9, 0, 0]}
      slagOutput={{ count: 1, icon: "stone-block", tooltip: "Slag" }}
    />
  );
}
```

A second example using the energy bar primitive:

```tsx
import { IeEnergyBar } from "@tennantite/ie";

export function EnergyBar() {
  return (
    <div className="relative h-32 w-24">
      <IeEnergyBar label="Energy" left={10} max={40000} top={10} value={24000} />
      <IeEnergyBar label="Energy (high)" left={40} max={40000} top={10} value={36000} />
    </div>
  );
}
```

## Components

Screens:

- `IeMachineScreen` (generic machine screen)
- Smelting and processing: `IeArcFurnaceScreen`, `IeAlloySmelterScreen`, `IeBlastFurnaceScreen`, `IeCokeOvenScreen`, `IeMetalPressScreen`, `IeSqueezerScreen`, `IeFermenterScreen`, `IeRefineryScreen`, `IeMixerScreen`
- Fabrication: `IeAssemblerScreen`, `IeAutoWorkbenchScreen`, `IeCircuitTableScreen`, `IeModWorkbenchScreen`
- Handling and storage: `IeCrateScreen`, `IeSorterScreen`, `IeFluidSorterScreen`, `IeItemBatcherScreen`, `IeToolboxScreen`, `IeChunkLoaderScreen`
- Fluids and farming: `IeFluidProducerScreen`, `IeClocheScreen`, `IeDrillScreen`
- Energy: `IeCapacitorHvScreen`

Primitives and constants:

- `IeEnergyBar`, `IeFluidTank`, `IeLabel`, `IeLayoutSlots`, `IeProgressBars`, `IeSprite`, `IeSpriteButton`
- `IE_MACHINES` machine layout table and `ieExpandSlots` helper
- `IE_ARC_PROGRESS`, `IE_ENERGY_BAR`, `IE_ENERGY_GRADIENT`, `IE_FLAME`, `IE_SLOT_SIZE`, `IE_TEXT_COLOR`

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — core primitives and screen framework
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod-UI building blocks
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — sprite CSS for vanilla and mod GUIs
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and fonts

## Assets

Interface textures in this package are redrawn from Immersive Engineering (1.21.1) original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
