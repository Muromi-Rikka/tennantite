"use client";

import type { IconProps } from "../../../containers/icon/index";
import { Icon } from "../../../containers/icon/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "../../../primitives/index";

export interface AdvancementNode {
  /**
  * 子节点
  */
  children?: AdvancementNode[];
  /**
  * 描述
  */
  description?: string;
  /**
  * 是否已完成
  */
  done?: boolean;
  /**
  * 图标（textures 包图标名）
  */
  icon?: IconProps["name"];
  /**
  * 展示名
  */
  name: string;
}

export interface AdvancementsScreenProps {
  /**
  * 分类（Tab）与树形节点（数据由使用方注入）
  */
  categories?: {
    name: string;
    nodes: AdvancementNode[];
  }[];
  className?: string;
  title?: React.ReactNode;
}

/**
 * 成就 / 进度界面（规格 §6.3）：Tabs 分类 + 26 GUI px 节点槽 + 缩进列表 + Tooltip 详情。
*/
export function AdvancementsScreen({
  categories = [],
  className,
  title = "进度",
}: AdvancementsScreenProps) {
  const firstTab = categories[0]?.name ?? "minecraft";
  return (
    <Panel className={cn("inline-flex w-320 flex-col gap-4 p-6", className)}>
      <TitleBar align="center" title={title} />
      <Tabs className="gap-4" defaultValue={firstTab}>
        <TabsList aria-label="进度分类">
          {categories.map(category => (
            <TabsTab key={category.name} value={category.name}>
              {category.name}
            </TabsTab>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsPanel key={category.name} value={category.name}>
            <ul className="flex flex-col gap-4">
              {category.nodes.map(node => (
                <AdvancementItem key={node.name} node={node} />
              ))}
            </ul>
          </TabsPanel>
        ))}
      </Tabs>
    </Panel>
  );
}

function AdvancementItem({ node }: { node: AdvancementNode }) {
  return (
    <li className="flex flex-col items-start gap-2">
      <Tooltip>
        <TooltipTrigger className="flex cursor-pointer items-center gap-2">
          <Slot selected={node.done} size={26}>
            {node.icon ? <Icon name={node.icon} size={16} /> : null}
          </Slot>
          <span className="font-mc mc-text" data-advancement-name="">
            {node.name}
          </span>
          <span className="sr-only">{node.name}</span>
        </TooltipTrigger>
        <TooltipPopup>
          <div className={node.done ? "text-mc-gold" : undefined}>{node.name}</div>
          {node.description
            ? (
                <div className="text-mc-text-dim">{node.description}</div>
              )
            : null}
        </TooltipPopup>
      </Tooltip>
      {node.children && node.children.length > 0
        ? (
            <ul className="ml-12 flex flex-col gap-2 border-l-[length:var(--mc-gui)] border-mc-stone-dark pl-8">
              {node.children.map(child => (
                <AdvancementItem key={child.name} node={child} />
              ))}
            </ul>
          )
        : null}
    </li>
  );
}
