export interface Instructor {
  id: string
  slug: string
  name: string
  title: string
  specialties: string[]
  bio: string
  experience: string
  certifications: string[]
  achievements: string[]
  image: string
  social?: {
    instagram?: string
    facebook?: string
  }
  martialArts: string[]
  yearsExperience: number
  philosophy: string
}

export const instructors: Instructor[] = [
  {
    id: "josh-allsopp",
    slug: "josh-allsopp",
    name: "Josh Allsopp",
    title: "Head Brazilian Jiu-Jitsu Instructor",
    specialties: ["Brazilian Jiu-Jitsu", "Competition Coaching", "Self-Defense"],
    bio: "Josh Allsopp is the Head Brazilian Jiu-Jitsu Instructor at Marrickville Martial Arts Club. Known for his analytical approach to jiu-jitsu and ability to break down complex techniques, Josh excels at helping students understand the deeper mechanics of the art while building a world-class BJJ program.",
    experience: "15+ years in Brazilian Jiu-Jitsu, decorated competitor and head instructor",
    certifications: [
      "BJJ Black Belt",
      "IBJJF Referee Certification",
      "Youth Martial Arts Instructor",
      "Head Instructor Certification"
    ],
    achievements: [
      "Australian BJJ Championships Medalist",
      "ADCC Trials Competitor",
      "Developed innovative training methodologies",
      "Mentored national-level competitors",
      "Built championship-level BJJ program"
    ],
    image: "https://ext.same-assets.com/3814609060/1764842669.jpeg",
    martialArts: ["Brazilian Jiu-Jitsu"],
    yearsExperience: 15,
    philosophy: "Jiu-jitsu is chess with your body. It's about problem-solving, adapting, and finding solutions under pressure. I focus on helping students develop their own game while building a strong foundation in fundamental techniques."
  },
  {
    id: "tsuchika-shimoyamada",
    slug: "tsuchika-shimoyamada",
    name: "Tsuchika Shimoyamada",
    title: "Head Wrestling Coach & World Champion",
    specialties: ["Olympic Wrestling", "Competition Training", "Takedown Defense"],
    bio: "Tsuchika Shimoyamada is a world champion wrestler and the Head Wrestling Coach at Marrickville Martial Arts Club. With multiple national championships across Australia and Japan, plus continental titles, Tsuchika brings elite-level wrestling instruction that you simply cannot find anywhere else in Sydney.",
    experience: "20+ years in competitive wrestling, world champion athlete and coach",
    certifications: [
      "Olympic Wrestling Coach Certification",
      "National Level Referee",
      "Sports Science Degree",
      "Strength & Conditioning Specialist"
    ],
    achievements: [
      "Multiple Australian National Champion",
      "Multiple Japanese National Champion",
      "Oceania Wrestling Champion",
      "Asian Wrestling Champion",
      "Olympic Games qualifier",
      "Coached national team members"
    ],
    image: "/uploads/Tsuchika-photo.jpg",
    martialArts: ["Olympic Wrestling", "Freestyle Wrestling"],
    yearsExperience: 20,
    philosophy: "Wrestling builds the foundation for all combat sports and life itself. It teaches mental toughness, discipline, and the will to never give up. Every champion starts with mastering the fundamentals and developing an unbreakable mindset."
  },
  {
    id: "antonio-mammarella",
    slug: "antonio-mammarella",
    name: "Antonio Mammarella",
    title: "Head MMA Instructor",
    specialties: ["Mixed Martial Arts", "Fight Strategy", "Combat Conditioning"],
    bio: "Antonio Mammarella is the Head MMA Instructor at Marrickville Martial Arts Club, bringing extensive experience in mixed martial arts training and competition preparation. His comprehensive approach combines striking, grappling, and mental preparation to develop complete fighters.",
    experience: "14+ years in mixed martial arts, former professional fighter and coach",
    certifications: [
      "MMA Coach Certification",
      "Combat Sports Referee License",
      "Strength & Conditioning Coach",
      "Sports Psychology Certification"
    ],
    achievements: [
      "Former Professional MMA Fighter",
      "Regional MMA Championship Winner",
      "Coached fighters to professional level",
      "Developed comprehensive MMA curriculum",
      "Featured in combat sports publications"
    ],
    image: "https://ext.same-assets.com/3814609060/2252467439.jpeg",
    martialArts: ["Mixed Martial Arts", "Kickboxing", "Submission Grappling"],
    yearsExperience: 14,
    philosophy: "MMA is the ultimate test of martial arts skill, combining all aspects of combat into one discipline. I focus on developing well-rounded fighters who are equally comfortable standing, clinching, or on the ground while maintaining the highest levels of sportsmanship."
  },
  {
    id: "bastian-ayala",
    slug: "bastian-ayala",
    name: "Bastian Ayala",
    title: "Muay Thai Specialist",
    specialties: ["Muay Thai", "Kickboxing", "Pad Work"],
    bio: "Bastian Ayala is a dedicated Muay Thai practitioner who discovered his passion for the art of eight limbs over a decade ago. His technical approach and emphasis on traditional techniques make him an exceptional instructor for students seeking authentic Muay Thai training.",
    experience: "10+ years in Muay Thai, multiple trips to Thailand for training",
    certifications: [
      "Muay Thai Kru Certification",
      "Kickboxing Instructor License",
      "Sports Medicine First Aid"
    ],
    achievements: [
      "Trained at famous gyms in Thailand",
      "Local Muay Thai Competition Winner",
      "Certified under Ajarn Chai",
      "Featured in Combat Sports Magazine"
    ],
    image: "https://ext.same-assets.com/3814609060/3841254086.jpeg",
    martialArts: ["Muay Thai", "Kickboxing"],
    yearsExperience: 10,
    philosophy: "Muay Thai is not just about physical techniques - it's about mental toughness, cultural respect, and finding your inner warrior. Every student has the potential to excel with proper guidance and dedication."
  },
  {
    id: "johana-reyes-lagos",
    slug: "johana-reyes-lagos",
    name: "Johana Reyes Lagos",
    title: "Women's Muay Thai Instructor",
    specialties: ["Women's Muay Thai", "Self-Defense", "Fitness Training"],
    bio: "Johana Reyes Lagos specializes in teaching Muay Thai to women in a supportive, empowering environment. With a focus on building confidence, strength, and self-defense skills, Johana creates a safe space where women can learn the art of eight limbs while developing both physical and mental resilience.",
    experience: "8+ years in Muay Thai, specialized women's training certification",
    certifications: [
      "Women's Self-Defense Instructor",
      "Muay Thai Instructor Certification",
      "Fitness Training License",
      "Trauma-Informed Training Certification"
    ],
    achievements: [
      "Women's Muay Thai Competition Medalist",
      "Certified Women's Self-Defense Instructor",
      "Developed women-specific training programs",
      "Featured in women's fitness publications",
      "Mentored female fighters to competition level"
    ],
    image: "/uploads/Johana-photo.jpg",
    martialArts: ["Muay Thai", "Women's Self-Defense"],
    yearsExperience: 8,
    philosophy: "Muay Thai empowers women to discover their inner strength and confidence. In our women-only classes, we create a supportive community where every woman can learn at her own pace while building both physical skills and mental resilience."
  },
  {
    id: "issa-issa",
    slug: "issa-issa",
    name: "Issa Issa",
    title: "BJJ Instructor & World Championship Medalist",
    specialties: ["Brazilian Jiu-Jitsu", "No-Gi Grappling", "Competition Training"],
    bio: "Issa Issa is an elite Brazilian Jiu-Jitsu competitor and instructor at Marrickville Martial Arts Club. Consistently ranking 1st-3rd in world championships, Issa brings world-class competition experience to his teaching. Known for his technical precision and championship mindset, he specializes in developing competitive athletes while maintaining excellent instruction for all skill levels.",
    experience: "8+ years in Brazilian Jiu-Jitsu, world championship medalist with consistent top 3 rankings globally",
    certifications: [
      "BJJ Purple Belt",
      "No-Gi Grappling Instructor",
      "Competition Coaching Certification",
      "Youth Sports Instructor"
    ],
    achievements: [
      "World Championship Medalist (1st-3rd place rankings)",
      "Consistently ranked top 3 globally in BJJ competitions",
      "Multiple IBJJF World Championship Medalist",
      "ADCC World Championship Competitor",
      "Pan American Championship Medalist",
      "European Championship Medalist",
      "Coached students to international competition success"
    ],
    image: "https://ext.same-assets.com/3814609060/2856943771.jpeg",
    martialArts: ["Brazilian Jiu-Jitsu", "No-Gi Grappling"],
    yearsExperience: 8,
    philosophy: "BJJ is a journey of constant learning and self-improvement. I believe in building strong fundamentals while encouraging students to develop their own unique style. Competition teaches us valuable lessons about pressure, technique, and mental fortitude that benefit every aspect of training."
  }
]

export function getInstructorBySlug(slug: string): Instructor | undefined {
  return instructors.find(instructor => instructor.slug === slug)
}

export function getAllInstructors(): Instructor[] {
  return instructors
}
