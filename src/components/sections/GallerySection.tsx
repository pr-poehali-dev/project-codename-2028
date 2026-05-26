import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const UPLOAD_URL = "https://functions.poehali.dev/70749088-9593-402e-baae-26d3558ec5bf"
const GET_URL = "https://functions.poehali.dev/9509305d-30ac-48cd-a828-5776791fd017"
const DELETE_URL = "https://functions.poehali.dev/c2d0c993-ee71-4b2b-8a0f-2fe4c3f0d784"

type Photo = { url: string; caption: string }

const GallerySection = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [uploading, setUploading] = useState(false)
  const [lightbox, setLightbox] = useState<Photo | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [captions, setCaptions] = useState<string[]>([])
  const [editingCaption, setEditingCaption] = useState<{ url: string; value: string } | null>(null)
  const [savingCaption, setSavingCaption] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadPhotos = async () => {
    const res = await fetch(GET_URL, { cache: "no-store" })
    const data = await res.json()
    setPhotos(data.photos || [])
  }

  useEffect(() => { loadPhotos() }, [])

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const MAX = 1600
        let { width, height } = img
        if (width > MAX || height > MAX) {
          if (width > height) { height = Math.round(height * MAX / width); width = MAX }
          else { width = Math.round(width * MAX / height); height = MAX }
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height)
        URL.revokeObjectURL(url)
        resolve(canvas.toDataURL("image/jpeg", 0.85))
      }
      img.src = url
    })
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const arr = Array.from(files)
    setPendingFiles(arr)
    setCaptions(arr.map(() => ""))
  }

  const uploadPending = async () => {
    if (pendingFiles.length === 0) return
    setUploading(true)
    await Promise.all(
      pendingFiles.map(async (file, i) => {
        const dataUrl = await compressImage(file)
        await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: dataUrl, caption: captions[i] || "" }),
        })
      })
    )
    setPendingFiles([])
    setCaptions([])
    await loadPhotos()
    setUploading(false)
  }

  const cancelPending = () => {
    setPendingFiles([])
    setCaptions([])
    if (inputRef.current) inputRef.current.value = ""
  }

  const enterAdmin = () => {
    setShowPasswordInput(true)
    setPasswordError(false)
  }

  const exitAdmin = () => {
    setIsAdmin(false)
    sessionStorage.removeItem("admin_pwd")
    setEditingCaption(null)
  }

  const confirmLogin = async () => {
    const res = await fetch(DELETE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, url: "__check__" }),
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
    setDeletingUrl(url)
    await fetch(DELETE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: sessionStorage.getItem("admin_pwd") || "", url, action: "delete" }),
    })
    await loadPhotos()
    setDeletingUrl(null)
  }

  const saveCaption = async () => {
    if (!editingCaption) return
    setSavingCaption(true)
    await fetch(DELETE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: sessionStorage.getItem("admin_pwd") || "",
        url: editingCaption.url,
        caption: editingCaption.value,
        action: "update_caption",
      }),
    })
    setPhotos((prev) => prev.map((p) => p.url === editingCaption.url ? { ...p, caption: editingCaption.value } : p))
    setEditingCaption(null)
    setSavingCaption(false)
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
            onChange={(e) => handleFileSelect(e.target.files)}
          />

          {isAdmin && pendingFiles.length === 0 && (
            <Button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 flex items-center gap-2"
            >
              <Icon name="Upload" size={18} fallback="Upload" />
              Добавить фото
            </Button>
          )}

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

          {isAdmin && pendingFiles.length === 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <Icon name="ShieldCheck" size={16} fallback="ShieldCheck" className="text-green-400" />
              <span className="text-sm text-white/70">Режим редактирования</span>
              <button onClick={exitAdmin} className="text-white/40 hover:text-white/70 transition-colors ml-1">
                <Icon name="X" size={14} fallback="X" />
              </button>
            </div>
          )}
        </div>

        {/* Pending files — caption inputs */}
        {pendingFiles.length > 0 && (
          <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/70 text-sm mb-4">Добавьте подписи к фото (необязательно):</p>
            <div className="flex flex-col gap-3 mb-6">
              {pendingFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    alt=""
                  />
                  <input
                    type="text"
                    value={captions[i]}
                    onChange={(e) => {
                      const next = [...captions]
                      next[i] = e.target.value
                      setCaptions(next)
                    }}
                    placeholder={`Подпись к фото ${i + 1}`}
                    className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm outline-none focus:border-white/50 placeholder:text-white/30"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={uploadPending}
                disabled={uploading}
                className="bg-white text-black hover:bg-white/90 rounded-full px-6 flex items-center gap-2"
              >
                <Icon name={uploading ? "Loader" : "Upload"} size={16} fallback="Upload" className={uploading ? "animate-spin" : ""} />
                {uploading ? "Загрузка..." : `Загрузить ${pendingFiles.length > 1 ? `${pendingFiles.length} фото` : "фото"}`}
              </Button>
              <button onClick={cancelPending} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        {photos.length === 0 ? (
          <div
            onClick={() => isAdmin && inputRef.current?.click()}
            className={`rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center py-24 gap-4 transition-colors ${isAdmin ? "cursor-pointer hover:border-white/40" : ""}`}
          >
            <Icon name="ImagePlus" size={48} fallback="ImagePlus" className="text-white/30" />
            <p className="text-white/50 text-lg">{isAdmin ? "Нажмите, чтобы загрузить первые фото" : "Фото появятся совсем скоро"}</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden relative group">
                <img
                  src={photo.url}
                  alt={photo.caption || `Фото тура ${i + 1}`}
                  className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                  onClick={() => !isAdmin && setLightbox(photo)}
                />

                {/* Caption — view or edit */}
                {isAdmin ? (
                  editingCaption?.url === photo.url ? (
                    <div className="px-3 py-2 bg-black/50 flex items-center gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={editingCaption.value}
                        onChange={(e) => setEditingCaption({ ...editingCaption, value: e.target.value })}
                        onKeyDown={(e) => { if (e.key === "Enter") saveCaption(); if (e.key === "Escape") setEditingCaption(null) }}
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30 min-w-0"
                        placeholder="Подпись..."
                      />
                      <button onClick={saveCaption} disabled={savingCaption} className="text-green-400 hover:text-green-300 flex-shrink-0">
                        {savingCaption ? <Icon name="Loader" size={14} fallback="Loader" className="animate-spin" /> : <Icon name="Check" size={14} fallback="Check" />}
                      </button>
                      <button onClick={() => setEditingCaption(null)} className="text-white/40 hover:text-white/70 flex-shrink-0">
                        <Icon name="X" size={14} fallback="X" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingCaption({ url: photo.url, value: photo.caption })}
                      className="w-full text-left px-3 py-2 bg-black/40 hover:bg-black/60 transition-colors flex items-center gap-2 group/caption"
                    >
                      <span className="text-sm flex-1 min-w-0 truncate">
                        {photo.caption
                          ? <span className="text-white/90">{photo.caption}</span>
                          : <span className="text-white/30 italic">Добавить подпись...</span>
                        }
                      </span>
                      <Icon name="Pencil" size={12} fallback="Pencil" className="text-white/30 group-hover/caption:text-white/70 flex-shrink-0" />
                    </button>
                  )
                ) : (
                  photo.caption && (
                    <div className="px-3 py-2 bg-black/40 backdrop-blur-sm">
                      <p className="text-white/90 text-sm">{photo.caption}</p>
                    </div>
                  )
                )}

                {isAdmin && (
                  <button
                    onClick={() => deletePhoto(photo.url)}
                    disabled={deletingUrl === photo.url}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {deletingUrl === photo.url
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
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
              <Icon name="X" size={28} fallback="X" />
            </button>
            <img
              src={lightbox.url}
              alt={lightbox.caption}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {lightbox.caption && (
              <p className="mt-4 text-white/80 text-base text-center max-w-xl">{lightbox.caption}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default GallerySection
