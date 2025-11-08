export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface Portfolio {
  _id: string;
  userId: string;
  template: 'modern' | 'minimal' | 'creative' | 'professional';
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  theme: Theme;
  seo: SEO;
  isPublished: boolean;
  slug: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  resume: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    instagram: string;
    youtube: string;
  };
}

export interface Skill {
  _id?: string;
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Soft Skills' | 'Other';
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured: boolean;
  order: number;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa: string;
  description: string;
}

export interface Certification {
  _id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: 'Inter' | 'Roboto' | 'Poppins' | 'Montserrat' | 'Lato' | 'Open Sans';
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
}