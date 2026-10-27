import { Panel } from "../../../containers/panel/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { ScrollArea } from "../../../primitives/scroll-area/index";

export interface LanguageOption {
  code: string;
  name: string;
}

export interface LanguageScreenProps {
  className?: string;
  /**
  * 可选语言（数据由使用方注入，规格确认不做中文字体适配但列表可含中文）
  */
  languages?: LanguageOption[];
  onLanguageSelect?: (code: string) => void;
  selectedCode?: string;
}

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { code: "en-us", name: "English (US)" },
  { code: "zh-cn", name: "简体中文" },
  { code: "ja-jp", name: "日本語" },
  { code: "de-de", name: "Deutsch" },
];

/**
 * 语言选择（规格 §6.3）：ScrollArea 列表，单选高亮 + 1 GUI px 白色内框。
*/
export function LanguageScreen({
  className,
  languages = DEFAULT_LANGUAGES,
  onLanguageSelect,
  selectedCode,
}: LanguageScreenProps) {
  return (
    <Panel className={cn("inline-flex w-280 flex-col gap-4 p-6", className)}>
      <TitleBar align="center" title="语言" />
      <ScrollArea className="h-160">
        <div className="flex flex-col">
          {languages.map(language => (
            <button
              className={cn(
                "flex h-20 w-full cursor-pointer items-center px-4 text-left",
                "font-mc mc-text text-mc-text-main hover:bg-white/10",
                selectedCode === language.code
                && "bg-mc-panel-overlay text-white mc-outline outline-white",
              )}
              data-language-code={language.code}
              data-selected={selectedCode === language.code ? "" : undefined}
              key={language.code}
              onClick={() => {
                onLanguageSelect?.(language.code);
              }}
              type="button"
            >
              {language.name}
            </button>
          ))}
        </div>
      </ScrollArea>
      <p className="font-mc mc-text text-mc-text-dim">
        字体使用开源像素字体（OFL），不支持全部字形
      </p>
    </Panel>
  );
}
