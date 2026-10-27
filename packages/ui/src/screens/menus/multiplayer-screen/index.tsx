import { Panel } from "../../../containers/panel/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import { ScrollArea } from "../../../primitives/scroll-area/index";

export interface MultiplayerScreenProps {
  className?: string;
  onJoin?: () => void;
  onServerSelect?: (address: string) => void;
  selectedAddress?: string;
  servers?: ServerEntry[];
}

export interface ServerEntry {
  /**
  * 服务器地址
  */
  address: string;
  /**
  * 延迟与人数（展示文本，数据由使用方注入）
  */
  meta?: string;
  /**
  * 服务器名称
  */
  name: string;
}

/**
 * 多人游戏服务器列表（规格 §6.3）：ScrollArea + Button。
*/
export function MultiplayerScreen({
  className,
  onJoin,
  onServerSelect,
  selectedAddress,
  servers = [],
}: MultiplayerScreenProps) {
  return (
    <Panel className={cn("inline-flex w-320 flex-col gap-4 p-6", className)}>
      <TitleBar align="center" title="选择服务器" />
      <ScrollArea className="h-160">
        <div className="flex flex-col">
          {servers.map(server => (
            <button
              className={cn(
                "flex min-h-36 w-full cursor-pointer flex-col justify-center px-4 py-2 text-left",
                "border-[length:var(--mc-gui)] border-transparent",
                "font-mc mc-text text-mc-text-main hover:bg-white/10",
                selectedAddress === server.address && "border-white bg-white/10",
              )}
              data-address={server.address}
              data-selected={selectedAddress === server.address ? "" : undefined}
              data-server-entry=""
              key={server.address}
              onClick={() => {
                onServerSelect?.(server.address);
              }}
              type="button"
            >
              <div>{server.name}</div>
              <div className="text-mc-text-dim">{server.address}</div>
              {server.meta
                ? (
                    <div className="text-mc-text-dim">{server.meta}</div>
                  )
                : null}
            </button>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-4">
        <Button className="flex-1" onClick={onJoin}>
          加入服务器
        </Button>
        <Button className="flex-1">刷新</Button>
      </div>
    </Panel>
  );
}
