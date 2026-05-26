import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { setTariff } from "@/lib/useTariff"

const PRESETS = [2000, 5000, 10000, 15000]

const scrollToContact = (amount: number) => {
  setTariff(`Подарочный сертификат на ${amount.toLocaleString("ru")} ₽`)
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

const GiftSection = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState("")

  const amount = custom ? parseInt(custom.replace(/\D/g, "")) || 0 : selected || 0

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
          {/* Preset amounts */}
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

          {/* Custom amount */}
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

          {/* How it works */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 text-sm text-white/60">
            {[
              { icon: "Gift", text: "Покупаешь сертификат на нужную сумму" },
              { icon: "Map", text: "Получатель выбирает любой маршрут" },
              { icon: "CircleMinus", text: "Сумма сертификата вычитается из стоимости" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 flex-1">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={step.icon} size={16} fallback="Info" className="text-white/60" />
                </div>
                <span>{step.text}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => amount >= 500 && scrollToContact(amount)}
            disabled={amount < 500}
            className="w-full py-6 text-lg rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {amount >= 500
              ? `Заказать сертификат на ${amount.toLocaleString("ru")} ₽`
              : "Выбери сумму сертификата"}
          </Button>

          <p className="text-center text-white/30 text-xs mt-4">Сертификат действует 12 месяцев · Доставка на email</p>
        </div>
      </div>
    </section>
  )
}

export default GiftSection
