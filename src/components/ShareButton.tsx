"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  url?: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title: title,
      url: url || window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (err) {
        console.log('Error copying to clipboard:', err)
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  )
}
