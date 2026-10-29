import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "./index";

describe("eioMachineScreen", () => {
  it("渲染背景、标题、背包标签与 36 个玩家槽", () => {
    const layout = EIO_MACHINES.alloySmelter;
    const { container } = render(
      <EioMachineScreen
        background={layout.background}
        backgroundHeight={layout.backgroundHeight}
        height={layout.height}
        labels={layout.labels}
        machine="alloySmelter"
        player={layout.player}
        title="合金炉"
        width={layout.width}
      >
        <div>child</div>
      </EioMachineScreen>,
    );
    expect(container.querySelector("[data-eio-machine=\"alloySmelter\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(screen.getByText("合金炉")).toBeInTheDocument();
    expect(screen.getByText("物品栏")).toBeInTheDocument();
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("标题 / 背包标签使用布局坐标", () => {
    const layout = EIO_MACHINES.alloySmelter;
    render(
      <EioMachineScreen
        background={layout.background}
        backgroundHeight={layout.backgroundHeight}
        height={layout.height}
        labels={layout.labels}
        machine="alloySmelter"
        player={layout.player}
        title="合金炉"
        width={layout.width}
      />,
    );
    expect(screen.getByText("合金炉").style.top).toBe("calc(var(--mc-gui) * 8)");
    expect(screen.getByText("物品栏").style.top).toBe("calc(var(--mc-gui) * 115)");
    expect(screen.getByText("物品栏").style.left).toBe("calc(var(--mc-gui) * 8)");
  });

  it("不传 labels 时不渲染标题 / 背包标签", () => {
    const layout = EIO_MACHINES.stirlingGenerator;
    render(
      <EioMachineScreen
        background={layout.background}
        backgroundHeight={layout.backgroundHeight}
        height={layout.height}
        machine="stirlingGenerator"
        player={layout.player}
        width={layout.width}
      />,
    );
    expect(screen.queryByText("物品栏")).toBeNull();
  });
});
