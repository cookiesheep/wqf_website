// Types
export type ProjectItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
}

export type ActivityItemType = {
  name: string
  description: string
  date: string
  location: string
  link?: string
}

// Awards
export const awardsHeadLine = "Awards & Honors"
export const awardsIntro = "Recognition for academic and professional achievements."

export const awards: Array<ActivityItemType> = [
  {
    name: 'National Scholarship',
    description: 'The highest award for academic excellence in China',
    date: '2023',
    location: 'GangZhou, China',
  },
  {
    name: 'Sun Yat-sen University first-class scholarship',
    description: '',
    date: '2023',
    location: 'SYSU, GangZhou',
  },
  {
    name: 'Provincial second prize,China Undergraduate Mathematical Contest in Modeling',
    description: '',
    date: '2024',
    location: 'GangZhou, China',
  },
  {
    name: 'Honorable Mention,Interdisciplinary Contest In Modeling Certificate of Achievement',
    description: '',
    date: '2024',
    location: 'Shenzhen, China',
  },
  // {
  //   name: 'American college student Mathematical Modeling Competition',
  //   description: '',
  //   date: '2024',
  //   location: 'GangZhou, China',
  // },
]

// Research & Projects
export const projectHeadLine = "Research & Projects"
export const projectIntro = "Academic research and technical projects I've worked on."

export const projects: Array<ProjectItemType> = [
  {
    name: 'Personal Website',
    description: 'A personal website built with Next.js, TailwindCSS, and DaisyUI',
    link: { href: 'wuqifan.top', label: 'GitHub' },
    tags: ['Website', 'Next.js', 'TailwindCSS', 'DaisyUI']
  },
  {
    name: 'Ai Education Platform',
    description: 'Personalized education platform with AI-powered features',
    link: { href: 'edu-platform-chi.vercel.app', label: 'GitHub Cards' },
    tags: ['Website', 'Next.js', 'TailwindCSS', 'DaisyUI', 'Education']
  },
  {
    name: 'GenerShift',
    description: 'A platform that turns academic papers into science and technology news',
    link: { href: 'genreshift-web.vercel.app', label: 'Agent' },
    tags: ['Website', 'Next.js', 'Agent', 'Coze', 'Education']
  },
  {
    name: 'Tutoring Service',
    description: 'a mini program of tutoring service in Guangzhou',
    link: { href: 'https://onecompiler.com/challenges/42yf4n5yn/scls-hackathon', label: 'mini program' },
    tags: ['mini program','WeChat','Education']
  },
  {
    name: 'AI Camp Course Development',
    description: 'Developed a comprehensive AI curriculum for high school students, incorporating real-world projects and startup concepts.',
    link: { href: 'https://scls-cs.gitbook.io/ai-camp', label: 'View Course' },
    tags: ['Education', 'AI']
  },
  // {
  //   name: 'AI Camp Course Development',
  //   description: 'Developed a comprehensive AI curriculum for high school students, incorporating real-world projects and startup concepts.',
  //   link: { href: 'https://scls-cs.gitbook.io/ai-camp', label: 'View Course' },
  //   tags: ['Education', 'AI']
  // },
]

// Hobbies & Volunteer
export const activitiesHeadLine = "Hobbies & Volunteer"
export const activitiesIntro = "Personal interests and community contributions."

export const activities: Array<ActivityItemType> = [
  {
    name: 'Playing Basketball',
    description:
      'I love playing basketball, it is a great way to keep fit and have fun.',
    date: '2015-2025',
    location: 'Guangdong',
    link: 'https://example.com/python-workshop',
  },
  {
    name: 'Seal cutting',
    description:
      'It is a Chinese traditional activity, which is a kind of art of cutting paper.',
    date: '2012-2025',
    location: 'Shenzhen',
    link: 'https://example.com/ai-ethics',
  },
  // {
  //   name: 'Code Review Session',
  //   description:
  //     'Helping students improve their coding skills through peer code review and best practices sharing.',
  //   date: '2024-03-15',
  //   location: 'Shanghai',
  // },
]
