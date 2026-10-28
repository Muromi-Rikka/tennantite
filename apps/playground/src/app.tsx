import { useEffect, useState } from "react";
import { pageRegistry } from "./pages";

export function App() {
  const [pageId, setPageId] = useState(currentPageId);

  useEffect(() => {
    const onHashChange = () => {
      setPageId(currentPageId());
    };
    addEventListener("hashchange", onHashChange);
    return () => {
      removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const page = pageRegistry.get(pageId);

  if (!page) {
    return null;
  }

  return (
    <div className="flex h-full">
      <nav className="mc-tex-panel flex w-100 shrink-0 flex-col gap-1 p-6">
        <span className="font-mc mc-text text-mc-gold mc-text-shadow">
          TENNANTITE
        </span>
        {Array.from(pageRegistry.entries(), ([id, entry]) => (
          <a
            aria-current={pageId === id ? "page" : undefined}
            className={`mc-tex-btn px-4 font-mc mc-text text-mc-text-main no-underline ${
              pageId === id ? "mc-tex-btn--hover" : ""
            }`}
            href={`#/${id}`}
            key={id}
          >
            {entry.title}
          </a>
        ))}
      </nav>
      <main className="mc-tex-panel m-8 flex-1 overflow-auto p-12">
        {page.render()}
      </main>
    </div>
  );
}

function currentPageId(): string {
  const id = location.hash.replace(/^#\/?/, "");
  return pageRegistry.has(id) ? id : "l0";
}
