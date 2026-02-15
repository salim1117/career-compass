import type { AnalysisEntry, TestChecklistState, ProofSubmission } from "./types";

const HISTORY_KEY = "prp_history";
const CHECKLIST_KEY = "prp_test_checklist";
const PROOF_KEY = "prp_final_submission";
const STEPS_KEY = "prp_steps_completed";

export function getHistory(): AnalysisEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const entries = JSON.parse(raw) as AnalysisEntry[];
    return entries.filter(e => e && e.id && e.jdText && e.extractedSkills);
  } catch {
    return [];
  }
}

export function saveToHistory(entry: AnalysisEntry): void {
  const history = getHistory();
  const idx = history.findIndex(h => h.id === entry.id);
  if (idx >= 0) history[idx] = entry;
  else history.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getEntryById(id: string): AnalysisEntry | null {
  return getHistory().find(e => e.id === id) ?? null;
}

export function getTestChecklist(): TestChecklistState {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY);
    if (!raw) return { items: new Array(10).fill(false) };
    return JSON.parse(raw);
  } catch {
    return { items: new Array(10).fill(false) };
  }
}

export function saveTestChecklist(state: TestChecklistState): void {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
}

export function getProofSubmission(): ProofSubmission {
  try {
    const raw = localStorage.getItem(PROOF_KEY);
    if (!raw) return { lovableLink: "", githubLink: "", deployedLink: "" };
    return JSON.parse(raw);
  } catch {
    return { lovableLink: "", githubLink: "", deployedLink: "" };
  }
}

export function saveProofSubmission(proof: ProofSubmission): void {
  localStorage.setItem(PROOF_KEY, JSON.stringify(proof));
}

export function getCompletedSteps(): boolean[] {
  try {
    const raw = localStorage.getItem(STEPS_KEY);
    if (!raw) return new Array(8).fill(false);
    return JSON.parse(raw);
  } catch {
    return new Array(8).fill(false);
  }
}

export function saveCompletedSteps(steps: boolean[]): void {
  localStorage.setItem(STEPS_KEY, JSON.stringify(steps));
}
