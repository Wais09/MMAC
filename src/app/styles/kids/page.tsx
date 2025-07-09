"use client"

import Image from "next/image"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Shield, Zap, Users } from "lucide-react"

export default function KidsPage() {
  return (
    <>
      <Head>
        <title>Kids Martial Arts Classes Marrickville Sydney | Children BJJ Muay Thai | MMAC</title>
        <meta name="description" content="Kids martial arts classes in Marrickville, Sydney for ages 5-12. BJJ, Muay Thai, Wrestling & Ninja Warrior training. Build confidence, discipline & fitness. Free trial." />
        <meta name="keywords" content="kids martial arts Marrickville, children BJJ Sydney, kids Muay Thai Marrickville, youth martial arts Sydney, children's self defense Marrickville, kids fitness classes" />
        <meta property="og:title" content="Kids Martial Arts Classes Marrickville Sydney | Children BJJ Muay Thai" />
        <meta property="og:description" content="Kids martial arts classes in Marrickville, Sydney for ages 5-12. BJJ, Muay Thai, Wrestling & Ninja Warrior training. Build confidence, discipline & fitness." />
        <meta property="og:image" content="/uploads/kids2.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://marrickvillemartialartsclub.com.au/styles/kids" />
      </Head>
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src="/uploads/kids2.jpg"
          alt="Kids martial arts classes Marrickville Sydney - children ages 5-12 learning BJJ Muay Thai wrestling Ninja Warrior confidence building Inner West"
          fill
          className="object-cover object-center"
          style={{ objectPosition: '50% 25%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Kids <span className="text-yellow-400">Martial Arts</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              BJJ • Muay Thai • Wrestling • Ninja Warrior • Ages 5-12 • Marrickville Sydney
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Kids Martial Arts Classes in Marrickville, Sydney</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Discover the premier kids martial arts programs in Marrickville, Sydney. Our specialized children's classes in Brazilian Jiu-Jitsu, Muay Thai, Wrestling, and Ninja Warrior training help kids aged 5-12 develop confidence, discipline, and physical fitness. Located in Marrickville, we're Sydney's top choice for quality youth martial arts education.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center p-6">
            <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Confidence Building</h3>
            <p className="text-gray-600">Build unshakeable self-confidence through martial arts achievement and positive reinforcement.</p>
          </Card>
          <Card className="text-center p-6">
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Self-Defense Skills</h3>
            <p className="text-gray-600">Learn practical self-defense techniques while developing discipline and respect for others.</p>
          </Card>
          <Card className="text-center p-6">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Physical Fitness</h3>
            <p className="text-gray-600">Improve coordination, flexibility, strength, and overall physical fitness through fun activities.</p>
          </Card>
          <Card className="text-center p-6">
            <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Social Development</h3>
            <p className="text-gray-600">Develop teamwork, communication skills, and lasting friendships with peers.</p>
          </Card>
        </div>

        {/* Kids BJJ Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kids Brazilian Jiu-Jitsu (BJJ) Classes Sydney</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Kids BJJ program in Marrickville teaches children the fundamentals of Brazilian Jiu-Jitsu through age-appropriate techniques and games. Kids learn ground fighting, basic submissions, and defensive positions while developing problem-solving skills and mental toughness.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Builds mental resilience and strategic thinking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Develops core strength and flexibility</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Teaches patience and perseverance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Safe, controlled environment for learning</span>
                </div>
              </div>
              <p className="text-gray-600 font-medium">
                <strong>Ages:</strong> 5-12 years | <strong>Focus:</strong> Ground fighting techniques, problem-solving, respect
              </p>
            </div>
            <div className="relative h-96">
              {/* YouTube Video Embed */}
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/lsHVsy8fVN0?rel=0&modestbranding=1&playsinline=1&autoplay=0&mute=0"
                  title="Kids Brazilian Jiu-Jitsu Classes at Marrickville Martial Arts Club - Children BJJ Training Sydney Ages 5-12"
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
                  href="https://youtube.com/shorts/lsHVsy8fVN0?feature=share"
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

        {/* Kids Muay Thai Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-96">
              {/* YouTube Video Embed */}
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/sLUqUUw1RAo?rel=0&modestbranding=1&playsinline=1&autoplay=0&mute=0"
                  title="Kids Muay Thai Classes at Marrickville Martial Arts Club - Children Thai Boxing Training Sydney Ages 5-12"
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
                  href="https://youtube.com/shorts/sLUqUUw1RAo?feature=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kids Muay Thai Classes Sydney</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Kids Muay Thai program introduces children to the traditional art of Thai boxing through fun, engaging classes. Kids learn proper striking techniques using punches, kicks, knees, and elbows while developing excellent cardiovascular fitness and coordination.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Exceptional cardiovascular workout</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Improves hand-eye coordination</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Builds discipline and focus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Traditional martial arts values</span>
                </div>
              </div>
              <p className="text-gray-600 font-medium">
                <strong>Ages:</strong> 5-12 years | <strong>Focus:</strong> Striking techniques, fitness, traditional respect
              </p>
            </div>
          </div>
        </div>

        {/* Kids Wrestling Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kids Wrestling Classes Sydney</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Kids Wrestling program introduces children to Olympic-style wrestling with world champion instruction from Tsuchika Shimoyamada. Kids learn fundamental wrestling techniques, takedowns, and ground control while developing incredible strength, coordination, and mental toughness in a safe, structured environment.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Olympic wrestling fundamentals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Strength and conditioning development</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Mental toughness and discipline</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">World champion coaching</span>
                </div>
              </div>
              <p className="text-gray-600 font-medium">
                <strong>Ages:</strong> 5-12 years | <strong>Focus:</strong> Wrestling techniques, strength, mental toughness, world-class instruction
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="https://ext.same-assets.com/3814609060/1572477315.jpeg"
                alt="Kids Wrestling Classes Marrickville Sydney Children Olympic Wrestling"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Kids Ninja Warrior Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-96">
              <Image
                src="https://ext.same-assets.com/3814609060/2277852474.jpeg"
                alt="Kids Ninja Warrior Training Marrickville Sydney Children Gymnastics Obstacles"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kids Ninja Warrior Training Sydney</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our unique Kids Ninja Warrior program combines gymnastics, strength training, and conditioning in an exciting obstacle-based format. Children develop incredible physical abilities while having fun navigating challenging courses designed for their age and skill level.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Gymnastics-based movement patterns</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Functional strength and conditioning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Obstacle course challenges</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                  <span className="text-gray-700">Builds courage and determination</span>
                </div>
              </div>
              <p className="text-gray-600 font-medium">
                <strong>Ages:</strong> 5-12 years | <strong>Focus:</strong> Gymnastics, strength, agility, obstacle training
              </p>
            </div>
          </div>
        </div>

        {/* Updated Schedule */}
        <div className="bg-gray-900 text-white py-16 rounded-lg mb-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Kids Martial Arts Class Schedule Marrickville</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Monday</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>4:00-4:40 PM:</strong> Kids Ninja Warrior</p>
                  <p><strong>5:00-5:40 PM:</strong> Kids BJJ</p>
                  <p className="text-sm text-gray-400">Ages 5-12 years</p>
                </div>
              </Card>
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Tuesday</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>4:00-4:40 PM:</strong> Kids Muay Thai</p>
                  <p className="text-sm text-gray-400">Ages 5-12 years</p>
                </div>
              </Card>
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Wednesday</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>5:00-5:40 PM:</strong> Kids BJJ</p>
                  <p className="text-sm text-gray-400">Ages 5-12 years</p>
                </div>
              </Card>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
              >
                Book FREE Kids Trial Class
              </Button>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 py-16 rounded-lg mb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Marrickville Martial Arts for Kids Classes?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">Expert Kids Instructors</h3>
                <p className="text-gray-600 mb-4">
                  Our qualified instructors specialize in teaching children aged 5-12, using age-appropriate techniques and positive reinforcement methods.
                </p>
                <h3 className="text-xl font-semibold mb-4">Safe Learning Environment</h3>
                <p className="text-gray-600">
                  State-of-the-art facilities with specialized kids equipment, ensuring a safe and supportive learning environment for all children.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">Character Development Focus</h3>
                <p className="text-gray-600 mb-4">
                  Beyond physical skills, we emphasize respect, discipline, confidence, and anti-bullying strategies that benefit kids throughout their lives.
                </p>
                <h3 className="text-xl font-semibold mb-4">Convenient Marrickville Location</h3>
                <p className="text-gray-600">
                  Easily accessible from all Sydney areas, with convenient class times that fit busy family schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions About Kids Martial Arts in Marrickville
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                What age groups do you offer kids martial arts classes for in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                We offer kids martial arts classes for children aged 5-12 years at our Marrickville location. Our programs
                are specifically designed for this age group with age-appropriate techniques, shorter class durations (40 minutes),
                and instructors trained in child development. We have classes in BJJ, Muay Thai, Wrestling, and Ninja Warrior
                training throughout the week.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Is martial arts safe for children in Sydney?
              </AccordionTrigger>
              <AccordionContent>
                Yes, our kids martial arts programs prioritize safety above all else. We use age-appropriate techniques,
                controlled training environments, and specialized children's equipment. Our instructors are trained in child
                development and focus on proper form rather than intensity. Kids learn respect, control, and safety as
                fundamental parts of martial arts training.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What should my child wear to their first martial arts class?
              </AccordionTrigger>
              <AccordionContent>
                For your child's first trial class, just bring comfortable sports clothes (t-shirt and shorts or tracksuit)
                and a water bottle. We provide all necessary equipment including protective gear. As your child progresses,
                you may want to invest in a martial arts uniform (gi for BJJ) or specific gear, but this isn't required
                for the trial class.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                How much do kids martial arts classes cost in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                We offer flexible membership options for kids classes including casual rates, unlimited monthly memberships,
                and family packages for multiple children. Pricing varies based on the number of classes per week and
                commitment level. Contact us at (042) 311 1999 for current kids pricing and family discounts.
                Your child's first trial class is always free!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Which martial art is best for my child - BJJ, Muay Thai, or Wrestling?
              </AccordionTrigger>
              <AccordionContent>
                Each martial art offers unique benefits for children. BJJ develops problem-solving skills and mental toughness,
                Muay Thai builds cardiovascular fitness and coordination, Wrestling develops strength and mental resilience,
                and Ninja Warrior combines gymnastics with fun obstacles. We recommend trying different classes to see what
                your child enjoys most. Many kids train in multiple disciplines for well-rounded development.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                How do martial arts help with my child's confidence and discipline?
              </AccordionTrigger>
              <AccordionContent>
                Martial arts builds confidence through achievement and mastery of new skills. Children learn to set goals,
                work hard, and overcome challenges. The structured environment teaches discipline, respect for instructors
                and peers, and self-control. These life skills transfer to school, home, and social situations, helping
                children become more confident and well-rounded individuals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                Can martial arts help with bullying prevention for kids?
              </AccordionTrigger>
              <AccordionContent>
                Yes, martial arts is excellent for bullying prevention. We teach children to walk with confidence,
                use strong body language, and verbally de-escalate situations. Physical techniques are taught as
                last resorts for self-protection only. Most importantly, martial arts builds the inner confidence
                that often prevents children from being targeted by bullies in the first place.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">
                What makes your kids program different from other martial arts schools in Sydney?
              </AccordionTrigger>
              <AccordionContent>
                Our kids program features world-class instruction from experts like world champion wrestler Tsuchika
                Shimoyamada and experienced instructors in each discipline. We offer multiple martial arts under one roof,
                allowing children to explore different styles. Our focus on character development, safety, and fun learning
                environments sets us apart in Marrickville and throughout Sydney.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">
                How long are kids martial arts classes in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                Our kids classes are 40 minutes long, which is the optimal duration for children aged 5-12. This timeframe
                allows for proper warm-up, technique instruction, practice, and cool-down while maintaining children's
                attention and engagement. Classes are structured with variety to keep kids interested and learning throughout
                the session.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">
                Can parents watch kids martial arts classes?
              </AccordionTrigger>
              <AccordionContent>
                Yes, parents are welcome to watch classes, especially during the initial trial period. We have viewing
                areas where parents can observe their children's progress. We find that some children focus better without
                parental observation once they're comfortable, but we're flexible based on each child's needs and
                parent preferences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger className="text-left">
                Do you offer kids martial arts birthday parties in Marrickville?
              </AccordionTrigger>
              <AccordionContent>
                Yes! We offer exciting martial arts birthday parties that combine fun activities, basic techniques,
                and games in a safe environment. Kids get to try different martial arts activities, learn basic moves,
                and play martial arts-themed games. Contact us at (042) 311 1999 to discuss birthday party packages
                and availability for your child's special day.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger className="text-left">
                How quickly will my child see progress in martial arts?
              </AccordionTrigger>
              <AccordionContent>
                Children typically see improvements in fitness, flexibility, and basic techniques within 2-4 weeks of
                consistent training. Confidence building and discipline development often show within the first month.
                Significant skill development and advancement through belt/stripe systems usually occurs within 3-6 months
                depending on the child's attendance and effort. Every child progresses at their own pace.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* SEO CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Start Your Child's Martial Arts Journey in Marrickville Today
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Join Sydney's premier kids martial arts program. FREE trial class available for all new students aged 5-12.
            BJJ, Muay Thai, Wrestling, and Ninja Warrior classes now enrolling in Marrickville.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call (042) 311 1999
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white"
              onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
            >
              Book Free Trial Online
            </Button>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            Located at Unit 5/1-7 Jabez Street, Marrickville NSW 2204 | Serving Sydney's Inner West
          </p>
        </div>
      </div>
      </div>
    </>
  )
}
