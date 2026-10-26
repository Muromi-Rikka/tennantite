import { Input } from "../../../primitives/input/index";
import { ScrollArea } from "../../../primitives/scroll-area/index";
import { Panel } from "../../../containers/panel/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";

export interface ChatMessage {
  author?: string;
  /** 消息文本（支持任意样式由使用方包一层，此处为纯文本） */
  text: string;
}

export interface ChatScreenProps {
  title?: React.ReactNode;
  messages?: ChatMessage[];
  /** 输入值（受控可选） */
  value?: string;
  defaultValue?: string;
  onSend?: (text: string) => void;
  className?: string;
}

/** 聊天界面（规格 §6.3）：Input + ScrollArea 历史。 */
export function ChatScreen({
  title = "聊天",
  messages = [],
  value,
  defaultValue,
  onSend,
  className,
}: ChatScreenProps) {
  return (
    <Panel className={cn("inline-flex w-360 flex-col gap-8 p-16", className)}>
      <TitleBar align="start" title={title} />
      <ScrollArea className="mc-tex-slot h-160 p-8">
        <ul className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <li className="font-readable text-mc text-mc-text-main" key={index}>
              {message.author ? (
                <span className="text-mc-gold">{`<${message.author}> `}</span>
              ) : null}
              {message.text}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Input
        aria-label="聊天输入"
        defaultValue={defaultValue}
        onKeyDown={event => {
          if (event.key === "Enter" && onSend) {
            const target = event.currentTarget;
            onSend(target.value);
            target.value = "";
          }
        }}
        placeholder="输入消息，回车发送…"
        value={value}
      />
    </Panel>
  );
}
