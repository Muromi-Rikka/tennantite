import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BossBar } from "./index";

describe("bossBar", () => {
  it("按 color 选择原版条", () => {
    const { container } = render(<BossBar color="red" name="Dragon" value={0.5} />);
    expect(container.querySelector("[data-gui-sprite=\"sprites/boss_bar/red_background.png\"]")).toBeInTheDocument();
    expect(container.querySelector("[data-gui-sprite=\"sprites/boss_bar/red_progress.png\"]")).toBeInTheDocument();
  });

  it("notched 选择分段条", () => {
    const { container } = render(<BossBar name="Dragon" notched={10} value={0.5} />);
    expect(container.querySelector("[data-gui-sprite=\"sprites/boss_bar/notched_10_background.png\"]")).toBeInTheDocument();
  });
});
