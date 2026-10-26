import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { expectNoAxeViolations } from "../testing/a11y";
import { Badge } from "./badge/index";
import { Button } from "./button/index";
import { Checkbox } from "./checkbox/index";
import {
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "./dialog/index";
import { Input } from "./input/index";
import { Progress } from "./progress/index";
import { Radio, RadioGroup } from "./radio-group/index";
import { ScrollArea } from "./scroll-area/index";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "./select/index";
import { Slider } from "./slider/index";
import { Switch } from "./switch/index";
import { Tabs, TabsList, TabsPanel, TabsTab } from "./tabs/index";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./tooltip/index";

describe("可访问性（规格 §10）", () => {
  it("按钮 / 输入 / 徽标 / 滚动区", async () => {
    const { container } = render(
      <>
        <Button>开始游戏</Button>
        <Button variant="success">创造</Button>
        <Input aria-label="玩家名" />
        <Badge>64</Badge>
        <ScrollArea>服务器列表</ScrollArea>
      </>,
    );
    await expectNoAxeViolations(container);
  });

  it("开关组（checkbox / switch / radio / slider / progress）", async () => {
    const { container } = render(
      <>
        <Checkbox aria-label="显示云" />
        <Switch aria-label="难度锁定" />
        <RadioGroup aria-label="难度" defaultValue="easy">
          <Radio aria-label="简单" value="easy" />
          <Radio aria-label="困难" value="hard" />
        </RadioGroup>
        <Slider aria-label="音量" defaultValue={50} />
        <Progress aria-label="经验" value={50} />
      </>,
    );
    await expectNoAxeViolations(container);
  });

  it("标签页 / 下拉 / 弹窗 / 悬浮提示", async () => {
    const { container } = render(
      <>
        <Tabs defaultValue="a">
          <TabsList aria-label="分类">
            <TabsTab value="a">A</TabsTab>
            <TabsTab value="b">B</TabsTab>
          </TabsList>
          <TabsPanel value="a">面板 A</TabsPanel>
        </Tabs>
        <Select defaultValue="x">
          <SelectTrigger aria-label="游戏模式">
            <SelectValue />
            <SelectIcon />
          </SelectTrigger>
          <SelectPopup>
            <SelectList>
              <SelectItem value="x">生存</SelectItem>
            </SelectList>
          </SelectPopup>
        </Select>
        <Dialog open={false}>
          <DialogTrigger>打开</DialogTrigger>
          <DialogPopup>
            <DialogTitle>标题</DialogTitle>
            <DialogDescription>描述</DialogDescription>
          </DialogPopup>
        </Dialog>
        <Tooltip>
          <TooltipTrigger>悬浮我</TooltipTrigger>
          <TooltipPopup>提示</TooltipPopup>
        </Tooltip>
      </>,
    );
    await expectNoAxeViolations(container);
  });
});
