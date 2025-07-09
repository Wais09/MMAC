"use client"


import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Trophy, Heart } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Head from "next/head"

export default function BJJPage() {

  // Structured data for BJJ video
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Brazilian Jiu-Jitsu Training at Marrickville Martial Arts Club",
    "description": "Watch our BJJ training session in action at Marrickville Martial Arts Club. Expert instruction in Brazilian Jiu-Jitsu for all levels.",
    "thumbnailUrl": "https://img.youtube.com/vi/h75vG6SBGtE/maxresdefault.jpg",
    "uploadDate": "2024-01-01",
    "duration": "PT1M",
    "embedUrl": "https://www.youtube.com/embed/h75vG6SBGtE",
    "contentUrl": "https://youtube.com/shorts/h75vG6SBGtE",
    "publisher": {
      "@type": "Organization",
      "name": "Marrickville Martial Arts Club",
      "url": "https://marrickvillemartialarts.com"
    }
  }

  return (
    <>
      <Head>
        <title>Brazilian Jiu-Jitsu Classes Marrickville Sydney | BJJ Training | MMAC</title>
        <meta name="description" content="Learn Brazilian Jiu-Jitsu in Marrickville, Sydney. Expert BJJ classes for all levels with Head Instructor Josh Allsopp. Free trial class available. The gentle art that works for everyone." />
        <meta name="keywords" content="Brazilian Jiu-Jitsu Marrickville, BJJ classes Sydney, Jiu-Jitsu training Marrickville, BJJ Marrickville, martial arts Marrickville, grappling classes Sydney" />
        <meta property="og:title" content="Brazilian Jiu-Jitsu Classes Marrickville Sydney | BJJ Training" />
        <meta property="og:description" content="Learn Brazilian Jiu-Jitsu in Marrickville, Sydney. Expert BJJ classes for all levels with Head Instructor Josh Allsopp. Free trial class available." />
        <meta property="og:image" content="/uploads/BJJ2.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://marrickvillemartialartsclub.com.au/styles/bjj" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
        />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="/uploads/BJJ2.jpg"
            alt="Brazilian Jiu-Jitsu BJJ classes Marrickville Sydney - students training grappling techniques ground fighting no-gi martial arts Inner West"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '50% 30%' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Brazilian <span className="text-yellow-400">Jiu-Jitsu</span> Marrickville
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                The Gentle Art • Human Chess • BJJ Classes Sydney • Expert Instruction
              </p>
            </div>
          </div>
        </div>

      {/* Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Brazilian Jiu-Jitsu Classes in Marrickville, Sydney</h2>
            <p className="text-lg text-gray-600 mb-6">
              Discover why Marrickville Martial Arts Club offers the premier Brazilian Jiu-Jitsu (BJJ) training in Sydney's Inner West.
              Our BJJ classes focus on ground fighting, submission grappling, and the strategic elements that make this martial art
              the "gentle art." Often called "human chess," BJJ emphasizes technique, leverage, and timing over brute strength,
              making it accessible to practitioners of all sizes and ages in Marrickville and surrounding Sydney areas.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              At Marrickville Martial Arts Club, our Brazilian Jiu-Jitsu program is led by Head Instructor Josh Allsopp,
              who brings 15+ years of experience and championship-level training methods. Whether you're searching for
              self-defense classes, fitness training, or competition preparation, our BJJ classes in Marrickville provide
              a complete martial arts experience for beginners to advanced practitioners throughout Sydney.
            </p>
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
            >
              Book Your Free Trial
            </Button>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            {/* Direct YouTube Video Embed */}
            <div className="relative w-full h-full">
              <iframe
                className="w-full h-full rounded-lg border-0"
                src="https://www.youtube.com/embed/yxJkMlqYrys"
                title="BJJ Training Session - Brazilian Jiu-Jitsu at Marrickville Martial Arts Club"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Video Description Below */}
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-gray-900">BJJ Training at Marrickville Martial Arts Club</h3>
              <p className="text-gray-600 mt-1">Experience our world-class Brazilian Jiu-Jitsu training</p>
              <p className="text-sm text-gray-500 mt-2">
                <a
                  href="https://youtu.be/yxJkMlqYrys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 underline font-medium"
                >
                  Can't see the video? Click here to watch on YouTube →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Brazilian Jiu-Jitsu?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Self-Defense</h3>
              <p className="text-gray-600">
                Learn effective self-defense techniques that work regardless of size or strength.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Mental Strategy</h3>
              <p className="text-gray-600">
                Develop problem-solving skills and mental toughness through strategic thinking.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Join a supportive community of practitioners who help each other grow.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Full-Body Workout</h3>
              <p className="text-gray-600">
                Get an intense workout that builds strength, flexibility, and endurance.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Instructors */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Your BJJ Instructors
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">JA</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Josh Allsopp</h3>
              <p className="text-yellow-600 font-medium mb-3">Head BJJ Instructor</p>
              <p className="text-gray-600">
                15+ years experience, analytical approach, championship-level program development and competition coaching.
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">FS</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Felipe Silva</h3>
              <p className="text-yellow-600 font-medium mb-3">Muay Thai & BJJ Expert</p>
              <p className="text-gray-600">
                Professional fighter background with international competition experience across all skill levels.
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">TS</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tsuchika Shimoyamada</h3>
              <p className="text-yellow-600 font-medium mb-3">Wrestling & Takedowns</p>
              <p className="text-gray-600">
                World champion wrestler, brings elite takedown defense and ground control to BJJ training.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">BJJ Class Schedule Marrickville</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">No-Gi BJJ Classes</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Monday:</strong> 6:00 - 7:30 PM (All Levels)</p>
                <p><strong>Tuesday:</strong> 6:00 - 7:00 PM (All Levels)</p>
                <p><strong>Thursday:</strong> 6:00 - 7:30 PM (All Levels)</p>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Kids BJJ Classes</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Monday:</strong> 5:00 - 5:40 PM (Ages 5-12)</p>
                <p><strong>Wednesday:</strong> 5:00 - 5:40 PM (Ages 5-12)</p>
                <p className="text-sm text-gray-400">Perfect for young martial artists</p>
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
            <Link href="/timetable">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Full Schedule
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What to Expect in Your First BJJ Class
          </h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-black font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Warm-up & Movement</h3>
                <p className="text-gray-600">
                  Start with gentle warm-up exercises and basic movement patterns to prepare your body.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-black font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Technique Instruction</h3>
                <p className="text-gray-600">
                  Learn fundamental techniques step-by-step with detailed explanation and demonstration.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-black font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Controlled Practice</h3>
                <p className="text-gray-600">
                  Practice techniques with a partner in a controlled, safe environment with instructor guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BJJ FAQs */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Brazilian Jiu-Jitsu FAQs - Marrickville Sydney
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold">
                What is Brazilian Jiu-Jitsu and why is it called "the gentle art"?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Brazilian Jiu-Jitsu (BJJ) is a martial art focused on ground fighting and submission grappling. It's called "the gentle art" because it emphasizes technique, leverage, and timing over brute strength. BJJ teaches you how to control and submit opponents using joint locks and chokes, making it effective for smaller practitioners against larger opponents. Our BJJ classes in Marrickville teach these principles through systematic progression from basic positions to advanced techniques.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold">
                Is Brazilian Jiu-Jitsu good for beginners with no martial arts experience?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely! BJJ is perfect for beginners. At Marrickville Martial Arts Club, over 90% of our students start with zero experience. Our structured beginner program introduces fundamental positions, basic escapes, and simple submissions in a safe, controlled environment. Head Instructor Josh Allsopp specializes in teaching beginners, breaking down complex techniques into easy-to-understand steps. Your first class is always FREE to try.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold">
                What should I wear to my first BJJ class in Marrickville?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                For your first BJJ class, wear comfortable athletic clothing - shorts and a t-shirt work perfectly. We train "No-Gi" BJJ, which means no traditional uniform (gi) required. Avoid clothing with zippers, buttons, or pockets that could cause injury. Bring a water bottle and arrive 15 minutes early. All training equipment is provided for trial classes at our Marrickville location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-semibold">
                How long does it take to get good at Brazilian Jiu-Jitsu?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                BJJ progression varies by individual, but most students see significant improvement within 3-6 months of consistent training. You'll learn basic self-defense techniques in your first few classes. The beauty of BJJ is that there's always something new to learn - it's often called "human chess" because of its endless strategic depth. Our structured curriculum at Marrickville ensures steady progress through clear goals and regular feedback from experienced instructors.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-semibold">
                Is BJJ training safe? Will I get injured learning Brazilian Jiu-Jitsu?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                BJJ is one of the safest martial arts when practiced properly. At Marrickville Martial Arts Club, we emphasize safety through controlled sparring, proper warm-ups, and experienced supervision. Our instructors teach you how to "tap out" (submit) safely and emphasize the importance of training with control. Most techniques are practiced slowly and with cooperation initially. Injuries are rare with proper instruction and a safety-first mentality.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-semibold">
                What's the difference between No-Gi BJJ and traditional BJJ with a gi?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                No-Gi BJJ is practiced without the traditional uniform, using shorts and a rashguard instead. This style is faster-paced, more dynamic, and closely relates to MMA and real-world self-defense situations. At Marrickville, we focus on No-Gi BJJ because it's more accessible for beginners (no expensive uniform required), easier to maintain hygiene, and directly applicable to other martial arts and self-defense scenarios.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left font-semibold">
                Can women train BJJ safely? Are there women's BJJ classes in Marrickville?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes! BJJ is excellent for women and is one of the most practical self-defense arts. While we don't have women-only BJJ classes, our regular classes welcome women of all skill levels. BJJ's emphasis on technique over strength makes it particularly effective for women. Many women find BJJ empowering as it teaches real self-defense skills and builds confidence. Our supportive environment ensures everyone feels comfortable training together.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left font-semibold">
                What are the benefits of training BJJ for fitness and self-defense?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                BJJ provides incredible fitness benefits: full-body strength training, improved flexibility, enhanced cardiovascular health, and mental toughness. For self-defense, BJJ teaches you how to defend yourself from the ground (where many real fights end up), escape from disadvantageous positions, and control larger opponents. The mental benefits include problem-solving skills, stress relief, and increased confidence. It's both a great workout and practical life skill.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left font-semibold">
                How much do BJJ classes cost in Marrickville? Are there membership options?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer flexible membership options to suit every budget: Casual ($35/class), Kick Starter ($30/week for 1 class), 2X Plan ($40/week for 2 classes), and Unlimited ($55/week). Your first class is always FREE! No lock-in contracts and you can cancel with 30 days notice. Memberships include access to all programs - BJJ, Muay Thai, MMA, and Wrestling. Contact us for current promotions and family discounts.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left font-semibold">
                Can I train BJJ if I'm older or not in great shape?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely! BJJ is perfect for people of all ages and fitness levels. We have students in their 40s, 50s, and beyond who started as complete beginners. BJJ will improve your fitness level gradually as you train. The emphasis on technique over athleticism means you can practice effectively regardless of your starting fitness. Our instructors adapt training to your comfort level and physical capabilities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger className="text-left font-semibold">
                What makes Marrickville Martial Arts Club's BJJ program different from other gyms?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our BJJ program is led by Head Instructor Josh Allsopp with 15+ years of experience and championship-level training methods. We focus on systematic progression, detailed technique instruction, and creating a supportive learning environment. Located in the heart of Marrickville, we're easily accessible from all Sydney Inner West suburbs. Our No-Gi focus, beginner-friendly approach, and integration with other martial arts (Muay Thai, MMA, Wrestling) provides a comprehensive training experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger className="text-left font-semibold">
                How do I book a free trial BJJ class in Marrickville?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Booking your free trial is easy! You can book online through our website, call us at (042) 311 1999, or visit us at Unit 5/1-7 Jabez Street, Marrickville. We're just 5 minutes walk from Marrickville Station. No experience necessary - just bring comfortable workout clothes and a positive attitude. Our friendly staff will take care of everything else and ensure you have a great first experience with Brazilian Jiu-Jitsu.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Begin Your BJJ Journey?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Join our welcoming BJJ community and discover why Brazilian Jiu-Jitsu is called "the gentle art."
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
