import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2MolecularAssemblerScreenDemo } from "./demo";
import { Ae2MolecularAssemblerScreen } from "./index";

describe("ae2MolecularAssemblerScreen", () => {
  it("渲染装配格、图样/输出槽、进度条与升级槽", () => {
    const { container } = render(
      <Ae2MolecularAssemblerScreen
        craftGrid={[{ icon: "iron-ingot" }]}
        output={{ icon: "diamond" }}
        pattern={{ icon: "gold-ingot" }}
        progress={0.7}
        upgrades={[{ icon: "emerald" }]}
      />,
    );

    expect(screen.getByLabelText("mac-craft-0")).toHaveStyle({
      left: gui(29),
      top: gui(30),
    });
    expect(screen.getByLabelText("mac-craft-8")).toHaveStyle({
      left: gui(65),
      top: gui(66),
    });
    expect(screen.getByLabelText("mac-pattern")).toHaveStyle({
      left: gui(126),
      top: gui(16),
    });
    expect(screen.getByLabelText("mac-output")).toHaveStyle({
      left: gui(126),
      top: gui(48),
    });
    expect(container.querySelectorAll("[aria-label^=\"mac-craft-\"]").length).toBe(9);
    expect(container.querySelectorAll("[aria-label^=\"mac-upgrade-\"]").length).toBe(5);
    expect(screen.getByLabelText("mac-upgrade-4")).toHaveStyle({
      left: gui(187),
      top: gui(80),
    });

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(114) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(172) });

    const progress = screen.getByRole("progressbar", { name: "装配进度" });
    expect(progress).toHaveAttribute("aria-valuenow", "0.7");
    expect(progress).toHaveStyle({ left: gui(148), top: gui(48) });
    expect(screen.getByLabelText("红石模式")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
  });

  it("图样/输出/升级槽回调", async () => {
    const user = userEvent.setup();
    const onPatternClick = vi.fn();
    const onTakeOutput = vi.fn();
    const onUpgradeSlotClick = vi.fn();
    render(
      <Ae2MolecularAssemblerScreen
        onPatternClick={onPatternClick}
        onTakeOutput={onTakeOutput}
        onUpgradeSlotClick={onUpgradeSlotClick}
        output={{ icon: "diamond" }}
        pattern={{ icon: "gold-ingot" }}
        upgrades={[{ icon: "emerald" }]}
      />,
    );

    await user.click(screen.getByLabelText("mac-pattern"));
    expect(onPatternClick).toHaveBeenCalledWith(expect.objectContaining({ icon: "gold-ingot" }));

    await user.click(screen.getByLabelText("mac-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();

    await user.click(screen.getByLabelText("mac-upgrade-0"));
    expect(onUpgradeSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "emerald" }));
  });

  it("demo 渲染", () => {
    render(<Ae2MolecularAssemblerScreenDemo />);
    expect(screen.getByText("分子装配室")).toBeInTheDocument();
  });
});
