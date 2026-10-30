# @tennantite/thermal

[![npm version](https://img.shields.io/npm/v/@tennantite/thermal)](https://www.npmjs.com/package/@tennantite/thermal)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

Minecraft-style React screen components for the Thermal Series mods, built on `@tennantite/ui` and `@tennantite/textures`.

`@tennantite/thermal` provides faithful recreations of Thermal's machine GUIs — the redstone furnace, pulverizer, induction smelter, centrifuge, refinery, dynamos, energy cells and caches, fluid tanks, and many more — as accessible React components with pixel-accurate sprites, including the signature augment panel and energy gauges.

## Installation

```bash
npm install @tennantite/thermal
```

or `pnpm add @tennantite/thermal`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the shared stylesheets once at your app entry, in this order (tokens → vanilla textures → Thermal textures). The mod textures file already pulls in its generated sprite CSS, so this is the only import needed for the Thermal sprites.

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
@import "@tennantite/textures/css/thermal-textures.css";
```

## Usage

```tsx
import { ThermalRedstoneFurnaceScreen } from "@tennantite/thermal";

export function RedstoneFurnace() {
  return (
    <ThermalRedstoneFurnaceScreen
      augments={[
        { icon: "gunpowder", tooltip: "Augment: processing speed" },
        { icon: "blaze-powder", tooltip: "Augment: energy efficiency" },
        null,
        { icon: "lapis-lazuli", tooltip: "Augment: secondary output" },
      ]}
      augmentsOpen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 1, icon: "iron-ore", tooltip: "Iron Ore" }}
      onAugmentsToggle={() => {}}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "iron-ingot", tooltip: "Iron Ingot" }}
      playerHotbar={Array.from({ length: 9 }, (_, i) => (i === 0 ? { count: 1, icon: "sword", tooltip: "Iron Sword" } : null))}
      playerItems={Array.from({ length: 27 }, (_, i) => (i === 0 ? { count: 8, icon: "charcoal", tooltip: "Charcoal" } : null))}
      progress={0.5}
      speed={0.75}
    />
  );
}
```

A second example using the energy gauge primitive:

```tsx
import { ThermalEnergyGauge } from "@tennantite/thermal";

export function EnergyGauge() {
  return (
    <div className="relative size-32">
      <ThermalEnergyGauge label="Energy" left={10} max={400000} top={10} value={200000} />
      <ThermalEnergyGauge label="Tinted" left={40} max={400000} tint="#3c7fe0" top={10} value={340000} />
    </div>
  );
}
```

## Components

Screens:

- `ThermalMachineScreen` (generic machine screen)
- `ThermalRedstoneFurnaceScreen`, `ThermalPulverizerScreen`, `ThermalSawmillScreen`, `ThermalSmelterScreen`
- `ThermalPressScreen`, `ThermalCrucibleScreen`, `ThermalChillerScreen`, `ThermalRefineryScreen`, `ThermalPyrolyzerScreen`
- `ThermalBottlerScreen`, `ThermalBrewerScreen`, `ThermalCentrifugeScreen`, `ThermalCrystallizerScreen`
- `ThermalInsolatorScreen`, `ThermalFisherScreen`, `ThermalRockGenScreen`, `ThermalWaterGenScreen`, `ThermalTreeExtractorScreen`, `ThermalHiveExtractorScreen`, `ThermalCollectorScreen`
- `ThermalSoilInfuserScreen`, `ThermalComposterScreen`, `ThermalNullifierScreen`, `ThermalPotionDiffuserScreen`
- `ThermalCacheScreen`, `ThermalFluidCacheScreen`, `ThermalEnergyCellScreen`
- `ThermalChargeBenchScreen`, `ThermalCrafterScreen`, `ThermalTinkerBenchScreen`, `ThermalXpCondenserScreen`

Primitives and constants:

- `ThermalAugmentPanel`, `ThermalEnergyGauge`, `ThermalItemGauge`, `ThermalFluidTank`
- `ThermalCellRateText`, `ThermalCellStepButton`, `ThermalLayoutSlot`, `ThermalSprite`, `ThermalSpriteProgress`
- `THERMAL_MACHINES` machine layout table
- `THERMAL_AUGMENT_PANEL`, `THERMAL_AUGMENT_TAB`, `THERMAL_CELL_CONTROLS`, `THERMAL_ENERGY_GAUGE`, `THERMAL_FLUID_STORAGE`, `THERMAL_GUI`, `THERMAL_ITEM_GAUGE`, `THERMAL_LARGE_SLOT`, `THERMAL_PROGRESS_ARROW`, `THERMAL_SCALE_ELEMENT`, `THERMAL_SLOT_SIZE`, `THERMAL_SPEED_FLAME`, `THERMAL_TEXT_COLOR`

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — core primitives and screen framework
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod-UI building blocks
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — sprite CSS for vanilla and mod GUIs
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and fonts

## Assets

Interface textures in this package are redrawn from the Thermal Series (1.20.x) original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
