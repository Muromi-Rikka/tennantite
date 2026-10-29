import { ModProgress } from "@tennantite/mods-core";

import { EIO_GRINDING_BALL } from "../eio-metrics";
import { EioSprite } from "../eio-sprite/index";

export interface EioGrindingBallProps {
  durability: number;
  left: number;
  top: number;
}

/**
 * SAG 磨粉机研磨球耐久条（4×16，自下而上）。
 */
export function EioGrindingBall({ durability, left, top }: EioGrindingBallProps) {
  return (
    <ModProgress
      direction="up"
      fill={(
        <EioSprite
          height={EIO_GRINDING_BALL.height}
          name="sprites/screen/sag_mill/grinding_ball_durability"
          width={EIO_GRINDING_BALL.width}
        />
      )}
      height={EIO_GRINDING_BALL.height}
      label="研磨球耐久"
      left={left}
      progress={durability}
      top={top}
      width={EIO_GRINDING_BALL.width}
    />
  );
}
