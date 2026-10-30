import type { ScreenSlot } from "@tennantite/ui";

import { ModIconButton, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui, ScreenItemSlot } from "@tennantite/ui";

import { CREATE_ATLAS, CREATE_ICONS, CREATE_STATION_SPRITES, CREATE_TRAIN_STATION } from "../create-metrics";
import { CreateWindow } from "../create-window/index";

export interface CreateTrainStationScreenProps {
  className?: string;
  /**
   * 组装模式说明文字行（上游 station.how_to* 三段）
   */
  howTo?: string[];
  /**
   * 图标类型选择条文字（组装模式，纯展示）
   */
  iconTypeLabel?: string;
  /**
   * 空闲提示文字（上游 "station.idle"）
   */
  idleText?: string;
  /**
   * idle：空闲/站名编辑界面（STATION 200×127）；
   * assembling：列车组装界面（STATION_ASSEMBLING 200×178）
   */
  mode?: "assembling" | "idle";
  onAssembleToggle?: () => void;
  onConfirm?: () => void;
  onDisassemble?: () => void;
  onDropSchedule?: () => void;
  onNewTrain?: () => void;
  onQuitAssembly?: () => void;
  /**
   * 站名（顶部居中，组装模式下作题头）
   */
  stationName?: string;
  /**
   * 组装模式状态文字（ Bogey 数量/异常等）
   */
  statusText?: string;
  /**
   * 停靠列车（提供时进入列车停靠态：车名 + 文字框 + 对话泡）
   */
  train?: {
    /**
     * 车厢门物品展示（上游固定渲染列车门物品）
     */
    door?: ScreenSlot;
    name: string;
  };
}

/**
 * Create 列车站台界面（`StationScreen` / `AssemblyScreen` 视觉复刻）：
 * idle 模式为 STATION 背板（站名/车名编辑行 + 新建/拆解/丢下时刻表按钮 +
 * 确认 + 列车停靠时的文字框与对话泡）；assembling 模式为 STATION_ASSEMBLING
 * 背板（图标选择条 + 开始组装/退出/关闭 + 状态与说明文字）。
 * 数据注入、无组装逻辑；上游的车厢图标条带与 3D 车厢渲染省略。
 */
