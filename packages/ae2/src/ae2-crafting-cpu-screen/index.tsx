import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModProgress, ModScrollbar, ModSprite, ModTitle } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { Fragment } from "react";
import { AE2_CRAFTING_CPU } from "../ae2-layout";
import { Ae2Text } from "../ae2-text/index";

export interface Ae2CraftingCpuScreenProps {
  className?: string;
  /**
  * 预计剩余时间文案（追加在标题后，如 “- 3分12秒”）
  */
  eta?: string;
  /**
  * 任务列表（渲染层截断为 3×6 = 18 个区块）
  */
  jobs?: Ae2CraftingJob[];
  /**
  * 取消当前任务
  */
  onCancel?: () => void;
  /**
  * 合成进度 0..1
  */
  progress?: number;
  title?: ReactNode;
}

export interface Ae2CraftingJob {
  /**
  * 状态明细（如 “已存储: 64 / 合成中: 4”）；`" / "` 分隔的多段状态
  * 逐行右对齐渲染在图标左侧的文字区内
  */
  detail?: string;
  icon?: ScreenSlot;
  id: string;
}

const VISIBLE_JOBS = 18;
const DETAIL_SEPARATOR = " / ";

/**
 * 合成 CPU 监控界面（AE2 视觉复刻）：`craftingcpu.png` 238×184 面板，
 * 3 列 × 6 行任务区块（67×23/格，物品图标位于区块右下 (57+68x, 22+23y)）、
 * 右侧滚动条与右下取消按钮（163,159,50×20）全部来自贴图；区块行分隔由
 * `GuiCraftingCPU` 布局常量（SECTION_LENGTH 67、offY 23）给出。
 * 底部条带按计划约定叠加一条 ModProgress 合成进度（贴图未烘焙进度轨）。
 */
export function Ae2CraftingCpuScreen({
  className,
  eta,
  jobs,
  onCancel,
  progress = 0,
  title = "合成状态",
}: Ae2CraftingCpuScreenProps) {
  const {
    cancel,
    height,
    progress: bar,
    scrollbar,
    sections,
    title: titlePos,
    width,
  } = AE2_CRAFTING_CPU;
  const visibleJobs = Array.from({ length: VISIBLE_JOBS }, (_, index) => jobs?.[index]);

  return (
    <div className={cn("relative inline-block", className)}>
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={width}>
        <ModSprite
          height={height}
          left={0}
          sprite={ae2SpriteMeta.craftingcpu}
          src={{ height, width, x: 0, y: 0 }}
          top={0}
        />
        <ModTitle left={titlePos.left} top={titlePos.top}>
          {eta ? `${title} - ${eta}` : title}
        </ModTitle>
        {visibleJobs.map((job, index) => {
          if (!job) {
            return null;
          }
          const column = index % sections.columns;
          const row = Math.floor(index / sections.columns);
          const offset = column * (sections.sectionWidth + 1);
          const iconLeft = sections.firstIconLeft + offset;
          const iconTop = sections.firstIconTop + row * sections.rowHeight;
          const lines = job.detail ? jobDetailLines(job.detail) : [];
          return (
            <Fragment key={job.id}>
              <ScreenItemSlot
                frame={false}
                item={job.icon}
                label={`cpu-job-${job.id}`}
                left={iconLeft}
                size={sections.iconSize}
                top={iconTop}
              />
              {lines.length > 0
                ? (
                    <div
                      className="absolute flex flex-col items-end justify-center overflow-hidden"
                      style={{
                        height: gui(sections.rowHeight - 1),
                        left: gui(sections.left + offset),
                        top: gui(sections.textTop + row * sections.rowHeight),
                        width: gui(sections.textWidth),
                      }}
                    >
                      {lines.map(line => (
                        <Ae2Text inline key={line} lineHeight={6}>
                          {line}
                        </Ae2Text>
                      ))}
                    </div>
                  )
                : null}
            </Fragment>
          );
        })}
        <ModProgress
          direction="right"
          fill={<div className="size-full bg-emerald-600" />}
          height={bar.height}
          inset={3}
          label="合成进度"
          left={bar.left}
          progress={progress}
          top={bar.top}
          trackClassName="mc-tex-btn"
          width={bar.width}
        />
        <button
          aria-label="取消合成"
          className={cn(
            "mc-tex-btn absolute flex items-center justify-center border-0 p-0 font-mc mc-text",
            onCancel ? "cursor-pointer" : "cursor-default",
          )}
          disabled={!onCancel}
          onClick={onCancel}
          style={{
            height: gui(cancel.height),
            left: gui(cancel.left),
            top: gui(cancel.top),
            width: gui(cancel.width),
          }}
          type="button"
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none mc-text-shadow",
              onCancel ? "text-mc-text-main" : "text-mc-text-disabled",
            )}
          >
            取消
          </span>
        </button>
        <ModScrollbar
          height={scrollbar.height}
          left={scrollbar.left}
          top={scrollbar.top}
          track
        />
      </ScreenPanel>
    </div>
  );
}

function jobDetailLines(detail: string): string[] {
  return detail
    .split(DETAIL_SEPARATOR)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
