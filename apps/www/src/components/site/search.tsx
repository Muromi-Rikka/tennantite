import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  Input,
  ScrollArea,
} from "@verdigris/ui";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { SearchItem } from "@/lib/search";

interface Props {
  items: SearchItem[];
}

export function Search({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = normalized
      ? items.filter(item => `${item.title} ${item.description} ${item.href}`.toLowerCase().includes(normalized))
      : items;
    return matches.slice(0, 8);
  }, [items, query]);

  const openSearch = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const changeOpen = useCallback((isNextOpen: boolean) => {
    if (isNextOpen) {
      openSearch();
      return;
    }
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, [openSearch]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        return;
      }

      event.preventDefault();
      if (open) {
        setOpen(false);
      }
      else {
        openSearch();
      }
    }
    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  }, [open, openSearch]);

  function navigate(href: string) {
    setOpen(false);
    location.assign(href);
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        setActiveIndex(index => Math.min(index + 1, Math.max(results.length - 1, 0)));
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setActiveIndex(index => Math.max(index - 1, 0));
        break;
      }
      case "Enter": {
        const result = results[activeIndex];
        if (result) {
          event.preventDefault();
          navigate(result.href);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="搜索文档"
        className="border-site-border text-site-muted hover:text-site-fg flex h-16 items-center gap-4 border px-8 text-sm"
        onClick={openSearch}
        type="button"
      >
        <svg aria-hidden="true" className="size-16 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" />
        </svg>
        <span className="hidden sm:inline">搜索文档…</span>
        <kbd className="border-site-border hidden border px-2 py-1 text-xs md:inline">⌘K</kbd>
      </button>
      <Dialog onOpenChange={changeOpen} open={open}>
        <DialogPopup className="px-12" variant="overlay">
          <div className="border-site-border bg-site-surface w-full max-w-[600px] border">
            <DialogTitle className="sr-only">搜索文档</DialogTitle>
            <DialogDescription className="sr-only">搜索文档、组件与 Blocks</DialogDescription>
            <div className="border-site-border border-b p-8">
              <Input
                aria-label="搜索"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="搜索文档、组件、Blocks…"
                ref={inputRef}
                value={query}
              />
            </div>
            <ScrollArea className="max-h-[360px] overflow-y-auto p-4">
              {results.length === 0
                ? <p className="text-site-muted p-8 text-sm">没有匹配结果</p>
                : results.map((item, index) => (
                    <button
                      className={`flex w-full flex-col gap-1 px-8 py-6 text-left ${index === activeIndex ? "bg-white/10" : "hover:bg-white/5"}`}
                      key={item.href}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setActiveIndex(index)}
                      type="button"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-site-fg text-sm">{item.title}</span>
                        <span className="text-site-muted text-xs">{item.group}</span>
                      </span>
                      <span className="text-site-muted line-clamp-1 text-xs">{item.description}</span>
                    </button>
                  ))}
            </ScrollArea>
            <div className="border-site-border text-site-muted flex items-center gap-8 border-t px-8 py-4 text-xs">
              <span>↑↓ 选择</span>
              <span>Enter 打开</span>
              <span>Esc 关闭</span>
            </div>
          </div>
        </DialogPopup>
      </Dialog>
    </>
  );
}

export default Search;
