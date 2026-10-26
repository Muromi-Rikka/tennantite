import { ChatScreen } from "./index";

/** ChatScreen 预览用例（规格 §6.3） */
export function ChatScreenDemo() {
  return (
    <ChatScreen
      messages={[
        { author: "Steve", text: "大家好多钻石！" },
        { author: "Alex", text: "小心苦力怕" },
        { text: "Steve 加入了游戏" },
      ]}
    />
  );
}
