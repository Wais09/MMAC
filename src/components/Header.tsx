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
            <Link href="/portal">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-yellow-400 mr-2"
              >
                Member Login
              </Button>
            </Link>
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
        <div className="flex justify-between items-center py-4 lg:hidden">
          {/* Empty space for balance */}
          <div className="w-6" />

          {/* Center Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Marrickville Martial Arts Club MMAC - BJJ Muay Thai MMA Wrestling classes Sydney Inner West"
                width={60}
                height={60}
                className="w-16 h-16 object-contain"
                style={{ maxHeight: '60px', maxWidth: '60px' }}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 px-2 rounded-md ${getNavLinkClass(item.href)}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
