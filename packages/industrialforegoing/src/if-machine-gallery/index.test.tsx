import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IF_MACHINE_KEYS, IF_MACHINES } from "../if-machine-layout";
import { IfMachineGallery } from "./index";

describe("ifMachineGallery", () => {
  it("渲染全部 48 台机器与标题", () => {
    const { container } = render(<IfMachineGallery />);
    expect(container.querySelectorAll("[data-if-machine]")).toHaveLength(48);
    expect(container.querySelectorAll("[data-if-machine]")).toHaveLength(IF_MACHINE_KEYS.length);
    for (const key of IF_MACHINE_KEYS) {
      expect(container.textContent).toContain(IF_MACHINES[key].title);
    }
  });
});
