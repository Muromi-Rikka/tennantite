"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Panel } from "../../../containers/panel/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import {
  Checkbox,
  Radio,
  RadioGroup,
  Slider,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "../../../primitives/index";

export interface SettingsScreenProps {
  className?: string;
  /**
  * 通用设置默认值（受控可选，数据由使用方注入）
  */
  defaults?: {
    brightness?: number;
    difficulty?: string;
    fov?: number;
    showClouds?: boolean;
    smoothLighting?: boolean;
  };
  /**
  * 面板标题（省略时标签页直接居顶，与原版设置界面一致）
  */
  title?: ReactNode;
}

/**
 * 设置界面（规格 §6.3）：Tabs + Slider + Checkbox + RadioGroup 分页。
*/
export function SettingsScreen({
  className,
  defaults = {},
  title,
}: SettingsScreenProps) {
  const [fov, setFov] = useState(defaults.fov ?? 70);
  const [brightness, setBrightness] = useState(defaults.brightness ?? 50);
  const [showClouds, setShowClouds] = useState(defaults.showClouds ?? true);
  const [smoothLighting, setSmoothLighting] = useState(
    defaults.smoothLighting ?? true,
  );
  const [difficulty, setDifficulty] = useState(defaults.difficulty ?? "普通");

  return (
    <Panel className={cn("inline-flex w-320 flex-col gap-4 p-6", className)}>
      {title ? <TitleBar align="center" title={title} /> : null}
      <Tabs className="gap-4" defaultValue="video">
        <TabsList aria-label="设置分类">
          <TabsTab value="video">视频</TabsTab>
          <TabsTab value="audio">音乐和声音</TabsTab>
          <TabsTab value="game">游戏</TabsTab>
        </TabsList>
        <TabsPanel value="video">
          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between gap-4">
              <span className="font-mc mc-text">
                视野：
                {fov}
              </span>
              <Slider
                aria-label="视野"
                className="w-150"
                max={110}
                min={30}
                onValueChange={(value) => {
                  setFov(Array.isArray(value) ? (value[0] ?? 70) : value);
                }}
                value={fov}
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="font-mc mc-text">
                亮度：
                {brightness}
                %
              </span>
              <Slider
                aria-label="亮度"
                className="w-150"
                max={100}
                min={0}
                onValueChange={(value) => {
                  setBrightness(Array.isArray(value) ? (value[0] ?? 50) : value);
                }}
                value={brightness}
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="font-mc mc-text">显示云</span>
              <Checkbox
                aria-label="显示云"
                checked={showClouds}
                onCheckedChange={(next) => {
                  setShowClouds(next === true);
                }}
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="font-mc mc-text">平滑光照</span>
              <Checkbox
                aria-label="平滑光照"
                checked={smoothLighting}
                onCheckedChange={(next) => {
                  setSmoothLighting(next === true);
                }}
              />
            </label>
          </div>
        </TabsPanel>
        <TabsPanel value="audio">
          <p className="font-mc mc-text text-mc-text-dim">
            声音设置（示例分页）
          </p>
        </TabsPanel>
        <TabsPanel value="game">
          <RadioGroup
            aria-label="游戏难度"
            onValueChange={(value) => {
              setDifficulty(String(value));
            }}
            value={difficulty}
          >
            {["和平", "简单", "普通", "困难"].map(name => (
              <label className="flex items-center gap-2" key={name}>
                <Radio value={name} />
                <span className="font-mc mc-text">{name}</span>
              </label>
            ))}
          </RadioGroup>
        </TabsPanel>
      </Tabs>
    </Panel>
  );
}
