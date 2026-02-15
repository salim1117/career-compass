import type { ExtractedSkills, RoundMapping, ChecklistRound, PlanDay, CompanyIntel, AnalysisEntry } from "./types";

const SKILL_MAP: Record<keyof Omit<ExtractedSkills, "other">, string[]> = {
  coreCS: ["DSA", "OOP", "DBMS", "OS", "Networks", "Data Structures", "Algorithms", "Operating Systems", "Computer Networks"],
  languages: ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "Kotlin", "Swift", "Ruby", "PHP"],
  web: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL", "Angular", "Vue", "Svelte", "HTML", "CSS", "Tailwind", "Django", "Flask", "Spring Boot"],
  data: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Cassandra", "DynamoDB", "Elasticsearch", "Firebase"],
  cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux", "Terraform", "Jenkins", "GitHub Actions", "DevOps"],
  testing: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest", "Jest", "Mocha", "Testing", "TDD", "Unit Test"],
};

const KNOWN_ENTERPRISES = ["amazon", "google", "microsoft", "meta", "apple", "infosys", "tcs", "wipro", "hcl", "cognizant", "accenture", "deloitte", "ibm", "oracle", "salesforce", "adobe", "netflix", "uber", "airbnb", "flipkart", "paytm", "swiggy", "zomato", "ola", "myntra", "jio", "reliance", "capgemini", "tech mahindra", "mindtree", "mphasis", "l&t infotech"];

export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase();
  const result: ExtractedSkills = { coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: [] };

  for (const [category, keywords] of Object.entries(SKILL_MAP)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        const key = category as keyof Omit<ExtractedSkills, "other">;
        if (!result[key].includes(keyword)) result[key].push(keyword);
      }
    }
  }

  const hasAny = Object.values(result).some(arr => arr.length > 0);
  if (!hasAny) {
    result.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
  }

  return result;
}

export function getCompanyIntel(company: string): CompanyIntel | null {
  if (!company.trim()) return null;
  const lower = company.toLowerCase().trim();
  const isEnterprise = KNOWN_ENTERPRISES.some(e => lower.includes(e));

  return {
    companyName: company,
    industry: "Technology Services",
    sizeCategory: isEnterprise ? "Enterprise" : "Startup",
    hiringFocus: isEnterprise
      ? "Structured DSA + core fundamentals with multiple interview rounds"
      : "Practical problem solving + stack depth with hands-on coding rounds",
  };
}

export function generateRoundMapping(skills: ExtractedSkills, intel: CompanyIntel | null): RoundMapping[] {
  const isEnterprise = intel?.sizeCategory === "Enterprise";
  if (isEnterprise) {
    return [
      { roundTitle: "Round 1: Online Assessment", focusAreas: ["Aptitude", "DSA basics", "Logical reasoning"], whyItMatters: "Screens large applicant pools efficiently. Focus on speed and accuracy." },
      { roundTitle: "Round 2: Technical — DSA + Core CS", focusAreas: ["Data Structures", "Algorithms", ...skills.coreCS.slice(0, 3)], whyItMatters: "Tests fundamental problem-solving ability. Most candidates are eliminated here." },
      { roundTitle: "Round 3: Technical — Projects + Stack", focusAreas: [...skills.web.slice(0, 2), ...skills.languages.slice(0, 2), "System Design basics"], whyItMatters: "Evaluates practical experience and depth of knowledge in your tech stack." },
      { roundTitle: "Round 4: HR / Managerial", focusAreas: ["Communication", "Cultural fit", "Career goals", "Situational questions"], whyItMatters: "Assesses soft skills and alignment with company values." },
    ];
  }
  return [
    { roundTitle: "Round 1: Practical Coding", focusAreas: [...skills.languages.slice(0, 2), ...skills.web.slice(0, 2), "Problem solving"], whyItMatters: "Startups value hands-on ability. Expect live coding or take-home assignments." },
    { roundTitle: "Round 2: System Discussion", focusAreas: ["Architecture", "Trade-offs", ...skills.data.slice(0, 2), ...skills.cloud.slice(0, 2)], whyItMatters: "Tests how you think about building real systems, not just algorithms." },
    { roundTitle: "Round 3: Culture Fit", focusAreas: ["Team collaboration", "Ownership", "Learning ability", "Communication"], whyItMatters: "Small teams need people who align with culture and can wear multiple hats." },
  ];
}

export function generateChecklist(skills: ExtractedSkills, intel: CompanyIntel | null): ChecklistRound[] {
  const allSkills = getAllSkills(skills);
  return [
    { roundTitle: "Round 1: Aptitude & Basics", items: ["Practice quantitative aptitude (percentages, ratios, averages)", "Solve 10 logical reasoning puzzles", "Review basic math concepts", "Practice verbal reasoning questions", "Time yourself on mock aptitude tests"] },
    { roundTitle: "Round 2: DSA + Core CS", items: ["Solve 5 array/string problems on LeetCode", "Practice linked list and tree problems", "Review sorting and searching algorithms", ...skills.coreCS.map(s => `Review ${s} fundamentals`).slice(0, 3), "Practice time/space complexity analysis"] },
    { roundTitle: "Round 3: Tech + Projects", items: ["Prepare 2-minute pitch for each project", ...allSkills.slice(0, 4).map(s => `Review ${s} concepts and common patterns`), "Practice explaining technical decisions", "Prepare for system design basics"] },
    { roundTitle: "Round 4: HR / Behavioral", items: ["Prepare 'Tell me about yourself' (2 minutes)", "Prepare 3 STAR-format behavioral stories", "Research the company's mission and values", "Prepare thoughtful questions to ask", "Practice salary negotiation talking points"] },
  ];
}

