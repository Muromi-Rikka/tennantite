import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioTransceiverScreenDemo } from "../demos";
import { EioTransceiverScreen } from "./index";

describe("eioTransceiverScreen", () => {
  it("渲染 16 个信道槽位与 general 背景", () => {
    const { container } = render(<EioTransceiverScreen items={{ "transceiver-channel-0": {} }} />);
    expect(container.querySelectorAll("[aria-label^=\"transceiver-\"]")).toHaveLength(16);
    expect(container.querySelector("[aria-label^=\"transceiver-left-\"]")).toBeNull();
    const background = container.querySelector("[data-eio-sprite=\"screen/transceiver_general\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("channel_select 双背景", () => {
    const { container } = render(<EioTransceiverScreen mode="channel_select" />);
    expect(container.querySelector("[data-eio-sprite=\"screen/transceiver_channel_select\"]")).not.toBeNull();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioTransceiverScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"transceiver\"]")).not.toBeNull();
  });
});
