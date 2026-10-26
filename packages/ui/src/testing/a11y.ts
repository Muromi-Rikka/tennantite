import axe from "axe-core";
import { expect } from "vitest";

/**
 * 可访问性断言（规格 §10：键盘可操作、焦点态清晰、语义标签）。
 * 用法：await expectNoAxeViolations(container)。
 */
export async function expectNoAxeViolations(container: HTMLElement) {
  const results = await axe.run(container);
  expect(
    results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
    })),
  ).toEqual([]);
}
