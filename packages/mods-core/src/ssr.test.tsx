import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import * as demos from "./demos";

describe("mods-core demos SSR", () => {
  for (const [name, Demo] of Object.entries(demos)) {
    it(`${name} renders on the server`, () => {
      expect(() => renderToStaticMarkup(<Demo />)).not.toThrow();
    });
  }
});
