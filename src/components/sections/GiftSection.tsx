import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const PRESETS = [2000, 5000, 10000, 15000]
const SEND_GIFT_URL = "https://functions.poehali.dev/3032647f-6050-4630-b3d7-0aec94db9389"

type Step = "amount" | "form"
type Status = "idle" | "loading" | "success" | "error"

const GiftSection = () => {
  const [step, setStep] = useState<Step>("amount")
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState("")

  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const amount = custom ? parseInt(custom.replace(/\D/g, "")) || 0 : selected || 0

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(SEND_GIFT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'gift', recipient_email: recipientEmail, recipient_name: recipientName, sender_name: senderName, phone, amount }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

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
            Выбери любую сумму — получатель сам выберет маршрут, а сертификат покроет стоимость полностью или частично.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">

          {/* How it works */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 text-sm text-white/60">
            {[
              { icon: "Gift", text: "Покупаешь сертификат на нужную сумму" },
              { icon: "Map", text: "Получатель выбирает любой маршрут" },
              { icon: "CircleMinus", text: "Сумма сертификата вычитается из стоимости" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3 flex-1">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={s.icon} size={16} fallback="Info" className="text-white/60" />
                </div>
                <span>{s.text}</span>
              </div>
            ))}
          </div>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} fallback="CheckCircle" className="text-white" />
              </div>
              <p className="text-2xl font-bold mb-2">Сертификат отправлен!</p>
              <p className="text-white/50 mb-6">Письмо с сертификатом на {amount.toLocaleString("ru")} ₽ отправлено на {recipientEmail}</p>
              <button
                onClick={() => { setStatus("idle"); setStep("amount"); setRecipientEmail(""); setRecipientName(""); setSenderName(""); setPhone(""); setSelected(null); setCustom("") }}
                className="text-sm text-white/40 underline"
              >
                Оформить ещё один
              </button>
            </div>
          ) : step === "amount" ? (
            <>
              <p className="text-white/50 text-sm mb-4">Популярные суммы</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {PRESETS.map((val) => (
                  <button
                    key={val}
                    onClick={() => { setSelected(val); setCustom("") }}
                    className={`rounded-xl py-4 text-lg font-semibold transition-colors border ${
                      selected === val && !custom
                        ? "bg-white text-black border-white"
                        : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {val.toLocaleString("ru")} ₽
                  </button>
                ))}
              </div>

              <p className="text-white/50 text-sm mb-3">Или введи свою сумму</p>
              <div className="relative mb-8">
                <input
                  type="text"
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "")
                    setCustom(digits)
                    if (digits) setSelected(null)
                  }}
                  placeholder="Например, 8 000"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg outline-none focus:border-white/40 placeholder:text-white/20 pr-14"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 text-lg">₽</span>
              </div>

              <Button
                onClick={() => amount >= 500 && setStep("form")}
                disabled={amount < 500}
                className="w-full py-6 text-lg rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {amount >= 500 ? `Продолжить — ${amount.toLocaleString("ru")} ₽` : "Выбери сумму сертификата"}
              </Button>
            </>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <button type="button" onClick={() => setStep("amount")} className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-2 transition-colors">
                <Icon name="ArrowLeft" size={14} fallback="ArrowLeft" />
                Сумма: {amount.toLocaleString("ru")} ₽
              </button>

              <div>
                <label className="block text-sm text-white/50 mb-2">Email получателя *</label>
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="ivanova@example.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/40 placeholder:text-white/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Имя получателя</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Например, Мария"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/40 placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Ваше имя (от кого)</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Например, Александр"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/40 placeholder:text-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-2">Ваш телефон (для подтверждения оплаты)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (900) 000-00-00"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-white/40 placeholder:text-white/20"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">Не удалось отправить. Попробуйте позже или позвоните нам.</p>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-6 text-lg rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
              >
                {status === "loading" ? "Отправляем..." : `Отправить сертификат на ${amount.toLocaleString("ru")} ₽`}
              </Button>
              <p className="text-center text-white/30 text-xs">Сертификат действует 12 месяцев · Сразу после оплаты</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default GiftSection