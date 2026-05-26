import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "Нужен ли опыт вождения квадроцикла?",
    answer:
      "Нет, опыт не обязателен! Перед каждым туром наш инструктор проводит подробный инструктаж по управлению квадроциклом. Маршруты подбираются с учётом уровня подготовки группы — от лёгких прогулок до экстремальных трасс.",
  },
  {
    question: "Что входит в стоимость тура?",
    answer:
      "В стоимость включены: аренда квадроцикла, защитное снаряжение (шлем, перчатки, защитный костюм), инструктаж, сопровождение гида на протяжении всего маршрута и страховка. Личные вещи и фотографии на память — за отдельную плату.",
  },
  {
    question: "Какой возраст допускается к участию?",
    answer:
      "Управлять квадроциклом могут лица от 16 лет при наличии водительского удостоверения. Дети от 6 лет могут участвовать как пассажиры вместе со взрослым. Для детских маршрутов есть специальные детские квадроциклы.",
  },
  {
    question: "Как забронировать тур?",
    answer:
      "Оставьте заявку через форму на сайте или позвоните нам. Мы свяжемся с вами в течение часа, подберём удобное время и подтвердим бронь. Оплата возможна наличными или картой на месте.",
  },
]

const STEPS = [
  {
    num: "01",
    icon: "MapPin",
    emoji: "📍",
    title: "Встреча и инструктаж",
    desc: "Встречаемся в точке сбора в Новороссийске. Проводим краткий инструктаж по управлению и правилам безопасности, выдаём защитное снаряжение.",
    from: "from-amber-500/20",
    to: "to-orange-500/10",
    border: "border-amber-500/30",
    numColor: "text-amber-500/40",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    num: "02",
    icon: "Zap",
    emoji: "🏁",
    title: "Старт маршрута",
    desc: "Выезжаем колонной — гид ведёт группу по живописным трассам вдоль черноморского побережья и горных склонов Новороссийска.",
    from: "from-emerald-500/20",
    to: "to-teal-500/10",
    border: "border-emerald-500/30",
    numColor: "text-emerald-500/40",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    num: "03",
    icon: "Camera",
    emoji: "📸",
    title: "Остановки и фото",
    desc: "По ходу маршрута — живописные смотровые площадки с панорамами Цемесской бухты и гор. Останавливаемся для фото и отдыха.",
    from: "from-blue-500/20",
    to: "to-violet-500/10",
    border: "border-blue-500/30",
    numColor: "text-blue-500/40",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    num: "04",
    icon: "Star",
    emoji: "🎉",
    title: "Финиш и эмоции",
    desc: "Возвращаемся на базу. Делимся впечатлениями, фотографируемся у квадроциклов — и сразу хочется ехать ещё!",
    from: "from-rose-500/20",
    to: "to-pink-500/10",
    border: "border-rose-500/30",
    numColor: "text-rose-500/40",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
  },
]

const JourneyFaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <>
      {/* Journey Section */}
      <section className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-amber-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-blue-500/20 border border-amber-500/30 text-sm text-amber-300 mb-6">
              <Icon name="Route" size={16} fallback="Map" />
              Программа тура
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Как проходит тур
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-pretty">
              От встречи до финиша — вот что вас ждёт.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {STEPS.map((s) => (
              <div key={s.num} className={`relative rounded-2xl bg-gradient-to-br ${s.from} ${s.to} border ${s.border} p-8 h-80 flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-300`}>
                <div className="absolute top-3 right-3 text-5xl opacity-15 select-none pointer-events-none">{s.emoji}</div>
                <div className={`text-4xl font-black ${s.numColor} mb-4 leading-none`}>{s.num}.</div>
                <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
                  <Icon name={s.icon} size={20} fallback="Star" className={s.iconColor} />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{s.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 rounded-full px-12 py-4 text-lg font-bold shadow-lg shadow-amber-500/30"
            >
              Забронировать тур
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-violet-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="rounded-3xl bg-gradient-to-br from-white/5 to-violet-500/5 border border-white/10 backdrop-blur p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/15 border border-violet-500/30 text-sm text-violet-300 mb-6">
                  <Icon name="HelpCircle" size={16} fallback="HelpCircle" />
                  Вопросы и ответы
                </div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-white">
                  Частые вопросы
                </h2>
                <p className="text-xl text-white/70 leading-relaxed text-pretty">
                  Отвечаем на всё, что важно знать перед поездкой — от требований к участникам до бронирования.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === index ? "bg-violet-500/10 border-violet-500/30" : "bg-white/5 border-white/10 hover:border-white/20"}`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-lg font-semibold pr-4 text-white">{faq.question}</h3>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === index ? "bg-violet-500/30 text-violet-300" : "bg-white/10 text-white/60"}`}>
                        <Icon name={openFaq === index ? "Minus" : "Plus"} size={16} />
                      </div>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default JourneyFaqSection
