"use client";

import {
  Dialog,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../../primitives/dialog/index";
import { Button } from "../../../primitives/button/index";
import { cn } from "../../../lib/utils";

export interface DeathScreenProps {
  /** 死亡原因标题 */
  cause?: React.ReactNode;
  /** 统计信息（如分数） */
  details?: React.ReactNode;
  respawnLabel?: string;
  onRespawn?: () => void;
  titleScreenLabel?: string;
  onTitleScreen?: () => void;
  /** 受控开关（可选） */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
  className?: string;
}

/** 死亡界面（规格 §6.3）：Dialog + 红色标题 + 按钮栈。 */
export function DeathScreen({
  cause = "你死了！",
  details,
  respawnLabel = "重生",
  onRespawn,
  titleScreenLabel = "回到标题界面",
  onTitleScreen,
  open,
  onOpenChange,
  triggerLabel = "模拟死亡",
  className,
}: DeathScreenProps) {
  return (
    <div className={cn(className)} data-menu="">
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogTrigger render={<Button variant="ghost" />}>
          {triggerLabel}
        </DialogTrigger>
        <DialogPopup className="w-320 bg-black/80 text-center">
          <DialogTitle className="text-mc-heart">{cause}</DialogTitle>
          {details ? (
            <p className="mt-8 font-readable text-mc">{details}</p>
          ) : null}
          <div className="mt-24 flex flex-col gap-8">
            <Button
              className="w-240"
              onClick={() => {
                onOpenChange?.(false);
                onRespawn?.();
              }}
              variant="success"
            >
              {respawnLabel}
            </Button>
            <DialogTrigger
              onClick={onTitleScreen}
              render={<Button className="w-240" variant="ghost" />}
            >
              {titleScreenLabel}
            </DialogTrigger>
          </div>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
