import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import type { NavEntry } from "../pages";
import { navEntries, pageGroupOf, pageRegistry } from "../pages";

const COPY_IDLE = "复制链接";
const COPY_DONE = "已复制";
const COPY_FAILED = "复制失败";
const PAGER_CLASS = "mc-tex-btn flex h-22 items-center px-4 font-mc mc-text no-underline";

export interface TopBarProps {
  navOpen: boolean;
  onOpenNav: () => void;
  pageId: string;
}

interface CopyState {
  label: string;
  pageId: string;
}

interface PagerControlProps {
  entry: NavEntry | undefined;
  glyph: string;
  glyphFirst: boolean;
  title: string;
}

export function TopBar({ navOpen, onOpenNav, pageId }: TopBarProps) {
  const [copyState, setCopyState] = useState<CopyState>({
    label: COPY_IDLE,
    pageId,
  });
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // 换页或卸载时丢弃待恢复的标签计时器
    return () => {
      if (timerRef.current === null) {
        return;
      }
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [pageId]);

  const entry = pageRegistry.get(pageId);
  const group = pageGroupOf(pageId);

  if (!entry || !group) {
    return null;
  }

  const copyLabel = copyState.pageId === pageId ? copyState.label : COPY_IDLE;
  const index = navEntries.findIndex(item => item.id === pageId);
  const prev = navEntries[index - 1];
  const next = navEntries[index + 1];

  const copyLink = async () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const url = `${location.origin}${location.pathname}${location.search}#/${pageId}`;
    let isSucceeded = true;
    try {
      await navigator.clipboard.writeText(url);
    }
    catch {
      isSucceeded = false;
    }
    setCopyState({
      label: isSucceeded ? COPY_DONE : COPY_FAILED,
      pageId,
    });
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setCopyState({ label: COPY_IDLE, pageId });
    }, 2000);
  };

  return (
    <header className="flex h-32 shrink-0 items-center gap-4 border-b border-white/15 bg-black/60 px-6 sm:gap-8 lg:px-12">
      <button
        aria-controls="nav-drawer"
        aria-expanded={navOpen}
        aria-label="打开页面导航"
        className="mc-tex-btn flex size-24 shrink-0 flex-col items-center justify-center gap-1 lg:hidden"
        onClick={onOpenNav}
        type="button"
      >
        <span aria-hidden="true" className="h-1 w-16 bg-mc-text-main" />
        <span aria-hidden="true" className="h-1 w-16 bg-mc-text-main" />
        <span aria-hidden="true" className="h-1 w-16 bg-mc-text-main" />
      </button>

      <div className="flex min-w-0 items-baseline gap-4 font-mc mc-text">
        <span className="hidden shrink-0 text-mc-gold sm:inline">
          {group.title}
        </span>
        <span aria-hidden="true" className="hidden text-mc-text-dim sm:inline">
          /
        </span>
        <span className="truncate text-mc-text-main">{entry.title}</span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-4">
        <PagerControl entry={prev} glyph="‹" glyphFirst title="上一页" />
        <PagerControl entry={next} glyph="›" glyphFirst={false} title="下一页" />
        <button
          className="mc-tex-btn flex h-22 items-center px-4 font-mc mc-text text-mc-text-main"
          onClick={() => {
            void copyLink();
          }}
          type="button"
        >
          <span aria-live="polite">{copyLabel}</span>
        </button>
      </div>
    </header>
  );
}

function PagerControl({ entry, glyph, glyphFirst, title }: PagerControlProps) {
  const icon = (
    <span aria-hidden="true">
      {glyph}
    </span>
  );
  const text = <span className="hidden px-2 sm:inline">{title}</span>;
  let content: ReactNode;
  if (glyphFirst) {
    content = (
      <>
        {icon}
        {text}
      </>
    );
  }
  else {
    content = (
      <>
        {text}
        {icon}
      </>
    );
  }

  if (!entry) {
    return (
      <span
        aria-disabled="true"
        className={`${PAGER_CLASS} mc-tex-btn--disabled text-mc-text-dim`}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      aria-label={`${title}：${entry.title}`}
      className={`${PAGER_CLASS} text-mc-text-main`}
      href={`#/${entry.id}`}
    >
      {content}
    </a>
  );
}
