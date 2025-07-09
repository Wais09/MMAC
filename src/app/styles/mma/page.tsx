"use client"

import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MMAPage() {
  return (
    <>
      <Head>
        <title>MMA Classes Marrickville Sydney | Mixed Martial Arts Training | MMAC</title>
        <meta name="description" content="Learn Mixed Martial Arts (MMA) in Marrickville, Sydney. Complete fighting system with striking & grappling. Led by Head MMA Instructor Antonio Mammarella. Free trial." />
        <meta name="keywords" content="MMA Marrickville, Mixed Martial Arts Sydney, MMA classes Marrickville, UFC training Sydney, martial arts Marrickville, combat sports Sydney" />
        <meta property="og:title" content="MMA Classes Marrickville Sydney | Mixed Martial Arts Training" />
        <meta property="og:description" content="Learn Mixed Martial Arts (MMA) in Marrickville, Sydney. Complete fighting system with striking & grappling. Led by Head MMA Instructor Antonio Mammarella." />
        <meta property="og:image" content="https://ext.same-assets.com/3814609060/1633847439.jpeg" />
        <link rel="canonical" href="https://marrickvillemartialartsclub.com.au/styles/mma" />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="https://ext.same-assets.com/3814609060/1633847439.jpeg"
            alt="MMA Mixed Martial Arts Training Classes Marrickville Sydney"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Mixed Martial <span className="text-yellow-400">Arts</span> Marrickville
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Complete Fighting System • MMA Training Sydney • Competition Ready
              </p>
            </div>
          </div>
        </div>

      {/* Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Premier MMA Training in Marrickville, Sydney</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Experience comprehensive Mixed Martial Arts training at Marrickville Martial Arts Club, Sydney's premier MMA facility.
            Our MMA classes combine the best techniques from Brazilian Jiu-Jitsu, Muay Thai, Wrestling, and Boxing to create complete fighters.
            Led by Head MMA Instructor Antonio Mammarella, our program provides expert training in all aspects of mixed martial arts -
            from striking and grappling to ground fighting and competition preparation throughout Marrickville and Sydney's Inner West.
          </p>
        </div>

        {/* Instructor */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your MMA Instructor</h2>
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-black">AM</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Antonio Mammarella</h3>
              <p className="text-yellow-600 font-medium mb-4">Head MMA Instructor</p>
              <p className="text-gray-600 text-lg">
                14+ years in mixed martial arts, former professional fighter and coach. Antonio brings extensive experience
                in competition preparation and develops complete fighters who are equally comfortable standing, clinching,
                or on the ground.
              </p>
            </Card>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-gray-900 text-white py-16 rounded-lg">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">MMA Class Schedule Marrickville</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Evening Classes</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Tuesday:</strong> 7:30-8:30 PM</p>
                  <p><strong>Thursday:</strong> 7:30-8:30 PM</p>
                  <p className="text-sm text-gray-400">All levels welcome</p>
                </div>
              </Card>
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Morning Classes</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Saturday:</strong> 7:00-8:00 AM</p>
                  <p className="text-sm text-gray-400">Combined Muay Thai/MMA</p>
                  <p className="text-sm text-gray-400">All levels welcome</p>
                </div>
              </Card>
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Training Focus</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Striking & Grappling</p>
                  <p>Ground Fighting</p>
                  <p>Competition Prep</p>
                </div>
              </Card>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
              >
                Book Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions About MMA in Marrickville
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Is MMA suitable for beginners in Marrickville Sydney?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Our MMA classes in Marrickville welcome complete beginners. Head instructor Antonio Mammarella 
                has 14+ years of experience teaching students from all backgrounds. We start with fundamental 
                techniques from each discipline (striking, grappling, ground fighting) and progress gradually. 
                Safety is our top priority, with controlled training environments and proper protective equipment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                What should I expect in my first MMA class at MMAC?
              </AccordionTrigger>
              <AccordionContent>
                Your first MMA class begins with a comprehensive warm-up and mobility work. You'll learn basic 
                techniques from striking (punches, kicks) and grappling (takedowns, ground control). Classes 
                integrate techniques from Brazilian Jiu-Jitsu, Muay Thai, Wrestling, and Boxing. We focus on 
                fundamental movements, proper form, and controlled partner drills. No experience necessary!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How much do MMA classes cost in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                We offer flexible membership options for MMA training in Marrickville. Pricing depends on 
                training frequency and commitment level, with options for casual drop-ins, unlimited monthly 
                memberships, and multi-discipline packages. Contact us at (042) 311 1999 for current pricing 
                and special promotions. Your first trial class is always free!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What martial arts disciplines are included in MMA training?
              </AccordionTrigger>
              <AccordionContent>
                Our MMA program combines four core disciplines: Brazilian Jiu-Jitsu (ground fighting and submissions), 
                Muay Thai (striking with punches, kicks, knees, elbows), Wrestling (takedowns and ground control), 
                and Boxing (punching techniques and footwork). Students learn to seamlessly transition between 
                standing, clinch, and ground fighting phases of combat.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Can I compete in MMA from your Marrickville gym?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Antonio has extensive experience preparing fighters for amateur and professional MMA 
                competition. Our competition team trains specifically for MMA tournaments throughout Sydney and NSW. 
                We provide comprehensive preparation including technique refinement, conditioning, mental preparation, 
                and corner coaching. Competition is optional but available for dedicated students.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                Is MMA safe for training in Sydney?
              </AccordionTrigger>
              <AccordionContent>
                When practiced properly with qualified instruction, MMA training is very safe. We emphasize controlled 
                training environments, proper protective equipment, and progressive skill development. Antonio ensures 
                all sparring is supervised and appropriate for skill levels. We focus on technique over intensity, 
                especially for beginners, making MMA training both safe and effective.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                What equipment do I need for MMA classes in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                For your first trial class, just bring comfortable workout clothes (rashguard/shorts recommended) 
                and water. We provide all necessary equipment including gloves, shin guards, and protective gear. 
                As you progress, you may want your own MMA gloves, rashguards, and shorts. We can recommend quality 
                gear and often have equipment available for purchase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">
                How does MMA training help with fitness and weight loss?
              </AccordionTrigger>
              <AccordionContent>
                MMA is an incredible full-body workout that burns 600-900 calories per session while building 
                functional strength, cardiovascular endurance, and flexibility. The varied training (striking, 
                grappling, conditioning) prevents workout plateau and keeps training exciting. MMA develops lean 
                muscle mass, core strength, and explosive power while improving coordination and mental toughness.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">
                Can women train MMA at your Marrickville gym?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! MMA is excellent for women seeking comprehensive self-defense skills, fitness, and 
                confidence building. Our classes are co-ed with a welcoming, respectful environment. Many women 
                find MMA empowering as it develops both physical and mental strength. Antonio ensures all students 
                feel comfortable and supported regardless of gender or experience level.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">
                How often should I train MMA to see results?
              </AccordionTrigger>
              <AccordionContent>
                For optimal development, we recommend 2-3 MMA sessions per week, possibly supplemented with 
                additional discipline-specific classes (BJJ, Muay Thai, Wrestling). This frequency allows proper 
                skill development and physical adaptation. Many students see fitness improvements within 3-4 weeks 
                and noticeable technique development within 2-3 months of consistent training.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger className="text-left">
                What's the difference between MMA and other martial arts?
              </AccordionTrigger>
              <AccordionContent>
                MMA is unique because it combines multiple martial arts disciplines into one comprehensive fighting 
                system. Unlike single-discipline arts, MMA teaches you to fight effectively in all ranges - standing 
                striking, clinch work, and ground fighting. This makes MMA one of the most complete and practical 
                martial arts for both self-defense and sport competition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger className="text-left">
                Do you offer private MMA lessons in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Antonio offers private MMA lessons for students wanting personalized instruction, accelerated 
                learning, or specific skill development. Private sessions allow focused work on individual weaknesses, 
                competition preparation, or technique refinement. Contact us to discuss availability and scheduling 
                for one-on-one MMA training in Marrickville.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready for Complete MMA Training?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Experience the ultimate martial arts training combining all disciplines.
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