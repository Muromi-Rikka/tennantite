import type { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";

export type DialogCloseProps = ComponentProps<typeof BaseDialog.Close>;

export type DialogPopupProps = ComponentProps<typeof BaseDialog.Popup> & {
  /**
  * panel 居中窗口面板 / overlay 全屏无底板（暂停 / 死亡界面）
  */
  variant?: "overlay" | "panel";
};

export type DialogProps = ComponentProps<typeof BaseDialog.Root>;
