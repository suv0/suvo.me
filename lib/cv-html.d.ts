export type CvDocumentData = {
  careerStartYear: number;
  chaldalStartYear: number;
  name: string;
  title: string;
  roleStack?: string;
  location: string;
  email: string;
  phone?: string;
  website: string;
  linkedin: string;
  github: string;
  dwetechUrl?: string;
  freelancerProfileUrl?: string;
  heroSummary?: string;
  about?: string;
  experience: Array<{
    id?: string;
    role: string;
    company: string;
    location: string;
    period: string;
    url?: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    links?: Record<string, string>;
  }>;
  skills: Array<{
    group: string;
    items: string[];
  }>;
  education?: Array<{
    credential: string;
    institution: string;
    period: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
};

export const CV_DOCUMENT_CSS: string;
export type CvHtmlOptions = {
  toolbar?: boolean;
};

export function buildCvBody(cv: CvDocumentData, options?: CvHtmlOptions): string;
export function buildCvHtml(cv: CvDocumentData, options?: CvHtmlOptions): string;
