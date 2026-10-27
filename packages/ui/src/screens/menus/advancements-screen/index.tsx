"use client";

import type { GuiSpriteName, PixelIconName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { Icon } from "../../../containers/icon/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { cn, gui } from "../../../lib/utils";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../../../primitives/tabs/index";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "../../../primitives/tooltip/index";

export interface AdvancementNode {
  children?: AdvancementNode[];
  description?: string;
  done?: boolean;
  icon?: PixelIconName;
  name: string;
  type?: "challenge" | "goal" | "task";
}

export interface AdvancementsScreenProps {
  categories?: {
    name: string;
    nodes: AdvancementNode[];
  }[];
  className?: string;
  title?: React.ReactNode;
}

/**
 * 成就 / 进度界面（规格 §6.3）：252×140 原版窗口 + 分类标签 + 26px 节点框。
 */
export function AdvancementsScreen({
  categories = [],
  className,
  title,
}: AdvancementsScreenProps) {
  const firstTab = categories[0]?.name ?? "minecraft";
  return (
    <ScreenPanel className={cn(className)} height={140} title={title} width={252}>
      <GuiSprite
        className="absolute inset-0"
        height={140}
        name="advancements/window.png"
        src={{ height: 140, width: 252, x: 0, y: 0 }}
        style={{ height: "100%", width: "100%" }}
        width={252}
      />
      <Tabs className="absolute inset-0" defaultValue={firstTab}>
        <TabsList aria-label="进度分类" className="absolute top-1 left-1">
          {categories.map(category => (
            <TabsTab
              className="mc-tex-tab h-27 w-32 px-2"
              key={category.name}
              style={{ backgroundImage: `var(--mc-gui-advancements-tab-${category.name}-png, none)` }}
              value={category.name}
            >
              {category.name}
            </TabsTab>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsPanel
            className="absolute overflow-auto bg-repeat"
            key={category.name}
            style={{
              backgroundImage: `var(--mc-gui-advancements-backgrounds-${category.name}-png, none)`,
              backgroundSize: gui(16),
              height: gui(104),
              left: gui(4),
              top: gui(30),
              width: gui(244),
            }}
            value={category.name}
          >
            <ul className="flex flex-col gap-2 p-2">
              {category.nodes.map(node => (
                <AdvancementItem key={node.name} node={node} />
              ))}
            </ul>
          </TabsPanel>
        ))}
      </Tabs>
    </ScreenPanel>
  );
}

function AdvancementItem({ depth = 0, node }: { depth?: number; node: AdvancementNode }) {
  return (
    <li className="flex flex-col items-start gap-1" style={{ marginLeft: gui(depth * 12) }}>
      <Tooltip>
        <TooltipTrigger className="flex cursor-pointer items-center gap-2">
          <span className="relative block size-26">
            <GuiSprite
              className="absolute inset-0"
              height={26}
              name={`sprites/advancements/${node.type ?? "task"}_frame_${node.done ? "obtained" : "unobtained"}.png` as GuiSpriteName}
              width={26}
            />
            {node.icon ? <Icon className="absolute top-5 left-5" name={node.icon} size={16} /> : null}
          </span>
          <span className="font-mc mc-text text-mc-text-main" data-advancement-name="">
            {node.name}
          </span>
          <span className="sr-only">{node.name}</span>
        </TooltipTrigger>
        <TooltipPopup>
          <div className={node.done ? "text-mc-gold" : undefined}>{node.name}</div>
          {node.description ? <div className="text-mc-text-dim">{node.description}</div> : null}
        </TooltipPopup>
      </Tooltip>
      {node.children?.length
        ? (
            <ul className="flex flex-col gap-1">
              {node.children.map(child => (
                <AdvancementItem depth={depth + 1} key={child.name} node={child} />
              ))}
            </ul>
          )
        : null}
    </li>
  );
}
