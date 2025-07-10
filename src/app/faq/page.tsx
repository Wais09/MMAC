"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export default function FAQPage() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "Do I need prior experience to join the gym?",
          answer: "No prior experience is necessary! Our gym welcomes beginners and experienced practitioners alike. Our classes are designed to accommodate all skill levels, and our expert instructors will guide you through every step of your martial arts journey."
        },
        {
          question: "What should I wear to my first class?",
          answer: "For your first class, wear comfortable workout attire such as shorts and a t-shirt. Avoid clothing with zippers, buttons, or anything that could snag. We provide all necessary equipment for trial classes, so just bring yourself, a water bottle, and a positive attitude!"
        },
        {
          question: "How do I book a FREE trial class?",
          answer: "Booking a trial class is easy! You can call us at (042) 311 1999, use our online chatbot, or simply show up during any scheduled class time. We recommend calling ahead to ensure space availability and to get any specific information about what to expect."
        },
        {
          question: "What age groups do you cater to?",
          answer: "We welcome everyone from age 5 and up! Our kids' programs are specially designed for ages 5-12, while our adult classes accommodate teenagers and adults of all ages. We have students ranging from 5 to 65+ years old, and everyone trains at their own pace."
        }
      ]
    },
    {
      category: "Programs & Classes",
      questions: [
        {
          question: "What martial arts styles do you teach?",
          answer: "We offer comprehensive training in Brazilian Jiu-Jitsu (BJJ), Muay Thai, Mixed Martial Arts (MMA), Olympic-style Wrestling, and specialized Kids programs. We also have women-only Muay Thai classes for those who prefer a female-only environment."
        },
        {
          question: "How often should I train?",
          answer: "For beginners, we recommend starting with 2-3 classes per week to allow your body to adapt. As you progress and build fitness, many students train 4-6 times per week. Our unlimited membership options allow you to train as much as you like, and our instructors can help you create a schedule that suits your goals."
        },
        {
          question: "Can I train in multiple disciplines?",
          answer: "Absolutely! Many of our students cross-train in multiple martial arts. For example, BJJ and Wrestling complement each other perfectly, while Muay Thai and MMA share many techniques. Cross-training helps develop a well-rounded skill set and keeps training exciting and challenging."
        },
        {
          question: "Do you offer competition training?",
          answer: "Yes! We have dedicated competition training sessions for students interested in competing. Our instructors have extensive competition experience and can help prepare you for BJJ tournaments, Muay Thai fights, MMA competitions, and wrestling matches at all levels."
        }
      ]
    },
    {
      category: "Membership & Pricing",
      questions: [
        {
          question: "What are your membership options and prices?",
          answer: "We offer flexible membership options starting from $149/month for unlimited classes. We also have casual rates at $35 per class, family packages with discounts for multiple family members, and student discounts. No lock-in contracts required - you can cancel anytime with 30 days notice."
        },
        {
          question: "Do you offer family discounts?",
          answer: "Yes! We believe martial arts is a great family activity. We offer special family packages when multiple family members join. Contact us for specific pricing as discounts vary based on the number of family members and programs selected."
        },
        {
          question: "Is there a joining fee?",
          answer: "No joining fees! We believe in keeping things simple and affordable. Your first month's membership is all you need to get started, plus any equipment you might want to purchase (though this is optional as we provide equipment for beginners)."
        },
        {
          question: "Can I freeze my membership?",
          answer: "Yes, we understand life happens! You can freeze your membership for up to 3 months per year for reasons such as injury, travel, or other commitments. Just give us 1 week's notice and we'll take care of the rest."
        }
      ]
    },
    {
      category: "Equipment & Facilities",
      questions: [
        {
          question: "What equipment do I need?",
          answer: "For beginners, all you need is yourself and a positive attitude! We provide all basic equipment for trial classes and beginners. As you progress, you may want to invest in personal gear like gloves ($50-150), mouth guard ($10-30), shin guards ($40-80), or a BJJ gi ($100-200). Our instructors will advise you on the best equipment as you develop."
        },
        {
          question: "Do you have changing rooms and showers?",
          answer: "Yes, we have clean changing rooms with lockers for your belongings. While we don't currently have shower facilities, we do have towel service and our location is close to several gyms and recreational centers if you need shower access after training."
        },
        {
          question: "Is parking available?",
          answer: "Yes! We have free street parking available around our Jabez Street location. The area is easily accessible and parking is generally not an issue. We're also just 5 minutes from Marrickville Station for those using public transport."
        },
        {
          question: "What safety measures do you have in place?",
          answer: "Safety is our top priority. All classes are supervised by qualified instructors, we have first aid trained staff on-site, and our training environment emphasizes controlled practice and proper technique. We also maintain high cleanliness standards and regularly sanitize all equipment and mats."
        }
      ]
    },
    {
      category: "Training & Progress",
      questions: [
        {
          question: "How long does it take to see results?",
          answer: "You'll start feeling the benefits immediately! Most students notice improved fitness, confidence, and stress relief within the first few weeks. Technical skill development varies by individual, but with consistent training (2-3 times per week), you'll see significant progress in 3-6 months."
        },
        {
          question: "Do you have a ranking/belt system?",
          answer: "Yes! Our BJJ program follows the traditional Brazilian Jiu-Jitsu belt system (white, blue, purple, brown, black). Other programs have their own progression systems and skill levels. Regular grading sessions are held, and progression is based on technique, knowledge, and time spent training."
        },
        {
          question: "Can I train if I have injuries or physical limitations?",
          answer: "Many martial arts techniques can be adapted for different physical abilities. However, we strongly recommend consulting with your doctor first, then speaking with our instructors about your specific situation. We can often modify techniques and training intensity to accommodate various needs while keeping you safe."
        },
        {
          question: "What makes your instructors special?",
          answer: "Our instructors are world-class! We have multiple national and international champions, including Tsuchika Shimoyamada (multiple Australian & Japanese National Champion, Oceania & Asian Champion), BJJ black belts like Ari Tabak, and experienced fighters like Felipe Silva. They're not just skilled athletes - they're passionate teachers dedicated to your success."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="https://ext.same-assets.com/3814609060/274821222.jpeg"
          alt="Frequently Asked Questions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h1>
            <p className="text-xl text-gray-200">
              Everything you need to know about training with us
            </p>
          </div>
        </div>
      </div>

      {/* Quick Contact */}
      <div className="bg-yellow-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-black text-lg">
            Can't find what you're looking for?
            <Button
              variant="link"
              className="text-black font-semibold underline p-0 ml-2"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call us at (042) 311 1999
            </Button>
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={`${category.category}-${index}`}
                    value={`${category.category}-${index}`}
                    className="border border-gray-200 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4 pb-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      {/* Still Have Questions */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Still Have Questions?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our team</p>
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black w-full"
                onClick={() => window.open('tel:+61423111999', '_self')}
              >
                (042) 311 1999
              </Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Visit Us</h3>
              <p className="text-gray-600 mb-4">Come see our facilities in person</p>
              <Button variant="outline" className="w-full">
                Get Directions
              </Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Try a Class</h3>
              <p className="text-gray-600 mb-4">Experience it yourself with a FREE trial</p>
              <Link href="/styles">
                <Button className="bg-black hover:bg-gray-800 text-white w-full">
                  Book Trial Class
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Start Your Martial Arts Journey?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Join our community of martial artists and discover your potential with a FREE trial class!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call (042) 311 1999
            </Button>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
