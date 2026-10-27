import type { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";

export type DialogCloseProps = ComponentProps<typeof BaseDialog.Close>;

export type DialogPopupProps = {
  /**
  * panel 居中窗口面板 / overlay 全屏无底板（暂停 / 死亡界面）
  */
  variant?: "overlay" | "panel";
} & ComponentProps<typeof BaseDialog.Popup>;

export type DialogProps = ComponentProps<typeof BaseDialog.Root>;
