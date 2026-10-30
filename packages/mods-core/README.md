# @tennantite/mods-core

[![npm version](https://img.shields.io/npm/v/@tennantite/mods-core)](https://www.npmjs.com/package/@tennantite/mods-core)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

Shared mod interface primitives for the Tennantite project — buttons, progress bars, slot grids, fluid tanks, sprites, and texture clipping helpers.

`@tennantite/mods-core` contains the building blocks shared by all `@tennantite` mod UI packages. It renders elements that appear across many mod GUIs — icon buttons, labels, tab buttons, toolbars, search fields, scrollbars, progress bars, fluid tanks, slot grids, and positioned sprites — so each mod package only needs to define its specific screens. If you are building your own mod UI package on top of Tennantite, start here.

## Installation

```sh
npm install @tennantite/mods-core
```

or `pnpm add @tennantite/mods-core`.

Requires `react@^19.2` and `react-dom@^19.2` as peer dependencies.

## Styles

Import the global stylesheets once, in this order (tokens first, then textures):

```css
@import "@tennantite/tokens/css/tokens.css";
@import "@tennantite/textures/css/textures.css";
```

If you also use a mod package such as `@tennantite/mekanism`, add its textures stylesheet after these:

```css
@import "@tennantite/textures/css/mekanism-textures.css";
```

Each per-mod textures file already pulls in its generated sprite CSS, so a single import per mod is enough.

## Usage

Position primitives absolutely inside a scaled GUI container:

```tsx
import { ModSlotGrid, ModTank } from "@tennantite/mods-core";

export function MachinePanel() {
  return (
    <div className="relative size-24">
      <ModTank
        height={40}
        inset={1}
        label="Water"
        left={8}
        max={100}
        tint="#3f76e4"
        top={8}
        value={30}
        width={40}
      />
      <ModSlotGrid
        columns={2}
        items={[{ icon: "diamond" }, { icon: "coal" }]}
        labelPrefix="machine-slot"
        left={8}
        rows={2}
        top={8}
      />
    </div>
  );
}
```

Compose a sidebar toolbar from positioned sprites (sprite metadata registries like `ae2SpriteMeta` come from `@tennantite/textures`):

```tsx
import { ae2SpriteMeta } from "@tennantite/textures";
import { ModSprite, ModToolbar } from "@tennantite/mods-core";

const ICON = { height: 16, width: 16, x: 0, y: 0 };

export function SidebarToolbar() {
  return (
    <div className="relative h-24 w-8">
      <ModToolbar
        items={[
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={ICON} />, label: "Sort" },
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={{ ...ICON, x: 16 }} />, label: "Settings" },
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={{ ...ICON, x: 32 }} />, label: "View" },
        ]}
        left={0}
        top={0}
      />
    </div>
  );
}
```

## Exports

**Sprites and slots** — `ModSprite` (with the `ModSpriteMeta`, `ModSpriteRect`, and `ModSpriteScaling` types), `ModSlotGrid`

**Progress and tanks** — `ModProgress`, `ModTank`, `progressClipPath` (with the `ProgressDirection` type)

**Controls** — `ModIconButton`, `ModTabButton`, `ModSearchField`, `ModToolbar`

**Display** — `ModLabel`, `ModTitle`, `ModScissorList`, `ModScrollbar`

Every component ships a matching `*Props` type (for example `ModTankProps`, `ModToolbarProps`).

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — Minecraft-style component library built on these primitives
- [@tennantite/tokens](https://www.npmjs.com/package/@tennantite/tokens) — design tokens (`--color-mc-*`) and the Minecraft font
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — vanilla and mod GUI sprite stylesheets
