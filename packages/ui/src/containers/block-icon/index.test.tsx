import { blockFaces } from "@tennantite/textures";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoAxeViolations } from "../../testing/a11y";
import { BlockIconDemo } from "./demo";
import { BLOCK_FACE_TRANSFORMS } from "./geometry";
import { BlockIcon } from "./index";

const PNG_SIGNATURE = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

function pngSize(source: string) {
  const base64 = source.slice(source.indexOf(",") + 1);
  const binary = Array.from(atob(base64), char => char.codePointAt(0) ?? 0);
  const bytes = Uint8Array.from(binary);
  const view = new DataView(bytes.buffer);
  return { bytes, height: view.getUint32(20), width: view.getUint32(16) };
}

describe("blockIcon", () => {
  it("按方块名渲染三可见面", () => {
    const { container } = render(<BlockIcon name="stone-block" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("data-icon", "stone-block");
    expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
    expect(svg).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 16)"));
    const images = [...container.querySelectorAll("image")];
    expect(images).toHaveLength(3);
    for (const image of images) {
      expect(image.getAttribute("href")).toMatch(/^data:image\/png;base64,/);
    }
  });

  it("三个面的投影矩阵与绘制顺序固定", () => {
    const { container } = render(<BlockIcon name="oak-log" />);
    const groups = [...container.querySelectorAll("g")];
    expect(groups.map(group => group.getAttribute("transform"))).toEqual([
      BLOCK_FACE_TRANSFORMS.left,
      BLOCK_FACE_TRANSFORMS.right,
      BLOCK_FACE_TRANSFORMS.top,
    ]);
  });

  it("逐面烘焙着色：同名贴图的左右面不同、顶面亦不同", () => {
    const faces = blockFaces["stone-block"];
    expect(new Set([faces.left, faces.right, faces.top]).size).toBe(3);
  });

  it("全部面贴图为 16×16 原版 PNG", () => {
    for (const faces of Object.values(blockFaces)) {
      for (const source of Object.values(faces)) {
        const { bytes, height, width } = pngSize(source);
        expect(bytes.subarray(0, 8)).toEqual(new Uint8Array(PNG_SIGNATURE));
        expect(width).toBe(16);
        expect(height).toBe(16);
      }
    }
  });

  it("pixelated 默认开启、可关闭", () => {
    const { container: a } = render(<BlockIcon name="sand" />);
    for (const image of a.querySelectorAll("image")) {
      expect(image).toHaveStyle({ imageRendering: "pixelated" });
    }
    const { container: b } = render(<BlockIcon name="sand" pixelated={false} />);
    for (const image of b.querySelectorAll("image")) {
      expect(image.style.imageRendering).toBe("");
    }
  });

  it("demo 渲染", () => {
    const { container } = render(<BlockIconDemo />);
    expect(container.querySelectorAll("svg")).toHaveLength(8);
  });

  it("可访问性", async () => {
    const { container } = render(
      <>
        <BlockIcon name="grass-block" />
        <BlockIcon name="crafting-table" size={32} />
      </>,
    );
    await expectNoAxeViolations(container);
  });
});
