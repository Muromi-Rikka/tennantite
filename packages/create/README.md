# @tennantite/create

[![npm version](https://img.shields.io/npm/v/@tennantite/create)](https://www.npmjs.com/package/@tennantite/create)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

Minecraft-style React screen components for the Create mod, built on `@tennantite/ui` and `@tennantite/textures`.

`@tennantite/create` provides faithful recreations of Create's machine and tool GUIs — the millstone/crusher, schematic table and schematicannon, stock keeper, toolbox, train schedule editor, train station, filter and package filter screens, and more — as accessible React components with pixel-accurate sprites.

## Installation

```bash
npm install @tennantite/create
```

or `pnpm add @tennantite/create`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the shared stylesheets once at your app entry, in this order (tokens → vanilla textures → Create textures). Each mod textures file already pulls in its generated sprite CSS, so this is the only import needed for the Create sprites.

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
@import "@tennantite/textures/css/create-textures.css";
```

## Usage

```tsx
import { CreateMillstoneScreen } from "@tennantite/create";

export function Millstone() {
  return (
    <CreateMillstoneScreen
      input={{ count: 1, icon: "wheat", tooltip: "Wheat" }}
      machine="millstone"
      output={{ count: 1, icon: "wheat", tooltip: "Wheat Flour" }}
      player={{
        hotbarItems: Array.from({ length: 9 }, (_, i) => (i === 0 ? { count: 1, icon: "iron-ingot", tooltip: "Iron Ingot" } : null)),
        mainItems: Array.from({ length: 27 }, () => null),
      }}
      progress={0.5}
    />
  );
}
```

A second example using the train schedule editor:

```tsx
import { CreateTrainScheduleScreen } from "@tennantite/create";

export function TrainSchedule() {
  return (
    <CreateTrainScheduleScreen
      cyclic
      entries={[
        {
          conditions: [
            [{ label: "Idle 5s", width: 90 }],
            [{ label: "Cargo full", width: 100 }],
          ],
          icon: { count: 1, icon: "wheat", tooltip: "Haul cargo" },
          id: "quarry",
          label: "Quarry",
          supportsConditions: true,
          width: 100,
        },
        {
          id: "station-a",
          label: "Central Station",
          width: 110,
        },
      ]}
      savedProgress={1}
    />
  );
}
```

## Components

Screens:

- `CreateFilterScreen`
- `CreateMillstoneScreen` (also renders the crusher via the `machine` prop)
- `CreatePackageFilterScreen`
- `CreateSchematicTableScreen`
- `CreateSchematicannonScreen`
- `CreateStockKeeperScreen`
- `CreateToolboxScreen`
- `CreateTrainScheduleScreen`
- `CreateTrainStationScreen`
- `CreateValueSettingsPanel`
- `CreateWindow`

Primitives and constants:

- `CreateSprite`
- `CREATE_ATLAS`, `CREATE_ICONS`, `CREATE_STATION_SPRITES`, `CREATE_SCHEDULE_SPRITES`, `CREATE_SCHEDULE_CARD_COLORS`
- `CREATE_FILTER`, `CREATE_PACKAGE_FILTER`, `CREATE_ICON_BUTTON`, `CREATE_INDICATOR_COLORS`
- `CREATE_MACHINE_LAYOUT` layout table plus the `CreateMachineKind`, `CreateMachineLayout`, and `CreateMachineName` types
- `CREATE_SCHEMATIC_TABLE`, `CREATE_SCHEMATICANNON`, `CREATE_STOCK_KEEPER`, `CREATE_TOOLBOX`, `CREATE_TOOLBOX_COLORS`, `CREATE_TRAIN_SCHEDULE`, `CREATE_TRAIN_STATION`, `CREATE_VALUE_SETTINGS`

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — core primitives and screen framework
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod-UI building blocks
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — sprite CSS for vanilla and mod GUIs
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and fonts

## Assets

Interface textures in this package are redrawn from Create (mc1.21.1) original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
