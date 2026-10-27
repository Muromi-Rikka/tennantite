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
 * 死亡界面（规格 §6.3）：全屏暗红遮罩 + 白色标题 + 200×20 按钮栈。
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
        <DialogTrigger render={<Button className="w-200" />}>
          {triggerLabel}
        </DialogTrigger>
        <DialogPopup className="bg-red-950/50" variant="overlay">
          <DialogTitle className="text-white">{cause}</DialogTitle>
          {details
            ? (
                <p className="font-mc mc-text text-mc-text-main mc-text-shadow">
                  {details}
                </p>
              )
            : null}
          <div className="flex flex-col items-center gap-4">
            <Button
              className="w-200"
              onClick={() => {
                onOpenChange?.(false);
                onRespawn?.();
              }}
            >
              {respawnLabel}
            </Button>
            <DialogTrigger
              onClick={onTitleScreen}
              render={<Button className="w-200" />}
            >
              {titleScreenLabel}
            </DialogTrigger>
          </div>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
