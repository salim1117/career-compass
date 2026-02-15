

# Placement Readiness Platform — Implementation Plan

## Overview
A premium SaaS-style placement preparation tool that analyzes job descriptions, extracts skills, generates study plans, and tracks readiness — all client-side with localStorage persistence.

---

## Phase 1: Design System & App Shell

### Design System
- Off-white background (#F7F6F3), deep red accent (#8B0000), dark text (#111111)
- Serif headings, clean sans-serif body (16-18px, max 720px)
- Consistent 8/16/24/40/64px spacing scale
- No gradients, glassmorphism, or visual noise
- Flat, calm component styling — subtle borders, no drop shadows

### App Shell & Navigation
- **Top Bar**: Project name, step progress indicator (Step X/Y), status badge (Not Started → In Progress → Shipped)
- **Sidebar**: Dashboard, Practice, Assessments, Resources, Profile with lucide icons
- **Landing Page**: Hero ("Ace Your Placement"), 3-column feature grid (Practice Problems, Mock Interviews, Track Progress), footer
- Routes for all pages with placeholder content

---

## Phase 2: Skill Assessment Dashboard

- **Overall Readiness**: Circular SVG progress indicator (72/100)
- **Skill Breakdown**: Radar chart (recharts) with 5 axes — DSA, System Design, Communication, Resume, Aptitude
- **Continue Practice**: Last topic card with progress bar and Continue button
- **Weekly Goals**: Problems solved progress (12/20), 7-day activity circles
- **Upcoming Assessments**: 3 upcoming items with dates/times
- Responsive 2-column desktop / single-column mobile layout

---

## Phase 3: JD Analyzer & History

### Heuristic Skill Extraction
- Keyword detection across 6 categories: Core CS, Languages, Web, Data, Cloud/DevOps, Testing
- Fallback to "General fresher stack" if no skills detected
- Skills displayed as grouped tags

### Generated Outputs
- **Round-wise checklist** (4 rounds: Aptitude, DSA+Core CS, Tech+Projects, HR) with 5-8 items per round adapted to detected skills
- **7-day study plan** adapted to detected stack
- **10 likely interview questions** specific to detected skills
- **Readiness score** (0-100): Base 35 + category bonuses + company/role/length bonuses

### History System
- Every analysis saved to localStorage with full data
- History page listing entries by date, company, role, score
- Click to reopen any saved analysis

---

## Phase 4: Interactive Results & Exports

- **Skill self-assessment toggles**: Each skill tag toggleable between "I know this" / "Need practice"
- **Live readiness score**: Updates in real-time based on toggles (±2 per skill, clamped 0-100)
- **Export buttons**: Copy 7-day plan, Copy checklist, Copy questions, Download all as TXT
- **Action Next box**: Top 3 weak skills + "Start Day 1 plan now" suggestion
- All toggle states persist in localStorage per history entry

---

## Phase 5: Company Intel & Round Mapping

- **Company Intel card**: Industry guess, size category (Startup/Mid/Enterprise), typical hiring focus
- Known companies (Amazon, Infosys, TCS, etc.) mapped to Enterprise; unknown defaults to Startup
- **Round Mapping Engine**: Dynamic interview round timeline based on company size + detected skills
- Enterprise → structured 4-round flow; Startup → practical 3-round flow
- "Why this round matters" explanation under each round
- "Demo Mode" disclaimer note

---

## Phase 6: Data Hardening & Validation

- JD textarea required; warning for JDs under 200 characters
- Strict schema for every analysis entry — no undefined, no missing keys
- Fallback skills (Communication, Problem solving, Basic coding, Projects) when nothing detected
- Score stability: baseScore set once, finalScore derived from toggles
- Corrupted localStorage entries gracefully skipped with user message

---

## Phase 7: Test Checklist & Ship Lock

- Built-in 10-item test checklist with checkboxes and "How to test" hints
- "Tests Passed: X/10" counter with warning if incomplete
- Ship step locked until all 10 items checked
- Reset checklist button
- Checklist state persisted in localStorage

---

## Phase 8: Proof & Submission System

- **Proof page** with step completion overview (8 steps status)
- **Artifact inputs**: Lovable Project Link, GitHub Repo, Deployed URL (all URL-validated)
- **"Copy Final Submission"** button producing formatted text export
- **Shipped status** only when: all 8 steps complete + 10 checklist items passed + 3 proof links provided
- Completion message displayed on achieving Shipped status

