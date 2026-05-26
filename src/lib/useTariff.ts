import { useState, useEffect } from "react"

const TARIFF_KEY = "selected_tariff"

export const setTariff = (tariff: string) => {
  sessionStorage.setItem(TARIFF_KEY, tariff)
  window.dispatchEvent(new Event("tariff-changed"))
}

export const useTariff = () => {
  const [tariff, setTariffState] = useState(() => sessionStorage.getItem(TARIFF_KEY) || "")

  useEffect(() => {
    const handler = () => setTariffState(sessionStorage.getItem(TARIFF_KEY) || "")
    window.addEventListener("tariff-changed", handler)
    return () => window.removeEventListener("tariff-changed", handler)
  }, [])

  const clear = () => {
    sessionStorage.removeItem(TARIFF_KEY)
    setTariffState("")
  }

  return { tariff, clear }
}
