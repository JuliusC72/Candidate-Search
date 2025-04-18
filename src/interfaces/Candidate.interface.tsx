export interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    company?: string;
    location?: string;
    email?: string;
  }