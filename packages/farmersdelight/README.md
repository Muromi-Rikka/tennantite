# @tennantite/farmersdelight

[![npm version](https://img.shields.io/npm/v/@tennantite/farmersdelight)](https://www.npmjs.com/package/@tennantite/farmersdelight)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

React components that recreate Farmer's Delight (1.21) interfaces and HUD elements in the style of the Minecraft GUI.

`@tennantite/farmersdelight` centers on the Cooking Pot screen, plus the mod's HUD overlays (hunger and comfort), the heat indicator, cooking progress, and the recipe book button — built on `@tennantite/mods-core` and `@tennantite/ui`.

## Installation

```sh
npm install @tennantite/farmersdelight
```

or `pnpm add @tennantite/farmersdelight`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the base layers once in this order, then the Farmer's Delight textures:

```ts
import "@tennantite/tokens/css/tokens.css";
import "@tennantite/textures/css/textures.css";
import "@tennantite/textures/css/farmersdelight-textures.css";
```

The `farmersdelight-textures.css` file already pulls in its generated sprite CSS, so a single import is enough.

## Usage

```tsx
import { useState } from "react";
import { FdCookingPotScreen } from "@tennantite/farmersdelight";

export function CookingPot() {
  const [heated, setHeated] = useState(true);
  const [recipeBookOpen, setRecipeBookOpen] = useState(false);
  return (
    <FdCookingPotScreen
      container={{ icon: "bowl", tooltip: "Bowl" }}
      heated={heated}
      ingredients={[
        { icon: "brown-mushroom", tooltip: "Brown Mushroom" },
        { icon: "red-mushroom", tooltip: "Red Mushroom" },
        null,
        null,
        null,
        null,
      ]}
      onRecipeBookToggle={() => setRecipeBookOpen(value => !value)}
      onSlotClick={() => setHeated(value => !value)}
      output={{ icon: "mushroom-stew", tooltip: "Mushroom Stew" }}
      progress={0.6}
      recipeBookOpen={recipeBookOpen}
    />
  );
}
```

The HUD overlays render the mod's hunger and comfort indicators outside of any screen:

```tsx
import { FdHungerOverlay } from "@tennantite/farmersdelight";

export function Hud() {
  return <FdHungerOverlay foodLevel={17} />;
}
```

## Components

### Screens

- `FdCookingPotScreen` — the cooking pot interface: six ingredient slots, meal and container slots, output, heat indicator, cooking progress, and recipe book button

### HUD and building blocks

- `FdHungerOverlay`, `FdComfortOverlay` — in-game HUD indicators
- `FdCookingProgress`, `FdHeatIndicator`, `FdRecipeBookButton` — pieces of the cooking pot screen, usable standalone
- `FdSprite` — draws any sprite from the Farmer's Delight sheet

### Metrics

- `FD_COOKING_POT`, `FD_COOKING_POT_SLOTS`, `FD_COOK_PROGRESS`, `FD_HEAT_ICON`, `FD_HUD_ICON`, `FD_HUD_ICON_COUNT`, `FD_HUD_ICON_STEP`, `FD_PLAYER`, `FD_RECIPE_BOOK_BUTTON`, `FD_TEXT_COLOR`
- Types: `FdCookingPotSlotLabel` and per-component `*Props` types

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — core Minecraft-style primitives (slots, panels, inventory)
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared mod-UI building blocks
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — sprite CSS for vanilla and mod GUIs

## Assets

Interface textures in this package are redrawn from Farmer's Delight's original GUI assets and remain the property of their respective authors. See [LICENSE-ASSETS.md](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/textures/LICENSE-ASSETS.md).
