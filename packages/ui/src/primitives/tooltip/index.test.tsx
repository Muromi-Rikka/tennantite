import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { TooltipDemo } from "./demo";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./index";

describe("tooltip", () => {
  it("悬浮触发提示", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip>
        <TooltipTrigger>悬浮我</TooltipTrigger>
        <TooltipPopup>附魔金苹果</TooltipPopup>
      </Tooltip>,
    );
    expect(screen.queryByText("附魔金苹果")).not.toBeInTheDocument();
    await user.hover(screen.getByText("悬浮我"));
    expect(await screen.findByText("附魔金苹果")).toBeInTheDocument();
  });

  it("demo 渲染触发器", () => {
    render(<TooltipDemo />);
    expect(screen.getByText("附魔金苹果", { selector: "span.sr-only" })).toBeInTheDocument();
  });
});
