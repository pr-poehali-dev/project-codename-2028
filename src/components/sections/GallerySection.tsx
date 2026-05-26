import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const UPLOAD_URL = "https://functions.poehali.dev/70749088-9593-402e-baae-26d3558ec5bf"
const GET_URL = "https://functions.poehali.dev/9509305d-30ac-48cd-a828-5776791fd017"
const DELETE_URL = "https://functions.poehali.dev/c2d0c993-ee71-4b2b-8a0f-2fe4c3f0d784"

const urlToKey = (url: string) => {
  const match = url.match(/bucket\/(.+)$/)
  return match ? match[1] : ""
}

const GallerySection = () => {
  const [photos, setPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadPhotos = async () => {
    const res = await fetch(GET_URL)
    const data = await res.json()
    setPhotos(data.photos || [])
  }

  useEffect(() => { loadPhotos() }, [])

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const reader = new FileReader()
      await new Promise<void>((resolve) => {
        reader.onload = async (e) => {
          const dataUrl = e.target?.result as string
          await fetch(UPLOAD_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: dataUrl }),
          })
          resolve()
        }
        reader.readAsDataURL(file)
      })
    }
    await loadPhotos()
    setUploading(false)
  }

  const enterAdmin = () => {
    setShowPasswordInput(true)
    setPasswordError(false)
  }

  const exitAdmin = () => {
    setIsAdmin(false)
    sessionStorage.removeItem("admin_pwd")
  }

  const confirmLogin = async () => {
    const res = await fetch(DELETE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, key: "gallery/__check__" }),
    })
    if (res.status === 403) {
      setPasswordError(true)
      return
    }
    sessionStorage.setItem("admin_pwd", password)
    setIsAdmin(true)
    setShowPasswordInput(false)
    setPassword("")
    setPasswordError(false)
  }

  const deletePhoto = async (url: string) => {
    const key = urlToKey(url)
    if (!key) return
    setDeletingUrl(url)
    await fetch(DELETE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: sessionStorage.getItem("admin_pwd") || "", key }),
    })
    await loadPhotos()
    setDeletingUrl(null)
  }

  return (
    <section id="gallery" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">Галерея</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto text-pretty">
            Реальные фото наших туров — горные трассы, черноморские пейзажи и счастливые райдеры.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 flex items-center gap-2"
          >
            <Icon name={uploading ? "Loader" : "Upload"} size={18} fallback="Upload" className={uploading ? "animate-spin" : ""} />
            {uploading ? "Загрузка..." : "Добавить фото"}
          </Button>

          {!isAdmin && !showPasswordInput && (
            <button
              onClick={enterAdmin}
              className="text-white/30 hover:text-white/60 transition-colors text-sm"
            >
              <Icon name="Lock" size={16} fallback="Lock" />
            </button>
          )}

          {showPasswordInput && (
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false) }}
                onKeyDown={(e) => e.key === "Enter" && confirmLogin()}
                placeholder="Пароль"
                autoFocus
                className={`px-4 py-2 rounded-full bg-white/10 border text-white text-sm outline-none w-36 ${passwordError ? "border-red-400" : "border-white/20 focus:border-white/50"}`}
              />
              <button onClick={confirmLogin} className="text-white/60 hover:text-white transition-colors">
                <Icon name="ArrowRight" size={18} fallback="ArrowRight" />
              </button>
              <button onClick={() => { setShowPasswordInput(false); setPassword(""); setPasswordError(false) }} className="text-white/40 hover:text-white/70 transition-colors">
                <Icon name="X" size={16} fallback="X" />
              </button>
            </div>
          )}

          {isAdmin && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <Icon name="ShieldCheck" size={16} fallback="ShieldCheck" className="text-green-400" />
              <span className="text-sm text-white/70">Режим редактирования</span>
              <button onClick={exitAdmin} className="text-white/40 hover:text-white/70 transition-colors ml-1">
                <Icon name="X" size={14} fallback="X" />
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        {photos.length === 0 ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center py-24 gap-4 cursor-pointer hover:border-white/40 transition-colors"
          >
            <Icon name="ImagePlus" size={48} fallback="ImagePlus" className="text-white/30" />
            <p className="text-white/50 text-lg">Нажмите, чтобы загрузить первые фото</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((url, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-2xl overflow-hidden relative group"
              >
                <img
                  src={url}
                  alt={`Фото тура ${i + 1}`}
                  className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                  onClick={() => !isAdmin && setLightbox(url)}
                />
                {isAdmin && (
                  <button
                    onClick={() => deletePhoto(url)}
                    disabled={deletingUrl === url}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {deletingUrl === url
                      ? <Icon name="Loader" size={14} fallback="Loader" className="animate-spin" />
                      : <Icon name="Trash2" size={14} fallback="Trash2" />
                    }
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <Icon name="X" size={32} fallback="X" />
            </button>
            <img
              src={lightbox}
              alt="Фото тура"
              className="max-w-full max-h-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default GallerySection