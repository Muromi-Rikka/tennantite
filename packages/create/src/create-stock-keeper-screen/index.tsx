import type { PixelIconName } from "@tennantite/textures";
import { ModScissorList, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui, ScreenItemSlot } from "@tennantite/ui";

import { CREATE_ATLAS, CREATE_STOCK_KEEPER } from "../create-metrics";
import { CreateWindow } from "../create-window/index";
import { buildStockRows, StockRows } from "./stock-rows";

/**
 * 库存物品条目（上游 BigItemStack：物品 + 数量）。
 */
export interface CreateStockItem {
  count: number;
  icon: PixelIconName;
  tooltip?: string;
}

/**
 * 物品分类（上游隐藏/显示的分类行；未分类条目 name 省略）。
 */
export interface CreateStockKeeperCategory {
  hidden?: boolean;
  id: string;
  items: CreateStockItem[];
  name?: string;
}

export interface CreateStockKeeperScreenProps {
  /**
   * 包裹地址输入框（底部，深棕字）
   */
  address?: string;
  /**
   * 中段行数（窗口高 = 36 + bodyRows×20 + 80，上游随屏幕高度自适应）
   */
  bodyRows?: number;
  /**
   * 分类（提供时渲染分类行，行首为显示/隐藏切换图标）
   */
  categories?: CreateStockKeeperCategory[];
  className?: string;
  /**
   * 未分类物品（无 categories 时平铺渲染）
   */
  items?: CreateStockItem[];
  locked?: boolean;
  onAddressChange?: (address: string) => void;
  onLockToggle?: () => void;
  onSearchChange?: (value: string) => void;
  onSend?: () => void;
  /**
   * 下单行物品（最多 9 格，上游 itemsToOrder）
   */
  order?: CreateStockItem[];
  /**
   * 滚动进度 0..1（滚动条把手位置，纯展示）
   */
  scroll?: number;
  /**
   * 搜索框文字
   */
  searchValue?: string;
  title?: string;
}

const SLOT = CREATE_ATLAS.stockKeeperSlot;

/**
 * Create 库存管理员（物流站）请求界面（`StockKeeperRequestScreen` 视觉复刻）：
 * header/body/footer 三段拼接背板（整体绘制在窗口 x−15）+ 搜索框 + 锁定按钮 +
 * 分类行与 9 列物品网格（20px 栅格）+ 右侧滚动条 + 底部下单行、地址输入与
 * 发送按钮。数据注入、无请求逻辑；上游左侧的库存管理员 3D 实体渲染省略。
 */
