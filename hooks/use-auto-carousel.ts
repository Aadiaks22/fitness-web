"use client"

import { useEffect, useState } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

export function useAutoCarousel(interval = 5000) {
  const [api, setApi] = useState<CarouselApi>()
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!api || isPaused) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, interval)

    return () => clearInterval(intervalId)
  }, [api, interval, isPaused])

  const pauseAutoPlay = () => setIsPaused(true)
  const resumeAutoPlay = () => setIsPaused(false)

  return {
    setApi,
    pauseAutoPlay,
    resumeAutoPlay,
    isPaused,
  }
}
