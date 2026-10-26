"use client";

import { useState } from "react";

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "../../../primitives/index";
import { Panel } from "../../../containers/panel/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";

export interface AdvancementNode {
  /** 展示名 */
  name: string;
  /** 描述 */
  description?: string;
  /** 图标（textures 包图标名） */
  icon?: Parameters<typeof import("../../../containers/icon/index").Icon>[0]["name"];
  /** 是否已完成 */
  done?: boolean;
  /** 子节点 */
  children?: AdvancementNode[];
}

export interface AdvancementsScreenProps {
  title?: React.ReactNode;
  /** 分类（Tab）与树形节点（数据由使用方注入） */
  categories?: {
    name: string;
    nodes: AdvancementNode[];
  }[];
  className?: string;
}

function AdvancementItem({ node }: { node: AdvancementNode }) {
  const label = (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer">
        <span
          className={cn(
            "mc-tex-slot block p-4",
            node.done && "outline-2 -outline-offset-2 outline-mc-accent-green",
          )}
        >
          {node.name}
        </span>
        <span className="sr-only">{node.name}</span>
      </TooltipTrigger>
      <TooltipPopup>
        <div className={node.done ? "text-mc-gold" : undefined}>{node.name}</div>
        {node.description ? (
          <div className="text-mc-text-dim">{node.description}</div>
        ) : null}
      </TooltipPopup>
    </Tooltip>
  );
  return (
    <li className="flex flex-col items-start gap-8">
      {label}
      {node.children && node.children.length > 0 ? (
        <ul className="ml-24 flex flex-col gap-8 border-l-2 border-mc-stone-dark pl-16">
          {node.children.map(child => (
            <AdvancementItem key={child.name} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/** 成就 / 进度界面（规格 §6.3）：Tabs 分类 + 树形布局 + Tooltip 详情。 */
export function AdvancementsScreen({
  title = "进度",
  categories = [],
  className,
}: AdvancementsScreenProps) {
  const firstTab = categories[0]?.name ?? "minecraft";
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="center" title={title} />
      <Tabs defaultValue={firstTab}>
        <TabsList aria-label="进度分类">
          {categories.map(category => (
            <TabsTab key={category.name} value={category.name}>
              {category.name}
            </TabsTab>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsPanel key={category.name} value={category.name}>
            <ul className="flex flex-col gap-16">
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
