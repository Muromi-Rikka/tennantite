import type { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";

export type DialogCloseProps = ComponentProps<typeof BaseDialog.Close>;

export type DialogPopupProps = ComponentProps<typeof BaseDialog.Popup>;

export type DialogProps = ComponentProps<typeof BaseDialog.Root>;
