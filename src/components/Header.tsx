"use client"

import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/styles", label: "Styles" },
    { href: "/coaches", label: "Coaches" },
    { href: "/blog", label: "Blog" },
    { href: "/timetable", label: "Timetable" },
    { href: "/membership", label: "Membership" },
    { href: "/socials", label: "Our Socials" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" }
  ]

  const getNavLinkClass = (href: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
    return `transition-colors font-medium ${
      isActive
        ? "text-yellow-500 font-semibold"
        : "text-gray-700 hover:text-yellow-400"
    }`
  }

  const getMobileNavLinkClass = (href: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
    return `block py-4 px-4 rounded-lg transition-all duration-200 text-lg font-medium ${
      isActive
        ? "text-yellow-500 font-semibold bg-yellow-50"
        : "text-gray-700 hover:text-yellow-400 hover:bg-gray-50"
    }`
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-center py-4 gap-2">
          {/* Left Navigation */}
          <nav className="flex items-center space-x-3">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getNavLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo - positioned after Timetable */}
          <div className="flex items-center justify-center mx-4">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Marrickville Martial Arts Club MMAC - BJJ Muay Thai MMA Wrestling classes Sydney Inner West"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
                style={{ maxHeight: '80px', maxWidth: '80px' }}
              />
            </Link>
          </div>

          {/* Right Side - Navigation + Buttons */}
          <div className="flex items-center space-x-3">
            {navItems.slice(6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getNavLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              <Phone className="w-4 h-4 mr-2" />
              CALL US
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex justify-between items-center py-3 lg:hidden">
          {/* Call Button - Mobile Left */}
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-3 py-2 text-sm font-semibold"
            onClick={() => window.open('tel:+61423111999', '_self')}
          >
            <Phone className="w-4 h-4 mr-1" />
            CALL
          </Button>

          {/* Center Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Marrickville Martial Arts Club MMAC"
                width={60}
                height={60}
                className="w-14 h-14 object-contain"
                style={{ maxHeight: '56px', maxWidth: '56px' }}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getMobileNavLinkClass(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile-specific CTA */}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-lg"
                  onClick={() => {
                    window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')
                    setMobileMenuOpen(false)
                  }}
                >
                  🥋 START FREE TRIAL
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
