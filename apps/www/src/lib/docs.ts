import type { CollectionEntry } from "astro:content";

export const DOC_SECTIONS = ["开始", "设计系统", "架构", "分发"] as const;

export type DocEntry = CollectionEntry<"docs">;

export interface DocHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface DocPager {
  next?: DocPagerItem;
  prev?: DocPagerItem;
}
export interface DocPagerItem {
  href: string;
  title: string;
}

export interface DocsNavGroup {
  items: DocsNavItem[];
  title: string;
}

export interface DocsNavItem {
  description: string;
  href: string;
  id: string;
  title: string;
}

export function buildDocsNav(docs: DocEntry[]): DocsNavGroup[] {
  const sorted = sortDocs(docs);
  const groups: DocsNavGroup[] = [];
  for (const section of DOC_SECTIONS) {
    const items = sorted
      .filter(entry => entry.data.section === section)
      .map(entry => ({
        description: entry.data.description,
        href: docHref(entry.id),
        id: entry.id,
        title: entry.data.title,
      }));
    if (items.length > 0) {
      groups.push({ items, title: section });
    }
  }
  return groups;
}

export function docHref(id: string) {
  return id === "index" ? "/docs/" : `/docs/${id}/`;
}

export function getDocsPager(docs: DocEntry[], id: string): DocPager {
  const sorted = sortDocs(docs);
  const index = sorted.findIndex(entry => entry.id === id);
  if (index === -1) {
    return {};
  }
  const prev = sorted[index - 1];
  const next = sorted[index + 1];
  return {
    ...(prev && { prev: { href: docHref(prev.id), title: prev.data.title } }),
    ...(next && { next: { href: docHref(next.id), title: next.data.title } }),
  };
}

export function sortDocs(docs: DocEntry[]) {
  const sectionOrder = new Map(DOC_SECTIONS.map((section, index) => [section, index]));
  return docs.toSorted((a, b) => {
    const sectionDelta = (sectionOrder.get(a.data.section) ?? 99) - (sectionOrder.get(b.data.section) ?? 99);
    return sectionDelta || a.data.order - b.data.order;
  });
}
