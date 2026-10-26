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
  title?: ReactNode;
}

/**
 * 设置界面（规格 §6.3）：Tabs + Slider + Checkbox + RadioGroup 分页。
*/
export function SettingsScreen({
  className,
  defaults = {},
  title = "设置",
}: SettingsScreenProps) {
  const [fov, setFov] = useState(defaults.fov ?? 70);
  const [brightness, setBrightness] = useState(defaults.brightness ?? 50);
  const [showClouds, setShowClouds] = useState(defaults.showClouds ?? true);
  const [smoothLighting, setSmoothLighting] = useState(
    defaults.smoothLighting ?? true,
  );
  const [difficulty, setDifficulty] = useState(defaults.difficulty ?? "普通");

  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="center" title={title} />
      <Tabs defaultValue="video">
        <TabsList aria-label="设置分类">
          <TabsTab value="video">视频</TabsTab>
          <TabsTab value="audio">音乐和声音</TabsTab>
          <TabsTab value="game">游戏</TabsTab>
        </TabsList>
        <TabsPanel value="video">
          <div className="flex w-320 flex-col gap-16">
            <label className="flex flex-col gap-8">
              <span className="font-readable text-mc">
                视野：
                {fov}
              </span>
              <Slider
                aria-label="视野"
                max={110}
                min={30}
                onValueChange={(value) => {
                  setFov(Array.isArray(value) ? (value[0] ?? 70) : value);
                }}
                value={fov}
              />
            </label>
            <label className="flex flex-col gap-8">
              <span className="font-readable text-mc">
                亮度：
                {brightness}
                %
              </span>
              <Slider
                aria-label="亮度"
                max={100}
                min={0}
                onValueChange={(value) => {
                  setBrightness(Array.isArray(value) ? (value[0] ?? 50) : value);
                }}
                value={brightness}
              />
            </label>
            <label className="flex items-center gap-8">
              <Checkbox
                aria-label="显示云"
                checked={showClouds}
                onCheckedChange={(next) => {
                  setShowClouds(next === true);
                }}
              />
              <span className="font-readable text-mc">显示云</span>
            </label>
            <label className="flex items-center gap-8">
              <Checkbox
                aria-label="平滑光照"
                checked={smoothLighting}
                onCheckedChange={(next) => {
                  setSmoothLighting(next === true);
                }}
              />
              <span className="font-readable text-mc">平滑光照</span>
            </label>
          </div>
        </TabsPanel>
        <TabsPanel value="audio">
          <p className="font-readable text-mc text-mc-text-dim">
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
              <label className="flex items-center gap-8" key={name}>
                <Radio value={name} />
                <span className="font-readable text-mc">{name}</span>
              </label>
            ))}
          </RadioGroup>
        </TabsPanel>
      </Tabs>
    </Panel>
  );
}
