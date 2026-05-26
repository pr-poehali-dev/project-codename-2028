import Icon from "@/components/ui/icon"

const ITEMS = [
  {
    icon: "HardHat",
    emoji: "🪖",
    title: "Полная экипировка",
    desc: "Каждый участник получает шлем, наколенники, налокотники и перчатки. Ехать без защиты — не вариант.",
    from: "from-orange-500/20",
    to: "to-amber-500/10",
    border: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    glow: "shadow-orange-500/20",
  },
  {
    icon: "UserCheck",
    emoji: "🧗",
    title: "Опытный инструктор",
    desc: "Сертифицированный гид сопровождает группу от старта до финиша и следит за темпом каждого райдера.",
    from: "from-blue-500/20",
    to: "to-cyan-500/10",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
  {
    icon: "Radio",
    emoji: "📡",
    title: "Связь на маршруте",
    desc: "Рация и спутниковый трекер на каждом туре. Группа всегда на связи, координаты известны.",
    from: "from-violet-500/20",
    to: "to-purple-500/10",
    border: "border-violet-500/30",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    glow: "shadow-violet-500/20",
  },
  {
    icon: "HeartPulse",
    emoji: "🩺",
    title: "Аптечка и первая помощь",
    desc: "Инструктор имеет навыки первой помощи. В рюкзаке — полная аптечка для любой ситуации на трассе.",
    from: "from-rose-500/20",
    to: "to-pink-500/10",
    border: "border-rose-500/30",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    glow: "shadow-rose-500/20",
  },
  {
    icon: "CloudSun",
    emoji: "🌤️",
    title: "Контроль погоды",
    desc: "Маршрут согласовывается с прогнозом. При опасных условиях тур переносится — безопасность важнее графика.",
    from: "from-sky-500/20",
    to: "to-teal-500/10",
    border: "border-sky-500/30",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
    glow: "shadow-sky-500/20",
  },
  {
    icon: "Gauge",
    emoji: "🏔️",
    title: "Маршруты по уровню",
    desc: "Трассы подобраны под подготовку группы. Новички не едут по экстремальным склонам без должной подготовки.",
    from: "from-emerald-500/20",
    to: "to-green-500/10",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    glow: "shadow-emerald-500/20",
  },
]

const SafetySection = () => {
  return (
    <section id="safety" className="relative z-10 py-24 px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 text-sm text-emerald-300 mb-6">
            <Icon name="Shield" size={16} fallback="Shield" />
            Безопасность прежде всего
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
            Безопасность
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            Адреналин — да. Риск без подготовки — нет. Каждый тур спланирован так, чтобы ты вернулся домой с улыбкой.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className={`relative rounded-2xl border ${item.border} bg-gradient-to-br ${item.from} ${item.to} p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300 shadow-lg ${item.glow}`}
            >
              {/* Big emoji background */}
              <div className="absolute top-4 right-4 text-5xl opacity-15 select-none pointer-events-none">
                {item.emoji}
              </div>

              <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon name={item.icon} size={24} fallback="Shield" className={item.iconColor} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
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
