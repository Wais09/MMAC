"use client"

import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Shield, Users, Star } from "lucide-react"

export default function WomensMuayThaiPage() {
  return (
    <>
      <Head>
        <title>Women's Muay Thai Classes Marrickville Sydney | Ladies Thai Boxing | MMAC</title>
        <meta name="description" content="Women's only Muay Thai classes in Marrickville, Sydney. Empowering environment led by Johana Reyes Lagos. Build confidence, strength & self-defense skills. Free trial." />
        <meta name="keywords" content="women's Muay Thai Marrickville, ladies Thai boxing Sydney, women's martial arts Marrickville, women's self defense Sydney, female Muay Thai classes" />
        <meta property="og:title" content="Women's Muay Thai Classes Marrickville Sydney | Ladies Thai Boxing" />
        <meta property="og:description" content="Women's only Muay Thai classes in Marrickville, Sydney. Empowering environment led by Johana Reyes Lagos. Build confidence, strength & self-defense skills." />
        <meta property="og:image" content="/uploads/womens-muaythai2.jpg" />
        <link rel="canonical" href="https://marrickvillemartialartsclub.com.au/styles/womens-muay-thai" />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="/uploads/womens-muaythai2.jpg"
            alt="Women's Muay Thai classes Marrickville Sydney - ladies only Thai boxing fitness self-defense empowering supportive environment Inner West"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '50% 25%' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Women's <span className="text-yellow-400">Muay Thai</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Empowering Women • Exclusive Classes • Marrickville Sydney • Build Confidence & Strength
              </p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Premier Women's Muay Thai Classes in Marrickville, Sydney</h2>
              <p className="text-lg text-gray-600 mb-6">
                Discover the empowering world of women's Muay Thai at Marrickville Martial Arts Club. Our women's-only classes create a supportive,
                judgment-free environment where women of all fitness levels can learn authentic Thai boxing techniques while building confidence,
                strength, and practical self-defense skills in Sydney's Inner West.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Led by specialist instructor Johana Reyes Lagos, our women's Muay Thai program focuses on creating a safe space
                where women can push their limits, develop mental toughness, and master the Art of Eight Limbs. Whether you're seeking
                fitness, self-defense, or personal empowerment, our Thursday evening classes in Marrickville provide the perfect
                environment for women to thrive in martial arts.
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
                  src="https://www.youtube-nocookie.com/embed/L8IZ90KjMMA?rel=0&modestbranding=1&playsinline=1&autoplay=0&mute=0"
                  title="Women's Muay Thai Training at Marrickville Martial Arts Club - Empowering Women's Classes with Johana Reyes Lagos"
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
                  href="https://youtube.com/shorts/L8IZ90KjMMA?feature=share"
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

        {/* Why Women's Only */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Women's-Only Muay Thai Classes?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6">
                <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Supportive Environment</h3>
                <p className="text-gray-600">
                  Train in a judgment-free space where women support and encourage each other's growth and development.
                </p>
              </Card>
              <Card className="text-center p-6">
                <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Build Confidence</h3>
                <p className="text-gray-600">
                  Develop unshakeable confidence through mastering powerful techniques and overcoming personal challenges.
                </p>
              </Card>
              <Card className="text-center p-6">
                <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community & Friendship</h3>
                <p className="text-gray-600">
                  Connect with like-minded women who share your journey of empowerment and personal growth.
                </p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Personal Empowerment</h3>
                <p className="text-gray-600">
                  Experience the transformative power of martial arts in an environment designed specifically for women.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Instructor Spotlight */}
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Meet Your Women's Muay Thai Instructor
            </h2>
            <Card className="max-w-4xl mx-auto p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-black">JR</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Johana Reyes Lagos</h3>
                  <p className="text-yellow-600 font-medium">Women's Muay Thai Specialist</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-xl font-semibold mb-4">Passionate About Women's Empowerment</h4>
                  <p className="text-gray-600 mb-4">
                    Johana specializes in creating empowering, supportive environments where women can discover their inner strength
                    through Muay Thai. With extensive experience in women's martial arts education, she understands the unique needs
                    and goals of female practitioners.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Her teaching philosophy centers on building confidence from the inside out, helping women develop not just
                    physical skills but mental resilience and self-belief that extends far beyond the training mat.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      <span className="text-gray-700">Specialized training in women's martial arts</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      <span className="text-gray-700">Focus on confidence building and empowerment</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      <span className="text-gray-700">Creates safe, supportive learning environments</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Class Structure */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What to Expect in Women's Muay Thai Classes
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-black font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Welcoming Warm-up</h3>
                  <p className="text-gray-600">
                    Start with gentle mobility work and dynamic warm-up exercises designed to prepare your body
                    and mind for training in a supportive group atmosphere.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-black font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Technique Development</h3>
                  <p className="text-gray-600">
                    Learn authentic Muay Thai techniques including punches, kicks, knees, and elbows with
                    detailed instruction and personalized feedback from Johana.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-black font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Partner Practice & Pads</h3>
                  <p className="text-gray-600">
                    Practice techniques with partners using focus mitts and Thai pads, building timing,
                    power, and accuracy in a controlled, encouraging environment.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-black font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fitness & Conditioning</h3>
                  <p className="text-gray-600">
                    Build strength, endurance, and flexibility through Muay Thai-specific conditioning
                    exercises that enhance both technique and overall fitness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Women's Muay Thai Class Schedule Marrickville</h2>
            <Card className="bg-gray-800 border-gray-700 p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-6">Women's Only Classes</h3>
              <div className="space-y-4 text-gray-300">
                <div className="text-lg">
                  <strong className="text-white">Thursday Evening</strong>
                </div>
                <div className="text-xl font-bold text-yellow-400">
                  6:30 - 7:30 PM
                </div>
                <div className="text-sm text-gray-400">
                  Led by Johana Reyes Lagos
                </div>
                <div className="text-sm text-gray-400">
                  All fitness levels welcome
                </div>
                <div className="text-sm text-gray-400">
                  Ages 16+ • Women only environment
                </div>
              </div>
            </Card>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black mr-4"
                onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
              >
                Book Free Trial
              </Button>
              <Link href="/timetable">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  View Full Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits for Women */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Benefits of Muay Thai for Women
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Physical Benefits</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Exceptional cardiovascular fitness and endurance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Lean muscle development and body toning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Improved flexibility and coordination</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Core strength and stability enhancement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Effective calorie burning and weight management</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">Mental & Emotional Benefits</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Increased self-confidence and self-esteem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Stress relief and mental clarity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Practical self-defense skills and awareness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Mental resilience and inner strength</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                    <span>Supportive community and lasting friendships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions About Women's Muay Thai in Marrickville
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Why should I choose women's-only Muay Thai classes in Marrickville Sydney?
                </AccordionTrigger>
                <AccordionContent>
                  Women's-only classes create a supportive, judgment-free environment where you can focus entirely on your
                  development without feeling self-conscious. Many women find they're more willing to ask questions, try new
                  techniques, and push their limits when training exclusively with other women. Our Thursday evening classes
                  foster a strong sense of community and mutual encouragement that enhances the learning experience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Is Muay Thai safe for women to learn in Sydney?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Our women's Muay Thai classes prioritize safety through controlled training environments,
                  proper protective equipment, and progressive skill development. Instructor Johana Reyes Lagos specializes
                  in teaching women and ensures all techniques are practiced safely. We focus on proper form and technique
                  rather than intensity, making Muay Thai both safe and effective for women of all fitness levels.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  What should I wear to my first women's Muay Thai class?
                </AccordionTrigger>
                <AccordionContent>
                  For your first class, wear comfortable athletic clothing that allows free movement - leggings or shorts
                  and a fitted t-shirt or tank top work perfectly. Bring a water bottle and hair tie if needed. We provide
                  all necessary equipment including gloves and pads for your trial class. Avoid jewelry and ensure clothing
                  has no zippers or metal parts that could cause injury during training.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  How much do women's Muay Thai classes cost in Marrickville?
                </AccordionTrigger>
                <AccordionContent>
                  Our women's classes are included in all membership options. We offer flexible pricing including casual
                  rates for occasional attendance, weekly unlimited memberships, and family packages. Pricing varies based
                  on training frequency and commitment level. Contact us at (042) 311 1999 for current women's program
                  pricing and special offers. Your first trial class is always completely free!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Will Muay Thai help me build confidence and self-defense skills?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! Muay Thai is exceptional for building confidence through mastering powerful techniques and overcoming
                  personal challenges. You'll develop practical self-defense skills using punches, kicks, knees, and elbows,
                  plus situational awareness and mental toughness. The supportive women's-only environment accelerates
                  confidence building as you achieve goals alongside encouraging training partners who understand your journey.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  Can Muay Thai help with weight loss and fitness goals for women?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Muay Thai is one of the most effective workouts for women's fitness goals. A typical class
                  burns 500-700 calories while building lean muscle, improving cardiovascular health, and enhancing flexibility.
                  The high-intensity nature combined with strength training elements makes it excellent for weight loss, body
                  toning, and overall fitness improvement while learning practical skills in a fun, social environment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  What makes Johana Reyes Lagos a great instructor for women?
                </AccordionTrigger>
                <AccordionContent>
                  Johana specializes in women's martial arts education and understands the unique needs, goals, and concerns
                  of female practitioners. She creates empowering environments where women feel comfortable pushing their
                  limits while building confidence from the inside out. Her teaching philosophy focuses on personal growth,
                  mutual support, and helping women develop both physical skills and mental resilience that extends beyond training.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  Do I need previous martial arts experience for women's Muay Thai classes?
                </AccordionTrigger>
                <AccordionContent>
                  No previous experience necessary! Our women's classes welcome complete beginners and are designed to
                  accommodate all fitness levels. Johana starts with fundamental techniques and progresses at a pace that
                  ensures everyone feels comfortable and successful. Many of our students started with zero martial arts
                  background and have developed into confident, skilled practitioners through consistent training.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left">
                  How often should I attend women's Muay Thai classes to see results?
                </AccordionTrigger>
                <AccordionContent>
                  For optimal results, we recommend attending our Thursday women's class consistently, possibly supplemented
                  with other martial arts classes if desired. Many women see fitness improvements within 2-3 weeks and
                  noticeable technique development within 6-8 weeks. Confidence building often begins immediately as you
                  achieve small goals and connect with supportive training partners. Consistency is key to maximizing benefits.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left">
                  Can older women or mothers participate in Muay Thai classes?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Our women's classes welcome participants of all ages and life stages. Many mothers find Muay Thai
                  an excellent way to prioritize self-care, relieve stress, and build strength while connecting with other women.
                  Training is adapted to individual fitness levels and capabilities. Whether you're in your 20s, 40s, or beyond,
                  our supportive environment helps you achieve your personal goals safely and effectively.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger className="text-left">
                  What equipment will I need for women's Muay Thai training?
                </AccordionTrigger>
                <AccordionContent>
                  For your trial class, we provide all necessary equipment including boxing gloves, hand wraps, and focus mitts.
                  As you progress, you may want to invest in your own gloves and hand wraps for hygiene and comfort. Johana can
                  recommend quality women's-specific equipment that fits properly and suits your training style. We often have
                  gear available for purchase and can advise on the best options for your needs and budget.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger className="text-left">
                  Is parking available for Thursday evening women's classes in Marrickville?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We have convenient street parking available near our Marrickville location on Jabez Street. Our Thursday
                  evening time slot typically has good parking availability, and we're also easily accessible by public transport
                  with Marrickville Station just 5 minutes walk away. The location is convenient from Newtown, Dulwich Hill,
                  Petersham, and throughout Sydney's Inner West for your weekly women's training session.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-yellow-400 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Ready to Empower Yourself Through Muay Thai?
            </h2>
            <p className="text-lg text-gray-800 mb-8">
              Join Sydney's premier women's-only Muay Thai program. Build confidence, strength, and lasting friendships
              in a supportive environment designed for women.
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
                  Explore Other Programs
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-700 mt-4">
              Thursday 6:30-7:30 PM • Unit 5/1-7 Jabez Street, Marrickville NSW 2204
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
