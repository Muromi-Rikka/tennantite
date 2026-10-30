// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  MekanismDigitalMinerConfigScreen,
  MekanismDigitalMinerScreen,
  MekanismEnergyCubeScreen,
  MekanismEnrichingFactoryScreen,
  MekanismEnrichmentChamberScreen,
  MekanismFuelwoodHeaterScreen,
  MekanismList,
  MekanismSecurityDeskScreen,
  MekanismSideConfigWindow,
  MekanismTeleporterScreen,
} from "./index";
import { MekanismBarDemo } from "./mekanism-demos";

function render(): string {
  return renderToStaticMarkup(
    <>
      <MekanismEnrichmentChamberScreen
        energy={{ max: 10000, value: 6400 }}
        progress={{ progress: 0.5 }}
        slots={{ input: { icon: "iron-ore" }, output: { count: 2, icon: "iron-ingot" } }}
      />
      <MekanismEnergyCubeScreen energy={{ max: 4000000, value: 2400000 }} />
      <MekanismEnrichingFactoryScreen energy={{ max: 10, value: 5 }} tier="ultimate" />
      <MekanismFuelwoodHeaterScreen progress={{ progress: 0.4 }} slots={{ fuel: { icon: "charcoal" } }} />
      <MekanismSecurityDeskScreen owner="Steve" security="private" trusted={[{ id: "alice", label: "Alice" }]} />
      <MekanismTeleporterScreen frequencies={[{ id: "home", label: "home", owner: "Steve", security: "public" }]} status="ready" />
      <MekanismDigitalMinerScreen energy={{ max: 10, value: 5 }} searchText="搜索完成" toMineText="1024" />
      <MekanismDigitalMinerConfigScreen filterCount="2" filters={[{ id: "iron", label: "铁矿石" }]} radius="10" />
      <MekanismSideConfigWindow left={0} top={0} />
      <MekanismBarDemo />
      <MekanismList
        left={0}
        rows={[
          { icon: "item/upgrade/speed", id: "speed", label: "速度升级" },
          { id: "energy", label: "能量升级" },
        ]}
        selectedId="energy"
        top={0}
        visibleRows={2}
        width={120}
      />
    </>,
  );
}

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("mekanism 屏与窗口可服务端渲染", () => {
    const html = render();
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
