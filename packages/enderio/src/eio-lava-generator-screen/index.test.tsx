import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioLavaGeneratorScreenDemo } from "../demos";
import { EioLavaGeneratorScreen } from "./index";

describe("eioLavaGeneratorScreen", () => {
  it("渲染 0 个槽位与 screen/lava_generator 背景", () => {
    const { container } = render(
      <EioLavaGeneratorScreen />,
    );
    expect(container.querySelectorAll("[aria-label^=\"lava-\"]")).toHaveLength(0);
    const background = container.querySelector("[data-eio-sprite=\"screen/lava_generator\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioLavaGeneratorScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"lavaGenerator\"]")).not.toBeNull();
  });
});
