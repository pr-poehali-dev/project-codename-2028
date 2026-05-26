import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const NAV_ITEMS = [
  { label: "Маршруты", id: "pricing" },
  { label: "Безопасность", id: "safety" },
  { label: "Сертификаты", id: "gift" },
  { label: "Галерея", id: "gallery" },
  { label: "Вопросы", id: "faq" },
  { label: "Контакты", id: "contact" },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

const STATS = [
  { value: "500+", label: "довольных райдеров" },
  { value: "12", label: "маршрутов" },
  { value: "5 лет", label: "опыта" },
]

const HeroSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url(https://cdn.poehali.dev/projects/701b977f-5121-46ae-a0cd-38f7c693e138/files/79c35941-37e7-494d-abea-1f6e27aa41ab.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />
        {/* Color grade */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 via-transparent to-blue-900/20" />
      </div>

      {/* Animated particles / glow spots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-rose-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }} />
      </div>

      {/* Navigation */}
      <nav className={`relative z-20 flex items-center justify-between p-6 transition-all duration-500 ${scrolled ? "py-4" : ""}`}>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/50 ring-1 ring-white/20 backdrop-blur rounded-full">
          <Icon name="Compass" size={20} className="text-amber-400" />
          <span className="font-bold text-white">Квадро Ново</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
              className="px-4 py-2 bg-black/40 ring-1 ring-white/15 backdrop-blur rounded-full hover:bg-white/10 hover:ring-white/30 transition-all text-white/80 hover:text-white text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full text-white/70">
            <Icon name="MapPin" size={16} className="text-amber-400" />
            <span className="text-sm">Новороссийск</span>
          </div>
          <Button
            onClick={() => scrollTo("contact")}
            className="hidden md:flex bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 rounded-full px-6 font-bold shadow-lg shadow-amber-500/30 transition-all"
          >
            Забронировать
          </Button>

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-black/50 ring-1 ring-white/20 backdrop-blur rounded-full text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} fallback="Menu" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="absolute inset-0 z-10 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-5">
          <div className="mb-4">
            <Icon name="Compass" size={40} className="text-amber-400" />
          </div>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); setMobileOpen(false) }}
              className="text-2xl font-medium text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button
            size="lg"
            onClick={() => { scrollTo("contact"); setMobileOpen(false) }}
            className="mt-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 rounded-full px-10 font-bold shadow-lg shadow-amber-500/30"
          >
            Забронировать
          </Button>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 backdrop-blur rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm font-medium text-amber-200">Туры на квадроциклах · Новороссийск и окрестности</span>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-9xl font-black tracking-tight mb-6 text-balance">
          <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">Квадро</span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Ново.</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/75 max-w-3xl mb-12 leading-relaxed text-pretty">
          Адреналин, горные трассы и черноморские пейзажи — незабываемые туры по Новороссийску и его живописным окрестностям.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button
            size="lg"
            onClick={() => scrollTo("contact")}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 rounded-full px-10 py-4 text-lg font-bold shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all hover:scale-105"
          >
            <Icon name="Zap" size={20} className="mr-2" />
            Забронировать тур
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("pricing")}
            className="bg-white/10 backdrop-blur border border-white/25 text-white hover:bg-white/20 rounded-full px-10 py-4 text-lg font-semibold transition-all hover:scale-105"
          >
            Смотреть маршруты
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{s.value}</span>
              <span className="text-white/50 text-sm">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Safety badge */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-black/40 ring-1 ring-white/15 backdrop-blur rounded-full text-white/70 text-sm">
          <Icon name="ShieldCheck" size={16} className="text-emerald-400" />
          <span>Безопасность — наш приоритет</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <Icon name="ChevronsDown" size={24} fallback="ChevronDown" />
      </div>
    </div>
  )
}

export default HeroSection
