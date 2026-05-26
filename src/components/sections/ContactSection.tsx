import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { QRCodeSVG } from "qrcode.react"

const SEND_LEAD_URL = "https://functions.poehali.dev/3032647f-6050-4630-b3d7-0aec94db9389"

const ContactSection = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      setName("")
      setPhone("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Свяжитесь с нами</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Contact Form */}
              <div className="rounded-2xl bg-white/95 text-black p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Оставить заявку</h3>
                {status === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} fallback="CheckCircle" className="text-green-600" />
                    </div>
                    <p className="text-xl font-semibold text-gray-800 mb-2">Заявка отправлена!</p>
                    <p className="text-gray-500 text-sm">Мы перезвоним вам в течение часа</p>
                    <button onClick={() => setStatus("idle")} className="mt-6 text-sm text-gray-400 underline">Отправить ещё</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Телефон</label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+7 (900) 000-00-00"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Комментарий</label>
                      <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Сколько человек, желаемая дата..."
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-red-500 text-sm">Не удалось отправить заявку. Попробуйте позже.</p>
                    )}
                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-3 font-normal text-base"
                    >
                      {status === "loading" ? "Отправка..." : "Отправить заявку"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-8">
                <div>
                  <p className="text-xl text-white/90 leading-relaxed text-pretty">
                    Готовы ответить на любые вопросы о турах, подобрать маршрут под ваши пожелания и забронировать удобное время. Перезвоним в течение часа!
                  </p>
                </div>

                <div className="rounded-2xl bg-white/95 text-black p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
                      <Icon name="Compass" size={28} fallback="Compass" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Квадро Ново</h4>
                      <p className="text-gray-600">Туры на квадроциклах</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon name="MapPin" size={18} fallback="MapPin" />
                      <span className="text-sm">г. Новороссийск, Краснодарский край</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon name="Clock" size={18} fallback="Clock" />
                      <span className="text-sm">Туры ежедневно с 8:00 до 20:00</span>
                    </div>
                    <a href="tel:+79184411331" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                      <Icon name="Phone" size={18} fallback="Phone" />
                      <span className="text-sm">+7 918 441-13-31</span>
                    </a>
                    <a href="tel:+79884730006" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                      <Icon name="Phone" size={18} fallback="Phone" />
                      <span className="text-sm">+7 988 473-00-06</span>
                    </a>
                    <a href="https://t.me/kvadronovo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                      <Icon name="Send" size={18} fallback="Send" />
                      <span className="text-sm">Telegram: @kvadronovo</span>
                    </a>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <a href="tel:+79184411331" className="flex-1">
                      <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2">
                        <Icon name="Phone" size={16} fallback="Phone" />
                        Позвонить
                      </Button>
                    </a>
                    <a href="https://wa.me/79184411331" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-green-500 text-white hover:bg-green-600 rounded-lg flex items-center justify-center gap-2">
                        <Icon name="MessageCircle" size={16} fallback="MessageCircle" />
                        WhatsApp
                      </Button>
                    </a>
                    <a href="https://t.me/kvadronovo" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center justify-center gap-2">
                        <Icon name="Send" size={16} fallback="Send" />
                        Telegram
                      </Button>
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-4">
                    <a href="https://t.me/kvadronovo" target="_blank" rel="noopener noreferrer" className="shrink-0">
                      <QRCodeSVG
                        value="https://t.me/kvadronovo"
                        size={96}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="M"
                      />
                    </a>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Написать в Telegram</p>
                      <p className="text-xs text-gray-500 mt-1">Наведите камеру телефона на код — и сразу попадёте в наш чат</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-2xl ring-1 ring-white/10 p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="Compass" size={24} />
                  <span className="text-xl font-semibold">Квадро Ново</span>
                </div>
                <p className="text-white/80 leading-relaxed text-pretty">
                  Туры на квадроциклах по Новороссийску и Черноморскому побережью. Яркие впечатления, надёжная техника и опытные гиды для всей семьи.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6">ТУРЫ</h3>
                <ul className="space-y-3">
                  {["Маршруты", "Цены", "Галерея", "Отзывы"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6">КОМПАНИЯ</h3>
                <ul className="space-y-3">
                  {["О нас", "Контакты", "Отзывы", "FAQ"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6">КОНТАКТЫ</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="tel:+79184411331" className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed">
                      +7 918 441-13-31
                    </a>
                  </li>
                  <li>
                    <a href="tel:+79884730006" className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed">
                      +7 988 473-00-06
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/kvadronovo" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed">
                      @kvadronovo
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">© 2024 Квадро Ново. Все права защищены.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-white/40 hover:text-white/70 transition-colors text-sm">Политика конфиденциальности</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ContactSection