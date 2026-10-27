import { GuiSprite } from "../../../containers/gui-sprite/index";
import { Icon } from "../../../containers/icon/index";
import { cn, gui } from "../../../lib/utils";
import { MenuBackground } from "../menu-background";

export interface SocialInteractionsScreenProps {
  className?: string;
  onMute?: (name: string) => void;
  onReport?: (name: string) => void;
  players?: SocialPlayer[];
  title?: React.ReactNode;
}

export interface SocialPlayer {
  actions?: {
    mute?: boolean;
    report?: boolean;
  };
  name: string;
  skin?: string;
}

/**
 * 社交互动界面（规格 §6.3）：320×240 + 236×34 行背景。
 */
export function SocialInteractionsScreen({
  className,
  onMute,
  onReport,
  players = [],
  title = "社交互动",
}: SocialInteractionsScreenProps) {
  return (
    <MenuBackground
      className={cn("overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      <div className="absolute font-mc mc-text text-mc-text-main mc-text-shadow" style={{ left: gui(8), top: gui(8) }}>
        {title}
      </div>
      {players.map((player, index) => (
        <div
          className="absolute flex items-center gap-2"
          key={player.name}
          style={{ height: gui(34), left: gui(42), top: gui(34 + index * 36), width: gui(236) }}
        >
          <GuiSprite
            className="absolute inset-0"
            height={34}
            name="sprites/social_interactions/background.png"
            slice={5}
            style={{ height: "100%", width: "100%" }}
            width={236}
          />
          <div className="relative ml-2 size-32 bg-black">
            {player.skin ? <Icon size={32} src={player.skin} /> : null}
          </div>
          <span className="relative flex-1 font-mc mc-text text-mc-text-main mc-text-shadow">
            {player.name}
          </span>
          {player.actions?.mute === false
            ? null
            : (
                <button
                  aria-label={`静音 ${player.name}`}
                  className="relative cursor-pointer border-0 bg-transparent p-0"
                  onClick={() => onMute?.(player.name)}
                  style={{ height: gui(20), width: gui(20) }}
                  type="button"
                >
                  <GuiSprite height={20} name="sprites/social_interactions/mute_button.png" width={20} />
                </button>
              )}
          {player.actions?.report === false
            ? null
            : (
                <button
                  aria-label={`举报 ${player.name}`}
                  className="relative mr-2 cursor-pointer border-0 bg-transparent p-0"
                  onClick={() => onReport?.(player.name)}
                  style={{ height: gui(20), width: gui(20) }}
                  type="button"
                >
                  <GuiSprite height={20} name="sprites/social_interactions/report_button.png" width={20} />
                </button>
              )}
        </div>
      ))}
    </MenuBackground>
  );
}
