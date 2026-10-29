import { useEffect, useMemo, useRef, useState } from "react";

import type { PageGroupId } from "./pages";
import { pageGroupOf, pageGroups, pageRegistry } from "./pages";
import { SidebarNav } from "./shell/sidebar-nav";
import { TopBar } from "./shell/top-bar";

export function App() {
  const [pageId, setPageId] = useState(readPageId);
  // 折叠状态记录"收起"的组；初始只展开当前页所在组
  const [closedGroups, setClosedGroups] = useState<ReadonlySet<PageGroupId>>(
    () =>
      new Set(
        pageGroups
          .filter(group => group.id !== pageGroupOf(readPageId())?.id)
          .map(group => group.id),
      ),
  );
  const [navOpen, setNavOpen] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const openGroups = useMemo(
    () =>
      new Set(
        pageGroups
          .filter(group => !closedGroups.has(group.id))
          .map(group => group.id),
      ),
    [closedGroups],
  );

  useEffect(() => {
    const onHashChange = () => {
      const nextId = readPageId();
      const groupId = pageGroupOf(nextId)?.id;
      setPageId(nextId);
      if (groupId === undefined) {
        return;
      }
      // 跳转目标所在的组必须展开，否则当前项不可见
      setClosedGroups((previous) => {
        if (!previous.has(groupId)) {
          return previous;
        }
        const next = new Set(previous);
        next.delete(groupId);
        return next;
      });
    };
    addEventListener("hashchange", onHashChange);
    return () => {
      removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    const page = pageRegistry.get(pageId);

    // 非法 hash 静默回落到 l0 时同步改写地址栏
    if (location.hash.replace(/^#\/?/, "") !== pageId) {
      history.replaceState(null, "", `#/${pageId}`);
    }
    if (page) {
      document.title = `${page.title} · Tennantite Playground`;
    }
    contentRef.current?.scrollTo({ top: 0 });
  }, [pageId]);

  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) {
      return;
    }
    if (navOpen && !dialog.open) {
      dialog.showModal();
    }
    if (!navOpen && dialog.open) {
      dialog.close();
    }
  }, [navOpen]);

  useEffect(() => {
    const query = matchMedia("(min-width: 1024px)");
    const onChange = () => {
      setNavOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, []);

  const page = pageRegistry.get(pageId);

  if (!page) {
    return null;
  }

  const toggleGroup = (id: PageGroupId) => {
    setClosedGroups((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      }
      else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-black focus:px-6 focus:py-4 focus:font-mc focus:mc-text focus:text-mc-text-main"
        href="#page-content"
        onClick={(event) => {
          event.preventDefault();
          contentRef.current?.focus();
        }}
      >
        {/* hash 路由占用 location.hash，跳转只能用焦点而非锚点 */}
        跳到内容
      </a>

      <aside className="mc-tex-panel hidden w-140 shrink-0 flex-col lg:flex">
        <SidebarNav
          idPrefix="side"
          onToggleGroup={toggleGroup}
          openGroups={openGroups}
          pageId={pageId}
          revealActive
        />
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <div className="mc-tex-panel m-4 flex min-h-0 flex-1 flex-col overflow-hidden sm:m-8">
          <TopBar
            navOpen={navOpen}
            onOpenNav={() => {
              setNavOpen(true);
            }}
            pageId={pageId}
          />
          <main
            className="mc-scroll min-h-0 flex-1 p-6 outline-none sm:p-12"
            id="page-content"
            ref={contentRef}
            tabIndex={-1}
          >
            {page.render()}
          </main>
        </div>
      </section>

      <dialog
        aria-label="页面导航"
        className="m-0 h-full max-h-none w-140 max-w-[85vw] bg-[#1f1f1f] p-0 backdrop:bg-black/60"
        id="nav-drawer"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setNavOpen(false);
          }
        }}
        onClose={() => {
          setNavOpen(false);
        }}
        ref={drawerRef}
      >
        <div className="mc-tex-panel flex h-full flex-col">
          <SidebarNav
            idPrefix="drawer"
            onNavigate={() => {
              setNavOpen(false);
            }}
            onToggleGroup={toggleGroup}
            openGroups={openGroups}
            pageId={pageId}
            revealActive={navOpen}
          />
        </div>
      </dialog>
    </div>
  );
}

function readPageId(): string {
  const id = location.hash.replace(/^#\/?/, "");
  return pageRegistry.has(id) ? id : "l0";
}
