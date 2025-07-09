"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Users, Zap, Rocket, Target, Clock } from "lucide-react"

export default function MembershipPage() {
  const plans = [
    {
      name: "Casual",
      price: "$35",
      period: "per class",
      description: "Perfect for trying us out or occasional training",
      features: [
        "Pay as you train",
        "No commitment",
        "Access to all programs",
        "Equipment provided",
        "Beginner friendly"
      ],
      icon: Users,
      color: "border-gray-200",
      signupUrl: null // Casual plan requires phone call for setup
    },
    {
      name: "Kick Starter",
      price: "$30",
      period: "per week",
      description: "Great entry point for regular training",
      features: [
        "1 class per week",
        "All programs included",
        "Perfect for beginners",
        "Flexible scheduling",
        "Equipment provided"
      ],
      icon: Rocket,
      color: "border-green-400",
      signupUrl: "https://app.clubworx.com/s/MdQN9003"
    },
    {
      name: "2X",
      price: "$40",
      period: "per week",
      description: "For dedicated practitioners wanting more",
      features: [
        "2 classes per week",
        "All programs included",
        "Faster skill development",
        "Competition preparation",
        "Priority booking"
      ],
      icon: Target,
      color: "border-blue-400",
      signupUrl: "https://app.clubworx.com/s/RDaphccF"
    },
    {
      name: "Unlimited",
      price: "$55",
      period: "per week",
      description: "Best value for serious martial artists",
      features: [
        "Unlimited classes",
        "All programs included",
        "No lock-in contracts",
        "30 days notice to cancel",
        "Family discounts available",
        "Competition team access"
      ],
      icon: Star,
      color: "border-yellow-400 ring-2 ring-yellow-400",
      popular: true,
      signupUrl: "https://app.clubworx.com/s/LiqEKTNa"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="https://ext.same-assets.com/3814609060/274821222.jpeg"
          alt="Membership"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Membership & <span className="text-yellow-400">Pricing</span>
            </h1>
            <p className="text-xl text-gray-200">
              Flexible options to fit your goals and budget
            </p>
          </div>
        </div>
      </div>

      {/* Free Trial Banner */}
      <div className="bg-yellow-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-black mb-2">
            🎉 Your First Class is Always FREE! 🎉
          </h2>
          <p className="text-black">
            Try any program before committing. No obligations, no pressure.
          </p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600">
            All plans include access to world-class instruction and our supportive community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card key={plan.name} className={`relative ${plan.color} ${plan.popular ? 'transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <IconComponent className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  {plan.signupUrl && (
                    <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      ✅ Online Signup Available
                    </div>
                  )}
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-lg text-gray-600 font-normal">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={`${plan.name}-feature-${index}`} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
                    onClick={() => {
                      if (plan.signupUrl) {
                        window.open(plan.signupUrl, '_blank')
                      } else {
                        window.open('tel:+61423111999', '_self')
                      }
                    }}
                  >
                    {plan.signupUrl ? 'Sign Up Online' : 'Call to Sign Up'}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Limited Time Offer */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg p-8 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                LIMITED TIME OFFER
              </h2>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Unlimited Plan Special Discount
              </h3>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-3xl font-bold text-red-500 line-through">$55/week</span>
                <span className="text-4xl font-bold text-green-600">$45/week</span>
              </div>
              <p className="text-gray-600 mb-6">
                Save $10 per week on our most popular unlimited membership plan!
                Train as much as you want with access to all programs.
              </p>
              <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 font-semibold">
                  ⏰ This offer is available for a limited time only - don't miss out!
                </p>
              </div>
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 mr-4"
                onClick={() => window.open('https://app.clubworx.com/s/diU5mlHO', '_blank')}
              >
                Claim This Offer Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Family Packages */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Family Packages Available
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">2 Family Members</h3>
              <p className="text-gray-600 mb-4">
                Train together and save! Perfect for couples or parent-child combinations.
              </p>
              <p className="text-2xl font-bold text-yellow-600">Contact for Pricing</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">3+ Family Members</h3>
              <p className="text-gray-600 mb-4">
                Bigger families get bigger savings. The whole family can train together!
              </p>
              <p className="text-2xl font-bold text-yellow-600">Contact for Pricing</p>
            </Card>
          </div>
          <Button
            className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={() => window.open('tel:+61423111999', '_self')}
          >
            Ask About Family Discounts
          </Button>
        </div>
      </div>

      {/* What's Included */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What's Included with Every Membership
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">World-Class Instruction</h3>
              <p className="text-gray-600 text-sm">
                Learn from national and international champions
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">All Equipment Provided</h3>
              <p className="text-gray-600 text-sm">
                Mats, gloves, pads - everything you need to get started
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600 text-sm">
                Morning and evening classes, 7 days a week
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">No Lock-in Contracts</h3>
              <p className="text-gray-600 text-sm">
                Cancel anytime with 30 days notice
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Membership FAQ
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can I freeze my membership?</h3>
              <p className="text-gray-600">
                Yes! You can freeze your membership for up to 3 months per year for travel, injury, or other commitments.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Are there any joining fees?</h3>
              <p className="text-gray-600">
                No joining fees! Just pay your first week or month (depending on your plan) and start training immediately.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can I change programs?</h3>
              <p className="text-gray-600">
                Absolutely! All unlimited memberships include access to all our programs. Try everything and find what you love.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept cash, card, and direct debit. Weekly memberships are debited weekly, monthly memberships monthly - always on the same date you started.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Remember, your first class is always FREE! No commitment, no pressure - just come and try us out.
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
              Book Your Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
