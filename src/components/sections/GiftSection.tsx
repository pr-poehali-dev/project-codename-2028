import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { setTariff } from "@/lib/useTariff"

const scrollToContact = (label: string) => {
  setTariff(label)
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

const CERTIFICATES = [
  {
    icon: "Bike",
    title: "Лёгкий старт",
    subtitle: "2 часа на квадроцикле",
    price: "3 500 ₽",
    features: ["Маршрут для новичков", "Полная экипировка", "Инструктаж"],
    highlight: false,
  },
  {
    icon: "Mountain",
    title: "Горное приключение",
    subtitle: "Полный день на трассе",
    price: "7 500 ₽",
    features: ["Маршрут среднего уровня", "Полная экипировка", "Гид весь день", "Обед на природе"],
    highlight: true,
  },
  {
    icon: "Star",
    title: "VIP-тур",
    subtitle: "Эксклюзивный маршрут",
    price: "14 000 ₽",
    features: ["Личный маршрут", "Полная экипировка", "Персональный гид", "Обед + фотосессия"],
    highlight: false,
  },
]

const GiftSection = () => {
  return (
    <section id="gift" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/70 mb-6">
            <Icon name="Gift" size={16} fallback="Gift" />
            Подарочные сертификаты
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Подари незабываемое
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-pretty">
            Лучший подарок — это впечатление. Сертификат действует 12 месяцев, именной, в красивом оформлении.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.title}
              className={`relative rounded-2xl p-6 flex flex-col gap-5 transition-colors ${
                cert.highlight
                  ? "bg-white text-black"
                  : "bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20"
              }`}
            >
              {cert.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black text-white text-xs font-semibold">
                  Популярный
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cert.highlight ? "bg-black/10" : "bg-white/10"}`}>
                <Icon name={cert.icon} size={24} fallback="Gift" className={cert.highlight ? "text-black" : "text-white"} />
              </div>

              <div>
                <h3 className={`text-xl font-bold mb-1 ${cert.highlight ? "text-black" : "text-white"}`}>{cert.title}</h3>
                <p className={`text-sm ${cert.highlight ? "text-black/60" : "text-white/50"}`}>{cert.subtitle}</p>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {cert.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={14} fallback="Check" className={cert.highlight ? "text-black/70" : "text-white/50"} />
                    <span className={cert.highlight ? "text-black/80" : "text-white/70"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between mt-2">
                <span className={`text-2xl font-bold ${cert.highlight ? "text-black" : "text-white"}`}>{cert.price}</span>
                <Button
                  onClick={() => scrollToContact(`Сертификат «${cert.title}»`)}
                  className={`rounded-full px-5 ${
                    cert.highlight
                      ? "bg-black text-white hover:bg-black/80"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  Заказать
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
          {[
            { icon: "Clock", text: "Действует 12 месяцев" },
            { icon: "FileText", text: "Именной сертификат" },
            { icon: "Send", text: "Доставка на email или почтой" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <Icon name={item.icon} size={16} fallback="Info" className="text-white/40" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GiftSection
