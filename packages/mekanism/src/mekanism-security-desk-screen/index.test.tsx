import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MekanismSecurityDeskScreen } from "./index";

const TRUSTED = [
  { id: "alice", label: "Alice" },
  { id: "bob", label: "Bob" },
  { id: "carol", label: "Carol" },
  { id: "dave", label: "Dave" },
];

describe("mekanismSecurityDeskScreen", () => {
  it("renders title, trusted list and security texts at 176×230", () => {
    const { container } = render(
      <MekanismSecurityDeskScreen owner="Steve" security="private" trusted={TRUSTED} />,
    );
    expect(screen.getByText("安全台")).toBeInTheDocument();
    expect(container.querySelector(".relative.inline-block")).toHaveStyle({ height: "calc(var(--mc-gui) * 230)", width: "calc(var(--mc-gui) * 176)" });
    expect(screen.getByText("信任玩家")).toBeInTheDocument();
    expect(screen.getByText("安全：私有")).toBeInTheDocument();
    expect(screen.getByText("所有者：Steve")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Alice" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Dave" })).not.toBeInTheDocument();
    expect(container.querySelectorAll("[data-mek-sprite='element_holder']")).toHaveLength(3);
  });

  it("selects a trusted row and reports it on remove", async () => {
    const onRemoveTrusted = vi.fn();
    render(<MekanismSecurityDeskScreen onRemoveTrusted={onRemoveTrusted} trusted={TRUSTED} />);
    fireEvent.click(screen.getByRole("option", { name: "Bob" }));
    fireEvent.click(screen.getByRole("button", { name: "移除" }));
    expect(onRemoveTrusted).toHaveBeenCalledWith("bob");
  });

  it("submits a trusted name from the text field", () => {
    const onTrustedSubmit = vi.fn();
    render(<MekanismSecurityDeskScreen onTrustedSubmit={onTrustedSubmit} />);
    fireEvent.change(screen.getByLabelText("添加信任玩家"), { target: { value: "Notch" } });
    fireEvent.click(screen.getByRole("button", { name: "确认添加" }));
    expect(onTrustedSubmit).toHaveBeenCalledWith("Notch");
  });

  it("switches security modes and disables the active one", async () => {
    const onSecurityChange = vi.fn();
    render(<MekanismSecurityDeskScreen onSecurityChange={onSecurityChange} security="public" />);
    const publicButton = screen.getByRole("button", { name: "公开模式" });
    expect(publicButton.className).toContain("opacity-50");
    await userEvent.click(publicButton);
    expect(onSecurityChange).toHaveBeenCalledWith("public");
    await userEvent.click(screen.getByRole("button", { name: "私有模式" }));
    expect(onSecurityChange).toHaveBeenCalledWith("private");
  });

  it("renders the security light and frequency slot items", () => {
    render(
      <MekanismSecurityDeskScreen
        bottomItem={{ icon: "iron-ingot" }}
        securityLight="enabled"
        topItem={{ icon: "gold-ingot" }}
      />,
    );
    expect(screen.getByLabelText("frequency-top")).toBeInTheDocument();
    expect(screen.getByLabelText("frequency-bottom")).toBeInTheDocument();
    expect(document.querySelector("[data-mek-sprite='light/security/enabled']")).toBeTruthy();
  });
});
