// career
export type CareerItemType = {
    company: string
    title: string
    image?: string
    logo: string
    start: string
    end: string
  }
  
export const careerList: Array<CareerItemType> = [
    // {
    //   company: 'Sun Yat-sen University',
    //   title: 'Computer Science Student',
    //   logo: 'college',
    //   start: '2023',
    //   end: 'Present'
    // },
    {
      company: 'China National Supercomputing Center Guangzhou,Yang lab',
      title: 'Research Assistant',
      logo: 'education institution',
      start: '2024',
      end: 'Present'
    },
    {
      company: 'Sesame programming company',
      title: 'Teacher of C++',
      logo: 'company',
      start: '2024',
      end: '2024'
    },

    // {
    //   company: 'Expedia',
    //   title: 'Software Engineer',
    //   logo: 'coffee',
    //   start: '2015',
    //   end: '2017'
    // }
  ]