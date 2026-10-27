import type { ScreenItem } from "@verdigris/ui";

import {
  AdvancementsScreen,
  AnvilScreen,
  BeaconScreen,
  BlastFurnaceScreen,
  BookScreen,
  BossBar,
  BrewingStandScreen,
  CartographyTableScreen,
  ChestScreen,
  CrafterScreen,
  CraftingScreen,
  CreativeInventoryScreen,
  Crosshair,
  DispenserScreen,
  EnchantingScreen,
  ExperienceBar,
  FriendsScreen,
  FurnaceScreen,
  GamemodeSwitcher,
  GrindstoneScreen,
  HealthHungerBar,
  HopperScreen,
  HorseScreen,
  Hotbar,
  InventoryScreen,
  JumpBar,
  LanguageScreen,
  LoomScreen,
  MainMenu,
  MultiplayerScreen,
  NautilusScreen,
  PlayerList,
  RealmsScreen,
  RecipeBook,
  SettingsScreen,
  ShulkerBoxScreen,
  SignEdit,
  SmithingScreen,
  SmokerScreen,
  SocialInteractionsScreen,
  SpectatorMenu,
  StatisticsScreen,
  StatusEffects,
  StonecutterScreen,
  Toast,
  TradingScreen,
  WorldListScreen,
} from "@verdigris/ui";

const item: ScreenItem = { count: 1, icon: "diamond" };
const stone: ScreenItem = { count: 64, icon: "stone-block" };

