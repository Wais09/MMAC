"use client"

import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Zap, Shield, Heart, Trophy } from "lucide-react"

export default function MuayThaiPage() {
  return (
    <>
      <Head>
        <title>Muay Thai Classes Marrickville Sydney | Thai Boxing Training | MMAC</title>
        <meta name="description" content="Traditional Muay Thai classes in Marrickville, Sydney. Learn the Art of Eight Limbs with expert instructors. Women's classes available. Free trial class." />
        <meta name="keywords" content="Muay Thai Marrickville, Thai boxing Sydney, Muay Thai classes Marrickville, kickboxing Sydney, martial arts Marrickville, women's Muay Thai" />
        <meta property="og:title" content="Muay Thai Classes Marrickville Sydney | Thai Boxing Training" />
        <meta property="og:description" content="Traditional Muay Thai classes in Marrickville, Sydney. Learn the Art of Eight Limbs with expert instructors. Women's classes available." />
        <meta property="og:image" content="/uploads/Muay-thai2.jpg" />
        <link rel="canonical" href="https://marrickvillemartialartsclub.com.au/styles/muay-thai" />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="/uploads/Muay-thai2.jpg"
            alt="Traditional Muay Thai training session at Marrickville Martial Arts Club featuring students practicing the Art of Eight Limbs with expert instructors"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '50% 30%' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Muay <span className="text-yellow-400">Thai</span> Marrickville
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                The Art of Eight Limbs • Traditional Thai Boxing • Sydney's Premier Classes
              </p>
            </div>
          </div>
        </div>

      {/* Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Premier Muay Thai Classes in Marrickville, Sydney</h2>
            <p className="text-lg text-gray-600 mb-6">
              Experience authentic Muay Thai training at Marrickville Martial Arts Club, Sydney's premier destination for traditional Thai boxing.
              Muay Thai, known as "The Art of Eight Limbs," is Thailand's national sport and cultural heritage. This ancient martial art
              uses punches, kicks, knees, and elbows, making it one of the most effective striking arts in the world and perfect for
              self-defense, fitness, and competition in Marrickville and throughout Sydney.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our Muay Thai program in Marrickville combines traditional Thai boxing techniques with modern training methods.
              Led by expert instructor Bastian Ayala, who has trained extensively in Thailand, and featuring specialized women's classes
              with Johana Reyes Lagos, we bring authentic Muay Thai experience to every session for students across Sydney's Inner West.
            </p>
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
            >
              Book Your Free Trial
            </Button>
          </div>
          <div className="relative h-96">
            {/* YouTube Video Embed */}
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/moW22g-smdI?rel=0&modestbranding=1&playsinline=1&autoplay=0&mute=0"
                title="Muay Thai Training at Marrickville Martial Arts Club - The Art of Eight Limbs in Sydney"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                style={{
                  aspectRatio: '16/9',
                  borderRadius: '0.5rem'
                }}
              />
            </div>

            {/* Fallback link if video doesn't load */}
            <div className="mt-4 text-center">
              <a
                href="https://youtube.com/shorts/moW22g-smdI?feature=share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-700 text-sm font-medium"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Muay Thai?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Incredible Cardio</h3>
              <p className="text-gray-600">
                Burn calories and build endurance with high-intensity Muay Thai training.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Self-Defense</h3>
              <p className="text-gray-600">
                Learn practical self-defense techniques using all eight limbs effectively.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Mental Discipline</h3>
              <p className="text-gray-600">
                Develop focus, confidence, and mental strength through traditional training.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cultural Heritage</h3>
              <p className="text-gray-600">
                Learn authentic Thai boxing traditions and cultural respect.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Instructors */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Your Muay Thai Instructors
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-center p-8">
              <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">BA</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Bastian Ayala</h3>
              <p className="text-yellow-600 font-medium mb-3">Muay Thai Specialist</p>
              <p className="text-gray-600">
                10+ years in Muay Thai with multiple trips to Thailand for authentic training. Technical approach
                emphasizing traditional techniques for all levels.
              </p>
            </Card>
            <Card className="text-center p-8">
              <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">JR</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Johana Reyes Lagos</h3>
              <p className="text-yellow-600 font-medium mb-3">Women's Muay Thai Instructor</p>
              <p className="text-gray-600">
                Specializes in women's Muay Thai in a supportive, empowering environment. Creates a safe space for
                women to build confidence, strength, and self-defense skills.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Muay Thai Class Schedule Marrickville</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Morning Classes</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Monday:</strong> 7:00-8:00 AM</p>
                <p><strong>Saturday:</strong> 7:00-8:00 AM*</p>
                <p className="text-sm text-gray-400">*Combined Muay Thai/MMA</p>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Evening Classes</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Monday:</strong> 6:30-7:30 PM</p>
                <p><strong>Tuesday:</strong> 6:30-7:30 PM</p>
                <p><strong>Wednesday:</strong> 6:30-7:30 PM</p>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Specialized Classes</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Thursday:</strong> 6:30-7:30 PM</p>
                <p className="text-sm text-yellow-400">Women Only</p>
                <p><strong>Friday:</strong> 5:30-6:30 PM</p>
                <p className="text-sm text-yellow-400">Sparring (Intermediate+)</p>
              </div>
            </Card>
          </div>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black mr-4"
              onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
            >
              Book Free Trial
            </Button>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions About Muay Thai in Marrickville
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Is Muay Thai suitable for beginners in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Our Muay Thai classes in Marrickville are designed to welcome complete beginners.
                Instructor Bastian Ayala has over 10 years of experience teaching students of all levels, starting
                from the very basics. We focus on proper technique, safety, and gradual progression. Your first
                class will cover basic stance, footwork, and fundamental strikes in a supportive environment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                What should I expect in my first Muay Thai class at MMAC?
              </AccordionTrigger>
              <AccordionContent>
                Your first Muay Thai class begins with a dynamic warm-up focusing on mobility and injury prevention.
                You'll learn basic Muay Thai techniques including punches, kicks, knees, and elbows using pads and bags.
                Classes emphasize proper form and traditional Thai boxing respect. No previous experience required -
                just bring comfortable workout clothes and we'll provide all equipment for your free trial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How much do Muay Thai classes cost in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                We offer flexible membership options for our Marrickville Muay Thai classes. Pricing varies based on
                frequency and commitment level, with options for casual classes, unlimited monthly memberships, and
                family packages. Contact us at (042) 311 1999 for current pricing and special offers.
                Your first trial class is completely free!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Do you offer women's only Muay Thai classes in Sydney?
              </AccordionTrigger>
              <AccordionContent>
                Yes! We have dedicated women's Muay Thai classes every Thursday from 6:30-7:30 PM, taught by
                specialist instructor Johana Reyes Lagos. These classes create a supportive, empowering environment
                for women to build confidence, strength, and self-defense skills. Johana focuses on creating a
                safe space where women can learn authentic Muay Thai techniques at their own pace.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                What makes MMAC's Muay Thai program authentic?
              </AccordionTrigger>
              <AccordionContent>
                Our Muay Thai program is led by Bastian Ayala, who has trained extensively in Thailand and brings
                over 10 years of authentic Thai boxing experience. We emphasize traditional techniques, cultural
                respect, and the spiritual aspects of "The Art of Eight Limbs." Our training methods combine
                traditional Thai boxing with modern sports science for safe, effective learning.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                Can Muay Thai help with weight loss and fitness goals?
              </AccordionTrigger>
              <AccordionContent>
                Muay Thai is one of the most effective workouts for weight loss and overall fitness. A typical
                class burns 500-800 calories while building lean muscle, improving cardiovascular health, and
                enhancing coordination. The high-intensity nature of Muay Thai training, combined with strength
                and conditioning elements, makes it excellent for achieving fitness goals while learning practical skills.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                Is Muay Thai good for self-defense in Sydney?
              </AccordionTrigger>
              <AccordionContent>
                Yes, Muay Thai is highly effective for self-defense. Known as "The Art of Eight Limbs," it teaches
                you to use punches, kicks, knees, and elbows effectively. The clinch work and close-range techniques
                are particularly practical for real-world situations. Our classes emphasize situational awareness,
                de-escalation, and only using techniques when absolutely necessary for self-protection.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">
                What equipment do I need for Muay Thai classes in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                For your first trial class, just bring comfortable workout clothes and water. We provide all
                necessary equipment including gloves, pads, and protective gear. As you progress, you may want to
                invest in your own boxing gloves, hand wraps, and shin guards. We can recommend quality equipment
                and often have gear available for purchase at the gym.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">
                How often should I attend Muay Thai classes to see results?
              </AccordionTrigger>
              <AccordionContent>
                For optimal results, we recommend attending 2-3 Muay Thai classes per week. This frequency allows
                proper skill development while giving your body time to recover. Many students see improvements in
                fitness within 2-4 weeks and noticeable technique development within 2-3 months. Consistency is
                key - regular attendance will accelerate your progress significantly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">
                Can I compete in Muay Thai tournaments from your Marrickville gym?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! While not required, we support students interested in competition. Bastian has
                extensive competition experience and can prepare dedicated students for amateur tournaments
                throughout Sydney and NSW. Competition training includes advanced techniques, conditioning,
                mental preparation, and sparring. We'll assess your readiness and ensure you're fully prepared
                before any competition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger className="text-left">
                What's the difference between Muay Thai and kickboxing?
              </AccordionTrigger>
              <AccordionContent>
                While both are striking arts, Muay Thai is more comprehensive. Traditional Muay Thai includes
                punches, kicks, knees, elbows, and clinch work, earning it the name "Art of Eight Limbs."
                Kickboxing typically focuses on punches and kicks only. Muay Thai also emphasizes cultural
                traditions, mental discipline, and includes techniques like the Thai clinch that aren't found
                in standard kickboxing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger className="text-left">
                Is parking available at your Marrickville Muay Thai gym?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we have convenient parking available at our Marrickville location on Jabez Street. The gym
                is easily accessible by car with street parking available, and we're also well-connected by public
                transport. Our location in Marrickville makes us easily accessible from Newtown, Dulwich Hill,
                Petersham, and throughout Sydney's Inner West.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Experience Authentic Muay Thai
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Join our traditional Muay Thai program and discover why it's the world's most effective striking art.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call (042) 311 1999
            </Button>
            <Link href="/styles">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Explore Other Styles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
