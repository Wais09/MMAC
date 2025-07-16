// Performance utilities for MMAC website

/**
 * Lazy loading utility using Intersection Observer
 */
export function createLazyLoader(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }

  return new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        callback(entry)
      }
    }
  }, defaultOptions)
}

/**
 * Debounce function for performance optimization
 */
export function debounce(
  func: (...args: unknown[]) => unknown,
  wait: number
): (...args: unknown[]) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: unknown[]) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export function throttle(
  func: (...args: unknown[]) => unknown,
  limit: number
): (...args: unknown[]) => void {
  let inThrottle = false

  return (...args: unknown[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) link.type = type

  document.head.appendChild(link)
}

/**
 * Preload images for better performance
 */
export function preloadImages(urls: string[]): Promise<unknown[]> {
  return Promise.all(
    urls.map(url => new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = url
    }))
  )
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get device performance tier based on hardware
 */
export function getPerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof navigator === 'undefined') return 'medium'

  // Check for device memory (if available)
  const nav = navigator as Navigator & { deviceMemory?: number }
  const deviceMemory = nav.deviceMemory
  if (deviceMemory) {
    if (deviceMemory >= 8) return 'high'
    if (deviceMemory >= 4) return 'medium'
    return 'low'
  }

  // Fallback to hardware concurrency
  const cores = navigator.hardwareConcurrency || 4
  if (cores >= 8) return 'high'
  if (cores >= 4) return 'medium'
  return 'low'
}

/**
 * Optimize animations based on device performance
 */
export function getOptimizedAnimationSettings() {
  const tier = getPerformanceTier()
  const reducedMotion = prefersReducedMotion()

  if (reducedMotion) {
    return {
      duration: 0,
      easing: 'linear',
      enabled: false
    }
  }

  switch (tier) {
    case 'high':
      return {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        enabled: true
      }
    case 'medium':
      return {
        duration: 200,
        easing: 'ease-in-out',
        enabled: true
      }
    case 'low':
      return {
        duration: 100,
        easing: 'linear',
        enabled: true
      }
  }
}

/**
 * Check if user is on a slow connection
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false

  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string
      saveData?: boolean
    }
    mozConnection?: {
      effectiveType?: string
      saveData?: boolean
    }
    webkitConnection?: {
      effectiveType?: string
      saveData?: boolean
    }
  }

  const connection = nav.connection || nav.mozConnection || nav.webkitConnection

  if (connection) {
    // Check for slow connection types
    const slowConnections = ['slow-2g', '2g', '3g']
    return (
      (connection.effectiveType && slowConnections.includes(connection.effectiveType)) ||
      Boolean(connection.saveData)
    )
  }

  return false
}

/**
 * Get optimized image quality based on connection and device
 */
export function getOptimizedImageQuality(): number {
  const isLowEnd = getPerformanceTier() === 'low'
  const isSlow = isSlowConnection()

  if (isLowEnd || isSlow) return 60
  if (getPerformanceTier() === 'medium') return 75
  return 85
}

/**
 * Performance monitoring utilities
 */
export const performanceUtils = {
  markStart: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`)
    }
  },

  markEnd: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
    }
  },

  getMeasure: (name: string): number | null => {
    if (typeof performance !== 'undefined') {
      const measures = performance.getEntriesByName(name, 'measure')
      return measures.length > 0 ? measures[0].duration : null
    }
    return null
  }
}
