import type { ScreenSlot } from "@tennantite/ui";
import type { MekanismListRow } from "../mekanism-list/index";
import { MekanismButton } from "../mekanism-button/index";
import { MekanismElementHolder } from "../mekanism-element-holder/index";
import { MekanismImageButton } from "../mekanism-image-button/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismLabel } from "../mekanism-label/index";
import { MekanismList } from "../mekanism-list/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismSwitch } from "../mekanism-switch/index";
import { MekanismTextField } from "../mekanism-text-field/index";

export interface MekanismDigitalMinerConfigScreenProps {
  className?: string;
  /**
   * 过滤器总数文本
   */
  filterCount?: string;
  /**
   * 过滤器列表（数据全量注入，MekanismList 渲染层截断为 4 行）
   */
  filters?: MekanismListRow[];
  /**
   * 最大 Y
   */
  maxY?: string;
  /**
   * 最小 Y
   */
  minY?: string;
  onBack?: () => void;
  onFilterClick?: (id: string) => void;
  onInverseChange?: (isEnabled: boolean) => void;
  onMaxYChange?: (value: string) => void;
  onMinYChange?: (value: string) => void;
  onNewFilter?: () => void;
  onRadiusChange?: (value: string) => void;
  onToggleRequireReplacement?: () => void;
  playerName?: string;
  /**
   * 挖掘半径
   */
  radius?: string;
  /**
   * 反向替换目标物品
   */
  replaceTarget?: ScreenSlot;
  /**
   * 反向挖掘是否要求替换方块
   */
  requireReplacement?: boolean;
  scroll?: number;
  selectedFilterId?: string;
}

/**
 * 数字采矿机配置：276×254，GuiFilterHolder + GuiDigitalMinerConfig。左侧信息内屏 +
 * 右侧过滤器列表（4 行 FilterButton + 滚动条）+ 新建过滤器 + 半径/最小 Y/最大 Y 数字输入 +
 * 反向开关与替换槽（坐标自上游 GuiDigitalMinerConfig@d4df9b3）。
 */
export function MekanismDigitalMinerConfigScreen({
  className,
  filterCount = "0",
  filters = [],
  maxY,
  minY,
  onBack,
  onFilterClick,
  onInverseChange,
  onMaxYChange,
  onMinYChange,
  onNewFilter,
  onRadiusChange,
  onToggleRequireReplacement,
  playerName = "玩家",
  radius,
  replaceTarget,
  requireReplacement = false,
  scroll = 0,
  selectedFilterId,
}: MekanismDigitalMinerConfigScreenProps) {
  return (
    <MekanismScreen
      className={className}
      height={254}
      inventoryLabel={{ text: playerName, x: 58, y: 160 }}
      playerInventory={{ hotbarY: 230, x: 58, y: 172 }}
      title="数字采矿机过滤器"
      titleX={19}
      width={276}
    >
      <MekanismInnerScreen height={140} left={9} top={17} width={85} />
      <MekanismLabel left={9} top={22} variant="screen" width={79}>
        {`过滤器：${filterCount}`}
      </MekanismLabel>
      <MekanismLabel left={9} top={35} variant="screen" width={79}>
        {`半径：${radius ?? "—"}`}
      </MekanismLabel>
      <MekanismLabel left={9} top={61} variant="screen" width={79}>
        {`最小 Y：${minY ?? "—"}`}
      </MekanismLabel>
      <MekanismLabel left={9} top={88} variant="screen" width={79}>
        {`最大 Y：${maxY ?? "—"}`}
      </MekanismLabel>
      <MekanismElementHolder height={118} left={95} top={17} width={158} />
      <MekanismElementHolder height={22} left={95} top={135} width={158} />
      <MekanismList
        left={96}
        onRowClick={onFilterClick}
        rows={filters}
        scroll={scroll}
        selectedId={selectedFilterId}
        top={18}
        variant="filter"
        visibleRows={4}
        width={156}
      />
      <MekanismButton
        height={20}
        label="新建过滤器"
        left={96}
        onClick={onNewFilter}
        top={136}
        width={156}
      />
      <MekanismImageButton
        height={11}
        label="返回"
        left={5}
        name="button/back"
        onClick={onBack}
        top={5}
        width={11}
      />
      <MekanismSwitch
        icon="inverse"
        isChecked={requireReplacement}
        label="反向挖掘"
        left={10}
        onChange={onInverseChange}
        top={115}
      />
      <MekanismSlot item={replaceTarget} label="inverse-replace" left={13} top={135} type="normal" />
      <MekanismImageButton
        height={16}
        label="要求替换方块"
        left={35}
        name="button/exclamation"
        onClick={onToggleRequireReplacement}
        top={137}
        width={14}
      />
      <MekanismTextField
        defaultValue={radius}
        height={11}
        label="半径"
        left={13}
        onChange={onRadiusChange}
        top={45}
        width={38}
      />
      <MekanismTextField
        defaultValue={minY}
        height={11}
        label="最小 Y"
        left={13}
        onChange={onMinYChange}
        top={71}
        width={38}
      />
      <MekanismTextField
        defaultValue={maxY}
        height={11}
        label="最大 Y"
        left={13}
        onChange={onMaxYChange}
        top={98}
        width={38}
      />
    </MekanismScreen>
  );
}
