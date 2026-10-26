import { Divider } from "../../../containers/divider/index";
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
 * 语言选择（规格 §6.3）：ScrollArea 列表，单选高亮。
*/
export function LanguageScreen({
  className,
  languages = DEFAULT_LANGUAGES,
  onLanguageSelect,
  selectedCode,
}: LanguageScreenProps) {
  return (
    <Panel className={cn("inline-flex w-280 flex-col gap-16 p-16", className)}>
      <TitleBar align="center" title="语言" />
      <ScrollArea className="mc-tex-slot h-160 p-8">
        <div className="flex flex-col">
          {languages.map((language, index) => (
            <div key={language.code}>
              <button
                className={cn(
                  "w-full cursor-pointer px-12 py-8 text-left font-readable text-mc",
                  selectedCode === language.code
                    ? "bg-mc-stone-dark/60 text-white"
                    : "text-mc-text-main hover:bg-mc-stone-dark/40",
                )}
                data-language-code={language.code}
                onClick={() => {
                  onLanguageSelect?.(language.code);
                }}
                type="button"
              >
                {language.name}
              </button>
              {index < languages.length - 1 ? <Divider /> : null}
            </div>
          ))}
        </div>
      </ScrollArea>
      <p className="font-readable text-mc text-mc-text-dim">
        字体使用开源像素字体（OFL），不支持全部字形
      </p>
    </Panel>
  );
}
