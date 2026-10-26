"use client";

import { useEffect, useState } from "react";

/**
 * 检测环境是否支持 hover（规格 §7：hover 仅作桌面增强，不得承载核心功能）。
 * SSR 期返回 false，副作用集中在 useEffect，水合后增强。
 */
export function useHasHover(): boolean {
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const query = matchMedia("(hover: hover)");
    setHasHover(query.matches);
    const onChange = (event: MediaQueryListEvent) => {
      setHasHover(event.matches);
    };
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, []);

  return hasHover;
}
