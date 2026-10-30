# @tennantite/ui

[![npm version](https://img.shields.io/npm/v/@tennantite/ui)](https://www.npmjs.com/package/@tennantite/ui)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

Tennantite — Minecraft-style UI components built on shadcn philosophy (Base UI + Tailwind v4).

`@tennantite/ui` is the flagship component library of the Tennantite project. It recreates Minecraft's interface in React: L1 primitives styled after vanilla widgets, L2 containers (slots, item stacks, panels, title bars), L3 HUD elements (hotbar, boss bar, experience bar), and L3 full screens (inventory, crafting table, furnace, chest, and more). Components are pixel-faithful, sized in GUI pixels via the `--mc-gui` scale variable, and accessible by default.

## Installation

```sh
npm install @tennantite/ui
```

or `pnpm add @tennantite/ui`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the global stylesheets once, in this order (tokens first, then textures):

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
/* Optional: vanilla GUI textures for a specific mod pack look, e.g.: */
@import "@tennantite/textures/css/mekanism-textures.css";
@import "@tennantite/textures/css/farmersdelight-textures.css";
/* Optional: only if you use the ScrollArea component */
@import "@tennantite/ui/css/scroll-area.css";
```

Each per-mod textures file already pulls in its generated sprite CSS, so a single import per mod is enough.

## Usage

```tsx
import { InventoryScreen } from "@tennantite/ui";

export function App() {
  return (
    <InventoryScreen
      armorItems={[null, { icon: "iron-chestplate" }, null, null]}
      craftItems={[
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
      ]}
      craftResult={{ count: 1, icon: "crafting-table", tooltip: "Crafting Table" }}
      hotbarItems={[
        { count: 64, icon: "stone-block" },
        { icon: "grass-block" },
        { count: 12, icon: "diamond" },
      ]}
      mainItems={[
        { count: 64, icon: "stone-block" },
        { count: 32, icon: "stone-block" },
        null,
        { icon: "dirt-block" },
      ]}
      selectedIndex={2}
      onSlotClick={(area, index) => {
        console.log(`clicked ${area}[${index}]`);
      }}
    />
  );
}
```

HUD components follow the same pattern:

```tsx
import { BossBar, HealthHungerBar, Hotbar } from "@tennantite/ui";

export function Hud() {
  return (
    <>
      <HealthHungerBar health={20} hunger={20} />
      <BossBar name="Ender Dragon" value={0.5} />
      <Hotbar
        items={[
          { icon: "diamond-sword" },
          { count: 64, icon: "cobblestone" },
          { count: 5, icon: "apple" },
        ]}
        selectedIndex={0}
      />
    </>
  );
}
```

## Theming

All colors are exposed as Tailwind v4 `--color-mc-*` CSS variables defined by `@tennantite/tokens`. Override them in your application's Tailwind entry inside `@theme`:

```css
@theme {
  --color-mc-panel: #c6c6c6;
  --color-mc-slot: #8b8b8b;
}
```

## Server rendering

Every component in this package works in server-rendered environments such as Next.js App Router and TanStack Start. Interactive components are built on Base UI, which carries its own `"use client"` directive, so no extra client-boundary markup is required in your app.

## Components

**L1 primitives** — `Badge`, `Button`, `Checkbox`, `Dialog`, `DialogBackdrop`, `DialogClose`, `DialogDescription`, `DialogPopup`, `DialogTitle`, `DialogTrigger`, `Input`, `Progress`, `Radio`, `RadioGroup`, `ScrollArea`, `Select`, `SelectIcon`, `SelectItem`, `SelectList`, `SelectPopup`, `SelectTrigger`, `SelectValue`, `Slider`, `Switch`, `Tabs`, `TabsList`, `TabsPanel`, `TabsTab`, `Tooltip`, `TooltipPopup`, `TooltipTrigger`

**L2 containers** — `BlockIcon`, `Card`, `Divider`, `Grid`, `GuiSprite`, `Icon`, `ItemStack`, `Panel`, `PlayerInventory`, `ScaledBox`, `ScreenPanel`, `Slot`, `TitleBar`

**L3 HUD** — `AttackIndicator`, `BossBar`, `Crosshair`, `ExperienceBar`, `HealthHungerBar`, `Hotbar`, `JumpBar`, `LocatorBar`, `StatusEffects`

**L3 screens (menus)** — `ChatScreen`, `MainMenu`, `NotificationBadge`, `Toast`, `ToastStack`

**L3 screens (containers)** — `AbstractFurnaceScreen`, `AnvilScreen`, `BeaconScreen`, `BlastFurnaceScreen`, `BrewingStandScreen`, `CartographyTableScreen`, `ChestScreen`, `CrafterScreen`, `CraftingScreen`, `CreativeInventoryScreen`, `DispenserScreen`, `EnchantingScreen`, `FurnaceScreen`, `GamemodeSwitcher`, `GrindstoneScreen`, `HopperScreen`, `HorseScreen`, `InventoryScreen`, `LoomScreen`, `NautilusScreen`, `ShulkerBoxScreen`, `SmithingScreen`, `SmokerScreen`, `StonecutterScreen`, `TradingScreen`, plus the `ScreenItem`, `ScreenSlot`, and related shared types

**Utilities and hooks** — `cn`, `gui` (converts GUI pixels to CSS lengths), `useHasHover`

## Related packages

- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens (`--color-mc-*`) and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — vanilla and mod GUI sprite stylesheets
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared primitives for building mod-specific UI packages
