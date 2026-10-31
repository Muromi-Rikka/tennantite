import { ModProgress } from "@tennantite/mods-core";

import type { EioProgressLayout } from "../eio-machine-layout";
import { EioSprite } from "../eio-sprite/index";

export interface EioProgressesProps {
  /**
   * 默认无障碍名称（所有条目）
   */
  label: string;
  /**
   * 逐条覆盖标签（与 progresses 同序，优先）
   */
  labels?: string[];
  progress: number;
  progresses: EioProgressLayout[];
  /**
   * 逐条数值覆盖（缺省用 progress）
   */
  values?: number[];
}

/**
 * EIO 进度条列表：逐条按布局裁剪精灵，注入同一个进度值。
 */
export function EioProgresses({
  label,
  labels,
  progress,
  progresses,
  values,
}: EioProgressesProps) {
  return (
    <>
      {progresses.map((entry, index) => (
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 数据模型无稳定 id，列表顺序即身份
        <ModProgress
          direction={entry.direction}
          fill={(
            <EioSprite
              crop={entry.crop}
              height={entry.height}
              name={entry.sprite}
              width={entry.width}
            />
          )}
          height={entry.height}
          key={
            // eslint-disable-next-line react/no-array-index-key -- 数据模型无稳定 id，列表顺序即身份
            `${entry.sprite}-${entry.left}-${entry.top}-${index}`
          }
          label={labels?.[index] ?? label}
          left={entry.left}
          progress={values?.[index] ?? progress}
          top={entry.top}
          width={entry.width}
        />
      ))}
    </>
  );
}
