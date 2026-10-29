// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { BatBoxScreen, Ic2EnergyGauge, MaceratorScreen } from "./index";

describe("iC2 SSR", () => {
  it("服务端渲染 mod 屏与组件不报错", () => {
    const html = renderToStaticMarkup(
      <>
        <MaceratorScreen
          energy={{ max: 2000, value: 1400 }}
          input={{ icon: "iron-ore" }}
          output={{ count: 2, icon: "iron-ingot" }}
          progress={0.45}
          title="磨矿机"
        />
        <BatBoxScreen energy={{ max: 40000, value: 26000 }} title="储电箱" />
        <Ic2EnergyGauge label="EU 能量" left={0} max={40000} top={0} value={26000} />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
