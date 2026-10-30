import type { ReactNode } from "react";
import { ModScrollbar, ModSprite } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, ScreenPanel } from "@tennantite/ui";
import { AE2_CPU_SELECTOR } from "../ae2-layout";

export interface Ae2CraftingCpuOption {
  /**
  * 状态明细（如 “存储: 2,034 · 合成中: 64”）
  */
  detail?: string;
  id: string;
  /**
  * CPU 名称（超长由宿主截断）
  */
  name: string;
}

export interface Ae2PatternAccessTerminalScreenProps {
  className?: string;
  /**
  * CPU 列表（渲染层截断为 6 行）
  */
  cpus?: Ae2CraftingCpuOption[];
  onCpuClick?: (id: string) => void;
  /**
  * 列表滚动 0..1
  */
  scroll?: number;
  selectedId?: string;
  title?: ReactNode;
}

const VISIBLE_ROWS = 6;

/**
 * 样式访问终端 CPU 选择表（AE2 视觉复刻）：`cpu_selector.png` 的 94×164
 * 列表面板（header 18 + 6 行 67×23 + 右侧 12 宽滚动条轨道）。
 * 上游 1.12 rv6 该贴图由 `GuiCraftingStatus` 使用（CPU_TABLE_* 常量），
 * 行块底图取 src (100,0,67,23)——选中行着青蓝色、悬停行着浅蓝；
 * 此处作为独立展示组件，数据注入。
 */
export function Ae2PatternAccessTerminalScreen({
  className,
  cpus,
  onCpuClick,
  scroll = 0,
  selectedId,
  title = "合成 CPU",
}: Ae2PatternAccessTerminalScreenProps) {
  const { height, row, rowHighlight, scrollbar, width } = AE2_CPU_SELECTOR;
  const visible = Array.from({ length: VISIBLE_ROWS }, (_, index) => cpus?.[index]);

  return (
    <div className={cn("relative inline-block", className)}>
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={width}>
        <ModSprite
          height={height}
          left={0}
          sprite={ae2SpriteMeta.cpuSelector}
          src={{ height, width, x: 0, y: 0 }}
          top={0}
        />
        <span
          className="absolute font-mc text-mc-ae2-text"
          style={{
            fontSize: "calc(var(--mc-gui) * 5.4)",
            left: gui(5),
            lineHeight: "calc(var(--mc-gui) * 9)",
            top: gui(4),
          }}
        >
          {title}
        </span>
        {visible.map((cpu, index) => {
          if (!cpu) {
            return null;
          }
          const top = row.top + index * row.height;
          const isSelected = cpu.id === selectedId;
          return (
            <button
              aria-label={cpu.name}
              aria-pressed={isSelected}
              className="group absolute cursor-pointer border-0 bg-transparent p-0"
              key={cpu.id}
              onClick={onCpuClick ? () => onCpuClick(cpu.id) : undefined}
              style={{
                height: gui(row.height),
                left: gui(row.left),
                top: gui(top),
                width: gui(row.width),
              }}
              title={cpu.name}
              type="button"
            >
              {isSelected
                ? (
                    <ModSprite
                      className="opacity-100 group-hover:opacity-100"
                      left={0}
                      sprite={ae2SpriteMeta.cpuSelector}
                      src={rowHighlight}
                      top={0}
                    />
                  )
                : (
                    <ModSprite
                      className="opacity-0 group-hover:opacity-100"
                      left={0}
                      sprite={ae2SpriteMeta.cpuSelector}
                      src={rowHighlight}
                      top={0}
                    />
                  )}
              <span
                className="pointer-events-none absolute font-mc text-mc-ae2-text"
                style={{
                  fontSize: "calc(var(--mc-gui) * 5.4)",
                  left: gui(3),
                  lineHeight: "calc(var(--mc-gui) * 9)",
                  top: gui(3),
                }}
              >
                {cpu.name}
              </span>
              {cpu.detail
                ? (
                    <span
                      className="pointer-events-none absolute font-mc text-mc-ae2-text"
                      style={{
                        fontSize: "calc(var(--mc-gui) * 5.4)",
                        left: gui(3),
                        lineHeight: "calc(var(--mc-gui) * 9)",
                        top: gui(11),
                      }}
                    >
                      {cpu.detail}
                    </span>
                  )
                : null}
            </button>
          );
        })}
        <ModScrollbar
          height={scrollbar.height}
          left={scrollbar.left}
          top={scrollbar.top}
          track={false}
          value={scroll}
        />
      </ScreenPanel>
    </div>
  );
}
