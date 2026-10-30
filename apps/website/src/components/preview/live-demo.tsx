import type { ComponentType } from "react";
import { useAnimationFrame } from "motion/react";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";

import type { LiveSpec } from "./live-specs";
import { TICK_MS } from "./live-specs";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * 按 `TICK_MS` 把时间换成 tick 数，再交给 `spec.props` 得到 demo 的覆盖 props。
 * 首帧 tick = 0，SSR 与 hydration 输出一致；`prefers-reduced-motion: reduce` 时
 * 不挂载动画、直接渲染 demo 默认值。
 */
export function LiveDemo({ Component, spec }: { Component: ComponentType; spec: LiveSpec }) {
  const isReducedMotion = useIsReducedMotion();
  const [tick, setTick] = useState(0);
  const lastTick = useRef(-1);

  const onFrame = useCallback((elapsed: number) => {
    if (isReducedMotion) {
      return;
    }
    const next = Math.floor(elapsed / TICK_MS);
    if (next === lastTick.current) {
      return;
    }
    lastTick.current = next;
    setTick(next);
  }, [isReducedMotion]);
  useAnimationFrame(onFrame);

  return <Component {...(isReducedMotion ? {} : spec.props(tick))} />;
}

function isReducedMotion(): boolean {
  return typeof matchMedia === "function" && matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * 服务端渲染与 hydration 首帧固定 false，水合后按浏览器实际偏好切换（规格 §1.1）。
 */
function isReducedMotionServer(): boolean {
  return false;
}

function subscribeToReducedMotion(onChange: () => void): () => void {
  if (typeof matchMedia !== "function") {
    return () => {};
  }
  const query = matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => {
    query.removeEventListener("change", onChange);
  };
}

/**
 * `matchMedia` 只在客户端读取，不触碰 `window` 属性访问之外的状态。
 */
function useIsReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    isReducedMotion,
    isReducedMotionServer,
  );
}
