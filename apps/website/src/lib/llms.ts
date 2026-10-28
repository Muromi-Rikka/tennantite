import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n";
import { ui } from "../i18n";
import {
  blockHref,
  blocks,
  catalogDescription,
  componentHref,
  components,
  componentTitle,
} from "./catalog";
import { docHref, filterDocs, sortDocs } from "./docs";

export function buildLlmsText(docs: CollectionEntry<"docs">[], locale: Locale, site: URL): string {
  const text = ui[locale];
  const lines = [
    "# Verdigris",
    "",
    `> ${text.home.metaDescription}`,
    "",
    `## ${text.nav.docs}`,
    ...sortDocs(filterDocs(docs, locale)).map(entry =>
      `- [${entry.data.title}](${new URL(docHref(entry.id), site).href}): ${entry.data.description}`,
    ),
    "",
    `## ${text.nav.components}`,
    ...components.map(component =>
      `- [${componentTitle(component, locale)}](${new URL(componentHref(component.slug, locale), site).href}): ${catalogDescription(component, locale)}`,
    ),
    "",
    `## ${text.nav.blocks}`,
    ...blocks.map(block =>
      `- [${componentTitle(block, locale)}](${new URL(blockHref(block.slug, locale), site).href}): ${catalogDescription(block, locale)}`,
    ),
    "",
  ];
  return lines.join("\n");
}
