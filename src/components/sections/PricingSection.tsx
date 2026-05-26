import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { setTariff } from "@/lib/useTariff"

const scrollToContact = (tariff: string) => {
  setTariff(tariff)
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

const included = ["Снаряжение (шлем, защита)", "Инструктаж", "Гид на маршруте", "Фотосессия в живописных местах"]

const FEATURES = [
  { icon: "Sparkles", emoji: "✨", title: "Опытные инструкторы", desc: "Гиды со знанием каждой трассы и местности.", from: "from-amber-500/20", to: "to-orange-500/10", border: "border-amber-500/30", iconColor: "text-amber-400", iconBg: "bg-amber-500/20" },
  { icon: "ShieldCheck", emoji: "🛡️", title: "Полная безопасность", desc: "Шлемы, защита, страховка и проверенная техника.", from: "from-emerald-500/20", to: "to-teal-500/10", border: "border-emerald-500/30", iconColor: "text-emerald-400", iconBg: "bg-emerald-500/20" },
  { icon: "Wallet", emoji: "💎", title: "Всё включено", desc: "Квадроцикл, снаряжение и инструктаж в цене.", from: "from-blue-500/20", to: "to-cyan-500/10", border: "border-blue-500/30", iconColor: "text-blue-400", iconBg: "bg-blue-500/20" },
  { icon: "Users", emoji: "👨‍👩‍👧", title: "Для всех", desc: "Маршруты для новичков, семей и опытных райдеров.", from: "from-violet-500/20", to: "to-purple-500/10", border: "border-violet-500/30", iconColor: "text-violet-400", iconBg: "bg-violet-500/20" },
]

const PricingSection = () => {
  return (
    <>
      {/* Features Section */}
      <section className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[400px] h-[300px] bg-amber-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-violet-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className={`relative rounded-2xl bg-gradient-to-br ${f.from} ${f.to} border ${f.border} p-8 text-center hover:scale-[1.02] transition-transform duration-300 overflow-hidden`}>
                <div className="absolute top-3 right-3 text-4xl opacity-15 select-none pointer-events-none">{f.emoji}</div>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.iconBg} mb-6`}>
                  <Icon name={f.icon} size={24} className={f.iconColor} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{f.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/20 to-orange-500/20 border border-rose-500/30 text-sm text-rose-300 mb-6">
              <Icon name="Tag" size={16} fallback="Tag" />
              Прозрачные цены
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
              Цены на туры
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-pretty">
              Цена за квадроцикл — берите друзей, платить больше не придётся.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 2 hours */}
            <div className="relative rounded-3xl bg-gradient-to-br from-sky-500/15 to-blue-500/5 border border-sky-500/25 p-8 flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-4 right-4 text-5xl opacity-10 select-none pointer-events-none">⚡</div>
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/15 px-3 py-1 rounded-full">Короткий</span>
                <h3 className="text-2xl font-bold mt-4 text-white">2 часа</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">7 000</span>
                <span className="text-white/50 ml-2">₽ / квадроцикл</span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/75">
                    <Icon name="Check" size={16} className="text-sky-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => scrollToContact("2 часа — 7 000 ₽")} className="w-full bg-sky-500/20 hover:bg-sky-500/30 text-white rounded-full border border-sky-500/40">
                Забронировать
              </Button>
            </div>

            {/* 2-6 hours — popular */}
            <div className="relative rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-3xl" />
              <div className="absolute inset-[2px] bg-zinc-950 rounded-3xl" />
              <div className="relative p-8 flex flex-col flex-1">
                <div className="absolute top-4 right-4 text-5xl opacity-15 select-none pointer-events-none">🔥</div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                    Популярный
                  </span>
                </div>
                <div className="mb-6 mt-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Полудневной</span>
                  <h3 className="text-2xl font-bold mt-2 text-white">2–6 часов</h3>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">15 000</span>
                  <span className="text-white/50 ml-2">₽ / квадроцикл</span>
                </div>
                <ul className="space-y-3 mb-10 flex-1">
                  {included.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/75">
                      <Icon name="Check" size={16} className="text-amber-400 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={() => scrollToContact("2–6 часов — 15 000 ₽")} className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 rounded-full font-bold shadow-lg shadow-amber-500/30">
                  Забронировать
                </Button>
              </div>
            </div>

            {/* 12 hours */}
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/25 p-8 flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-4 right-4 text-5xl opacity-10 select-none pointer-events-none">🏔️</div>
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">Полный день</span>
                <h3 className="text-2xl font-bold mt-4 text-white">12 часов</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">25 000</span>
                <span className="text-white/50 ml-2">₽ / квадроцикл</span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/75">
                    <Icon name="Check" size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => scrollToContact("12 часов — 25 000 ₽")} className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-white rounded-full border border-emerald-500/40">
                Забронировать
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingSection
