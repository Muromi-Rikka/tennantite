"use client";

import { useState } from "react";

import type { ScreenSlot } from "../types";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
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
  * 支付槽（铁锭 / 金锭 / 钻石 / 绿宝石）
  */
  payment?: ScreenSlot;
  primaryOptions?: BeaconPower[];
  secondaryOptions?: BeaconPower[];
  title?: React.ReactNode;
}

/**
 * 信标界面（规格 §6.2）：支付槽 + 主/副效果选择（Select）+ 确认按钮。
*/
export function BeaconScreen({
  className,
  onConfirm,
  payment,
  primaryOptions = [],
  secondaryOptions = [],
  title = "信标",
}: BeaconScreenProps) {
  const [primary, setPrimary] = useState<null | string>(null);
  const [secondary, setSecondary] = useState<null | string>(null);

  return (
    <Panel className={cn("inline-flex w-320 flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <div className="flex items-center gap-16">
        <Slot aria-label="信标支付槽" className="cursor-pointer p-1" size={48}>
          {payment
            ? (
                <ItemStack
                  count={payment.count}
                  icon={payment.icon}
                  size={40}
                  src={payment.src}
                />
              )
            : null}
        </Slot>
        <p className="font-readable text-mc text-mc-text-dim">
          放入铁锭 / 金锭 / 钻石 / 绿宝石以激活
        </p>
      </div>
      <PowerSelect
        label="主效果"
        onChange={setPrimary}
        options={primaryOptions}
        value={primary}
      />
      <PowerSelect
        label="副效果"
        onChange={setSecondary}
        options={secondaryOptions}
        value={secondary}
      />
      <Button
        onClick={() => {
          onConfirm?.({ payment: payment !== undefined, primary, secondary });
        }}
        variant="success"
      >
        完成
      </Button>
    </Panel>
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
