import type { ScreenSlot } from "@tennantite/ui";

import { ModProgress } from "@tennantite/mods-core";
import { gui } from "@tennantite/ui";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

export interface IeChunkLoaderScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 周边区块源列表（GuiReactiveList 6,52,100,86，显示字符串）
   */
  entries?: string[];
  onSlotClick?: (label: string) => void;
  /**
   * 纸张槽（区块加载卡）
   */
  paper?: ScreenSlot;
  /**
   * 刷新计时 0..1（RefreshInfoArea：计时/1200s，自下而上填充）
   */
  refresh?: number;
}

/**
 * 区块加载机（ChunkLoaderScreen）：纸张槽 + 反应式列表 + 竖向能量条 +
 * 刷新条（背景贴图 (176,75,2,16) 区域自下而上填充）。
 */
export function IeChunkLoaderScreen({
  className,
  energy,
  entries = [],
  onSlotClick,
  paper,
  refresh = 0,
}: IeChunkLoaderScreenProps) {
  const layout = IE_MACHINES.chunkLoader;
  const slots = ieExpandSlots(layout);
  return (
    <IeMachineScreen
      background={layout.background}
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      {energy
        ? (
            <IeEnergyBar
              label="区块加载机能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      <ModProgress
        direction="up"
        fill={(
          <IeSprite
            name={layout.background!}
            src={layout.refresh.crop}
          />
        )}
        height={layout.refresh.height}
        label="区块加载机刷新"
        left={layout.refresh.left}
        progress={refresh}
        top={layout.refresh.top}
        width={layout.refresh.width}
      />
      <ul
        aria-label="周边区块源列表"
        data-ie-reactive-list=""
        style={{
          color: "#918d85",
          fontFamily: "inherit",
          height: gui(86),
          left: gui(6),
          overflow: "hidden",
          paddingBottom: gui(6),
          paddingLeft: gui(6),
          position: "absolute",
          top: gui(52),
          width: gui(100),
        }}
      >
        {Array.from(entries, (entry, index) => (
          <li
            key={`${index}-${entry}`}
            style={{ fontSize: gui(6), height: gui(10), lineHeight: `${gui(10)}`, listStyle: "none", overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {entry}
          </li>
        ))}
      </ul>
      <IeLayoutSlots
        items={{ "chunk-loader-paper": paper }}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </IeMachineScreen>
  );
}
