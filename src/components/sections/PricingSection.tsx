import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

const included = ["Снаряжение (шлем, защита)", "Инструктаж", "Гид на маршруте", "Фотосессия в живописных местах"]

const PricingSection = () => {
  return (
    <>
      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="Sparkles" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Опытные инструкторы</h3>
              <p className="text-white/80 leading-relaxed">Гиды со знанием каждой трассы и местности.</p>
            </div>

            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="ShieldCheck" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Полная безопасность</h3>
              <p className="text-white/80 leading-relaxed">Шлемы, защита, страховка и проверенная техника.</p>
            </div>

            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="Wallet" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Всё включено</h3>
              <p className="text-white/80 leading-relaxed">Квадроцикл, снаряжение и инструктаж в цене.</p>
            </div>

            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Icon name="Users" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Для всех</h3>
              <p className="text-white/80 leading-relaxed">Маршруты для новичков, семей и опытных райдеров.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Цены на туры</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              Цена за квадроцикл — берите друзей, платить больше не придётся.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 2 hours */}
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-sm font-medium uppercase tracking-wider text-white/50">Короткий</span>
                <h3 className="text-2xl font-bold mt-2">2 часа</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold">7 000</span>
                <span className="text-white/60 ml-2">₽ / квадроцикл</span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <Icon name="Check" size={18} className="text-green-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToContact} className="w-full bg-white/10 hover:bg-white/20 text-white rounded-full border-0 ring-1 ring-white/20">
                Забронировать
              </Button>
            </div>

            {/* 2-6 hours */}
            <div className="rounded-3xl bg-white ring-1 ring-white/10 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                Популярный
              </div>
              <div className="mb-6">
                <span className="text-sm font-medium uppercase tracking-wider text-black/50">Полудневной</span>
                <h3 className="text-2xl font-bold mt-2 text-black">2–6 часов</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-black">15 000</span>
                <span className="text-black/60 ml-2">₽ / квадроцикл</span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-black/80">
                    <Icon name="Check" size={18} className="text-green-600 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToContact} className="w-full bg-black text-white hover:bg-black/80 rounded-full">
                Забронировать
              </Button>
            </div>

            {/* 12 hours */}
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-sm font-medium uppercase tracking-wider text-white/50">Полный день</span>
                <h3 className="text-2xl font-bold mt-2">12 часов</h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold">25 000</span>
                <span className="text-white/60 ml-2">₽ / квадроцикл</span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <Icon name="Check" size={18} className="text-green-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToContact} className="w-full bg-white/10 hover:bg-white/20 text-white rounded-full border-0 ring-1 ring-white/20">
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