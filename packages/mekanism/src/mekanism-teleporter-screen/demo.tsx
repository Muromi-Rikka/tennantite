import { MekanismTeleporterScreen } from "../index";

export function MekanismTeleporterScreenDemo() {
  return (
    <MekanismTeleporterScreen
      currentFrequency={{ color: "#59c15f", id: "home", label: "home (Steve)", owner: "Steve", security: "public" }}
      energySlot={{ count: 1, icon: "iron-ingot", tooltip: "充能物品" }}
      frequencies={[
        { color: "#59c15f", id: "home", label: "home (Steve)", owner: "Steve", security: "public" },
        { id: "base", label: "base (Alex)", owner: "Alex", security: "private" },
        { id: "hub", label: "hub (Steve)", owner: "Steve", security: "protected" },
        { id: "farm", label: "farm (Alex)", owner: "Alex", security: "public" },
        { id: "mine", label: "mine (Steve)", owner: "Steve", security: "public" },
      ]}
      selectedFrequencyId="home"
      status="ready"
    />
  );
}
