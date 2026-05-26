import Icon from "@/components/ui/icon"

const ITEMS = [
  {
    icon: "HardHat",
    title: "Полная экипировка",
    desc: "Каждый участник получает шлем, наколенники, налокотники и перчатки. Ехать без защиты — не вариант.",
  },
  {
    icon: "UserCheck",
    title: "Опытный инструктор",
    desc: "Сертифицированный гид сопровождает группу от старта до финиша и следит за темпом каждого райдера.",
  },
  {
    icon: "Radio",
    title: "Связь на маршруте",
    desc: "Рация и спутниковый трекер на каждом туре. Группа всегда на связи, координаты известны.",
  },
  {
    icon: "HeartPulse",
    title: "Аптечка и первая помощь",
    desc: "Инструктор имеет навыки первой помощи. В рюкзаке — полная аптечка для любой ситуации на трассе.",
  },
  {
    icon: "CloudSun",
    title: "Контроль погоды",
    desc: "Маршрут согласовывается с прогнозом. При опасных условиях тур переносится — безопасность важнее графика.",
  },
  {
    icon: "Gauge",
    title: "Маршруты по уровню",
    desc: "Трассы подобраны под подготовку группы. Новички не едут по экстремальным склонам без должной подготовки.",
  },
]

const SafetySection = () => {
  return (
    <section id="safety" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Безопасность</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            Адреналин — да. Риск без подготовки — нет. Каждый тур спланирован так, чтобы ты вернулся домой с улыбкой.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4 hover:bg-white/8 hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={24} fallback="Shield" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SafetySection
