"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

interface FlipCardProps {
  title: string
  content: string
  icon: React.ReactNode
  imageSrc: string
}

export function FlipCard({ title, content, icon, imageSrc }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="h-[380px] w-full perspective-1000 cursor-pointer group" onClick={handleFlip}>
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full rounded-xl shadow-xl p-6 flex flex-col justify-between backface-hidden ${
            isFlipped ? "invisible" : ""
          } border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden group-hover:shadow-2xl`}
        >
          <div className="absolute inset-0 z-0">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-custom-deep-blue/90"></div>
            <div className="absolute inset-0 pattern-dots pattern-white pattern-bg-transparent pattern-size-4 pattern-opacity-10"></div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full bg-white/10 z-0"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 -ml-6 -mb-6 rounded-full bg-white/10 z-0"></div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/10 rounded-lg rotate-6 scale-90 z-0 group-hover:rotate-3 transition-transform duration-500"></div>

          <div className="flex flex-col items-center justify-center h-full relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-white/20 backdrop-blur-sm animate-pulse-slow shadow-lg border border-white/30">
              {icon}
            </div>
            <h3 className="text-2xl font-bold mb-6 text-white text-center text-shadow-lg px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg">
              {title}
            </h3>
            <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full p-3 animate-bounce-slow border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors">
              <ChevronRight className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full rounded-xl shadow-xl p-6 rotate-y-180 backface-hidden ${
            !isFlipped ? "invisible" : ""
          } overflow-hidden border border-white/20`}
        >
          <div className="absolute inset-0 z-0">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-custom-deep-blue/90"></div>
            <div className="absolute inset-0 pattern-grid pattern-white pattern-bg-transparent pattern-size-4 pattern-opacity-5"></div>
          </div>

          <div className="flex flex-col items-center justify-center h-full relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
              {icon}
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <p className="text-white text-center font-medium">{content}</p>
            </div>
            <button
              className="mt-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center hover:bg-white/30 transition-colors border border-white/30"
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
