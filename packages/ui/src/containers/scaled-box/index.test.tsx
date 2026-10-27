import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { expectNoAxeViolations } from "../../testing/a11y";
import { ScaledBox } from "./index";

class MockResizeObserver {
  static instances: MockResizeObserver[] = [];
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }

  disconnect(): void {}
  emit(width: number, height = 0): void {
    // React 18+ 自动批处理：手动触发的回调需在 act 内同步提交
    act(() => {
      this.callback(
        [{ contentRect: { height, width } } as ResizeObserverEntry],
        this as unknown as ResizeObserver,
      );
    });
  }

  observe(): void {}

  unobserve(): void {}
}

function emit(width: number, height?: number): void {
  const observer = MockResizeObserver.instances.at(-1);
  if (!observer) {
    throw new Error("尚未创建 ResizeObserver");
  }
  observer.emit(width, height);
}

describe("scaledBox", () => {
  afterEach(() => {
    MockResizeObserver.instances = [];
    vi.unstubAllGlobals();
  });

  it("integer 模式按容器宽度取最大整数档写入 --mc-scale", () => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    render(
      <ScaledBox data-testid="frame" width={176}>
        <div data-testid="content">内容</div>
      </ScaledBox>,
    );
    const inner = screen.getByTestId("content").parentElement!;
    expect(inner.style.getPropertyValue("--mc-scale")).toBe("1");
    emit(352);
    expect(inner.style.getPropertyValue("--mc-scale")).toBe("2");
    emit(351);
    expect(inner.style.getPropertyValue("--mc-scale")).toBe("1");
  });

  it("integer 模式受 maxScale 封顶且档位不低于 1", () => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    render(
      <ScaledBox data-testid="frame" maxScale={1} width={100}>
        <div data-testid="content">内容</div>
      </ScaledBox>,
    );
    const inner = screen.getByTestId("content").parentElement!;
    emit(800);
    expect(inner.style.getPropertyValue("--mc-scale")).toBe("1");

    render(
      <ScaledBox data-testid="frame-2" maxScale={2} width={100}>
        <div data-testid="content-2">内容</div>
      </ScaledBox>,
    );
    const capped = screen.getByTestId("content-2").parentElement!;
    emit(800);
    expect(capped.style.getPropertyValue("--mc-scale")).toBe("2");
  });

  it("fit 模式按容器盒与内容固有尺寸等比缩放并封顶", () => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    render(
      <ScaledBox data-testid="frame" height={166} maxScale={2} mode="fit" width={176}>
        <div>内容</div>
      </ScaledBox>,
    );
    const frame = screen.getByTestId("frame");
    expect(frame).toHaveClass("overflow-hidden");
    const scaled = frame.firstElementChild as HTMLElement;
    expect(scaled.style.transform).toContain("scale(1)");
    emit(400, 300);
    const expected = Math.min(2, 400 / 176, 300 / 166);
    expect(scaled.style.transform).toBe(
      `translate(-50%, -50%) scale(${expected})`,
    );
  });

  it("无 ResizeObserver 环境保持初始档位（SSR / 旧浏览器优雅降级）", () => {
    render(
      <ScaledBox data-testid="frame" width={176}>
        <div data-testid="content">内容</div>
      </ScaledBox>,
    );
    const inner = screen.getByTestId("content").parentElement!;
    expect(inner.style.getPropertyValue("--mc-scale")).toBe("1");
  });

  it("未提供 width 时无布局信息则保持初始档位（jsdom 实测路径守卫）", () => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    render(
      <ScaledBox data-testid="frame">
        <div data-testid="content">内容</div>
      </ScaledBox>,
    );
    const inner = screen.getByTestId("content").parentElement!;
    emit(800);
    expect(inner.style.getPropertyValue("--mc-scale")).toBe("1");
  });

  it("可访问性", async () => {
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    const { container } = render(
      <ScaledBox width={176}>
        <div>内容</div>
      </ScaledBox>,
    );
    await expectNoAxeViolations(container);
  });
});
