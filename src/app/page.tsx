"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, Facebook, Instagram, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import GoogleReviews from "@/components/GoogleReviews"
import ErrorBoundary from "@/components/ErrorBoundary"

export default function Home() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoObject",
        "name": "Marrickville Martial Arts Club - Classes Showcase",
        "description": "Experience our world-class martial arts training at Marrickville Martial Arts Club. See our Brazilian Jiu-Jitsu, Muay Thai, MMA, and Wrestling classes in action, led by internationally awarded coaches including world champion Tsuchika Shimoyamada and elite competitors.",
        "thumbnailUrl": "https://img.youtube.com/vi/-I544tzhNgw/maxresdefault.jpg",
        "uploadDate": "2024-01-01",
        "duration": "PT3M30S",
        "embedUrl": "https://www.youtube.com/embed/-I544tzhNgw",
        "contentUrl": "https://youtu.be/-I544tzhNgw",
        "publisher": {
          "@type": "Organization",
          "name": "Marrickville Martial Arts Club",
          "url": "https://marrickvillemartialarts.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://marrickvillemartialarts.com/logo.png"
          }
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://marrickvillemartialarts.com/#business",
        "name": "Marrickville Martial Arts Club",
        "alternateName": "MMAC",
        "description": "Premier martial arts training facility in Marrickville, Sydney. Offering Brazilian Jiu-Jitsu, Muay Thai, MMA, and Wrestling classes for all ages and skill levels. Led by world-class instructors including world champion wrestlers and elite BJJ competitors.",
        "url": "https://marrickvillemartialarts.com",
        "telephone": "+61423111999",
        "email": "info@marrickvillemartialarts.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Unit 5, 1-7 Jabez St",
          "addressLocality": "Marrickville",
          "addressRegion": "NSW",
          "postalCode": "2204",
          "addressCountry": "AU"
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Styles Section */}
      <StylesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Google Reviews */}
      <ErrorBoundary>
        <GoogleReviews />
      </ErrorBoundary>

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

