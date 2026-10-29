import { cn, ScrollArea } from "@tennantite/ui";
import { useEffect, useRef } from "react";

import type { PageGroupId } from "../pages";
import { navEntries, navSections } from "../pages";

export interface SidebarNavProps {
  // 同页渲染两份导航（桌面侧栏 + 抽屉），折叠头 id 必须区分
  idPrefix: "drawer" | "side";
  onNavigate?: () => void;
  onToggleGroup: (id: PageGroupId) => void;
  openGroups: ReadonlySet<PageGroupId>;
  pageId: string;
  // 抽屉打开后触发活动项定位
  revealActive: boolean;
}

export function SidebarNav({
  idPrefix,
  onNavigate,
  onToggleGroup,
  openGroups,
  pageId,
  revealActive,
}: SidebarNavProps) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pageId, revealActive]);

  return (
    <nav aria-label="组件预览导航" className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-baseline justify-between gap-4 px-6 pt-6 pb-4">
        <span className="font-mc mc-text text-mc-gold mc-text-shadow">
          TENNANTITE
        </span>
        <span className="font-mc mc-text text-mc-stone-dark">
          {`${navEntries.length} 页`}
        </span>
      </div>

      <ScrollArea className="min-h-0 flex-1 px-4 pb-6">
        {navSections.map(({ entries, group }) => {
          const open = openGroups.has(group.id);
          return (
            <div className="mb-2" key={group.id}>
              <button
                aria-controls={`${idPrefix}-grp-${group.id}`}
                aria-expanded={open}
                className="flex h-22 w-full items-center gap-4 px-4 text-left font-mc mc-text text-mc-stone-darker focus-visible:mc-outline focus-visible:outline-white"
                onClick={() => {
                  onToggleGroup(group.id);
                }}
                type="button"
              >
                <span aria-hidden="true" className="w-8">
                  {open ? "▾" : "▸"}
                </span>
                <span className="truncate">{group.title}</span>
                <span className="ml-auto text-mc-stone-dark">
                  {entries.length}
                </span>
              </button>

              <ul
                className={open ? "mt-1 flex flex-col gap-1" : "hidden"}
                id={`${idPrefix}-grp-${group.id}`}
              >
                {entries.map((entry) => {
                  const isActive = entry.id === pageId;
                  return (
                    <li key={entry.id}>
                      <a
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "mc-tex-btn flex h-22 items-center px-4 font-mc mc-text no-underline",
                          isActive
                            ? "mc-tex-btn--hover text-mc-gold mc-text-shadow"
                            : "text-mc-text-main",
                        )}
                        href={`#/${entry.id}`}
                        onClick={onNavigate}
                        ref={isActive ? activeRef : undefined}
                        title={entry.title}
                      >
                        <span className="truncate">{entry.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </ScrollArea>
    </nav>
  );
}