export function CreateTrainStationScreen({
  className,
  howTo,
  iconTypeLabel,
  idleText = "空闲",
  mode = "idle",
  onAssembleToggle,
  onConfirm,
  onDisassemble,
  onDropSchedule,
  onNewTrain,
  onQuitAssembly,
  stationName = "",
  statusText,
  train,
}: CreateTrainStationScreenProps) {
  const layout = CREATE_TRAIN_STATION;
  const icons = CREATE_ICONS;
  const sprites = CREATE_STATION_SPRITES;
  const isAssembling = mode === "assembling";
  const background = isAssembling ? CREATE_ATLAS.stationAssembling : CREATE_ATLAS.station;
  const height = background.height;
  return (
    <CreateWindow
      background={<ModSprite left={0} sprite={createSpriteMeta[background.atlas]} src={background} top={0} />}
      className={className}
      height={height}
      player={false}
      width={background.width}
    >
      {isAssembling
        ? (
            <>
              <div
                className="absolute text-center font-mc mc-text mc-text-shadow"
                style={{ color: "#0e2233", left: 0, top: gui(4), width: gui(background.width) }}
              >
                {stationName}
              </div>
              <div
                className="absolute text-center font-mc mc-text mc-text-shadow"
                style={{
                  color: "#4a2d31",
                  height: gui(14),
                  left: gui(layout.assembling.iconType.left),
                  lineHeight: gui(14),
                  top: gui(layout.assembling.iconType.top),
                  width: gui(layout.assembling.iconType.width),
                }}
              >
                {iconTypeLabel}
              </div>
              {statusText
                ? (
                    <div
                      className="absolute text-center font-mc mc-text mc-text-shadow"
                      style={{ color: "#7a7a7a", left: 0, top: gui(layout.assembling.status.top), width: gui(background.width) }}
                    >
                      {statusText}
                    </div>
                  )
                : null}
              {Array.from(howTo ?? [], (line, index) => (
                <div
                  className="absolute font-mc mc-text"
                  key={`howto-${index}`}
                  style={{
                    color: "#7a7a7a",
                    left: gui(layout.assembling.howTo.left),
                    top: gui(layout.assembling.howTo.top + index * 32),
                    width: gui(layout.assembling.howTo.width),
                  }}
                >
                  {line}
                </div>
              ))}
              <ModIconButton
                buttonClassName="bg-transparent"
                height={18}
                icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.priorityVeryLow.x, y: icons.priorityVeryLow.y }} />}
                label="关闭"
                left={layout.assembling.buttons.close.left}
                onClick={onConfirm}
                top={layout.assembling.buttons.close.top}
                width={18}
              />
              <ModIconButton
                buttonClassName="bg-transparent"
                height={18}
                icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.disable.x, y: icons.disable.y }} />}
                label="退出组装"
                left={layout.assembling.buttons.quit.left}
                onClick={onQuitAssembly}
                top={layout.assembling.buttons.quit.top}
                width={18}
              />
              <ModIconButton
                buttonClassName="bg-transparent"
                height={16}
                icon={<ModSprite sprite={createSpriteMeta["schedule-2"]} src={sprites.assembleTrain} />}
                iconSize={24}
                label="开始组装"
                left={layout.assembling.buttons.toggle.left}
                onClick={onAssembleToggle}
                top={layout.assembling.buttons.toggle.top}
                width={24}
              />
            </>
          )
        : (
            <>
              <div className="absolute flex items-center justify-center" style={{ height: gui(14), left: 0, top: gui(0), width: gui(background.width) }}>
                <span className="font-mc mc-text" style={{ color: "#592424" }}>{stationName}</span>
                {train
                  ? null
                  : (
                      <span className="inline-block" style={{ marginLeft: gui(5) }}>
                        <ModSprite sprite={createSpriteMeta["schedule-2"]} src={sprites.editName} />
                      </span>
                    )}
              </div>
              <ModIconButton
                buttonClassName="bg-transparent"
                height={18}
                icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.confirm.x, y: icons.confirm.y }} />}
                label="确认"
                left={layout.idle.buttons.confirm.left}
                onClick={onConfirm}
                top={layout.idle.buttons.confirm.top}
                width={18}
              />
              {train
                ? (
                    <>
                      <div className="absolute flex items-center justify-center" style={{ height: gui(14), left: 0, top: gui(44), width: gui(background.width) }}>
                        <span className="font-mc mc-text" style={{ color: "#c6c6c6" }}>{train.name}</span>
                        <span className="inline-block" style={{ marginLeft: gui(5) }}>
                          <ModSprite sprite={createSpriteMeta["schedule-2"]} src={sprites.editTrainName} />
                        </span>
                      </div>
                      <ModSprite
                        left={layout.idle.textbox.left}
                        sprite={createSpriteMeta[CREATE_ATLAS.stationTextboxTop.atlas]}
                        src={CREATE_ATLAS.stationTextboxTop}
                        top={layout.idle.textbox.top}
                      />
                      <div
                        className="absolute"
                        style={{
                          background: "var(--mc-create-assemble)",
                          backgroundPosition: `${gui(-CREATE_ATLAS.stationTextboxMiddle.x)} ${gui(-CREATE_ATLAS.stationTextboxMiddle.y * 26)}`,
                          backgroundSize: `${gui(256)} ${gui(256 * 26)}`,
                          height: gui(layout.idle.textbox.middle.height),
                          imageRendering: "pixelated",
                          left: gui(layout.idle.textbox.left),
                          top: gui(layout.idle.textbox.middle.top),
                          width: gui(150),
                        }}
                      />
                      <ModSprite
                        left={layout.idle.textbox.left}
                        sprite={createSpriteMeta[CREATE_ATLAS.stationTextboxBottom.atlas]}
                        src={CREATE_ATLAS.stationTextboxBottom}
                        top={layout.idle.textbox.bottom.top}
                      />
                      <ModSprite
                        left={layout.idle.textbox.speechX}
                        sprite={createSpriteMeta[CREATE_ATLAS.stationTextboxSpeech.atlas]}
                        src={CREATE_ATLAS.stationTextboxSpeech}
                        top={38}
                      />
                      <ModIconButton
                        buttonClassName="bg-transparent"
                        height={18}
                        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.viewSchedule.x, y: icons.viewSchedule.y }} />}
                        label="丢下时刻表"
                        left={layout.idle.buttons.dropSchedule.left}
                        onClick={onDropSchedule}
                        top={layout.idle.buttons.dropSchedule.top}
                        width={18}
                      />
                      <ModIconButton
                        buttonClassName="bg-transparent"
                        height={16}
                        icon={<ModSprite sprite={createSpriteMeta["schedule-2"]} src={sprites.disassembleTrain} />}
                        iconSize={24}
                        label="拆解列车"
                        left={layout.idle.buttons.disassemble.left}
                        onClick={onDisassemble}
                        top={layout.idle.buttons.disassemble.top}
                        width={24}
                      />
                    </>
                  )
                : (
                    <>
                      <div
                        className="absolute text-center font-mc mc-text mc-text-shadow"
                        style={{ color: "#7a7a7a", left: 0, top: gui(layout.idle.idleText.top), width: gui(background.width) }}
                      >
                        {idleText}
                      </div>
                      <ModIconButton
                        buttonClassName="bg-transparent"
                        height={18}
                        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.viewSchedule.x, y: icons.viewSchedule.y }} />}
                        label="丢下时刻表"
                        left={layout.idle.buttons.dropSchedule.left}
                        onClick={onDropSchedule}
                        top={layout.idle.buttons.dropSchedule.top}
                        width={18}
                      />
                      <ModIconButton
                        buttonClassName="bg-transparent"
                        height={16}
                        icon={<ModSprite sprite={createSpriteMeta["schedule-2"]} src={sprites.newTrain} />}
                        iconSize={24}
                        label="新建列车"
                        left={layout.idle.buttons.newTrain.left}
                        onClick={onNewTrain}
                        top={layout.idle.buttons.newTrain.top}
                        width={24}
                      />
                    </>
                  )}
              {train?.door
                ? (
                    <div className="absolute" style={{ left: gui(layout.idle.door.left), top: gui(layout.idle.door.top) }}>
                      <ScreenItemSlot frame={false} item={train.door} label="door" left={0} size={16} top={0} />
                    </div>
                  )
                : null}
            </>
          )}
    </CreateWindow>
  );
}
