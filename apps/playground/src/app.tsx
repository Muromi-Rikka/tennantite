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
      <nav className="mc-tex-panel flex w-200 shrink-0 flex-col gap-4 p-16">
        <span className="font-pixel text-mc-pixel text-mc-gold mc-text-shadow">
          VERDIGRIS
        </span>
        {Array.from(pageRegistry.entries(), ([id, entry]) => (
          <a
            className={`mc-tex-btn px-12 py-8 font-readable text-mc text-mc-text-main no-underline ${
              pageId === id ? "mc-tex-btn--active" : ""
            }`}
            href={`#/${id}`}
            key={id}
          >
            {entry.title}
          </a>
        ))}
      </nav>
      <main className="mc-tex-panel m-16 flex-1 overflow-auto p-24">
        {page.render()}
      </main>
    </div>
  );
}

function currentPageId(): string {
  const id = location.hash.replace(/^#\/?/, "");
  return pageRegistry.has(id) ? id : "l0";
}
