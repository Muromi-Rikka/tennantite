import type { ScreenSlot } from "@tennantite/ui";
import type { MekanismMachineKey } from "./mekanism-machine-screen/mekanism-machine-layout";
import { MekanismBar } from "./mekanism-bar/index";
import { MekanismChemicalTankScreen } from "./mekanism-chemical-tank-screen/index";
import { MekanismDynamicTankScreen } from "./mekanism-dynamic-tank-screen/index";
import { MekanismEnergyCubeScreen } from "./mekanism-energy-cube-screen/index";
import { MekanismFluidTankScreen } from "./mekanism-fluid-tank-screen/index";
import { MekanismGauge } from "./mekanism-gauge/index";
import { MekanismInductionMatrixScreen } from "./mekanism-induction-matrix-screen/index";
import { MekanismMachineScreen } from "./mekanism-machine-screen/index";
import { MEKANISM_MACHINES } from "./mekanism-machine-screen/mekanism-machine-layout";
import { MekanismButton } from "./mekanism-button/index";
import { MekanismInnerScreen } from "./mekanism-inner-screen/index";
import { MekanismLabel } from "./mekanism-label/index";
import { MekanismTitle } from "./mekanism-title/index";
import { MekanismPersonalStorageScreen } from "./mekanism-personal-storage-screen/index";
import { MekanismProgress } from "./mekanism-progress/index";
import { MekanismScreen } from "./mekanism-screen/index";
import { MekanismSideConfigWindow } from "./mekanism-side-config-window/index";
import { MekanismSlot } from "./mekanism-slot/index";
import { MekanismSprite } from "./mekanism-sprite/index";
import { MekanismTabBar } from "./mekanism-tab-bar/index";
import { MekanismThermalEvaporationScreen } from "./mekanism-thermal-evaporation-screen/index";
import { MekanismThermoelectricBoilerScreen } from "./mekanism-thermoelectric-boiler-screen/index";
import { MekanismUpgradeWindow } from "./mekanism-upgrade-window/index";
import { MekanismWindow } from "./mekanism-window/index";

const IRON: ScreenSlot = { count: 32, icon: "iron-ingot", tooltip: "铁锭" };
const GOLD: ScreenSlot = { count: 8, icon: "gold-ingot", tooltip: "金锭" };

export function MekanismChemicalTankScreenDemo() {
  return <MekanismChemicalTankScreen chemical={{ amount: 32000, capacity: 64000 }} drain={GOLD} fill={IRON} />;
}

export function MekanismDynamicTankScreenDemo() {
  return <MekanismDynamicTankScreen contents={[IRON, GOLD]} fluid={{ amount: 8000, capacity: 16000, tint: "#3c7fe0" }} />;
}

export function MekanismEnergyCubeScreenDemo() {
  return <MekanismEnergyCubeScreen charge={IRON} discharge={GOLD} energy={{ max: 4000000, value: 2400000 }} />;
}

export function MekanismFluidTankScreenDemo() {
  return <MekanismFluidTankScreen fluid={{ amount: 64000, capacity: 128000, tint: "#3c7fe0" }} input={GOLD} output={IRON} />;
}

export function MekanismGaugeDemo() {
  return (
    <div className="relative h-40 w-72">
      <MekanismGauge kind="energy" label="能量" left={10} max={100} top={10} type="standard" value={62} />
      <MekanismGauge kind="chemical" label="化学物质" left={36} max={100} top={10} type="small" value={45} />
      <MekanismGauge kind="fluid" left={62} max={100} tint="#3c7fe0" top={10} type="wide" value={70} />
    </div>
  );
}

export function MekanismInductionMatrixScreenDemo() {
  return <MekanismInductionMatrixScreen cells={[IRON, GOLD]} energy={{ max: 100000000, value: 62000000 }} />;
}

export function MekanismMachineScreenDemo() {
  return <MekanismMachineScreen energy={{ max: 10000, value: 6400 }} machine="enrichment-chamber" progress={{ progress: 0.55 }} slots={{ input: IRON, output: GOLD }} />;
}

export function MekanismMachineScreensDemo() {
  return (
    <div className="flex flex-wrap items-start gap-x-64 gap-y-16">
      {(Object.keys(MEKANISM_MACHINES) as MekanismMachineKey[]).map(machine => (
        <MekanismMachineScreen
          energy={{ max: 10000, value: 6400 }}
          key={machine}
          machine={machine}
          progress={{ "dynamic": 0.4, "power": 0.64, "progress": 0.55, "progress-left": 0.4, "progress-right": 0.6, "rate": 0.45 }}
          slots={{
            "energy": GOLD,
            "extra": IRON,
            "input": IRON,
            "input-0": IRON,
            "input-1": GOLD,
            "input-2": IRON,
            "input-4": GOLD,
            "output": IRON,
            "output-0": IRON,
          }}
          warning={machine === "resistive-heater"}
        />
      ))}
    </div>
  );
}

