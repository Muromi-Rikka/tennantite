import { IeCircuitTableScreen } from "./index";

/**
 * IeCircuitTableScreen 预览用例：AND(2) 指令编辑中，输入寄存器 0/3，输出寄存器 5。
 */
export function IeCircuitTableScreenDemo() {
  return (
    <IeCircuitTableScreen
      circuit={{ icon: "iron-ingot", tooltip: "逻辑电路板" }}
      energy={{ max: 32000, value: 18000 }}
      inputRegisters={[0, 3]}
      materials={[
        { icon: "iron-ingot", tooltip: "PCB 毛坯" },
        { icon: "iron-ingot", tooltip: "逻辑电路" },
        { icon: "charcoal", tooltip: "焊接材料" },
      ]}
      name="门控逻辑"
      onNameChange={() => {}}
      onOperatorSelect={() => {}}
      onRegisterClick={() => {}}
      onSlotClick={() => {}}
      operators={["AND", "OR", "NOT", "XOR"]}
      output={{ count: 2, icon: "iron-ingot", tooltip: "逻辑电路板" }}
      outputRegister={5}
      selectedOperator={0}
    />
  );
}
