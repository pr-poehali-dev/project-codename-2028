import Icon from "@/components/ui/icon"

const GiftSection = () => {
  return (
    <section id="gift" className="relative z-10 py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-sm text-amber-300 mb-6">
            <Icon name="Gift" size={16} fallback="Gift" />
            Подарочные сертификаты
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
            Подари незабываемое
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            Лучший подарок — это эмоции. Сертификат на тур по горам Новороссийска подойдёт на любой праздник.
          </p>
        </div>

        {/* Main card */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Card gradient border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/30 via-white/5 to-rose-500/20 p-px">
            <div className="w-full h-full rounded-3xl bg-black/60 backdrop-blur-sm" />
          </div>

          <div className="relative p-8 md:p-12">
            {/* Features */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {[
                { icon: "Gift", title: "Любая сумма", text: "Выбери номинал — от небольшого до полного покрытия тура", color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400" },
                { icon: "Map", title: "Свобода выбора", text: "Получатель сам выберет маршрут и удобную дату", color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400" },
                { icon: "Clock", title: "12 месяцев", text: "Сертификат действует год с момента приобретения", color: "from-blue-500/20 to-violet-500/20", iconColor: "text-blue-400" },
              ].map((s, i) => (
                <div key={i} className={`flex items-start gap-4 flex-1 rounded-2xl bg-gradient-to-br ${s.color} border border-white/10 p-5`}>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={s.icon} size={20} fallback="Info" className={s.iconColor} />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{s.title}</p>
                    <p className="text-white/50 text-sm">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white font-bold text-xl mb-1">Как приобрести сертификат?</p>
                <p className="text-white/50 text-sm">Позвони или напиши нам — оформим за несколько минут</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+79184411331"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-black font-semibold hover:from-amber-300 hover:to-orange-300 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Icon name="Phone" size={18} fallback="Phone" />
                  +7 918 441-13-31
                </a>
                <a
                  href="tel:+79884730006"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-black font-semibold hover:from-amber-300 hover:to-orange-300 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Icon name="Phone" size={18} fallback="Phone" />
                  +7 988 473-00-06
                </a>
                <a
                  href="https://t.me/kvadronovo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Icon name="Send" size={18} fallback="Send" />
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GiftSection
