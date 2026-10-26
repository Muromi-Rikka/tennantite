"use client";

import { cn } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import {
  Dialog,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../../primitives/dialog/index";

export interface DeathScreenProps {
  /**
  * 死亡原因标题
  */
  cause?: React.ReactNode;
  className?: string;
  /**
  * 统计信息（如分数）
  */
  details?: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  onRespawn?: () => void;
  onTitleScreen?: () => void;
  /**
  * 受控开关（可选）
  */
  open?: boolean;
  respawnLabel?: string;
  titleScreenLabel?: string;
  triggerLabel?: string;
}

/**
 * 死亡界面（规格 §6.3）：Dialog + 红色标题 + 按钮栈。
*/
export function DeathScreen({
  cause = "你死了！",
  className,
  details,
  onOpenChange,
  onRespawn,
  onTitleScreen,
  open: isOpen,
  respawnLabel = "重生",
  titleScreenLabel = "回到标题界面",
  triggerLabel = "模拟死亡",
}: DeathScreenProps) {
  return (
    <div className={cn(className)} data-menu="">
      <Dialog onOpenChange={onOpenChange} open={isOpen}>
        <DialogTrigger render={<Button variant="ghost" />}>
          {triggerLabel}
        </DialogTrigger>
        <DialogPopup className="w-320 bg-black/80 text-center">
          <DialogTitle className="text-mc-heart">{cause}</DialogTitle>
          {details
            ? (
                <p className="mt-8 font-readable text-mc">{details}</p>
              )
            : null}
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
