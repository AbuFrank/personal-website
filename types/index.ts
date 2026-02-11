export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}