export function generatePlan(skills: ExtractedSkills): PlanDay[] {
  const hasWeb = skills.web.length > 0;
  const hasData = skills.data.length > 0;
  return [
    { day: "Day 1", focus: "Foundations", tasks: ["Review core CS concepts (OOP, OS basics)", "Solve 3 easy DSA problems", "Set up coding environment"] },
    { day: "Day 2", focus: "Core CS Deep Dive", tasks: ["Study DBMS concepts (normalization, indexing)", "Practice SQL queries", hasData ? `Review ${skills.data[0]} basics` : "Review database fundamentals"] },
    { day: "Day 3", focus: "DSA Practice", tasks: ["Solve 5 medium DSA problems", "Focus on arrays, strings, and hashmaps", "Review time complexity patterns"] },
    { day: "Day 4", focus: "Advanced DSA", tasks: ["Practice trees and graphs", "Solve 3 medium-hard problems", "Review dynamic programming basics"] },
    { day: "Day 5", focus: "Projects & Stack", tasks: ["Polish project descriptions", hasWeb ? `Review ${skills.web[0]} best practices` : "Review your primary tech stack", "Prepare to explain architecture decisions"] },
    { day: "Day 6", focus: "Mock Interviews", tasks: ["Do 1 mock technical interview", "Practice behavioral questions (STAR format)", "Review common HR questions"] },
    { day: "Day 7", focus: "Revision & Weak Areas", tasks: ["Revisit problems you got wrong", "Review weak skill areas", "Do a final timed mock test"] },
  ];
}

export function generateQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = [];
  const pool: Record<string, string[]> = {
    DSA: ["How would you optimize search in sorted data?", "Explain the difference between BFS and DFS."],
    OOP: ["Explain the four pillars of OOP with examples.", "What is the difference between abstract class and interface?"],
    DBMS: ["Explain normalization and its forms.", "What is indexing and when does it help?"],
    SQL: ["Write a query to find the second highest salary.", "Explain JOIN types with examples."],
    React: ["Explain state management options in React.", "What are React hooks and why were they introduced?"],
    "Node.js": ["How does the Node.js event loop work?", "Explain middleware in Express.js."],
    Python: ["Explain list comprehensions vs generator expressions.", "What are decorators in Python?"],
    Java: ["Explain JVM architecture briefly.", "What is the difference between HashMap and TreeMap?"],
    JavaScript: ["Explain closures with an example.", "What is the difference between == and ===?"],
    TypeScript: ["What are generics in TypeScript?", "Explain type guards and narrowing."],
    AWS: ["Explain the difference between EC2 and Lambda.", "What is S3 and when would you use it?"],
    Docker: ["What is a Docker container vs a VM?", "Explain Dockerfile instructions."],
    MongoDB: ["When would you choose MongoDB over SQL?", "Explain MongoDB aggregation pipeline."],
    PostgreSQL: ["What are the advantages of PostgreSQL?", "Explain JSONB support in PostgreSQL."],
  };

  const allSkills = getAllSkills(skills);
  for (const skill of allSkills) {
    if (pool[skill]) questions.push(...pool[skill]);
    if (questions.length >= 10) break;
  }

  const defaults = [
    "Tell me about a challenging project you worked on.",
    "How do you approach debugging a complex issue?",
    "Explain a concept you recently learned.",
    "How do you stay updated with technology?",
    "Describe your ideal development workflow.",
  ];
  while (questions.length < 10) {
    questions.push(defaults[questions.length % defaults.length]);
  }

  return questions.slice(0, 10);
}

export function calculateBaseScore(skills: ExtractedSkills, company: string, role: string, jdLength: number): number {
  let score = 35;
  const categories = ["coreCS", "languages", "web", "data", "cloud", "testing"] as const;
  for (const cat of categories) {
    if (skills[cat].length > 0) score += 5;
  }
  if (company.trim()) score += 10;
  if (role.trim()) score += 10;
  if (jdLength > 800) score += 10;
  return Math.min(100, score);
}

export function calculateFinalScore(baseScore: number, confidenceMap: Record<string, "know" | "practice">): number {
  let delta = 0;
  for (const val of Object.values(confidenceMap)) {
    delta += val === "know" ? 2 : -2;
  }
  return Math.max(0, Math.min(100, baseScore + delta));
}

export function getAllSkills(skills: ExtractedSkills): string[] {
  return [...skills.coreCS, ...skills.languages, ...skills.web, ...skills.data, ...skills.cloud, ...skills.testing, ...skills.other];
}

export function createAnalysis(jdText: string, company: string, role: string): AnalysisEntry {
  const skills = extractSkills(jdText);
  const intel = getCompanyIntel(company);
  const baseScore = calculateBaseScore(skills, company, role, jdText.length);
  const allSkills = getAllSkills(skills);
  const confidenceMap: Record<string, "know" | "practice"> = {};
  allSkills.forEach(s => { confidenceMap[s] = "practice"; });

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills: skills,
    roundMapping: generateRoundMapping(skills, intel),
    checklist: generateChecklist(skills, intel),
    plan7Days: generatePlan(skills),
    questions: generateQuestions(skills),
    baseScore,
    finalScore: baseScore,
    skillConfidenceMap: confidenceMap,
    companyIntel: intel,
  };
}