export function GuiParityPage() {
  return (
    <div className="flex max-w-[1800px] flex-col gap-16">
      <h1 className="font-mc mc-text text-white mc-text-shadow">GUI parity · 26.4-snapshot-3</h1>
      <div className="flex flex-wrap items-start gap-16">
        <Frame label="Inventory">
          <InventoryScreen
            armorItems={[item, item, item, item]}
            craftItems={[stone, null, item, null]}
            craftResult={stone}
            hotbarItems={[stone, item, null, null, null, null, null, null, null]}
            mainItems={[stone, stone, stone, null, null, null, null, null, null]}
            offhandItem={item}
          />
        </Frame>
        <Frame label="Crafting">
          <CraftingScreen craftItems={[stone, stone, stone, null, null, null, null, null, null]} craftResult={item} />
        </Frame>
        <Frame label="Chest 3 rows">
          <ChestScreen items={[stone, item, item, null, null, null, null, null, null]} />
        </Frame>
        <Frame label="Chest 6 rows">
          <ChestScreen items={Array.from({ length: 54 }, () => stone)} rows={6} />
        </Frame>
        <Frame label="Furnace">
          <FurnaceScreen burnProgress={1} cookProgress={0.5} fuel={item} input={stone} output={item} />
        </Frame>
        <Frame label="Blast furnace">
          <BlastFurnaceScreen burnProgress={0.5} cookProgress={0.5} />
        </Frame>
        <Frame label="Smoker">
          <SmokerScreen burnProgress={0.2} cookProgress={0.8} />
        </Frame>
        <Frame label="Brewing stand">
          <BrewingStandScreen bottles={[item, item, item]} brewProgress={0.6} fuelProgress={0.75} />
        </Frame>
        <Frame label="Enchanting">
          <EnchantingScreen
            availableLevel={30}
            item={item}
            lapis={{ count: 3, icon: "lapis-lazuli" }}
            options={[
              { lapisCost: 1, level: 1, xpCost: 1 },
              { lapisCost: 2, level: 2, xpCost: 2 },
              { lapisCost: 3, level: 3, xpCost: 3 },
            ]}
          />
        </Frame>
        <Frame label="Anvil">
          <AnvilScreen item={item} levelCost={7} material={item} result={item} />
        </Frame>
        <Frame label="Beacon">
          <BeaconScreen
            payment={item}
            primaryOptions={[{ id: "speed", label: "速度" }, { id: "haste", label: "急迫" }]}
            secondaryOptions={[{ id: "regen", label: "生命恢复" }, { id: "resist", label: "抗性提升" }]}
          />
        </Frame>
        <Frame label="Shulker">
          <ShulkerBoxScreen items={[item, stone]} />
        </Frame>
        <Frame label="Hopper">
          <HopperScreen items={[stone, stone, stone]} />
        </Frame>
        <Frame label="Dispenser">
          <DispenserScreen items={[stone, item, stone]} />
        </Frame>
        <Frame label="Horse">
          <HorseScreen armor={item} chest saddle={item} />
        </Frame>
        <Frame label="Trading">
          <TradingScreen
            trades={[
              { inputA: item, inputB: stone, output: item },
              { inputA: stone, output: item },
            ]}
          />
        </Frame>
        <Frame label="Cartography">
          <CartographyTableScreen additional={item} input={stone} output={item} />
        </Frame>
        <Frame label="Grindstone">
          <GrindstoneScreen additional={item} input={stone} output={item} />
        </Frame>
        <Frame label="Loom">
          <LoomScreen banner={item} dye={item} output={item} pattern={item} />
        </Frame>
        <Frame label="Smithing">
          <SmithingScreen addition={item} base={stone} output={item} template={item} />
        </Frame>
        <Frame label="Stonecutter">
          <StonecutterScreen input={stone} output={item} recipes={[{ id: "stairs" }, { id: "slab" }]} />
        </Frame>
        <Frame label="Crafter">
          <CrafterScreen items={[stone, stone, stone]} output={item} />
        </Frame>
        <Frame label="Nautilus">
          <NautilusScreen armor={item} saddle={item} />
        </Frame>
        <Frame label="Creative">
          <CreativeInventoryScreen items={Array.from({ length: 45 }, () => stone)} />
        </Frame>
        <Frame label="Gamemode">
          <GamemodeSwitcher value={1} />
        </Frame>
      </div>
      <div className="flex flex-wrap items-start gap-16">
        <Frame label="HUD bars">
          <div className="flex flex-col gap-4">
            <HealthHungerBar absorption={4} armor={12} health={15} hunger={12} oxygen={8} />
            <ExperienceBar level={30} progress={0.6} />
            <Hotbar items={[{ count: 64, icon: "stone-block" }]} selectedIndex={0} />
            <JumpBar progress={0.4} />
            <BossBar color="red" name="Ender Dragon" value={0.75} />
          </div>
        </Frame>
        <Frame label="Crosshair / effects">
          <div className="flex items-start gap-8">
            <Crosshair attackIndicator={0.5} />
            <StatusEffects effects={[{ icon: "heart", name: "生命恢复" }, { icon: "sword", name: "力量" }]} />
          </div>
        </Frame>
        <Frame label="Main menu">
          <MainMenu />
        </Frame>
        <Frame label="Settings">
          <SettingsScreen />
        </Frame>
        <Frame label="Multiplayer">
          <MultiplayerScreen servers={[{ address: "mc.example.net", name: "Example" }]} />
        </Frame>
        <Frame label="Language">
          <LanguageScreen />
        </Frame>
        <Frame label="Recipe book">
          <RecipeBook categories={[{ name: "建筑", recipes: [{ output: { icon: "stone-block" }, unlocked: true }, { unlocked: false }] }]} />
        </Frame>
        <Frame label="Advancements">
          <AdvancementsScreen categories={[{ name: "minecraft", nodes: [{ done: true, icon: "stone-block", name: "Stone Age" }] }]} />
        </Frame>
        <Frame label="Sign edit">
          <SignEdit />
        </Frame>
        <Frame label="Book">
          <BookScreen pages={["Left page", "Right page"]} />
        </Frame>
        <Frame label="Toast">
          <Toast description="Recipe unlocked" icon="sprites/toast/recipe_book.png" title="New Recipe" />
        </Frame>
        <Frame label="Statistics">
          <StatisticsScreen groups={[{ name: "General", rows: [{ label: "Blocks mined", value: 42 }] }]} />
        </Frame>
        <Frame label="Social">
          <SocialInteractionsScreen players={[{ name: "Steve" }]} />
        </Frame>
        <Frame label="Spectator">
          <SpectatorMenu />
        </Frame>
        <Frame label="Realms">
          <RealmsScreen realms={[{ name: "My Realm", status: "open" }]} />
        </Frame>
        <Frame label="Friends">
          <FriendsScreen friends={[{ name: "Alex" }]} />
        </Frame>
        <Frame label="World list">
          <WorldListScreen worlds={[{ name: "World 1" }]} />
        </Frame>
        <Frame label="Player list">
          <PlayerList players={[{ name: "Steve", operator: true }]} />
        </Frame>
      </div>
    </div>
  );
}

/**
 * GUI parity board：30+ 原版界面的 2× 对照页。
 */
function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section className="flex flex-col gap-2">
      <span className="font-mc mc-text text-mc-text-dim">{label}</span>
      {children}
    </section>
  );
}
