import type { DocEntry } from "./docs";
import { blocks, components } from "./catalog";
import { docHref, sortDocs } from "./docs";

export interface SearchItem {
  description: string;
  group: string;
  href: string;
  title: string;
}

export function buildSearchItems(docs: DocEntry[]): SearchItem[] {
  return [
    ...sortDocs(docs).map(entry => ({
      description: entry.data.description,
      group: "文档",
      href: docHref(entry.id),
      title: entry.data.title,
    })),
    ...components.map(item => ({
      description: item.description,
      group: "组件",
      href: `/components/${item.slug}/`,
      title: item.name,
    })),
    ...blocks.map(item => ({
      description: item.description,
      group: "Blocks",
      href: `/blocks/${item.slug}/`,
      title: item.name,
    })),
  ];
}
