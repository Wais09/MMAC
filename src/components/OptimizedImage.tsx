"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  fill?: boolean
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}

// Convert image path to WebP if supported
function getOptimizedSrc(src: string, supportsWebP: boolean): string {
  if (!supportsWebP || src.includes('youtube.com') || src.includes('ugc.same-assets.com')) {
    return src
  }

  // Convert local images to WebP
  if (src.startsWith('/') && !src.includes('.webp')) {
    const extension = src.split('.').pop()
    if (extension && ['jpg', 'jpeg', 'png'].includes(extension.toLowerCase())) {
      return src.replace(`.${extension}`, '.webp')
    }
  }

  return src
}

// Check WebP support
function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  style,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [supportsWebP, setSupportsWebP] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Check WebP support on mount
  useEffect(() => {
    checkWebPSupport().then(setSupportsWebP)
  }, [])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  const optimizedSrc = getOptimizedSrc(src, supportsWebP)

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (
    fill
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      : width
        ? `(max-width: 640px) ${Math.min(width, 640)}px, ${width}px`
        : '100vw'
  )

  // Placeholder while loading
  const showPlaceholder = !isLoaded && !hasError && (priority || isInView)

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Loading placeholder */}
      {showPlaceholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-yellow-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 opacity-50">📷</div>
            <div>Image not available</div>
          </div>
        </div>
      )}

      {/* Actual image - only render when in view or priority */}
      {(priority || isInView) && (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          sizes={responsiveSizes}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${hasError ? 'hidden' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}

      {/* Low quality placeholder for better perceived performance */}
      {!isLoaded && !hasError && (priority || isInView) && blurDataURL && (
        <Image
          src={blurDataURL}
          alt=""
          fill={fill}
          width={width}
          height={height}
          className="absolute inset-0 opacity-50 blur-sm"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
    </div>
  )
}

// Utility function to generate blur data URLs
export function generateBlurDataURL(src: string): string {
  // Simple base64 encoded 1x1 pixel image
  const color = src.includes('muay-thai') ? '#ff6b35' :
                src.includes('bjj') ? '#4a90e2' :
                src.includes('mma') ? '#e74c3c' :
                src.includes('wrestling') ? '#f39c12' :
                '#95a5a6' // default gray

  return `data:image/svg+xml;base64,${btoa(`
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="${color}"/>
    </svg>
  `)}`
}
