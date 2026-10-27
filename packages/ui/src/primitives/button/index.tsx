import { Button as BaseButton } from "@base-ui/react/button";

import type { ButtonProps as ButtonProperties } from "./types";
import { buttonClassName } from "./styles";

export type { ButtonProps, ButtonVariant } from "./types";

/**
 * MC 石纹按钮（规格 §4 #1）：原版 20 GUI px 高。
 * 悬浮 / 聚焦 / 禁用态由 textures.css 伪类切换，无 JS 状态，SSR 安全。
 */
export function Button({ className, variant, ...properties }: ButtonProperties) {
  return (
    <BaseButton
      className={buttonClassName({ className, variant })}
      type="button"
      {...properties}
    />
  );
}
