import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEntryById, saveToHistory } from "@/lib/storage";
import { calculateFinalScore, getAllSkills } from "@/lib/analyzer";
import type { AnalysisEntry } from "@/lib/types";
import { Copy, Download, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entry, setEntry] = useState<AnalysisEntry | null>(null);

  useEffect(() => {
    if (!id) return;
    const e = getEntryById(id);
    if (!e) { navigate("/history"); return; }
    setEntry(e);
  }, [id, navigate]);

  const allSkills = useMemo(() => entry ? getAllSkills(entry.extractedSkills) : [], [entry]);

  if (!entry) return <p className="text-muted-foreground">Loading...</p>;

  const toggleSkill = (skill: string) => {
    const updated = { ...entry };
    const current = updated.skillConfidenceMap[skill];
    updated.skillConfidenceMap[skill] = current === "know" ? "practice" : "know";
    updated.finalScore = calculateFinalScore(updated.baseScore, updated.skillConfidenceMap);
    updated.updatedAt = new Date().toISOString();
    setEntry({ ...updated });
    saveToHistory(updated);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  const planText = entry.plan7Days.map(d => `${d.day}: ${d.focus}\n${d.tasks.map(t => `  - ${t}`).join("\n")}`).join("\n\n");
  const checklistText = entry.checklist.map(r => `${r.roundTitle}\n${r.items.map(i => `  □ ${i}`).join("\n")}`).join("\n\n");
  const questionsText = entry.questions.map((q, i) => `${i + 1}. ${q}`).join("\n");

  const downloadAll = () => {
    const content = `Placement Readiness Analysis\n${"=".repeat(40)}\nCompany: ${entry.company || "N/A"}\nRole: ${entry.role || "N/A"}\nReadiness Score: ${entry.finalScore}/100\n\n--- Skills ---\n${allSkills.length ? allSkills.join(", ") : "No skills detected"}\n\n--- 7-Day Plan ---\n${planText}\n\n--- Checklist ---\n${checklistText}\n\n--- Interview Questions ---\n${questionsText}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analysis-${entry.company || "unknown"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const weakSkills = allSkills.filter(s => entry.skillConfidenceMap[s] === "practice").slice(0, 3);

  // Circular score display
  const r = 54, c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, entry.finalScore)) / 100) * c;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Analysis Results</h1>
          <p className="text-muted-foreground">{entry.company || "Unknown Company"} — {entry.role || "Unknown Role"}</p>
        </div>
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
            <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} className="transition-all duration-300" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-serif font-bold">{entry.finalScore}</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <Card className="shadow-none border border-border">
        <CardHeader><CardTitle className="text-lg">Extracted Skills</CardTitle></CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">Click a skill to toggle between "I know this" and "Need practice"</p>
          <div className="flex flex-wrap gap-2">
            {allSkills.map(skill => (
              <Badge
                key={skill}
                variant={entry.skillConfidenceMap[skill] === "know" ? "default" : "outline"}
                className="cursor-pointer select-none transition-colors duration-150"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
                <span className="ml-1 text-[10px] opacity-70">
                  {entry.skillConfidenceMap[skill] === "know" ? "✓" : "?"}
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Intel */}
      {entry.companyIntel && (
        <Card className="shadow-none border border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Company Intel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-muted-foreground">Industry:</span> {entry.companyIntel.industry}</div>
              <div><span className="text-muted-foreground">Size:</span> {entry.companyIntel.sizeCategory}</div>
            </div>
            <div><span className="text-muted-foreground">Hiring Focus:</span> {entry.companyIntel.hiringFocus}</div>
            <p className="text-xs text-muted-foreground italic mt-2">Demo Mode: Company intel generated heuristically.</p>
          </CardContent>
        </Card>
      )}

      {/* Round Mapping */}
      <Card className="shadow-none border border-border">
        <CardHeader><CardTitle className="text-lg">Interview Round Flow</CardTitle></CardHeader>
        <CardContent>
          <div className="relative pl-6 space-y-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
            {entry.roundMapping.map((round, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                <h4 className="font-medium text-sm">{round.roundTitle}</h4>
                <p className="text-xs text-muted-foreground mt-1">{round.whyItMatters}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {round.focusAreas.map(a => (
                    <Badge key={a} variant="secondary" className="text-[10px]">{a}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="shadow-none border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Preparation Checklist</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => copyText(checklistText, "Checklist")}><Copy className="h-3 w-3 mr-1" />Copy</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {entry.checklist.map((round, i) => (
            <div key={i}>
              <h4 className="font-medium text-sm mb-2">{round.roundTitle}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {round.items.map((item, j) => <li key={j} className="flex gap-2"><span>□</span>{item}</li>)}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 7-Day Plan */}
      <Card className="shadow-none border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">7-Day Study Plan</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => copyText(planText, "7-day plan")}><Copy className="h-3 w-3 mr-1" />Copy</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {entry.plan7Days.map((day, i) => (
            <div key={i}>
              <h4 className="font-medium text-sm">{day.day} — {day.focus}</h4>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                {day.tasks.map((t, j) => <li key={j}>• {t}</li>)}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Questions */}
      <Card className="shadow-none border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Likely Interview Questions</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => copyText(questionsText, "Questions")}><Copy className="h-3 w-3 mr-1" />Copy</Button>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            {entry.questions.map((q, i) => <li key={i} className="flex gap-2"><span className="text-muted-foreground font-medium">{i + 1}.</span>{q}</li>)}
          </ol>
        </CardContent>
      </Card>

      {/* Download */}
      <Button variant="outline" onClick={downloadAll} className="w-full">
        <Download className="h-4 w-4 mr-2" /> Download All as TXT
      </Button>

      {/* Action Next */}
      <Card className="shadow-none border border-primary/20 bg-accent/50">
        <CardHeader><CardTitle className="text-lg">What to Do Next</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-2">
          {weakSkills.length > 0 ? (
            <>
              <p className="text-muted-foreground">Your top weak areas:</p>
              <div className="flex flex-wrap gap-2">
                {weakSkills.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
              </div>
              <p className="font-medium mt-2">Start Day 1 plan now.</p>
            </>
          ) : (
            <p className="font-medium">All skills marked as known — review and stay sharp!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
