import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { MenuBackground } from "../menu-background/index";

export interface LanguageOption {
  code: string;
  name: string;
}

export interface LanguageScreenProps {
  className?: string;
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
 * 语言选择（规格 §6.3）：320×240 menu_background + 20px 行 + 原版滚动条。
 */
export function LanguageScreen({
  className,
  languages = DEFAULT_LANGUAGES,
  onLanguageSelect,
  selectedCode,
}: LanguageScreenProps) {
  return (
    <MenuBackground
      className={cn("overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      <div className="absolute font-mc mc-text text-mc-text-main mc-text-shadow" style={{ left: gui(8), top: gui(8) }}>
        语言
      </div>
      <div className="absolute" style={{ left: gui(4), top: gui(36), width: gui(312) }}>
        {languages.map((language, index) => (
          <button
            className={cn(
              "relative block h-20 w-full cursor-pointer border-0 bg-transparent px-4 text-left",
              "font-mc mc-text text-mc-text-main hover:bg-white/10",
              selectedCode === language.code && "outline-1 outline-white",
            )}
            data-language-code={language.code}
            data-selected={selectedCode === language.code ? "" : undefined}
            key={language.code}
            onClick={() => {
              onLanguageSelect?.(language.code);
            }}
            style={{ top: gui(index * 20) }}
            type="button"
          >
            {language.name}
          </button>
        ))}
      </div>
      <GuiSprite
        className="absolute"
        height={15}
        name="sprites/widget/scroller.png"
        style={{ left: gui(306), top: gui(36) }}
        width={12}
      />
    </MenuBackground>
  );
}
