import type { Ae2SpriteName } from "@tennantite/textures";
import { ae2SpriteMeta } from "@tennantite/textures";

import { ModSprite } from "@tennantite/mods-core";

export interface Ae2PanelBackgroundProps {
  /**
  * AE2 贴图名（`terminal` / `crafting`）
  */
  name: Ae2SpriteName;
  /**
  * 物品网格行数（≥2）
  */
  rows: number;
  /**
  * 五段切片矩形
  */
  slices: Ae2PanelSlices;
}

/**
 * 终端贴图五段切片（源 PNG px）
*/
export interface Ae2PanelSlices {
  bottom: { height: number; y: number };
  firstRow: { height: number; y: number };
  header: { height: number; y: number };
  lastRow: { height: number; y: number };
  row: { height: number; y: number };
}

const PANEL_WIDTH = 195;

/**
 * AE2 终端面板背景：把 header / firstRow / row×(rows-2) / lastRow / bottom
 * 按纵向顺序拼接成完整窗口；槽框、滚动条轨道、合成区与背包都由贴图烘焙。
 */
export function Ae2PanelBackground({
  name,
  rows,
  slices,
}: Ae2PanelBackgroundProps) {
  const rowCount = Math.max(2, Math.floor(rows));
  const lastRowTop = slices.header.height + (rowCount - 1) * slices.row.height;

  return (
    <>
      <ModSprite left={0} sprite={ae2SpriteMeta[name]} src={strip(slices.header)} top={0} />
      <ModSprite left={0} sprite={ae2SpriteMeta[name]} src={strip(slices.firstRow)} top={slices.header.height} />
      {Array.from({ length: Math.max(0, rowCount - 2) }, (_, index) => (
        <ModSprite
          key={index}
          left={0}
          sprite={ae2SpriteMeta[name]}
          src={strip(slices.row)}
          top={slices.header.height + slices.firstRow.height + index * slices.row.height}
        />
      ))}
      <ModSprite left={0} sprite={ae2SpriteMeta[name]} src={strip(slices.lastRow)} top={lastRowTop} />
      <ModSprite
        left={0}
        sprite={ae2SpriteMeta[name]}
        src={strip(slices.bottom)}
        top={lastRowTop + slices.lastRow.height}
      />
    </>
  );
}

function strip(slice: { height: number; y: number }) {
  return {
    height: slice.height,
    width: PANEL_WIDTH,
    x: 0,
    y: slice.y,
  };
}
