import { ScaledBox, Tabs, TabsList, TabsPanel, TabsTab } from "@verdigris/ui";
import { useState } from "react";

import type { Locale } from "@/i18n";
import { ui } from "@/i18n";
import { Demo } from "./demo";

interface Props {
  code: string;
  locale: Locale;
  name: string;
}

export function PreviewTabs({ code, locale, name }: Props) {
  const text = ui[locale];
  const labels = text.componentPage;
  const [copyState, setCopyState] = useState(text.copy);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState(text.copied);
    }
    catch {
      setCopyState(text.copyFailed);
    }
    setTimeout(() => setCopyState(text.copy), 2000);
  }

  return (
    <Tabs className="border-site-border mt-16 border" defaultValue="preview">
      <div className="border-site-border flex items-center justify-between border-b px-4">
        <TabsList aria-label={labels.tabsLabel}>
          <TabsTab value="preview">{labels.previewLabel}</TabsTab>
          <TabsTab value="code">{labels.codeLabel}</TabsTab>
        </TabsList>
        <button
          className="border-site-border text-site-muted hover:text-site-fg border px-4 py-2 text-xs"
          onClick={copy}
          type="button"
        >
          {copyState}
        </button>
      </div>
      <TabsPanel
        className="mc-scroll flex min-h-[240px] items-center justify-center overflow-x-auto bg-[#0d0d0d] p-8 sm:p-16"
        keepMounted
        value="preview"
      >
        <ScaledBox className="w-full">
          <Demo name={name} />
        </ScaledBox>
      </TabsPanel>
      <TabsPanel className="max-h-[480px] overflow-auto bg-[#080808] p-8" keepMounted value="code">
        <pre className="text-site-fg font-mono text-[13px] leading-11"><code>{code}</code></pre>
      </TabsPanel>
    </Tabs>
  );
}

export default PreviewTabs;
