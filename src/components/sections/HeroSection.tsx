import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

const HeroSection = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://cdn.poehali.dev/projects/701b977f-5121-46ae-a0cd-38f7c693e138/files/79c35941-37e7-494d-abea-1f6e27aa41ab.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
          <Icon name="Compass" size={20} />
          <span className="font-medium text-balance">Квадро Ново</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Маршруты", id: "pricing" },
            { label: "Безопасность", id: "faq" },
            { label: "Галерея", id: "gallery" },
            { label: "Вопросы", id: "faq" },
            { label: "Контакты", id: "contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }) }}
              className="px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full hover:bg-black/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
            <Icon name="MapPin" size={16} />
            <span className="text-sm">Новороссийск</span>
          </div>
          <Button onClick={scrollToContact} className="bg-white text-black hover:bg-white/90 rounded-full px-6">Забронировать</Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        <div className="mb-6 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
          <span className="text-sm font-medium">Туры на квадроциклах — Новороссийск и окрестности</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance">Квадро Ново.</h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mb-12 leading-relaxed text-pretty">
          Адреналин, горные трассы и черноморские пейзажи — незабываемые туры на квадроциклах по Новороссийску и его живописным окрестностям.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button size="lg" onClick={scrollToContact} className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-4 text-lg">
            Забронировать тур
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-black/40 ring-1 ring-white/20 backdrop-blur border-0 text-white hover:bg-black/50 rounded-full px-8 py-4 text-lg"
          >
            Смотреть маршруты
          </Button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
          <Icon name="Lock" size={16} />
          <span className="text-sm font-medium">Безопасность — наш приоритет</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection