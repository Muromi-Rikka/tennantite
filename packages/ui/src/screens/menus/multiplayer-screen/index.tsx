import { Button } from "../../../primitives/button/index";
import { ScrollArea } from "../../../primitives/scroll-area/index";
import { Divider } from "../../../containers/divider/index";
import { Panel } from "../../../containers/panel/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";

export interface ServerEntry {
  /** 服务器地址 */
  address: string;
  /** 服务器名称 */
  name: string;
  /** 延迟与人数（展示文本，数据由使用方注入） */
  meta?: string;
}

export interface MultiplayerScreenProps {
  servers?: ServerEntry[];
  selectedAddress?: string;
  onServerSelect?: (address: string) => void;
  onJoin?: () => void;
  className?: string;
}

/** 多人游戏服务器列表（规格 §6.3）：ScrollArea + Button。 */
export function MultiplayerScreen({
  servers = [],
  selectedAddress,
  onServerSelect,
  onJoin,
  className,
}: MultiplayerScreenProps) {
  return (
    <Panel className={cn("inline-flex w-360 flex-col gap-16 p-16", className)}>
      <TitleBar align="center" title="选择服务器" />
      <ScrollArea className="mc-tex-slot h-160 p-8">
        <div className="flex flex-col gap-8">
          {servers.map((server, index) => (
            <div key={server.address}>
              <button
                className={cn(
                  "w-full cursor-pointer border-2 px-12 py-8 text-left",
                  "border-transparent font-readable text-mc text-mc-text-main",
                  "hover:bg-mc-stone-dark/40",
                  selectedAddress === server.address &&
                    "border-black bg-mc-stone-dark/60",
                )}
                data-address={server.address}
                data-server-entry=""
                onClick={() => {
                  onServerSelect?.(server.address);
                }}
                type="button"
              >
                <div>{server.name}</div>
                <div className="text-mc-text-dim">{server.address}</div>
                {server.meta ? (
                  <div className="text-mc-text-dim">{server.meta}</div>
                ) : null}
              </button>
              {index < servers.length - 1 ? <Divider className="my-8" /> : null}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-16">
        <Button className="flex-1" onClick={onJoin}>
          加入服务器
        </Button>
        <Button className="flex-1" variant="ghost">
          刷新
        </Button>
      </div>
    </Panel>
  );
}