export function MekanismPartsDemo() {
  return (
    <div className="relative h-40 w-80">
      <MekanismTitle titleEnd={176}>标题</MekanismTitle>
      <MekanismLabel left={8} top={24}>普通文本</MekanismLabel>
      <MekanismLabel left={8} top={38} variant="screen">屏幕文本</MekanismLabel>
      <MekanismButton label="按钮" left={8} top={54} width={80} />
      <MekanismInnerScreen height={20} left={8} top={80} width={100}>内屏</MekanismInnerScreen>
    </div>
  );
}

export function MekanismPersonalStorageScreenDemo() {
  return (
    <MekanismPersonalStorageScreen
      items={Array.from({ length: 54 }, (_, index) => (index % 5 === 0 ? IRON : (index % 7 === 0 ? GOLD : null)))}
    />
  );
}

export function MekanismProgressDemo() {
  return (
    <div className="relative h-32 w-80">
      <MekanismProgress label="BAR" left={10} progress={0.55} top={10} type="BAR" />
      <MekanismProgress left={10} progress={0.35} top={30} type="LARGE_LEFT" />
      <MekanismProgress left={10} progress={0.65} top={48} type="TALL_RIGHT" />
      <MekanismProgress left={40} progress={0.4} tint={{ from: "#c9071f", to: "#ff55ff" }} top={48} type="RIGHT" />
      <MekanismBar height={40} kind="power" label="功率" left={80} top={10} value={0.5} />
      <MekanismBar horizontal kind="rate" label="速率" left={100} tint={{ from: "#366bd0", to: "#5a8cff" }} top={60} value={0.6} width={80} />
    </div>
  );
}

export function MekanismScreenDemo() {
  return (
    <MekanismScreen
      height={166}
      inventoryLabel={{ text: "玩家", x: 8, y: 72 }}
      playerInventory={{ hotbarY: 142, x: 8, y: 84 }}
      title="示例界面"
      width={176}
    >
      <MekanismSlot item={IRON} label="demo" left={63} top={16} type="input" />
    </MekanismScreen>
  );
}

export function MekanismSideConfigWindowDemo() {
  return (
    <div className="relative h-[300px] w-[340px]">
      <MekanismSideConfigWindow left={0} sides={{ back: "OUTPUT", front: "INPUT", top: "ENERGY" }} top={0} />
    </div>
  );
}

export function MekanismSlotDemo() {
  return (
    <div className="relative h-24 w-64">
      <MekanismSlot item={IRON} label="demo-input" left={10} overlay="input" top={10} type="input" />
      <MekanismSlot item={GOLD} label="demo-output" left={40} overlay="output" top={10} type="output" />
      <MekanismSlot item={IRON} label="demo-power" left={70} overlay="plus" top={10} type="power" />
    </div>
  );
}

export function MekanismSpriteDemo() {
  return (
    <div className="relative h-[220px] w-[400px]">
      <MekanismSprite height={20} left={10} name="button" top={10} width={120} />
      <MekanismSprite height={18} left={10} name="slot/normal" top={40} width={18} />
      <MekanismSprite height={18} left={40} name="slot/output" top={40} width={18} />
      <MekanismSprite height={18} left={70} name="inner_screen" top={40} width={90} />
    </div>
  );
}

export function MekanismTabDemo() {
  return (
    <div className="relative h-48 w-72">
      <MekanismTabBar
        active={["config"]}
        security="private"
        tabs={["config", "transporter", "upgrade", "security", "redstone", "energy"]}
        width={176}
      />
    </div>
  );
}

export function MekanismThermalEvaporationScreenDemo() {
  return (
    <MekanismThermalEvaporationScreen
      fluid={{
        input: { amount: 5000, capacity: 10000, tint: "#3c7fe0" },
        output: { amount: 2000, capacity: 10000, tint: "#8fd3ff" },
      }}
      temperature={320}
    />
  );
}

export function MekanismThermoelectricBoilerScreenDemo() {
  return (
    <MekanismThermoelectricBoilerScreen
      chemicals={{
        cooled: { amount: 20, capacity: 100, tint: "#55ffff" },
        steam: { amount: 70, capacity: 100, tint: "#ffffff" },
        superheated: { amount: 40, capacity: 100, tint: "#ffa160" },
        water: { amount: 60, capacity: 100, tint: "#3c7fe0" },
      }}
      rates={{ boil: 12, max: 20 }}
    />
  );
}

export function MekanismUpgradeWindowDemo() {
  return (
    <div className="relative h-[220px] w-[400px]">
      <MekanismUpgradeWindow left={0} top={0} />
    </div>
  );
}

export function MekanismWindowDemo() {
  return (
    <div className="relative h-[300px] w-[400px]">
      <MekanismWindow height={100} left={0} title="示例窗口" top={0} width={198}>
        <MekanismLabel left={8} top={28}>窗口内容</MekanismLabel>
      </MekanismWindow>
    </div>
  );
}
