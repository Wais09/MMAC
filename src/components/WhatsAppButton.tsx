"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const phoneNumber = "+61423111999"
  const message = "Hi! I'm interested in learning more about martial arts classes at Marrickville Martial Arts Club. Can you help me get started?"

  useEffect(() => {
    // Show button after a short delay to avoid flash
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="relative">
        <Button
          onClick={handleWhatsAppClick}
          className="bg-[#25D366] hover:bg-[#1db851] text-white rounded-full w-16 h-16 p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-0 relative z-10"
          title="Chat with us on WhatsApp"
          type="button"
        >
          <Image
            src="/whatsapp-icon.svg"
            alt="WhatsApp"
            width={36}
            height={36}
            className="w-9 h-9"
            priority
          />
        </Button>

        {/* Pulse animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30 pointer-events-none" />
      </div>
    </div>
  )
}
