import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioBufferScreenDemo } from "../demos";
import { EioBufferScreen } from "./index";

describe("eioBufferScreen", () => {
  it("渲染 6 个槽位与 screen/buffer_full 背景", () => {
    const { container } = render(
      <EioBufferScreen items={{ "buffer-slot-0": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"buffer-\"]")).toHaveLength(6);
    const background = container.querySelector("[data-eio-sprite=\"screen/buffer_full\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioBufferScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"buffer\"]")).not.toBeNull();
  });
});
