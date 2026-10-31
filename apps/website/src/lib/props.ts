import type { PropDoc } from "./props-types";
import { containersProps } from "./props.containers";
import { primitivesProps } from "./props.primitives";

/**
 * 核心组件（catalog 的 primitives + containers 组）的 props 文档数据，
 * 逐条抄录自 packages/ui/src 源码中的 `*Props` interface。
 */
export const componentProps: Record<string, PropDoc[]> = {
  ...containersProps,
  ...primitivesProps,
};

export { type PropDoc } from "./props-types";
