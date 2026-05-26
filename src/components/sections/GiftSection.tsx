import Icon from "@/components/ui/icon"

const GiftSection = () => {
  return (
    <section id="gift" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/70 mb-6">
            <Icon name="Gift" size={16} fallback="Gift" />
            Подарочные сертификаты
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Подари незабываемое
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            Лучший подарок — это эмоции. Сертификат на тур по горам Новороссийска подойдёт на любой праздник.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {[
              { icon: "Gift", title: "Любая сумма", text: "Выбери номинал — от небольшого до полного покрытия тура" },
              { icon: "Map", title: "Свобода выбора", text: "Получатель сам выберет маршрут и удобную дату" },
              { icon: "Clock", title: "12 месяцев", text: "Сертификат действует год с момента приобретения" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon} size={20} fallback="Info" className="text-white/70" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{s.title}</p>
                  <p className="text-white/50 text-sm">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold text-lg mb-1">Как приобрести сертификат?</p>
              <p className="text-white/50 text-sm">Позвони или напиши нам — оформим за несколько минут</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+79184411331"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
              >
                <Icon name="Phone" size={18} fallback="Phone" />
                +7 918 441-13-31
              </a>
              <a
                href="tel:+79884730006"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
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
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GiftSection