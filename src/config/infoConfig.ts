export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = 'Qifan Wu'
export const headline = 'School of Computer, Sun Yat-sen University.'
export const introduction =
  "Hi everyone! My name is Qifan Wu. I'm from ShenZhen and an undergraduate of Sun Yat-sen University. I’ve been studying Computer Science at SYSU since 2023."
export const email = 'wuqf9@mail2.sysu.edu.cn'
export const githubUsername = 'cookiesheep'

// about page
export const aboutMeHeadline = 'Who Are You and Why Should I Care?'
export const aboutParagraphs = [
  "Hi everyone! My name is Qifan Wu. I'm from ShenZhen and an undergraduate of Sun Yat-sen University. I’ve been studying Computer Science at SYSU since 2023.",
  'I recently joined the research group of Professor Yang Yuandong at the Guangzhou Supercomputing Center, where I learned theoretical knowledge in machine learning, including PyTorch, TensorFlow, and other related concepts.',
  "I started this blog to share the insights I learn every day. Most blogs focus on study in Artificial Intelligence and general computer science, while others share the life lessons I've learned.",
]

// blog
export const blogHeadLine = "What I've thinking about."
export const blogIntro =
  "I've written something about AI, programming and life."

// social links
export type SocialLinkType = {
  name: string
  ariaLabel?: string
  icon: string
  href: string
}

export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'Tiktok',
    icon: 'tiktok',
    href: 'https://www.tiktok.com/@harvard?lang=en',
  },
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/3461569956547176',
  },
]

// https://simpleicons.org/
export const techIcons = [
  'typescript',
  'javascript',
  'supabase',
  'cloudflare',
  'java',
  'oracle',
  'mysql',
  'react',
  'nodedotjs',
  'nextdotjs',
  'prisma',
  'postgresql',
  'nginx',
  'vercel',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'androidstudio',
  'ios',
  'apple',
  'wechat',
]
