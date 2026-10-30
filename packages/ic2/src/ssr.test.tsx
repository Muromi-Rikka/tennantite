// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  BatBoxScreen,
  CesuScreen,
  FermentorScreen,
  Ic2BlastFurnaceScreen,
  Ic2EnergyGauge,
  InductionFurnaceScreen,
  IronFurnaceScreen,
  MaceratorScreen,
  MetalFormerScreen,
  MfsuScreen,
  RecyclerScreen,
} from "./index";

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
        <RecyclerScreen
          energy={{ max: 2000, value: 900 }}
          input={{ icon: "stone-block" }}
          output={{ count: 5, icon: "gunpowder" }}
          progress={0.35}
          title="回收机"
        />
        <MetalFormerScreen
          energy={{ max: 2000, value: 1400 }}
          input={{ icon: "iron-ingot" }}
          output={{ count: 2, icon: "iron-ingot" }}
          progress={0.6}
          title="金属成型机"
        >
          <button aria-label="模式：滚压" type="button" />
          <button aria-label="模式：挤压" type="button" />
          <button aria-label="模式：造板" type="button" />
        </MetalFormerScreen>
        <IronFurnaceScreen
          fuel={{ icon: "charcoal" }}
          input={{ icon: "iron-ore" }}
          output={{ count: 1, icon: "iron-ingot" }}
          progress={0.7}
          title="铁炉"
        />
        <FermentorScreen
          energy={{ max: 2000, value: 1100 }}
          input={{ icon: "wheat" }}
          output={{ count: 1, icon: "potion" }}
          progress={0.5}
          title="发酵机"
        />
        <InductionFurnaceScreen
          energy={{ max: 10000, value: 7200 }}
          heat={46}
          inputA={{ icon: "iron-ore" }}
          inputB={{ icon: "iron-ore" }}
          outputA={{ count: 1, icon: "iron-ingot" }}
          outputB={{ count: 1, icon: "iron-ingot" }}
          progress={0.3}
          title="感应炉"
        />
        <Ic2BlastFurnaceScreen heat={0.64} outputs={[{}, {}]} progress={0.4} title="高炉" />
        <BatBoxScreen energy={{ max: 40000, value: 26000 }} title="储电箱" />
        <CesuScreen energy={{ max: 300000, value: 210000 }} title="CESU" />
        <MfsuScreen energy={{ max: 40000000, value: 26000000 }} title="MFSU" />
        <Ic2EnergyGauge label="EU 能量" left={0} max={40000} top={0} value={26000} />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