export function CreateStockKeeperScreen({
  address = "",
  bodyRows = 5,
  categories,
  className,
  items,
  locked = false,
  onAddressChange,
  onLockToggle,
  onSearchChange,
  onSend,
  order,
  scroll = 0,
  searchValue = "",
  title = "库存管理员",
}: CreateStockKeeperScreenProps) {
  const layout = CREATE_STOCK_KEEPER;
  const atlas = CREATE_ATLAS;
  const header = atlas.stockKeeperHeader;
  const body = atlas.stockKeeperBody;
  const footer = atlas.stockKeeperFooter;
  const height = layout.headerHeight + bodyRows * layout.rowHeight + layout.footerHeight;
  const orderY = height - layout.orderBottom;
  const scrollbarHeight = height - 92;
  const thumbTop = layout.scrollbar.top + 1 + scroll * Math.max(0, scrollbarHeight - 12);
  const rows = buildStockRows({ categories, items });
  return (
    <CreateWindow
      background={(
        <>
          {/* 三段背板（上游整体绘制在窗口 x−15 处） */}
          <ModSprite left={-15} sprite={createSpriteMeta[header.atlas]} src={header} top={0} />
          {Array.from({ length: bodyRows }, (_, index) => (
            <ModSprite
              key={index}
              left={-15}
              sprite={createSpriteMeta[body.atlas]}
              src={body}
              top={layout.headerHeight + index * layout.rowHeight}
            />
          ))}
          <ModSprite
            left={-15}
            sprite={createSpriteMeta[footer.atlas]}
            src={footer}
            top={layout.headerHeight + bodyRows * layout.rowHeight}
          />
        </>
      )}
      className={className}
      height={height}
      player={false}
      title={title}
      titleAlign="center"
      titleColor="#714a40"
      titleLeft={0}
      titleTop={layout.playerTitle.top}
      titleWidth={layout.width}
      width={layout.width}
    >
      {/* 搜索框 */}
      <ModSprite
        left={layout.search.left}
        sprite={createSpriteMeta[atlas.stockKeeperSearch.atlas]}
        src={atlas.stockKeeperSearch}
        top={layout.search.top}
      />
      <input
        aria-label="搜索物品"
        className="absolute bg-transparent font-mc mc-text outline-none"
        defaultValue={searchValue}
        onChange={onSearchChange ? event => onSearchChange(event.currentTarget.value) : undefined}
        placeholder="搜索物品…"
        style={{
          color: "#4a2d31",
          height: gui(9),
          left: gui(layout.searchBox.left),
          outline: "none",
          top: gui(layout.searchBox.top),
          width: gui(layout.searchBox.width),
        }}
        type="text"
      />
      {/* 锁定开关（管理员） */}
      <button
        aria-label={locked ? "解锁" : "锁定"}
        aria-pressed={locked}
        className="absolute block border-0 bg-transparent p-0"
        onClick={onLockToggle}
        style={{ height: gui(16), left: gui(layout.lock.left), top: gui(layout.lock.top), width: gui(15) }}
        type="button"
      >
        <ModSprite
          left={0}
          sprite={createSpriteMeta[atlas.stockKeeperLocked.atlas]}
          src={locked ? atlas.stockKeeperLocked : atlas.stockKeeperUnlocked}
          top={0}
        />
      </button>
      {/* 物品视口（上游 scissor 21..205 × 17..高度−80） */}
      <ModScissorList
        height={height - layout.scissor.bottom - layout.scissor.top}
        left={layout.scissor.left}
        top={layout.scissor.top}
        width={layout.scissor.right - layout.scissor.left}
      >
        <StockRows rows={rows} />
      </ModScissorList>
      {/* 滚动条 */}
      <div className="absolute" style={{ left: gui(layout.scrollbar.left), top: gui(thumbTop), width: gui(5) }}>
        <ModSprite sprite={createSpriteMeta[atlas.stockKeeperScrollTop.atlas]} src={atlas.stockKeeperScrollTop} />
        <ModSprite left={0} sprite={createSpriteMeta[atlas.stockKeeperScrollMid.atlas]} src={atlas.stockKeeperScrollMid} top={4} />
        <ModSprite left={0} sprite={createSpriteMeta[atlas.stockKeeperScrollBot.atlas]} src={atlas.stockKeeperScrollBot} top={13} />
      </div>
      {/* 下单行（最多 9 格，数量溢出由数据方截断） */}
      <div className="absolute flex" style={{ gap: 0, left: gui(layout.items.left), top: gui(orderY) }}>
        {Array.from({ length: layout.columns }, (_, index) => {
          const item = order?.[index];
          return (
            <div key={index} style={{ width: gui(layout.colWidth) }}>
              <ModSprite left={1} sprite={createSpriteMeta[SLOT.atlas]} src={SLOT} top={1} />
              {item
                ? (
                    <div className="absolute" style={{ left: gui(2), top: gui(2) }}>
                      <ScreenItemSlot
                        frame={false}
                        item={item}
                        label={`order-${item.icon}`}
                        left={0}
                        size={16}
                        top={0}
                      />
                    </div>
                  )
                : null}
            </div>
          );
        })}
      </div>
      {/* 发送按钮（上游悬停显示 SEND_HOVER 高亮贴图，热区 78×18） */}
      <button
        aria-label="发送订单"
        className="group absolute block border-0 bg-transparent p-0"
        onClick={onSend}
        style={{
          height: gui(layout.send.hit.height),
          left: gui(layout.send.hit.left),
          top: gui(height - layout.send.hit.bottom),
          width: gui(layout.send.hit.width),
        }}
        type="button"
      >
        <span className="pointer-events-none absolute inset-0 hidden group-hover:block">
          <ModSprite
            left={2}
            sprite={createSpriteMeta[atlas.stockKeeperSendHover.atlas]}
            src={atlas.stockKeeperSendHover}
            top={-2}
          />
        </span>
        <span
          className="pointer-events-none absolute text-center font-mc mc-text"
          style={{ color: "#252525", left: 0, top: gui(4), width: gui(layout.send.hit.width) }}
        >
          发送
        </span>
      </button>
      {/* 地址输入框 */}
      <input
        aria-label="包裹地址"
        className="absolute bg-transparent font-mc mc-text outline-none"
        defaultValue={address}
        onChange={onAddressChange ? event => onAddressChange(event.currentTarget.value) : undefined}
        placeholder="包裹地址…"
        style={{
          color: "#714a40",
          height: gui(10),
          left: gui(layout.address.left),
          outline: "none",
          top: gui(height - layout.address.bottom),
          width: gui(layout.address.width),
        }}
        type="text"
      />
    </CreateWindow>
  );
}
