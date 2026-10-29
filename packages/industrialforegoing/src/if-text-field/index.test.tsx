import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfTextField } from "./index";

describe("ifTextField", () => {
  it("受控输入回调", () => {
    const onChange = vi.fn();
    const { getByLabelText } = render(
      <IfTextField label="depth" left={80} onChange={onChange} top={26} value="64" />,
    );
    const input = getByLabelText("depth");
    expect(input).toHaveValue("64");
    fireEvent.change(input, { target: { value: "128" } });
    expect(onChange).toHaveBeenCalledWith("128");
    expect(input.getAttribute("style")).toContain("calc(var(--mc-gui) * 40)");
  });
});
