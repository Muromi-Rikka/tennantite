import { MekanismSecurityDeskScreen } from "../index";

export function MekanismSecurityDeskScreenDemo() {
  return (
    <MekanismSecurityDeskScreen
      bottomItem={{ count: 1, icon: "iron-ingot", tooltip: "展示物品" }}
      owner="Steve"
      security="private"
      securityLight="enabled"
      topItem={{ count: 1, icon: "gold-ingot", tooltip: "展示物品" }}
      trusted={[
        { icon: "item/upgrade/filter", id: "alice", label: "Alice" },
        { id: "bob", label: "Bob" },
        { id: "carol", label: "Carol" },
        { id: "dave", label: "Dave" },
        { id: "erin", label: "Erin" },
      ]}
    />
  );
}
