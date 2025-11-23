
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  repoLink?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

export enum ChatState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
