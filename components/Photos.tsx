"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function Photos({
  urls,
  length,
}: {
  urls: string[]
  length: number
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const isOpen = selectedIndex !== null

  const goNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev! + 1) % urls.length)
  }

  const goPrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev! - 1 + urls.length) % urls.length)
  }

  const close = () => setSelectedIndex(null)

  // klávesy: ESC / šipky
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, selectedIndex])

  return (
    <motion.div
      className={`my-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6`}
    >
      {urls.map((g: string, idx: number) => (
        <motion.div
          key={idx}
          className="relative w-full h-[16rem] cursor-pointer"
          onClick={() => setSelectedIndex(idx)}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={g}
            alt={`photo-${idx}`}
            className="object-contain w-full h-full rounded-lg"
            fill
          />
        </motion.div>
      ))}

      {/* MODAL + CAROUSEL */}
      <AnimatePresence>
        {isOpen && selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[5001] flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* modal card */}
            <motion.div
              className="relative w-full max-w-8xl bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()} // nekliknout ven
            >
              {/* top bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="text-sm text-muted-foreground">
                  {selectedIndex + 1} / {urls.length}
                </div>

                <button
                  onClick={close}
                  className="p-2 bg-red-600 rounded-xl hover:bg-red-800"
                  aria-label="Zavřít"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* image area */}
              <div className="relative w-full h-[60vh] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    className="relative w-full h-full"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={urls[selectedIndex]}
                      alt={`selected-${selectedIndex}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* prev */}
                {urls.length > 1 && (
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-white p-2 rounded-full shadow"
                    aria-label="Předchozí"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {/* next */}
                {urls.length > 1 && (
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-white p-2 rounded-full shadow"
                    aria-label="Další"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* dots */}
              {urls.length > 1 && (
                <div className="flex items-center justify-center gap-2 py-4">
                  {urls.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === selectedIndex ? "bg-black" : "bg-black/20"
                      }`}
                      aria-label={`Přejít na ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
