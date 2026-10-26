import { Input } from "../../../primitives/input/index";
import { Panel } from "../../../containers/panel/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";

export interface SignEditProps {
  title?: React.ReactNode;
  /** 各行初始文本（告示牌最多 4 行，数据由使用方注入） */
  lines?: [string, string, string, string];
  maxLines?: 1 | 2 | 3 | 4;
  onChange?: (lines: string[]) => void;
  className?: string;
}

/** 告示牌编辑（规格 §6.3）：逐行 Input，1..4 行。 */
export function SignEdit({
  title = "编辑告示牌文字",
  lines = ["", "", "", ""],
  maxLines = 4,
  onChange,
  className,
}: SignEditProps) {
  const visible = lines.slice(0, maxLines);
  const update = (index: number, text: string) => {
    const next = [...visible];
    next[index] = text;
    onChange?.(next as unknown as string[]);
  };
  return (
    <Panel className={cn("inline-flex w-280 flex-col gap-8 p-16", className)}>
      <TitleBar align="center" title={title} />
      {visible.map((line, index) => (
        <Input
          aria-label={`告示牌第 ${index + 1} 行`}
          defaultValue={line}
          key={index}
          maxLength={24}
          onChange={event => {
            update(index, event.target.value);
          }}
        />
      ))}
    </Panel>
  );
}
