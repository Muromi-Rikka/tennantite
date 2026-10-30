import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioWeatherObeliskScreenDemo } from "../demos";
import { EioWeatherObeliskScreen } from "./index";

describe("eioWeatherObeliskScreen", () => {
  it("渲染 0 个槽位与 screen/weather_obelisk 背景", () => {
    const { container } = render(
      <EioWeatherObeliskScreen />,
    );
    expect(container.querySelectorAll("[aria-label^=\"weather-\"]")).toHaveLength(0);
    const background = container.querySelector("[data-eio-sprite=\"screen/weather_obelisk\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("进度条", () => {
    render(<EioWeatherObeliskScreen progress={0.45} />);
    expect(screen.getByRole("progressbar", { name: "天气方尖碑进度" })).toHaveAttribute("aria-valuenow", "0.45");
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioWeatherObeliskScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"weatherObelisk\"]")).not.toBeNull();
  });
});
