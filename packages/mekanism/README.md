# @tennantite/mekanism

[![npm version](https://img.shields.io/npm/v/@tennantite/mekanism)](https://www.npmjs.com/package/@tennantite/mekanism)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

React components that recreate the machine GUIs of Mekanism 26.3.

`@tennantite/mekanism` provides pixel-faithful, interactive recreations of Mekanism's machine and storage screens — energy cubes, tanks, factories, the Digital Miner, the Induction Matrix, and more — built on top of the shared primitives in `@tennantite/mods-core` and `@tennantite/ui`.

## Installation

```bash
npm install @tennantite/mekanism
```

or `pnpm add @tennantite/mekanism`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the stylesheets in this order:

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
@import "@tennantite/textures/css/mekanism-textures.css";
```

The `mekanism-textures.css` file already pulls in the generated Mekanism sprite CSS, so this single import is all you need for the mod-specific sprites.

## Usage

```tsx
import { MekanismEnergyCubeScreen } from "@tennantite/mekanism";

export function EnergyCube() {
  return (
    <MekanismEnergyCubeScreen
      energy={{ max: 4000000, value: 2400000 }}
      charge={{ count: 32, icon: "iron-ingot", tooltip: "Iron ingot" }}
      discharge={{ count: 8, icon: "gold-ingot", tooltip: "Gold ingot" }}
    />
  );
}
```

Fluid and chemical tanks follow the same pattern:

```tsx
import { MekanismFluidTankScreen } from "@tennantite/mekanism";

export function FluidTank() {
  return (
    <MekanismFluidTankScreen
      fluid={{ amount: 64000, capacity: 128000, tint: "#3c7fe0" }}
      input={{ count: 8, icon: "gold-ingot", tooltip: "Gold ingot" }}
      output={{ count: 32, icon: "iron-ingot", tooltip: "Iron ingot" }}
    />
  );
}
```

## Components

### Screens

Complete machine and block GUIs:

`MekanismEnergyCubeScreen`, `MekanismInductionMatrixScreen`, `MekanismDigitalMinerScreen`, `MekanismDigitalMinerConfigScreen`, `MekanismFactoryScreen` plus the per-tier factory screens (`MekanismEnrichingFactoryScreen`, `MekanismCrushingFactoryScreen`, `MekanismCompressingFactoryScreen`, `MekanismCombiningFactoryScreen`, `MekanismPurifyingFactoryScreen`, `MekanismInfusingFactoryScreen`, `MekanismInjectingFactoryScreen`, `MekanismSawingFactoryScreen`, `MekanismSmeltingFactoryScreen`), `MekanismMachineScreen` plus the per-machine screens (`MekanismMetallurgicInfuserScreen`, `MekanismEnergizedSmelterScreen`, `MekanismEnrichmentChamberScreen`, `MekanismCrusherScreen`, `MekanismOsmiumCompressorScreen`, `MekanismCombinerScreen`, `MekanismPrecisionSawmillScreen`, `MekanismPurificationChamberScreen`, `MekanismChemicalInjectionChamberScreen`, `MekanismChemicalDissolutionChamberScreen`, `MekanismChemicalInfuserScreen`, `MekanismChemicalCrystallizerScreen`, `MekanismChemicalOxidizerScreen`, `MekanismChemicalWasherScreen`, `MekanismElectrolyticSeparatorScreen`, `MekanismRotaryCondensentratorScreen`, `MekanismPressurizedReactionChamberScreen`, `MekanismPigmentExtractorScreen`, `MekanismPigmentMixerScreen`, `MekanismPaintingMachineScreen`, `MekanismIsotopicCentrifugeScreen`, `MekanismAntiprotonicNucleosynthesizerScreen`, `MekanismNutritionalLiquifierScreen`, `MekanismFormulaicAssemblicatorScreen`, `MekanismFuelwoodHeaterScreen`, `MekanismResistiveHeaterScreen`, `MekanismSolarNeutronActivatorScreen`), `MekanismFluidTankScreen`, `MekanismChemicalTankScreen`, `MekanismDynamicTankScreen`, `MekanismThermalEvaporationScreen`, `MekanismThermoelectricBoilerScreen`, `MekanismTeleporterScreen`, `MekanismPersonalStorageScreen`, `MekanismSecurityDeskScreen`.

### Shared primitives

Building blocks for composing custom screens: `MekanismScreen`, `MekanismInnerScreen`, `MekanismWindow`, `MekanismUpgradeWindow`, `MekanismSideConfigWindow`, `MekanismElementHolder`, `MekanismSideHolder`, `MekanismSlot`, `MekanismPlayerInventory`, `MekanismGauge`, `MekanismBar`, `MekanismProgress`, `MekanismArrow`, `MekanismSprite`, `MekanismLabel`, `MekanismList`, `MekanismTextField`, `MekanismButton`, `MekanismImageButton`, `MekanismSwitch`, `MekanismGasMode`, `MekanismTab`, `MekanismTabBar`, `MekanismSecurityLight`, `MekanismWarningLight`, `MekanismTitle`, plus the hook `useMekanismWindows`.

Layout and metric constants such as `MEKANISM_FACTORY_TIERS`, `MEKANISM_FACTORY_TYPES`, `MEKANISM_MACHINE_TITLES`, `MEKANISM_MACHINES`, `MEKANISM_SLOT_SIZE`, `MEKANISM_GAUGE_SIZES`, `MEKANISM_PROGRESS_SIZES`, `MEKANISM_DATA_COLORS`, and `mekanismFactoryLayout` are also exported for building custom layouts.

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — vanilla-style Minecraft UI primitives this package builds on
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod GUI building blocks
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — GUI sprite stylesheets, including the Mekanism sprite data

## Assets

Interface textures in this package are redrawn from Mekanism's original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
