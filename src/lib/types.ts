export interface ExtractedSkills {
  coreCS: string[];
  languages: string[];
  web: string[];
  data: string[];
  cloud: string[];
  testing: string[];
  other: string[];
}

export interface RoundMapping {
  roundTitle: string;
  focusAreas: string[];
  whyItMatters: string;
}

export interface ChecklistRound {
  roundTitle: string;
  items: string[];
}

export interface PlanDay {
  day: string;
  focus: string;
  tasks: string[];
}

export interface CompanyIntel {
  companyName: string;
  industry: string;
  sizeCategory: "Startup" | "Mid-size" | "Enterprise";
  hiringFocus: string;
}

export interface AnalysisEntry {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  roundMapping: RoundMapping[];
  checklist: ChecklistRound[];
  plan7Days: PlanDay[];
  questions: string[];
  baseScore: number;
  finalScore: number;
  skillConfidenceMap: Record<string, "know" | "practice">;
  companyIntel: CompanyIntel | null;
}

export interface TestChecklistState {
  items: boolean[];
}

export interface ProofSubmission {
  lovableLink: string;
  githubLink: string;
  deployedLink: string;
}

export type ProjectStatus = "Not Started" | "In Progress" | "Shipped";
