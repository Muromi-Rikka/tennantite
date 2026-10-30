/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { GuiSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";

export interface NotificationBadgeProps {
  className?: string;
  count: number;
}

export interface ToastProps {
  className?: string;
  description?: ReactNode;
  icon?: GuiSpriteName;
  onClose?: () => void;
  title: ReactNode;
  variant?: ToastVariant;
}

export interface ToastStackProps {
  className?: string;
  toasts: ToastProps[];
}

export type ToastVariant = "advancement" | "now_playing" | "recipe" | "system" | "tutorial";

/**
 * 通知角标（规格 §6.3）：8×8 `notification/1..5|more`。
 */
export function NotificationBadge({ className, count }: NotificationBadgeProps) {
  if (count <= 0)
    return null;
  const name = `sprites/notification/${count > 5 ? "more" : Math.max(1, count)}.png` as GuiSpriteName;
  return <GuiSprite className={className} height={8} name={name} width={8} />;
}

/**
 * 原版 Toast（规格 §6.3）：160×32（system 160×64）背景 + 20×20 图标。
 */
export function Toast({
  className,
  description,
  icon,
  onClose,
  title,
  variant = "advancement",
}: ToastProps) {
  const height = variant === "system" ? 64 : 32;
  return (
    <div
      className={cn("relative", className)}
      data-toast-variant={variant}
      style={{ height: gui(height), width: gui(160) }}
    >
      <GuiSprite
        className="absolute inset-0"
        height={height}
        name={`sprites/toast/${variant}.png` as GuiSpriteName}
        width={160}
      />
      {icon
        ? <GuiSprite className="absolute" height={20} name={icon} style={{ left: gui(8), top: gui(6) }} width={20} />
        : null}
      <div
        className="absolute font-mc mc-text text-mc-text-main mc-text-shadow"
        style={{ left: gui(32), top: gui(6), width: gui(120) }}
      >
        {title}
      </div>
      {description
        ? (
            <div
              className="absolute font-mc mc-text text-mc-text-dim"
              style={{ left: gui(32), top: gui(18), width: gui(120) }}
            >
              {description}
            </div>
          )
        : null}
      {onClose
        ? (
            <button
              aria-label="关闭通知"
              className="absolute cursor-pointer border-0 bg-transparent p-0"
              onClick={onClose}
              style={{ height: gui(15), right: gui(4), top: gui(4), width: gui(15) }}
              type="button"
            >
              <GuiSprite height={15} name="sprites/widget/cross_button.png" width={15} />
            </button>
          )
        : null}
    </div>
  );
}

/**
 * 右上角 Toast 栈（规格 §6.3）。
 */
export function ToastStack({ className, toasts }: ToastStackProps) {
  return (
    <div className={cn("absolute top-4 right-4 flex flex-col gap-4", className)}>
      {toasts.map((toast, index) => (
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 数据模型无稳定 id，列表顺序即身份
        <Toast key={`${toast.title}-${index}`} {...toast} />
      ))}
    </div>
  );
}
