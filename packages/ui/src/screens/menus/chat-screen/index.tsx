import { cn } from "../../../lib/utils";
import { Input } from "../../../primitives/input/index";
import { ScrollArea } from "../../../primitives/scroll-area/index";

export interface ChatMessage {
  author?: string;
  /**
  * 消息文本（支持任意样式由使用方包一层，此处为纯文本）
  */
  text: string;
}

export interface ChatScreenProps {
  className?: string;
  defaultValue?: string;
  messages?: ChatMessage[];
  onSend?: (text: string) => void;
  /**
  * 输入值（受控可选）
  */
  value?: string;
}

/**
 * 聊天界面（规格 §6.3）：无面板，消息历史 + 200×20 输入框。
*/
export function ChatScreen({
  className,
  defaultValue,
  messages = [],
  onSend,
  value,
}: ChatScreenProps) {
  return (
    <div className={cn("flex w-320 flex-col gap-1", className)}>
      <ScrollArea className="max-h-160 bg-black/50 p-1">
        <ul className="flex flex-col gap-1">
          {messages.map((message, index) => (
            <li
              className="font-mc mc-text text-mc-text-main mc-text-shadow"
              key={index}
            >
              {message.author
                ? (
                    <span className="text-mc-yellow">{`<${message.author}> `}</span>
                  )
                : null}
              {message.text}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Input
        aria-label="聊天输入"
        className="w-200"
        defaultValue={defaultValue}
        onKeyDown={(event) => {
          if (!onSend || event.key !== "Enter") {
            return;
          }

          const target = event.currentTarget;
          onSend(target.value);
          target.value = "";
        }}
        placeholder="输入消息，回车发送…"
        value={value}
      />
    </div>
  );
}
