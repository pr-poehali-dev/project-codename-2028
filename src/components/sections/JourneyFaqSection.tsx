import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

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

const JourneyFaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <>
      {/* Journey Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Как проходит тур</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
                От встречи до финиша — вот что вас ждёт.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">01.</div>
                  <h3 className="text-xl font-semibold mb-4">Встреча и инструктаж</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Встречаемся в точке сбора в Новороссийске. Проводим краткий инструктаж по управлению и правилам безопасности, выдаём защитное снаряжение.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">02.</div>
                  <h3 className="text-xl font-semibold mb-4">Старт маршрута</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Выезжаем колонной — гид ведёт группу по живописным трассам вдоль черноморского побережья и горных склонов Новороссийска.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">03.</div>
                  <h3 className="text-xl font-semibold mb-4">Остановки и фото</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    По ходу маршрута — живописные смотровые площадки с панорамами Цемесской бухты и гор. Останавливаемся для фото и отдыха.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-80 flex flex-col">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-white/60 mb-4">04.</div>
                  <h3 className="text-xl font-semibold mb-4">Финиш и эмоции</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Возвращаемся на базу. Делимся впечатлениями, фотографируемся у квадроциклов — и сразу хочется ехать ещё!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-4 text-lg font-semibold"
              >
                Забронировать тур
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                  Частые вопросы
                </h2>
                <p className="text-xl text-white/80 leading-relaxed text-pretty">
                  Отвечаем на всё, что важно знать перед поездкой — от требований к участникам до бронирования.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      {openFaq === index ? (
                        <Icon name="Minus" size={20} />
                      ) : (
                        <Icon name="Plus" size={20} />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
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
