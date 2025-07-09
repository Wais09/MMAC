"use client"

import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Trophy, Target, Zap, Shield } from "lucide-react"

export default function WrestlingPage() {
  return (
    <>
      <Head>
        <title>Wrestling Classes Marrickville Sydney | Olympic Wrestling Training | MMAC</title>
        <meta name="description" content="Learn Olympic Wrestling in Marrickville, Sydney with World Champion Tsuchika Shimoyamada. Elite wrestling instruction for all levels. Free trial class available." />
        <meta name="keywords" content="Wrestling Marrickville, Olympic Wrestling Sydney, wrestling classes Marrickville, wrestling training Sydney, Tsuchika Shimoyamada, martial arts Marrickville" />
        <meta property="og:title" content="Wrestling Classes Marrickville Sydney | Olympic Wrestling Training" />
        <meta property="og:description" content="Learn Olympic Wrestling in Marrickville, Sydney with World Champion Tsuchika Shimoyamada. Elite wrestling instruction for all levels." />
        <meta property="og:image" content="/uploads/Wrestlin2.jpg" />
        <link rel="canonical" href="https://marrickvillemartialartsclub.com.au/styles/wrestling" />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="/uploads/Wrestlin2.jpg"
            alt="Olympic wrestling training session at Marrickville Martial Arts Club with world champion instructor Tsuchika Shimoyamada teaching wrestling techniques"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '50% 20%' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Olympic <span className="text-yellow-400">Wrestling</span> Marrickville
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                World Champion Instruction • Wrestling Classes Sydney • Elite Techniques
              </p>
            </div>
          </div>
      </div>

      {/* World Champion Coach Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-black">
            <h2 className="text-4xl font-bold mb-4">Train with a World Champion</h2>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6">Tsuchika Shimoyamada</h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h4 className="text-xl font-bold mb-4">Championship Credentials:</h4>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-center">
                      <Trophy className="w-6 h-6 mr-3" />
                      Multiple Australian National Champion
                    </li>
                    <li className="flex items-center">
                      <Trophy className="w-6 h-6 mr-3" />
                      Multiple Japanese National Champion
                    </li>
                    <li className="flex items-center">
                      <Trophy className="w-6 h-6 mr-3" />
                      Oceania Champion
                    </li>
                    <li className="flex items-center">
                      <Trophy className="w-6 h-6 mr-3" />
                      Asian Champion
                    </li>
                  </ul>
                </div>
                <div className="text-left">
                  <p className="text-lg mb-4">
                    Coach Tsuchika brings decades of elite-level wrestling experience to Marrickville Martial Arts Club.
                    As a multiple national champion across two countries and continental champion, he provides
                    world-class instruction that you simply can't find anywhere else in Sydney.
                  </p>
                  <p className="text-lg">
                    Whether you're a complete beginner or experienced wrestler, training under a true champion
                    will accelerate your development and understanding of this ancient sport.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Olympic-Style Wrestling</h2>
            <p className="text-lg text-gray-600 mb-6">
              Wrestling is one of the world's oldest combat sports, featured in every modern Olympic Games.
              Our program focuses on Olympic-style wrestling techniques including takedowns, throws,
              and ground control, emphasizing both physical and mental development.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Under the guidance of world champion Tsuchika Shimoyamada, you'll learn authentic wrestling
              techniques while developing the mental toughness and physical conditioning that makes
              wrestlers some of the most respected athletes in combat sports.
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
                src="https://www.youtube-nocookie.com/embed/IPtzlyjEsKw?rel=0&modestbranding=1&playsinline=1&autoplay=0&mute=0"
                title="Olympic Wrestling Training at Marrickville Martial Arts Club - World Champion Tsuchika Shimoyamada Instruction"
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
                href="https://youtube.com/shorts/IPtzlyjEsKw?feature=share"
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
            Why Choose Wrestling?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Strength & Conditioning</h3>
              <p className="text-gray-600">
                Develop exceptional functional strength, endurance, and explosive power through wrestling training.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Mental Toughness</h3>
              <p className="text-gray-600">
                Build unbreakable mental resilience and the warrior mindset that wrestlers are famous for.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Technical Mastery</h3>
              <p className="text-gray-600">
                Learn precise Olympic-level techniques from a world champion with proven competition success.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Competition Ready</h3>
              <p className="text-gray-600">
                Prepare for competition at any level with authentic training methods used by champions.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Wrestling Curriculum
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Fundamental Techniques</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Stance and movement fundamentals
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Single and double leg takedowns
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Upper body throws and trips
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Defensive sprawling and counter-attacks
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Ground control and pinning combinations
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Advanced Development</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Competition strategy and tactics
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Mental preparation techniques
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Advanced conditioning protocols
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Video analysis and improvement
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2" />
                  Championship mindset development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Wrestling Class Schedule Marrickville</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Regular Classes</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Monday:</strong> 7:30-9:00 PM</p>
                <p><strong>Wednesday:</strong> 6:30-8:00 PM</p>
                <p className="text-sm text-gray-400">All levels welcome</p>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Private Training</h3>
              <div className="space-y-2 text-gray-300">
                <p>One-on-one with Tsuchika</p>
                <p>Customized technique focus</p>
                <p className="text-sm text-gray-400">By appointment</p>
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
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Contact for Private Lessons
            </Button>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your First Wrestling Class
          </h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-black font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Mobility & Warm-up</h3>
                <p className="text-gray-600">
                  Dynamic warm-up focused on wrestling-specific movements and injury prevention.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-black font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Technique Learning</h3>
                <p className="text-gray-600">
                  Step-by-step instruction of fundamental wrestling techniques with personal attention from Tsuchika.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-black font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Live Practice</h3>
                <p className="text-gray-600">
                  Controlled practice sessions where you apply techniques in a safe, supervised environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions About Wrestling in Marrickville
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Is wrestling suitable for beginners in Marrickville Sydney?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Our wrestling classes welcome complete beginners. World champion Tsuchika Shimoyamada
                has extensive experience teaching students from all backgrounds and fitness levels. We start with
                fundamental movements, basic positions, and simple takedowns, progressing gradually as students
                develop confidence and skill. Safety and proper technique are always emphasized.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                What makes training with Tsuchika Shimoyamada special?
              </AccordionTrigger>
              <AccordionContent>
                Tsuchika is a multiple national champion in both Australia and Japan, plus Oceania and Asian champion.
                This level of elite competition experience is extremely rare in Sydney. He brings authentic Olympic-level
                techniques, championship mindset, and decades of high-level competition knowledge. Training with a true
                world champion accelerates learning and provides insights you can't get elsewhere.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What should I expect in my first wrestling class at MMAC?
              </AccordionTrigger>
              <AccordionContent>
                Your first wrestling class begins with wrestling-specific warm-up and mobility work. You'll learn
                basic stance, movement, and fundamental takedown techniques. Classes emphasize proper form, safety,
                and controlled practice. Tsuchika provides personalized attention to ensure everyone learns at their
                own pace. Just bring comfortable workout clothes - no special equipment needed for your trial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                How much do wrestling classes cost in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                Given the world-class instruction with champion Tsuchika, our wrestling program offers exceptional
                value. We have flexible membership options including casual classes, unlimited monthly memberships,
                and private lesson packages. Contact us at (042) 311 1999 for current pricing and special offers.
                Your first trial class is free to experience this unique training opportunity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Can wrestling help with other martial arts like MMA or BJJ?
              </AccordionTrigger>
              <AccordionContent>
                Wrestling is fundamental to both MMA and Brazilian Jiu-Jitsu success. Wrestling develops takedown
                skills, ground control, balance, and mental toughness that directly transfer to other combat sports.
                Many MMA champions have wrestling backgrounds. Our students often cross-train between wrestling,
                BJJ, and MMA classes to develop complete grappling skills.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                Is wrestling good for fitness and weight loss?
              </AccordionTrigger>
              <AccordionContent>
                Wrestling is one of the most demanding physical activities, providing incredible full-body conditioning.
                A typical wrestling session burns 600-800 calories while building functional strength, explosive power,
                and cardiovascular endurance. Wrestling develops lean muscle mass, core strength, and mental resilience.
                It's extremely effective for weight loss and overall fitness improvement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                Can I compete in wrestling tournaments from your Marrickville gym?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Tsuchika actively prepares students for wrestling competitions throughout Sydney, NSW, and nationally.
                With his championship experience, he provides expert competition preparation including technique refinement,
                conditioning, mental preparation, and tactical advice. Competition is optional but available for students
                wanting to test their skills against other wrestlers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">
                What equipment do I need for wrestling classes?
              </AccordionTrigger>
              <AccordionContent>
                For your first trial, just bring comfortable workout clothes (t-shirt and shorts or tracksuit) and
                water. Wrestling shoes are recommended as you progress but not required initially. We have all
                necessary protective equipment available. As you advance, you might want your own wrestling shoes
                and gear, which we can help you select for quality and value.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">
                Is wrestling safe for training in Sydney?
              </AccordionTrigger>
              <AccordionContent>
                Wrestling is very safe when taught properly by qualified instructors. Tsuchika emphasizes proper
                technique, controlled training environments, and progressive skill development. We focus on technique
                over intensity, especially for beginners. Wrestling develops body awareness and falling skills that
                actually reduce injury risk in daily life and other sports.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">
                How often should I attend wrestling classes to improve?
              </AccordionTrigger>
              <AccordionContent>
                For optimal development, we recommend 2-3 wrestling sessions per week. This frequency allows proper
                skill acquisition while giving your body time to adapt and recover. Many students see fitness
                improvements within 3-4 weeks and noticeable technique development within 6-8 weeks. Consistency
                is key to mastering this demanding but rewarding sport.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger className="text-left">
                Do you offer private wrestling lessons in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Tsuchika offers private wrestling lessons for accelerated learning, competition preparation,
                or specific technique development. Private sessions provide personalized attention to work on
                individual weaknesses and advanced techniques. This is an excellent way to fast-track your wrestling
                development with direct instruction from a world champion.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger className="text-left">
                What age groups can participate in wrestling at MMAC?
              </AccordionTrigger>
              <AccordionContent>
                Our wrestling program welcomes all ages from teenagers to adults. We have specific kids wrestling
                classes for ages 5-12, and our adult classes accommodate everyone from university students to older
                adults. Wrestling is lifelong sport that can be adapted to any age or fitness level while providing
                incredible physical and mental benefits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Train with a True Wrestling Champion
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            This is your opportunity to learn from one of the world's most accomplished wrestlers.
            Spaces are limited due to the personalized nature of instruction.
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
