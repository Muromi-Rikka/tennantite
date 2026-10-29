import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioStirlingGeneratorScreenDemo } from "../demos";
import { EioStirlingGeneratorScreen } from "./index";

describe("eioStirlingGeneratorScreen", () => {
  it("渲染无标签 166 高面板、2 个槽位与玩家背包", () => {
    const { container } = render(<EioStirlingGeneratorScreen fuel={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"stirling-generator-\"]")).toHaveLength(2);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-eio-sprite=\"sprites/widget/empty_capacitor_slot\"]")).not.toBeNull();
    expect(screen.queryByText("物品栏")).toBeNull();
    const background = container.querySelector("[data-eio-sprite=\"screen/stirling_generator\"]") as HTMLElement;
    expect(background.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
  });

  it("燃烧进度、能量与产能 / 效率文本", () => {
    render(
      <EioStirlingGeneratorScreen
        burn={0.6}
        efficiency={100}
        energy={{ max: 100000, value: 32000 }}
        generating={20}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "斯特林发电机燃烧进度" })).toHaveAttribute("aria-valuenow", "0.6");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "32");
    expect(screen.getByText("产能 20.00 µI/t")).toBeInTheDocument();
    expect(screen.getByText("效率 100%")).toBeInTheDocument();
  });

  it("缺电容时隐藏效率", () => {
    render(
      <EioStirlingGeneratorScreen
        capacitorInstalled={false}
        efficiency={100}
        energy={{ max: 100000, value: 32000 }}
      />,
    );
    expect(screen.queryByText(/效率/)).toBeNull();
    expect(screen.getByText("产能 0.00 µI/t")).toBeInTheDocument();
  });

  it("按钮回调与 demo", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    render(<EioStirlingGeneratorScreen onRedstoneChange={onRedstoneChange} redstone="never_active" />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledWith("always_active");
    render(<EioStirlingGeneratorScreenDemo />);
    expect(screen.getByText("产能 20.00 µI/t")).toBeInTheDocument();
  });
});
