import type { ComponentProps } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type {
  DialogCloseProps as DialogCloseProperties,
  DialogPopupProps as DialogPopupProperties,
  DialogProps as DialogProperties,
} from "./types";

import { cn } from "../../lib/utils";

export type {
  DialogCloseProps,
  DialogPopupProps,
  DialogProps,
} from "./types";

/**
 * MC 模态弹窗（规格 §4 #9）：半透明底 + 暗面板，用于暂停菜单 / 确认框。
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
        "cursor-pointer font-readable text-mc text-mc-text-dim hover:text-mc-text-main",
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
      className={cn("font-readable text-mc text-mc-text-dim", className)}
      {...properties}
    />
  );
}

export function DialogPopup({
  children,
  className,
  ...properties
}: DialogPopupProperties) {
  return (
    <BaseDialog.Portal>
      <DialogBackdrop />
      <BaseDialog.Popup
        className={cn(
          "mc-tex-panel-dark fixed top-1/2 left-1/2 z-50 w-400 -translate-1/2 p-24",
          "text-mc-text-main outline-none",
          className,
        )}
        {...properties}
      >
        {children}
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
        "font-pixel text-mc-pixel text-mc-text-main mc-text-shadow",
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
