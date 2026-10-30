import { IeCircuitTableScreen } from "./index";

/**
 * IeCircuitTableScreen 预览用例：逻辑电路编程器；该屏无 JSON 物品配方，
 * 材料 / 电路 / 产物槽留空。
 */
export function IeCircuitTableScreenDemo() {
  return (
    <IeCircuitTableScreen
      circuit={undefined}
      energy={{ max: 32000, value: 18000 }}
      inputRegisters={[0, 3]}
      materials={[]}
      name="门控逻辑"
      onNameChange={() => {}}
      onOperatorSelect={() => {}}
      onRegisterClick={() => {}}
      onSlotClick={() => {}}
      operators={["AND", "OR", "NOT", "XOR"]}
      output={undefined}
      outputRegister={5}
      selectedOperator={0}
    />
  );
}
