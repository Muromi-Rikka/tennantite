# @tennantite/tokens

[![npm version](https://img.shields.io/npm/v/@tennantite/tokens)](https://www.npmjs.com/package/@tennantite/tokens)
[![github](https://img.shields.io/badge/github-Muromi_Rikka%2Ftennantite)](https://github.com/Muromi-Rikka/tennantite)

Design tokens for Minecraft-style interfaces, exposed as Tailwind CSS v4 theme variables.

`@tennantite/tokens` is the base layer of the Tennantite component family. It provides the `--color-mc-*` color palette, Minecraft GUI metrics (GUI pixel scale, text size), small utility classes such as `mc-text` and `mc-scale-scope`, the bundled Minecraft pixel font, and TypeScript constants that mirror the CSS values. The visual baseline is the vanilla Minecraft Java Edition GUI. This package contains no React components.

## Installation

```sh
npm install @tennantite/tokens
```

or with pnpm:

```sh
pnpm add @tennantite/tokens
```

## Styles

Import the tokens stylesheet inside your Tailwind CSS entry, after Tailwind itself:

```css
@import "tailwindcss";
@import "@tennantite/tokens/css/tokens.css";
```

This registers the `--color-mc-*` theme variables (so utilities like `bg-mc-panel` and `text-mc-text-main` are generated), the GUI pixel scale variables (`--mc-scale`, `--mc-gui`), the `@font-face` rules for the Minecraft font, and utility classes such as `mc-text`, `mc-text-shadow`, `mc-border`, and `mc-scale-scope`.

### Overriding variables

Because everything is plain Tailwind v4 `@theme` CSS, you can override tokens in your own entry file after the import:

```css
@import "tailwindcss";
@import "@tennantite/tokens/css/tokens.css";

@theme {
  /* Re-theme the palette for your own mod UI */
  --color-mc-accent-green: #7ec850;
  --color-mc-panel: #d8d0c0;
}
```

## Usage

The JS entry exports the same palette as typed constants, so you can read token values in code:

```tsx
import { mcColors, mcFonts } from "@tennantite/tokens";

export function StatusLine() {
  return (
    <span style={{ color: mcColors.gold, fontFamily: mcFonts.mc }}>
      Ready
    </span>
  );
}
```

## Exports

- `mcColors` — sampled Minecraft GUI colors (panel, buttons, slots, tooltips, chat colors, etc.), keyed by camelCase name
- `mcFonts` — font stack constants, keyed by name (`mc`)
- `McColorToken` — type of the `mcColors` keys

Subpath exports:

- `@tennantite/tokens/css/*` — stylesheets (`css/tokens.css`)
- `@tennantite/tokens/fonts/*` — the bundled Minecraft pixel font (`Minecraft.otf`, `Minecraft-Bold.otf`), loaded automatically by `tokens.css`

## Font license

The bundled Minecraft font (by Idrees Hassan) is distributed under the SIL Open Font License 1.1; see the license file in the repository: [packages/tokens/fonts/LICENSE-Minecraft-Font.txt](https://github.com/Muromi-Rikka/tennantite/blob/master/packages/tokens/fonts/LICENSE-Minecraft-Font.txt).

## Related packages

- [@tennantite/ui](https://www.npmjs.com/package/@tennantite/ui) — React component library built on these tokens
- [@tennantite/textures](https://www.npmjs.com/package/@tennantite/textures) — vanilla Minecraft GUI sprite stylesheets
- [@tennantite/mods-core](https://www.npmjs.com/package/@tennantite/mods-core) — shared building blocks for mod UI packages
