"use client"

import { useEffect } from "react"

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  LCP: { good: 2500, poor: 4000 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function reportMetric(metric: PerformanceMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌'
    console.log(`${emoji} ${metric.name}: ${metric.value}ms (${metric.rating})`)
  }

  // In production, you could send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_metric_rating: metric.rating
      })
    }

    // Store in localStorage for debugging
    const metrics = JSON.parse(localStorage.getItem('mmac_performance_metrics') || '[]')
    metrics.push(metric)
    localStorage.setItem('mmac_performance_metrics', JSON.stringify(metrics.slice(-10))) // Keep last 10
  }
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Check if Performance Observer is supported
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    let lcpObserver: PerformanceObserver | null = null
    let fidObserver: PerformanceObserver | null = null
    let clsObserver: PerformanceObserver | null = null

    try {
      // Largest Contentful Paint (LCP)
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }

        reportMetric({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: getRating('LCP', lastEntry.startTime),
          timestamp: Date.now()
        })
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as (PerformanceEntry & { processingStart: number; startTime: number })[]
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime
          reportMetric({
            name: 'FID',
            value: fid,
            rating: getRating('FID', fid),
            timestamp: Date.now()
          })
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Report CLS on page unload
      const reportCLS = () => {
        reportMetric({
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          timestamp: Date.now()
        })
      }

      window.addEventListener('beforeunload', reportCLS)
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportCLS()
        }
      })

      // First Contentful Paint (FCP) and Time to First Byte (TTFB)
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            reportMetric({
              name: 'FCP',
              value: entry.startTime,
              rating: getRating('FCP', entry.startTime),
              timestamp: Date.now()
            })
          }
        })
      })
      paintObserver.observe({ entryTypes: ['paint'] })

      // TTFB from Navigation Timing
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as (PerformanceEntry & { responseStart: number; requestStart: number })[]
        entries.forEach((entry) => {
          const ttfb = entry.responseStart - entry.requestStart
          reportMetric({
            name: 'TTFB',
            value: ttfb,
            rating: getRating('TTFB', ttfb),
            timestamp: Date.now()
          })
        })
      })
      navigationObserver.observe({ entryTypes: ['navigation'] })

      // Resource loading performance
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as (PerformanceEntry & {
          transferSize: number
          encodedBodySize: number
          decodedBodySize: number
        })[]

        entries.forEach((entry) => {
          // Log slow resources in development
          if (process.env.NODE_ENV === 'development' && entry.duration > 1000) {
            console.warn(`🐌 Slow resource: ${entry.name} took ${entry.duration.toFixed(0)}ms`)
          }
        })
      })
      resourceObserver.observe({ entryTypes: ['resource'] })

      // Cleanup function
      return () => {
        lcpObserver?.disconnect()
        fidObserver?.disconnect()
        clsObserver?.disconnect()
        paintObserver?.disconnect()
        navigationObserver?.disconnect()
        resourceObserver?.disconnect()
        window.removeEventListener('beforeunload', reportCLS)
      }

    } catch (error) {
      console.warn('Performance monitoring setup failed:', error)
    }
  }, [])

  // Track user interactions for UX metrics
  useEffect(() => {
    const trackInteraction = (eventType: string) => (event: Event) => {
      const target = event.target as HTMLElement
      const elementType = target.tagName.toLowerCase()

      // Track button clicks, form submissions, etc.
      if (elementType === 'button' || target.type === 'submit' || target.closest('a')) {
        const elementInfo = target.textContent?.slice(0, 50) || target.className.slice(0, 50) || 'unknown'

        if (process.env.NODE_ENV === 'development') {
          console.log(`📊 User interaction: ${eventType} on ${elementType} - "${elementInfo}"`)
        }
      }
    }

    const clickHandler = trackInteraction('click')
    const submitHandler = trackInteraction('submit')

    document.addEventListener('click', clickHandler)
    document.addEventListener('submit', submitHandler)

    return () => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('submit', submitHandler)
    }
  }, [])

  // This component doesn't render anything visible
  return null
}

// Utility function to get performance summary
export function getPerformanceSummary(): PerformanceMetric[] {
  if (typeof window === 'undefined') return []

  try {
    return JSON.parse(localStorage.getItem('mmac_performance_metrics') || '[]')
  } catch {
    return []
  }
}

// Utility function to clear performance data
export function clearPerformanceData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mmac_performance_metrics')
  }
}
