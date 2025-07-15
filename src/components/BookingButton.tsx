"use client"

import { Button } from "@/components/ui/button"

interface BookingButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  children: React.ReactNode
  size?: "default" | "sm" | "lg" | "icon"
}

export function BookingButton({ className, variant = "default", children, size }: BookingButtonProps) {
  const handleClick = () => {
    window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')
  }

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
