import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LanguageScreenDemo } from "./demo";
import { LanguageScreen } from "./index";

describe("languageScreen", () => {
  it("渲染语言列表与选中态", () => {
    render(<LanguageScreen selectedCode="en-us" />);
    expect(
      document.querySelector("[data-language-code=\"en-us\"]"),
    ).toHaveClass("bg-mc-stone-dark/60");
  });

  it("选择回调", async () => {
    const user = userEvent.setup();
    const onLanguageSelect = vi.fn();
    render(<LanguageScreen onLanguageSelect={onLanguageSelect} />);
    await user.click(document.querySelector("[data-language-code=\"ja-jp\"]")!);
    expect(onLanguageSelect).toHaveBeenCalledWith("ja-jp");
  });

  it("demo 渲染", () => {
    render(<LanguageScreenDemo />);
    expect(screen.getByText("语言")).toBeInTheDocument();
  });
});
