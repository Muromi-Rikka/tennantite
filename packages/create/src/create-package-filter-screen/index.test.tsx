import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_PACKAGE_FILTER } from "../create-metrics";
import { CreatePackageFilterScreen } from "./index";

describe("createPackageFilterScreen", () => {
  it("渲染地址输入框与按钮", () => {
    render(<CreatePackageFilterScreen address="仓库 3 号" />);
    const address = screen.getByLabelText("地址") as HTMLInputElement;
    expect(address.value).toBe("仓库 3 号");
    expect(screen.getByLabelText("清空")).toBeInTheDocument();
    expect(screen.getByLabelText("确认")).toBeInTheDocument();
  });

  it("地址框按常量定位", () => {
    render(<CreatePackageFilterScreen />);
    const address = screen.getByLabelText("地址");
    expect(address.style.left).toBe(`calc(var(--mc-gui) * ${CREATE_PACKAGE_FILTER.address.left})`);
    expect(address.style.top).toBe(`calc(var(--mc-gui) * ${CREATE_PACKAGE_FILTER.address.top})`);
    expect(address.style.width).toBe(`calc(var(--mc-gui) * ${CREATE_PACKAGE_FILTER.address.width})`);
  });

  it("确认/清空/地址回调", () => {
    const onConfirm = vi.fn();
    const onReset = vi.fn();
    const onAddressChange = vi.fn();
    render(
      <CreatePackageFilterScreen
        onAddressChange={onAddressChange}
        onConfirm={onConfirm}
        onReset={onReset}
      />,
    );
    fireEvent.change(screen.getByLabelText("地址"), { target: { value: "车站" } });
    fireEvent.click(screen.getByLabelText("确认"));
    fireEvent.click(screen.getByLabelText("清空"));
    expect(onAddressChange).toHaveBeenCalledWith("车站");
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
