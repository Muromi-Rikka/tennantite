# @tennantite/ae2

[![npm version](https://img.shields.io/npm/v/@tennantite/ae2)](https://www.npmjs.com/package/@tennantite/ae2)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

React components that recreate the machine GUIs of Applied Energistics 2 (1.12.2, Unofficial Extended Life).

`@tennantite/ae2` provides pixel-faithful, interactive recreations of AE2's terminals and machine screens — the ME terminal, crafting and pattern terminals, inscribers, interfaces, the Crafting CPU, and more — built on top of the shared primitives in `@tennantite/mods-core` and `@tennantite/ui`.

## Installation

```bash
npm install @tennantite/ae2
```

or `pnpm add @tennantite/ae2`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the stylesheets in this order:

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
@import "@tennantite/textures/css/ae2-textures.css";
```

The `ae2-textures.css` file already pulls in the generated AE2 sprite CSS, so this single import is all you need for the mod-specific sprites.

## Usage

```tsx
import { Ae2TerminalScreen } from "@tennantite/ae2";

export function Terminal() {
  return (
    <Ae2TerminalScreen
      entriesLabel="1-54"
      searchPlaceholder="Search…"
      items={Array.from({ length: 54 }, (_, index) => ({
        count: 64,
        icon: index % 2 ? "gold-ingot" : "iron-ingot",
        tooltip: index % 2 ? "Gold ingot" : "Iron ingot",
      }))}
    />
  );
}
```

Machine screens follow the same pattern:

```tsx
import { Ae2InterfaceScreen } from "@tennantite/ae2";

export function Interface() {
  return (
    <Ae2InterfaceScreen
      config={[{ icon: "iron-ingot", tooltip: "Configured: iron ingot" }]}
      storage={[{ icon: "iron-ingot", tooltip: "Storage: iron ingot x64" }]}
      patterns={[
        { icon: "diamond", tooltip: "Pattern 1" },
        { icon: "diamond", tooltip: "Pattern 2" },
        { icon: "diamond", tooltip: "Pattern 3" },
      ]}
      upgrades={[
        { icon: "emerald", tooltip: "Pattern expansion card" },
        { icon: "emerald", tooltip: "Pattern expansion card" },
      ]}
      mainItems={Array.from({ length: 20 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
    />
  );
}
```

## Components

### Screens

Complete terminal and machine GUIs:

`Ae2TerminalScreen`, `Ae2CraftingTerminalScreen`, `Ae2PatternEncodingTerminalScreen`, `Ae2PatternAccessTerminalScreen`, `Ae2CraftingCpuScreen`, `Ae2InterfaceScreen`, `Ae2InscriberScreen`, `Ae2CondenserScreen`, `Ae2DriveScreen`, `Ae2IoPortScreen`, `Ae2SpatialIoPortScreen`, `Ae2MolecularAssemblerScreen`, `Ae2QuantumBridgeScreen`, `Ae2ChestScreen`, `Ae2SkyChestScreen`, `Ae2GrindstoneScreen`.

### Shared primitives

Building blocks for composing custom screens: `Ae2TerminalBody`, `Ae2Text`, `Ae2PriorityDialog`, `Ae2PriorityTab`.

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — vanilla-style Minecraft UI primitives this package builds on
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod GUI building blocks
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — GUI sprite stylesheets, including the AE2 sprite data

## Assets

Interface textures in this package are redrawn from Applied Energistics 2's original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
