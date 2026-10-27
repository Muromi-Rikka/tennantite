import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn } from "../../../lib/utils";

export interface PlayerListEntry {
  name: string;
  operator?: boolean;
}

export interface PlayerListProps {
  className?: string;
  players?: PlayerListEntry[];
}

/**
 * 玩家列表覆盖层（规格 §6.3）：半透明黑底 + 20px 行 + 管理图标。
 */
export function PlayerList({ className, players = [] }: PlayerListProps) {
  return (
    <div className={cn("flex flex-col bg-black/50 p-2", className)} data-hud="">
      {players.map(player => (
        <div className="flex h-20 items-center gap-1 font-mc mc-text text-mc-text-main mc-text-shadow" key={player.name}>
          <span className="flex-1">{player.name}</span>
          {player.operator
            ? <GuiSprite height={7} name="sprites/player_list/remove_operator.png" width={8} />
            : <GuiSprite height={7} name="sprites/player_list/make_operator.png" width={8} />}
          <GuiSprite height={7} name="sprites/player_list/remove_player.png" width={8} />
        </div>
      ))}
    </div>
  );
}
