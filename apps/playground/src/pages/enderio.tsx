import {
  EioAlloySmelterScreenDemo,
  EioAttractorScreenDemo,
  EioAversionScreenDemo,
  EioBufferScreenDemo,
  EioCapacitorBankScreenDemo,
  EioCombustionGeneratorScreenDemo,
  EioCrafterScreenDemo,
  EioDialingDeviceScreenDemo,
  EioDrainScreenDemo,
  EioEnchanterScreenDemo,
  EioFarmStationScreenDemo,
  EioImpulseHopperScreenDemo,
  EioInhibitorScreenDemo,
  EioKillerJoeScreenDemo,
  EioLavaGeneratorScreenDemo,
  EioNiardScreenDemo,
  EioPaintingMachineScreenDemo,
  EioPoweredSpawnerScreenDemo,
  EioProgressesDemo,
  EioRelocatorScreenDemo,
  EioSagMillScreenDemo,
  EioSliceAndSpliceScreenDemo,
  EioSoulBinderScreenDemo,
  EioSoulEngineScreenDemo,
  EioStirlingGeneratorScreenDemo,
  EioTankScreenDemo,
  EioTelePadScreenDemo,
  EioTransceiverScreenDemo,
  EioTravelAnchorScreenDemo,
  EioVacuumChestScreenDemo,
  EioVatScreenDemo,
  EioWeatherObeliskScreenDemo,
  EioWiredChargerScreenDemo,
  EioWirelessChargerScreenDemo,
  EioXpObeliskScreenDemo,
  EioXpVacuumScreenDemo,
} from "@tennantite/enderio/demos";

export function EnderioPage() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        Ender IO（末影接口）— Mod 界面
      </h1>
      <p className="mb-16 font-mc mc-text text-mc-text-dim">
        Ender IO 26.3 原始贴图复刻（数据注入、无游戏逻辑）。
      </p>
      <Section title="EioAlloySmelterScreen — 合金炉">
        <EioAlloySmelterScreenDemo />
      </Section>
      <Section title="EioSagMillScreen — SAG 磨粉机">
        <EioSagMillScreenDemo />
      </Section>
      <Section title="EioStirlingGeneratorScreen — 斯特林发电机">
        <EioStirlingGeneratorScreenDemo />
      </Section>
      <Section title="EioProgresses — 进度列表">
        <EioProgressesDemo />
      </Section>
      <Section title="EioSoulBinderScreen — 灵魂绑定器">
        <EioSoulBinderScreenDemo />
      </Section>
      <Section title="EioCapacitorBankScreen — 电容组">
        <EioCapacitorBankScreenDemo />
      </Section>
      <Section title="EioPaintingMachineScreen — 涂色机">
        <EioPaintingMachineScreenDemo />
      </Section>
      <Section title="EioSliceAndSpliceScreen — 切片拼接机">
        <EioSliceAndSpliceScreenDemo />
      </Section>
      <Section title="EioEnchanterScreen — 附魔台">
        <EioEnchanterScreenDemo />
      </Section>
      <Section title="EioCombustionGeneratorScreen — 燃烧发电机">
        <EioCombustionGeneratorScreenDemo />
      </Section>
      <Section title="EioLavaGeneratorScreen — 岩浆发电机">
        <EioLavaGeneratorScreenDemo />
      </Section>
      <Section title="EioSoulEngineScreen — 灵魂发动机">
        <EioSoulEngineScreenDemo />
      </Section>
      <Section title="EioVatScreen — 发酵桶">
        <EioVatScreenDemo />
      </Section>
      <Section title="EioTankScreen — 流体坦克">
        <EioTankScreenDemo />
      </Section>
      <Section title="EioDrainScreen — 抽液器">
        <EioDrainScreenDemo />
      </Section>
      <Section title="EioNiardScreen — 泼洒器">
        <EioNiardScreenDemo />
      </Section>
      <Section title="EioWiredChargerScreen — 有线充电器">
        <EioWiredChargerScreenDemo />
      </Section>
      <Section title="EioWirelessChargerScreen — 无线充电器">
        <EioWirelessChargerScreenDemo />
      </Section>
      <Section title="EioPoweredSpawnerScreen — 刷怪笼">
        <EioPoweredSpawnerScreenDemo />
      </Section>
      <Section title="EioXpObeliskScreen — 经验方尖碑">
        <EioXpObeliskScreenDemo />
      </Section>
      <Section title="EioXpVacuumScreen — 经验真空机">
        <EioXpVacuumScreenDemo />
      </Section>
      <Section title="EioImpulseHopperScreen — 脉冲漏斗">
        <EioImpulseHopperScreenDemo />
      </Section>
      <Section title="EioCrafterScreen — 制造机">
        <EioCrafterScreenDemo />
      </Section>
      <Section title="EioFarmStationScreen — 农业站">
        <EioFarmStationScreenDemo />
      </Section>
      <Section title="EioVacuumChestScreen — 真空箱">
        <EioVacuumChestScreenDemo />
      </Section>
      <Section title="EioAttractorScreen — 吸引方尖碑">
        <EioAttractorScreenDemo />
      </Section>
      <Section title="EioAversionScreen — 驱离方尖碑">
        <EioAversionScreenDemo />
      </Section>
      <Section title="EioInhibitorScreen — 阻慑方尖碑">
        <EioInhibitorScreenDemo />
      </Section>
      <Section title="EioRelocatorScreen — 中继方尖碑">
        <EioRelocatorScreenDemo />
      </Section>
      <Section title="EioWeatherObeliskScreen — 天气方尖碑">
        <EioWeatherObeliskScreenDemo />
      </Section>
      <Section title="EioKillerJoeScreen — 杀戮乔">
        <EioKillerJoeScreenDemo />
      </Section>
      <Section title="EioBufferScreen — 缓冲器">
        <EioBufferScreenDemo />
      </Section>
      <Section title="EioTravelAnchorScreen — 旅行锚点">
        <EioTravelAnchorScreenDemo />
      </Section>
      <Section title="EioDialingDeviceScreen — 拨号装置">
        <EioDialingDeviceScreenDemo />
      </Section>
      <Section title="EioTelePadScreen — 传送板">
        <EioTelePadScreenDemo />
      </Section>
      <Section title="EioTransceiverScreen — 传输器">
        <EioTransceiverScreenDemo />
      </Section>
    </div>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 font-mc mc-text text-white mc-text-shadow">{title}</h2>
      {children}
    </section>
  );
}
