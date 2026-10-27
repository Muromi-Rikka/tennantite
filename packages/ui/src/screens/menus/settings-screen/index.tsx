"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { cn, gui } from "../../../lib/utils";
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
import { MenuBackground } from "../menu-background/index";

export interface SettingsScreenProps {
  className?: string;
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
 * 设置界面（规格 §6.3）：320×240 menu_background + 原版 tabs/slider/checkbox。
 */
export function SettingsScreen({
  className,
  defaults = {},
  title,
}: SettingsScreenProps) {
  const [fov, setFov] = useState(defaults.fov ?? 70);
  const [brightness, setBrightness] = useState(defaults.brightness ?? 50);
  const [showClouds, setShowClouds] = useState(defaults.showClouds ?? true);
  const [smoothLighting, setSmoothLighting] = useState(defaults.smoothLighting ?? true);
  const [difficulty, setDifficulty] = useState(defaults.difficulty ?? "普通");

  return (
    <MenuBackground
      className={cn("overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      {title
        ? <div className="absolute inset-x-0 top-2 text-center font-mc mc-text text-mc-text-main mc-text-shadow">{title}</div>
        : null}
      <Tabs className="absolute inset-x-6 top-8" defaultValue="video">
        <TabsList aria-label="设置分类">
          <TabsTab value="video">视频</TabsTab>
          <TabsTab value="audio">音乐和声音</TabsTab>
          <TabsTab value="game">游戏</TabsTab>
        </TabsList>
        <TabsPanel value="video">
          <div className="flex flex-col gap-4 pt-4">
            <label className="flex items-center justify-between gap-4">
              <span className="font-mc mc-text">{`视野：${fov}`}</span>
              <Slider
                aria-label="视野"
                className="w-150"
                max={110}
                min={30}
                onValueChange={(value) => {
                  setFov(Array.isArray(value) ? (value[0] ?? 70) : Number(value));
                }}
                value={fov}
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="font-mc mc-text">{`亮度：${brightness}%`}</span>
              <Slider
                aria-label="亮度"
                className="w-150"
                max={100}
                min={0}
                onValueChange={(value) => {
                  setBrightness(Array.isArray(value) ? (value[0] ?? 50) : Number(value));
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
          <p className="pt-4 font-mc mc-text text-mc-text-dim">声音设置（示例分页）</p>
        </TabsPanel>
        <TabsPanel value="game">
          <RadioGroup
            aria-label="游戏难度"
            className="flex flex-col gap-2 pt-4"
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
    </MenuBackground>
  );
}