function Header() {
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
            {navItems.slice(1, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getNavLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
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
            {navItems.slice(5).map((item) => (
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

function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)
  const [autoplayAttempted, setAutoplayAttempted] = useState(false)

  // Try autoplay on component mount and user interactions
  useEffect(() => {
    const attemptAutoplay = () => {
      if (autoplayAttempted) return

      setAutoplayAttempted(true)
      const iframe = document.getElementById('hero-video') as HTMLIFrameElement

      if (iframe) {
        // Update iframe with autoplay parameters
        iframe.src = `https://www.youtube.com/embed/-I544tzhNgw?autoplay=1&mute=1&loop=1&playlist=-I544tzhNgw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&enablejsapi=1&origin=${window.location.origin}`

        // Optimistically hide play button
        setTimeout(() => {
          setVideoPlaying(true)
          setShowPlayButton(false)
        }, 1500)

        // If autoplay fails, show play button after delay
        setTimeout(() => {
          if (!videoPlaying) {
            setShowPlayButton(true)
          }
        }, 3000)
      }
    }

    // Try autoplay immediately
    const timer = setTimeout(attemptAutoplay, 100)

    // Also try on any user interaction
    const handleInteraction = () => {
      attemptAutoplay()
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('scroll', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction, { passive: true })
    document.addEventListener('scroll', handleInteraction, { passive: true })
    document.addEventListener('keydown', handleInteraction, { passive: true })
    document.addEventListener('touchstart', handleInteraction, { passive: true })

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('scroll', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [autoplayAttempted, videoPlaying])

  const playVideo = () => {
    setShowPlayButton(false)
    setVideoPlaying(true)
    const iframe = document.getElementById('hero-video') as HTMLIFrameElement
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/-I544tzhNgw?autoplay=1&mute=1&loop=1&playlist=-I544tzhNgw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&enablejsapi=1&origin=${window.location.origin}`
    }
  }

  return (
    <section className="relative h-screen bg-gray-900 overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          id="hero-video"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover"
          style={{
            transform: 'translate(-50%, -50%)',
            minWidth: '100vw',
            minHeight: '100vh',
            width: '177.77vh', // 16:9 aspect ratio
            height: '56.25vw' // 16:9 aspect ratio
          }}
          src="https://www.youtube.com/embed/-I544tzhNgw?mute=1&loop=1&playlist=-I544tzhNgw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0"
          title="Marrickville Martial Arts Club - Classes Showcase"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          loading="eager"
        />

        {/* Video Thumbnail & Play Button Overlay - Only show if autoplay fails */}
        {showPlayButton && (
          <div
            className="absolute inset-0 bg-cover bg-center cursor-pointer group"
            style={{
              backgroundImage: `url('https://img.youtube.com/vi/-I544tzhNgw/maxresdefault.jpg')`
            }}
            onClick={playVideo}
          >
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 hover:bg-red-700 rounded-full p-6 transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
                <svg
                  className="w-12 h-12 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            {/* Play Video Text */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-pulse">
              <div className="bg-yellow-400 bg-opacity-90 px-6 py-3 rounded-full shadow-lg">
                <p className="text-black text-lg font-bold">
                  🎬 Watch Our Classes in Action
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Train with the Best
          </h1>
          <p className="text-lg md:text-xl mb-8 font-medium leading-relaxed drop-shadow-md">
            Marrickville Martial Arts Club is a supportive environment led by the nation's most recognizable and internationally awarded coaches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
            >
              START FREE TRIAL
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black font-bold px-8 py-3 text-lg rounded-md transition-all duration-300 shadow-lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Video Fallback */}
      <div className="md:hidden absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-gray-900"
          style={{
            backgroundImage: `url('https://img.youtube.com/vi/-I544tzhNgw/maxresdefault.jpg')`
          }}
        />
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">MMAC</h2>
            <p className="text-gray-700 mb-6">
              Marrickville Martial Arts Club is a Martial Arts gym based in Marrickville, Sydney. We offer classes and training in Brazilian Jiu Jitsu (BJJ), Muay Thai Kickboxing and Mixed Martial Arts (MMA). Our classes are suitable for ages 5+ and for people of all fitness and skill levels.
            </p>
            <p className="text-gray-700">
              Join us on a journey to martial arts mastery with a free trial.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">OUR MISSION</h2>
            <p className="text-gray-700 mb-6">
              Discover the unique and exciting world of Martial Arts
            </p>
            <p className="text-gray-700 mb-6">
              We believe in helping people become the best version of themselves through embracing the power and discipline of martial arts. By working together, gaining strength, courage, and having fun whilst we do it, we can all be our own heroes!
            </p>
            <Link href="/about">
              <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function StylesSection() {
  const styles = [
    {
      title: "Brazilian Jiu Jitsu (BJJ)",
      description: "Our Brazilian Jiu-Jitsu program is led by Head Instructor Josh Allsopp, bringing championship-level training and analytical precision to every class.",
      image: "/uploads/BJJ-photo.jpg.jpg",
      altText: "Brazilian Jiu-Jitsu BJJ classes Marrickville Sydney - students practicing ground fighting grappling techniques at MMAC martial arts gym",
      href: "/styles/bjj"
    },
    {
      title: "Muay Thai",
      description: "Our Muay Thai classes are led by Bastian Ayala and Johana Reyes Lagos, offering traditional training and specialized women's classes.",
      image: "/uploads/Muay-thai.jpg",
      altText: "Muay Thai classes Marrickville Sydney - practitioners training Art of Eight Limbs Thai boxing kickboxing at martial arts club",
      href: "/styles/muay-thai"
    },
    {
      title: "Mixed Martial Arts (MMA)",
      description: "Led by Head MMA Instructor Antonio Mammarella, our program develops complete fighters with comprehensive striking and grappling skills.",
      image: "https://ext.same-assets.com/3814609060/2252467439.jpeg",
      altText: "MMA mixed martial arts training Marrickville Sydney - fighters practicing striking grappling UFC style combat sports",
      href: "/styles/mma"
    },
    {
      title: "Kids",
      description: "Our classes will help with confidence-building, and personal growth.",
      image: "/uploads/kids.jpg",
      altText: "Kids martial arts classes Marrickville Sydney - children ages 5-12 learning BJJ Muay Thai wrestling confidence building",
      href: "/styles/kids"
    },
    {
      title: "Wrestling",
      description: "Led by world champion Tsuchika Shimoyamada - multiple Australian & Japanese national champion, Oceania & Asian champion. Experience world-class wrestling instruction.",
      image: "/uploads/Wrestling.jpg",
      altText: "Wrestling classes Marrickville Sydney - Olympic wrestling training world champion Tsuchika Shimoyamada instructor",
      href: "/styles/wrestling"
    },
    {
      title: "Women's Muay Thai",
      description: "Led by Johana Reyes Lagos, our women's Muay Thai classes create a supportive, empowering environment exclusively for women of all levels.",
      image: "/uploads/womens-muaythai.jpg.jpg",
      altText: "Women's Muay Thai classes Marrickville Sydney - ladies only Thai boxing empowering supportive environment female fitness",
      href: "/styles/womens-muay-thai"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-yellow-400 font-semibold mb-2">OUR STYLES</p>
          <h2 className="text-4xl font-bold text-gray-900">FOR YOU</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style, index) => (
            <Link key={style.title} href={style.href} className="block">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer transform-gpu will-change-transform">
                <div className="relative h-48">
                  <Image
                    src={style.image}
                    alt={style.altText}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: style.title === "Brazilian Jiu Jitsu (BJJ)" ? '50% 25%' : 'center'
                    }}
                    priority={index < 3}
                    loading={index < 3 ? undefined : "lazy"}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Learn More</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-yellow-500 transition-colors">{style.title}</h3>
                  <p className="text-gray-600 text-sm">{style.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/styles">
            <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3">
              VIEW ALL STYLES
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 bg-yellow-400">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-black font-semibold mb-2">START NOW</p>
            <h2 className="text-4xl font-bold text-black mb-6">Every Great Journey Starts with One Step!</h2>
            <p className="text-black mb-8">
              Experience a complimentary week of our classes — come and give it a try at no cost!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
                  BOOK NOW
                </Button>
              </Link>
              <Link href="/timetable">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white px-8 py-3">
                  CHECK TIMETABLE
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <p className="text-black font-semibold mb-2">LOT OF OPTIONS</p>
            <h3 className="text-2xl font-bold text-black mb-6">We Can help you with following:</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3" />
                <span className="text-black">Physical Health</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3" />
                <span className="text-black">Self Defense</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3" />
                <span className="text-black">Mental Wellness</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3" />
                <span className="text-black">Personalized Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "Which styles of martial arts do we offer?",
      answer: "We offer Brazilian Jiu-Jitsu (BJJ), Muay Thai, Mixed Martial Arts (MMA), Wrestling, and specialized Kids Programs. We also have Women's-only Muay Thai classes. All programs welcome beginners and experienced practitioners."
    },
    {
      question: "Can I try a free trial class before committing?",
      answer: "Absolutely! Your first class is completely FREE with no obligations. This gives you the perfect opportunity to experience our training, meet our instructors, and see if our club is the right fit for you. Just call (042) 311 1999 or book online to get started today!"
    },
    {
      question: "What are your membership options and how flexible are they?",
      answer: "We offer flexible membership plans to suit every lifestyle: Casual ($35/class), Kick Starter ($30/week for 1 class), 2X Plan ($40/week for 2 classes), and Unlimited ($55/week). No lock-in contracts! You can cancel with just 30 days notice, and we offer membership freezing for up to 3 months per year."
    },
    {
      question: "Do I need prior experience to join the gym?",
      answer: "No prior experience is necessary! Our gym welcomes beginners and experienced practitioners alike. Our classes are designed to accommodate all skill levels."
    },
    {
      question: "What should I wear to my first class?",
      answer: "Wear comfortable workout attire such as shorts and a t-shirt."
    },
    {
      question: "What equipment do I need?",
      answer: "For beginners, all you need is yourself and a positive attitude! As you progress, you may want to invest in your own hand wraps, gloves, and other protective gear, but we provide basic equipment for class use."
    },
    {
      question: "How do I sign up for classes?",
      answer: "You can sign up for classes through our website or by visiting our gym in person. Our schedule is available online, and you can easily reserve your spot in advance."
    },
    {
      question: "Are there age restrictions for classes?",
      answer: "Our classes are open to participants from the age of 5+, but we may have specific programs tailored to certain age groups. Please check our class schedule and program descriptions for more information."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-yellow-400 font-semibold mb-2">FAQs</p>
          <h2 className="text-4xl font-bold text-gray-900">Learn More From</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Image
                src="https://ext.same-assets.com/3814609060/3965628387.png"
                alt="MMAC logo - Marrickville Martial Arts Club Sydney martial arts gym BJJ Muay Thai MMA Wrestling Inner West"
                width={48}
                height={48}
                className="w-12 h-12 mr-3"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Embark on your martial arts journey today and unlock your full potential!
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">IMPORTANT LINKS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-yellow-400">About</Link></li>
              <li><Link href="/styles" className="hover:text-yellow-400">Styles</Link></li>
              <li><Link href="/coaches" className="hover:text-yellow-400">Coaches</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-400">Blog</Link></li>
              <li><Link href="/timetable" className="hover:text-yellow-400">TimeTable</Link></li>
              <li><Link href="/gallery" className="hover:text-yellow-400">Gallery</Link></li>
              <li><Link href="/membership" className="hover:text-yellow-400">Membership / Pricing</Link></li>
              <li><Link href="/socials" className="hover:text-yellow-400">Our Socials</Link></li>
              <li><Link href="/faq" className="hover:text-yellow-400">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">STYLES</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/styles/mma" className="hover:text-yellow-400">MMA</a></li>
              <li><a href="/styles/muay-thai" className="hover:text-yellow-400">MUAY THAI</a></li>
              <li><a href="/styles/kids" className="hover:text-yellow-400">Kids</a></li>
              <li><a href="/styles/bjj" className="hover:text-yellow-400">BJJ</a></li>
              <li><a href="/styles/wrestling" className="hover:text-yellow-400">Wrestling</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">CONTACT US</h4>
            <div className="text-sm text-gray-400 space-y-2">
              <p>Unit 5/1-7 JABEZ ST.<br />MARRICKVILLE NSW 2204</p>
              <p><a href="mailto:info@marrickvillemartialartsclub.com.au" className="hover:text-yellow-400">info@marrickvillemartialartsclub.com.au</a></p>
              <p><a href="tel:0423111999" className="hover:text-yellow-400">(042) 311 1999</a></p>
              <p>MON - SUN 7:00 - 9:30am,<br />4:00 - 9:30pm</p>
            </div>
            <div className="flex space-x-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                <Image
                  src="https://ugc.same-assets.com/tKHB9FKtt2hBj6BF7BymSRoIDsuY5v1B.png"
                  alt="Follow Marrickville Martial Arts Club on Facebook - martial arts Sydney BJJ Muay Thai MMA wrestling classes"
                  width={24}
                  height={24}
                  className="w-6 h-6 hover:opacity-80 cursor-pointer filter brightness-75 hover:brightness-100"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                <Image
                  src="https://ugc.same-assets.com/DKfZuOL_mi97nvOomukyp6o8pfsfiF2y.png"
                  alt="Follow Marrickville Martial Arts Club on Instagram - martial arts training videos Sydney BJJ Muay Thai MMA"
                  width={24}
                  height={24}
                  className="w-6 h-6 hover:opacity-80 cursor-pointer filter brightness-75 hover:brightness-100"
                />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                <Image
                  src="https://ext.same-assets.com/3814609060/260646423.svg"
                  alt="Follow Marrickville Martial Arts Club on TikTok - martial arts training content Sydney BJJ Muay Thai MMA wrestling"
                  width={24}
                  height={24}
                  className="w-6 h-6 hover:opacity-80 cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            Copyright © 2024 Marrickville martial arts Club
            <Image
              src="https://ext.same-assets.com/3814609060/4061061103.svg"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </p>
        </div>
      </div>
    </footer>
  )
}
