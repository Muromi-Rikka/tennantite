import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import type { IfRedstoneMode } from "../if-markers";
import { IF_REDSTONE_ORDER, ifNextRedstone } from "../if-markers";
import { IfRedstoneButton } from "./index";

function RedstoneHarness() {
  const [mode, setMode] = useState<IfRedstoneMode>("ignore");
  return (
    <IfRedstoneButton
      onClick={() => { setMode(ifNextRedstone(mode)); }}
      value={mode}
    />
  );
}

describe("ifRedstoneButton", () => {
  it("按 IGNORE → NO_REDSTONE → WITH_REDSTONE → ONCE 循环", () => {
    const { getByRole } = render(<RedstoneHarness />);
    const button = getByRole("button", { name: "redstone" });
    expect(button.dataset.ifCrop).toBe("redstoneIgnored");
    fireEvent.click(button);
    expect(button.dataset.ifCrop).toBe("redstoneNo");
    fireEvent.click(button);
    expect(button.dataset.ifCrop).toBe("redstoneYes");
    fireEvent.click(button);
    expect(button.dataset.ifCrop).toBe("redstoneOnce");
    fireEvent.click(button);
    expect(button.dataset.ifCrop).toBe("redstoneIgnored");
    expect(IF_REDSTONE_ORDER).toEqual(["ignore", "no_redstone", "with_redstone", "once"]);
  });
});
