import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioCombustionGeneratorScreenDemo } from "../demos";
import { EioCombustionGeneratorScreen } from "./index";

describe("eioCombustionGeneratorScreen", () => {
  it("渲染 0 个槽位与 screen/combustion_gen 背景", () => {
    const { container } = render(
      <EioCombustionGeneratorScreen />,
    );
    expect(container.querySelectorAll("[aria-label^=\"combustion-\"]")).toHaveLength(0);
    const background = container.querySelector("[data-eio-sprite=\"screen/combustion_gen\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioCombustionGeneratorScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"combustionGenerator\"]")).not.toBeNull();
  });
});
