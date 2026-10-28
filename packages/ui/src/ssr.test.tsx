// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Ae2ChestScreen,
  Ae2DriveScreen,
  Ae2InscriberScreen,
  Ae2TerminalScreen,
  Badge,
  BatBoxScreen,
  BossBar,
  Button,
  Checkbox,
  ChestScreen,
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  EuBar,
  GuiSprite,
  HealthHungerBar,
  Input,
  InventoryScreen,
  MaceratorScreen,
  MainMenu,
  PlayerInventory,
  Progress,
  Radio,
  RadioGroup,
  ScaledBox,
  ScreenPanel,
  ScrollArea,
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Toast,
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "./index";

function render(): string {
  return renderToStaticMarkup(
    <>
      <Badge>64</Badge>
      <Ae2TerminalScreen />
      <Ae2InscriberScreen />
      <Ae2DriveScreen />
      <Ae2ChestScreen />
      <GuiSprite name="container/inventory.png" />
      <InventoryScreen />
      <ChestScreen rows={3} />
      <MaceratorScreen
        energy={{ max: 2000, value: 1400 }}
        input={{ icon: "iron-ore" }}
        output={{ count: 2, icon: "iron-ingot" }}
        progress={0.45}
        title="磨矿机"
      />
      <BatBoxScreen energy={{ max: 40000, value: 26000 }} title="储电箱" />
      <EuBar label="EU 能量" max={40000} value={26000} />
      <HealthHungerBar health={20} hunger={20} />
      <BossBar name="Boss" value={0.5} />
      <Toast title="提示" />
      <MainMenu />
      <Button>开始</Button>
      <Checkbox aria-label="复选" />
      <Input placeholder="输入" />
      <Progress aria-label="进度" value={50} />
      <ScreenPanel height={166} title="物品栏" width={176}>
        <PlayerInventory
          hotbarItems={[{ count: 64, icon: "stone-block" }]}
          selectedIndex={0}
        />
      </ScreenPanel>
      <RadioGroup aria-label="单选" defaultValue="a">
        <Radio aria-label="A" value="a" />
      </RadioGroup>
      <ScrollArea className="h-32">列表</ScrollArea>
      <ScaledBox height={166} width={176}>
        <ChestScreen rows={3} />
      </ScaledBox>
      <ScaledBox height={166} mode="fit" width={176}>
        <ChestScreen rows={3} />
      </ScaledBox>
      <Slider aria-label="滑条" defaultValue={30} />
      <Switch aria-label="开关" />
      <Tabs defaultValue="t1">
        <TabsList aria-label="标签">
          <TabsTab value="t1">一</TabsTab>
        </TabsList>
        <TabsPanel value="t1">面板</TabsPanel>
      </Tabs>
      <Tooltip>
        <TooltipTrigger>悬浮</TooltipTrigger>
        <TooltipPopup>提示</TooltipPopup>
      </Tooltip>
      <Select defaultValue="x">
        <SelectTrigger aria-label="选择">
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            <SelectItem value="x">X</SelectItem>
          </SelectList>
        </SelectPopup>
      </Select>
      <Dialog open={false}>
        <DialogPopup>
          <DialogTitle>标题</DialogTitle>
          <DialogDescription>描述</DialogDescription>
        </DialogPopup>
      </Dialog>
    </>,
  );
}

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("全部 L1 原语可服务端渲染", () => {
    const html = render();
    expect(html).toContain("64");
    expect(html).toContain("mc-tex-btn");
    expect(html).toContain("mc-tex-slot");
    expect(html).toContain("mc-scroll");
  });

  it("screenPanel / PlayerInventory 可服务端渲染", () => {
    const html = render();
    expect(html).toContain("mc-tex-panel");
    expect(html).toContain("mc-tex-ic2-machine");
    expect(html).toContain("磨矿机");
    expect(html).toContain("储电箱");
    expect(html).toContain("mc-tex-ae2-panel");
    expect(html).toContain("ME 终端");
    expect(html).toContain("压印器");
    expect(html).toContain("ME 驱动器");
    expect(html).toContain("ME 箱子");
    expect(html).toContain("物品栏");
    expect(html).toContain("aria-label=\"main-0\"");
    expect(html).toContain("aria-label=\"hotbar-8\"");
  });

  it("打开状态的 Dialog 服务端渲染不报错（Portal 内容水合后挂载）", () => {
    const html = renderToStaticMarkup(
      <Dialog open>
        <DialogPopup>
          <DialogTitle>暂停</DialogTitle>
        </DialogPopup>
      </Dialog>,
    );
    expect(typeof html).toBe("string");
  });
});
