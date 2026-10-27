"use client";

import { useState } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "../../../primitives/select/index";
import { ScreenItemSlot } from "../screen-slot";

export interface BeaconPower {
  id: string;
  label: string;
}

export interface BeaconScreenProps {
  className?: string;
  onConfirm?: (selection: {
    payment: boolean;
    primary: null | string;
    secondary: null | string;
  }) => void;
  /**
  * 支付槽（铁锭 / 金锭 / 钻石 / 绿宝石，(135,109)）
  */
  payment?: ScreenSlot;
  primaryOptions?: BeaconPower[];
  secondaryOptions?: BeaconPower[];
  title?: React.ReactNode;
}

/**
 * 信标界面（规格 §6）：230×219 面板 + 主/副效果选择 + 支付槽 + 确认按钮。
 */
export function BeaconScreen({
  className,
  onConfirm,
  payment,
  primaryOptions = [],
  secondaryOptions = [],
  title,
}: BeaconScreenProps) {
  const [primary, setPrimary] = useState<null | string>(null);
  const [secondary, setSecondary] = useState<null | string>(null);

  return (
    <ScreenPanel className={className} height={219} title={title} width={230}>
      <div
        className="absolute"
        style={{ left: gui(8), top: gui(8), width: gui(104) }}
      >
        <PowerSelect
          label="主效果"
          onChange={setPrimary}
          options={primaryOptions}
          value={primary}
        />
      </div>
      <div
        className="absolute"
        style={{ left: gui(118), top: gui(8), width: gui(104) }}
      >
        <PowerSelect
          label="副效果"
          onChange={setSecondary}
          options={secondaryOptions}
          value={secondary}
        />
      </div>
      <Button
        className="absolute w-104"
        onClick={() => {
          onConfirm?.({ payment: payment !== undefined, primary, secondary });
        }}
        style={{ left: gui(8), top: gui(109) }}
      >
        完成
      </Button>
      <ScreenItemSlot item={payment} label="信标支付槽" left={135} top={109} />
      <PlayerInventory hotbarY={194} x={35} y={136} />
    </ScreenPanel>
  );
}

function PowerSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: null | string) => void;
  options: BeaconPower[];
  value: null | string;
}) {
  return (
    <Select<string> onValueChange={onChange} value={value}>
      <SelectTrigger aria-label={label}>
        <SelectValue placeholder={`选择${label}`} />
        <SelectIcon />
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {options.map(option => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
