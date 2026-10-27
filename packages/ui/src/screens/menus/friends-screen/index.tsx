import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import { MenuBackground } from "../menu-background";

export interface FriendEntry {
  name: string;
  status?: "all" | "limited" | "none";
}

export interface FriendsScreenProps {
  className?: string;
  friends?: FriendEntry[];
  onAccept?: (name: string) => void;
  onAdd?: () => void;
  onReject?: (name: string) => void;
  title?: React.ReactNode;
}

/**
 * 好友界面（规格 §6.3）：320×240 + 236×34 行背景 + 好友按钮。
 */
export function FriendsScreen({
  className,
  friends = [],
  onAccept,
  onAdd,
  onReject,
  title = "好友",
}: FriendsScreenProps) {
  return (
    <MenuBackground
      className={cn("overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      <div className="absolute font-mc mc-text text-mc-text-main mc-text-shadow" style={{ left: gui(8), top: gui(8) }}>
        {title}
      </div>
      {friends.map((friend, index) => (
        <div
          className="absolute flex items-center gap-2"
          key={friend.name}
          style={{ height: gui(34), left: gui(42), top: gui(34 + index * 36), width: gui(236) }}
        >
          <GuiSprite
            className="absolute inset-0"
            height={34}
            name="sprites/friends/background.png"
            slice={5}
            style={{ height: "100%", width: "100%" }}
            width={236}
          />
          <div className="relative ml-2 size-32 bg-black" />
          <span className="relative flex-1 font-mc mc-text text-mc-text-main mc-text-shadow">
            {friend.name}
          </span>
          <GuiSprite
            className="relative"
            height={8}
            name={`sprites/friends/presence_${friend.status ?? "none"}.png`}
            width={8}
          />
          <button
            aria-label={`接受 ${friend.name}`}
            className="relative cursor-pointer border-0 bg-transparent p-0"
            onClick={() => onAccept?.(friend.name)}
            style={{ height: gui(20), width: gui(20) }}
            type="button"
          >
            <GuiSprite height={20} name="sprites/friends/accept.png" width={20} />
          </button>
          <button
            aria-label={`拒绝 ${friend.name}`}
            className="relative mr-2 cursor-pointer border-0 bg-transparent p-0"
            onClick={() => onReject?.(friend.name)}
            style={{ height: gui(20), width: gui(20) }}
            type="button"
          >
            <GuiSprite height={20} name="sprites/friends/reject.png" width={20} />
          </button>
        </div>
      ))}
      <Button className="absolute w-200" onClick={onAdd} style={{ left: gui(60), top: gui(210) }}>
        添加好友
      </Button>
    </MenuBackground>
  );
}
