import type { ComponentProps } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type {
  DialogCloseProps as DialogCloseProperties,
  DialogPopupProps as DialogPopupProperties,
  DialogProps as DialogProperties,
} from "./types";

import { GuiSprite } from "../../containers/gui-sprite/index";
import { cn } from "../../lib/utils";

export type {
  DialogCloseProps,
  DialogPopupProps,
  DialogProps,
} from "./types";

/**
 * MC 模态弹窗（规格 §4 #9）：半透明底 + 原版 popup 背景。
 */
export function Dialog(properties: DialogProperties) {
  return <BaseDialog.Root {...properties} />;
}

export function DialogBackdrop({
  className,
  ...properties
}: ComponentProps<typeof BaseDialog.Backdrop>) {
  return (
    <BaseDialog.Backdrop
      className={cn("fixed inset-0 z-40 bg-mc-panel-overlay", className)}
      {...properties}
    />
  );
}

export function DialogClose({ className, ...properties }: DialogCloseProperties) {
  return (
    <BaseDialog.Close
      className={cn(
        "cursor-pointer font-mc mc-text text-mc-text-dim hover:text-mc-text-main",
        className,
      )}
      {...properties}
    />
  );
}

export function DialogDescription({
  className,
  ...properties
}: ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      className={cn("font-mc mc-text text-mc-text-dim", className)}
      {...properties}
    />
  );
}

export function DialogPopup({
  children,
  className,
  variant = "panel",
  ...properties
}: DialogPopupProperties) {
  return (
    <BaseDialog.Portal>
      <DialogBackdrop />
      <BaseDialog.Popup
        className={cn(
          "z-50 text-mc-text-main outline-none",
          variant === "panel"
            ? "fixed top-1/2 left-1/2 w-176 max-w-[calc(100vw-4*var(--mc-gui))] -translate-1/2 p-6"
            : "fixed inset-0 flex flex-col items-center justify-center gap-4 bg-transparent p-0",
          className,
        )}
        {...properties}
      >
        {variant === "panel"
          ? (
              <GuiSprite
                className="absolute inset-0"
                name="sprites/popup/background.png"
                slice={5}
                style={{ height: "100%", width: "100%" }}
              />
            )
          : null}
        <div className="relative">{children}</div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogTitle({
  className,
  ...properties
}: ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={cn(
        "font-mc mc-text text-mc-text-main mc-text-shadow",
        className,
      )}
      {...properties}
    />
  );
}

export function DialogTrigger({
  className,
  ...properties
}: ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger className={cn("cursor-pointer", className)} {...properties} />;
}
