# @tennantite/enderio

[![npm version](https://img.shields.io/npm/v/@tennantite/enderio)](https://www.npmjs.com/package/@tennantite/enderio)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

React components that recreate Ender IO (26.3) machine and device screens in the style of the Minecraft GUI.

`@tennantite/enderio` provides pixel-accurate recreations of Ender IO's interfaces — machines such as the SAG Mill, Alloy Smelter, and Soul Binder, plus devices like the Capacitor Bank, Tele Pad, and XP Obelisk — built on shared primitives from `@tennantite/mods-core` and `@tennantite/ui`.

## Installation

```sh
npm install @tennantite/enderio
```

or `pnpm add @tennantite/enderio`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the base layers once in this order, then the Ender IO textures:

```ts
import "@tennantite/tokens/css/tokens.css";
import "@tennantite/textures/css/textures.css";
import "@tennantite/textures/css/enderio-textures.css";
```

The `enderio-textures.css` file already pulls in its generated sprite CSS, so a single import is enough.

## Usage

```tsx
import { EioSagMillScreen } from "@tennantite/enderio";

const ironOre = { count: 16, icon: "iron-ore", tooltip: "Iron Ore" };
const goldIngot = { icon: "gold-ingot", tooltip: "Gold Ingot" };

export function SagMill() {
  return (
    <EioSagMillScreen
      energy={{ max: 100000, value: 72000 }}
      grindingBall={{ durability: 0.7 }}
      grindingBallSlot={{ icon: "gunpowder", tooltip: "Grinding Ball" }}
      input={ironOre}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      outputs={[goldIngot, goldIngot, goldIngot, goldIngot]}
      progress={0.35}
      state="active"
    />
  );
}
```

The generic `EioMachineScreen` renders the shared screen chrome (background, title, player inventory) for any machine in the layout table, and `EioSprite` draws any sprite from the Ender IO sheet:

```tsx
import { EIO_MACHINES, EioMachineScreen, EioSprite } from "@tennantite/enderio";

const layout = EIO_MACHINES.sagMill;

export function MachineFrame() {
  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      height={layout.height}
      machine="sagMill"
      title="SAG Mill"
      width={layout.width}
    />
  );
}
```

`EioSprite` draws a single sprite from the Ender IO sheet by name (any key of the generated sprite map, e.g. `screen/sag_mill`).

## Components

### Screens

- `EioAlloySmelterScreen`, `EioAttractorScreen`, `EioAversionScreen`, `EioBufferScreen`
- `EioCapacitorBankScreen`, `EioCombustionGeneratorScreen`, `EioCrafterScreen`
- `EioDialingDeviceScreen`, `EioDrainScreen`, `EioEnchanterScreen`, `EioFarmStationScreen`
- `EioImpulseHopperScreen`, `EioInhibitorScreen`, `EioKillerJoeScreen`, `EioLavaGeneratorScreen`
- `EioNiardScreen`, `EioPaintingMachineScreen`, `EioPoweredSpawnerScreen`, `EioRelocatorScreen`
- `EioSagMillScreen`, `EioSliceAndSpliceScreen`, `EioSoulBinderScreen`, `EioSoulEngineScreen`
- `EioStirlingGeneratorScreen`, `EioTankScreen`, `EioTelePadScreen`, `EioTransceiverScreen`
- `EioTravelAnchorScreen`, `EioVacuumChestScreen`, `EioVatScreen`, `EioWeatherObeliskScreen`
- `EioWiredChargerScreen`, `EioWirelessChargerScreen`, `EioXpObeliskScreen`, `EioXpVacuumScreen`

### Shared building blocks

- `EioMachineScreen`, `EioMachineState`, `EioProgresses`, `EioEnergyBar`, `EioExperienceBar`
- `EioGrindingBall`, `EioIconButton`, `EioSprite`

### Layout and metrics

- `EIO_MACHINES`, `EIO_ALLOY_MODE_ORDER`, `EIO_ALLOY_SMELTER_BACKGROUNDS`, `EIO_REDSTONE_ORDER`
- `EIO_ENERGY_CAPACITOR`, `EIO_EXPERIENCE_BAR`, `EIO_GRINDING_BALL`, `EIO_ICON_SIZE`, `EIO_SLOT_SIZE`, `EIO_TEXT_COLOR`, `EIO_XP_TEXT_COLOR`
- Types: `EioMachineKey`, `EioMachineLayout`, `EioLayoutSlot`, `EioProgressLayout`, `EioAlloySmelterMode`, `EioRedstoneControl`, and per-screen `*Props` types

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — core Minecraft-style primitives (slots, panels, inventory)
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod-UI building blocks
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — sprite CSS for vanilla and mod GUIs

## Assets

Interface textures in this package are redrawn from Ender IO's original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
