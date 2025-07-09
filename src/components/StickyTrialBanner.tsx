"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Star, Clock } from "lucide-react"

export default function StickyTrialBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show banner after user has been on the page for a few seconds
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
      }
    }, 3000)

    // Check if user previously dismissed the banner
    const dismissed = localStorage.getItem('trial-banner-dismissed')
    if (dismissed) {
      setIsDismissed(true)
    }

    return () => clearTimeout(timer)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('trial-banner-dismissed', 'true')
  }

  const handleTrialClick = () => {
    // Direct link to ClubWorx trial booking
    window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')
  }

  const handleCallClick = () => {
    window.open('tel:+61423111999', '_self')
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 transform transition-transform duration-500 ease-in-out">
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-black shadow-2xl border-t-2 border-yellow-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Trial info */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-black fill-current" />
                <span className="font-bold text-lg">FREE TRIAL CLASS</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1 text-sm">
                <Clock className="w-4 h-4" />
                <span>No commitment • All skill levels welcome</span>
              </div>
            </div>

            {/* Center - Call to action */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleTrialClick}
                className="bg-black hover:bg-gray-800 text-yellow-400 font-bold px-6 py-2 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                BOOK NOW
              </Button>

              {/* Phone button for desktop */}
              <Button
                onClick={handleCallClick}
                className="hidden sm:flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300 border-0"
              >
                📞 Call Now
              </Button>
            </div>

            {/* Right side - Dismiss button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-black hover:bg-black/10 p-1 rounded-full ml-2"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile-optimized bottom row */}
          <div className="sm:hidden mt-2 text-center">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span>No commitment</span>
              <span>•</span>
              <span>All skill levels</span>
              <span>•</span>
              <button
                onClick={handleCallClick}
                className="font-semibold underline bg-transparent border-0 p-0"
              >
                📞 (042) 311 1999
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-0" />
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-700" />
      </div>
    </div>
  )
}
