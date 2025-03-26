
// education 
export type EducationItemType = {
    school: string
    major: string
    image?: string
    logo: string
    start: string
    end: string
  }
  
  
  
  export const educationList: Array<EducationItemType> = [
    {
      school: 'Sun Yat-sen University',
      major: 'Computer Science',
      logo: 'college',
      start: '2023',
      end: 'Present'
    },
    // {
    //   school: 'University of Chicago',
    //   major: 'Computer Science',
    //   logo: 'college',
    //   start: '2013',
    //   end: '2015'
    // },
    // {
    //   school: 'BUPT',
    //   major: 'Automation',
    //   logo: 'college',
    //   start: '2009',
    //   end: '2013'
    // },
  ]