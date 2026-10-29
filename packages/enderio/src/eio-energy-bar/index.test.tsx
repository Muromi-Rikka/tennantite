import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioEnergyBar } from "./index";

describe("eioEnergyBar", () => {
  it("电容款按比例自下而上裁剪", () => {
    const { container } = render(
      <EioEnergyBar height={52} left={0} max={100000} top={0} value={65000} variant="capacitor" width={18} />,
    );
    const bar = screen.getByRole("progressbar", { name: "能量" });
    expect(bar).toHaveAttribute("aria-valuenow", "65");
    expect(bar).toHaveAttribute("title", "能量：65000/100000");
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill.style.clipPath).toBe("inset(35% 0 0 0)");
    expect(container.querySelector("[data-eio-sprite=\"sprites/widget/energy_bar_fill\"]")).not.toBeNull();
  });

  it("缺电容显示警示精灵且 aria 归零", () => {
    const { container } = render(
      <EioEnergyBar capacitorInstalled={false} height={52} left={0} max={100000} top={0} value={65000} variant="capacitor" width={18} />,
    );
    const bar = screen.getByRole("progressbar", { name: "能量" });
    expect(bar).toHaveAttribute("aria-valuenow", "0");
    expect(bar).toHaveAttribute("title", "能量：缺少电容");
    expect(container.querySelector("[data-eio-sprite=\"sprites/widget/energy_bar_error\"]")).not.toBeNull();
  });

  it("旧款 9px 条纹自底向上 16px 平铺", () => {
    const { container } = render(
      <EioEnergyBar height={42} left={0} max={100} top={0} value={50} variant="legacy" width={9} />,
    );
    const tiles = container.querySelectorAll("[data-eio-sprite=\"widgets\"]");
    expect(tiles).toHaveLength(3);
    expect((tiles[0] as HTMLElement).style.top).toBe("calc(var(--mc-gui) * 26)");
    expect((tiles[1] as HTMLElement).style.top).toBe("calc(var(--mc-gui) * 10)");
    expect((tiles[2] as HTMLElement).style.top).toBe("calc(var(--mc-gui) * -6)");
  });

  it("max = 0 时比例为 0", () => {
    render(<EioEnergyBar height={52} label="EU" left={0} max={0} top={0} value={10} variant="capacitor" width={18} />);
    expect(screen.getByRole("progressbar", { name: "EU" })).toHaveAttribute("aria-valuenow", "0");
  });
});
