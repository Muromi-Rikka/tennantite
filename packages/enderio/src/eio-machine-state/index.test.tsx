import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioMachineState } from "./index";

describe("eioMachineState", () => {
  it("四种状态的图标与中文标签", () => {
    const { container } = render(
      <>
        <EioMachineState left={0} state="active" top={0} />
        <EioMachineState left={0} state="idle" top={0} />
        <EioMachineState left={0} state="disabled" top={0} />
        <EioMachineState left={0} state="error" top={0} />
      </>,
    );
    expect(screen.getByRole("img", { name: "机器状态：运行" })).toHaveAttribute("title", "运行");
    expect(screen.getByRole("img", { name: "机器状态：待机" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "机器状态：已禁用" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "机器状态：错误" })).toBeInTheDocument();
    expect(container.querySelectorAll("[data-eio-sprite^=\"sprites/icon/machine_state_type_new/\"]")).toHaveLength(4);
  });
});
