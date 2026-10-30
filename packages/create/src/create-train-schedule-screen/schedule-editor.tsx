import { ModIconButton, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui, PlayerInventory, ScreenItemSlot } from "@tennantite/ui";

import type { CreateTrainScheduleScreenProps } from "./index";
import { CREATE_ATLAS, CREATE_ICONS, CREATE_TRAIN_SCHEDULE } from "../create-metrics";

const createMeta = createSpriteMeta;

export interface ScheduleEditorProps {
  editor: NonNullable<CreateTrainScheduleScreenProps["editor"]>;
  player?: CreateTrainScheduleScreenProps["player"];
}

/**
 * 时刻表编辑浮层：暗化遮罩 + schedule_2 编辑板 + 目标槽 + 选择条 + 删除/确认 + 玩家背包。
 */
export function ScheduleEditor({ editor, player }: ScheduleEditorProps) {
  const layout = CREATE_TRAIN_SCHEDULE;
  const icons = CREATE_ICONS;
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute"
        style={{ background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5))", bottom: 0, left: 0, right: 0, top: 0, zIndex: 200 }}
      />
      <div
        className="absolute"
        style={{ left: gui(layout.editor.panel.left), top: gui(layout.editor.panel.top), zIndex: 201 }}
      >
        <ModSprite
          left={0}
          sprite={createMeta[CREATE_ATLAS.scheduleEditor.atlas]}
          src={CREATE_ATLAS.scheduleEditor}
          top={0}
        />
      </div>
      <div
        className="absolute text-center font-mc mc-text mc-text-shadow"
        style={{ color: "#505050", left: 0, top: gui(layout.editor.title.top), width: gui(layout.width - 8), zIndex: 202 }}
      >
        {editor.kind === "condition" ? "编辑条件" : "编辑指令"}
      </div>
      {editor.slots?.length
        ? Array.from(editor.slots, (slot, index) => (
            <div
              className="absolute"
              key={`editor-slot-${index}`}
              style={{
                left: gui(layout.editor.slots.left + index * layout.editor.slots.step),
                top: gui(layout.editor.slots.top),
                zIndex: 202,
              }}
            >
              <ModSprite
                left={0}
                sprite={createMeta[CREATE_ATLAS.scheduleEditorAdditionalSlot.atlas]}
                src={CREATE_ATLAS.scheduleEditorAdditionalSlot}
                top={0}
              />
              {slot
                ? (
                    <div
                      className="absolute"
                      style={{ left: gui(1), top: gui(1), zIndex: 203 }}
                    >
                      <ScreenItemSlot frame={false} item={slot} label={`editor-slot-${index}`} left={0} size={16} top={0} />
                    </div>
                  )
                : null}
            </div>
          ))
        : (
            <div
              className="absolute"
              style={{ left: gui(layout.editor.slots.left), top: gui(layout.editor.slots.top), zIndex: 202 }}
            >
              <ModSprite
                left={0}
                sprite={createMeta[CREATE_ATLAS.scheduleEditorInactiveSlot.atlas]}
                src={CREATE_ATLAS.scheduleEditorInactiveSlot}
                top={0}
              />
            </div>
          )}
      <div
        className="absolute text-center font-mc mc-text mc-text-shadow"
        style={{
          color: "#4a2d31",
          height: gui(16),
          left: gui(layout.editor.select.left),
          lineHeight: gui(16),
          top: gui(layout.editor.select.top),
          width: gui(layout.editor.select.width),
          zIndex: 202,
        }}
      >
        {editor.typeLabel}
      </div>
      {editor.allowDelete
        ? (
            <div className="absolute" style={{ left: gui(layout.editor.delete.left), top: gui(layout.editor.delete.top), zIndex: 202 }}>
              <ModIconButton
                buttonClassName="bg-transparent"
                height={18}
                icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.trash.x, y: icons.trash.y }} />}
                label="删除"
                onClick={editor.onDelete}
                width={18}
              />
            </div>
          )
        : null}
      <div className="absolute" style={{ left: gui(layout.editor.confirm.left), top: gui(layout.editor.confirm.top), zIndex: 202 }}>
        <ModIconButton
          buttonClassName="bg-transparent"
          height={18}
          icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.confirm.x, y: icons.confirm.y }} />}
          label="确认编辑"
          onClick={editor.onConfirm}
          width={18}
        />
      </div>
      <div
        className="absolute"
        style={{ left: gui(layout.editor.player.left + 8), top: gui(layout.editor.player.top + 18), zIndex: 202 }}
      >
        <PlayerInventory
          hotbarItems={player?.hotbarItems}
          hotbarY={58}
          mainItems={player?.mainItems}
          y={0}
        />
      </div>
    </>
  );
}
