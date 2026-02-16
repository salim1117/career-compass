import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAnalysis } from "@/lib/analyzer";
import { saveToHistory } from "@/lib/storage";
import { Info, Clipboard } from "lucide-react";

const SAMPLE_JD = `We are looking for a Software Development Engineer to join our team. You should have strong experience with React, Node.js, TypeScript, and SQL. Knowledge of AWS, Docker, and CI/CD pipelines is a plus. You'll work on building scalable web applications, writing clean and testable code, and collaborating with cross-functional teams. Strong DSA fundamentals, understanding of system design, and experience with PostgreSQL are required. Must have excellent communication skills and the ability to work in agile environments.`;

export default function Analyze() {
  const navigate = useNavigate();
  const [jdText, setJdText] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const handleAnalyze = () => {
    setError("");
    setWarning("");

    if (!jdText.trim()) {
      setError("Please paste a job description to analyze.");
      return;
    }

    if (jdText.trim().length < 200) {
      setWarning("This JD is too short to analyze deeply. Paste full JD for better output.");
    }

    const entry = createAnalysis(jdText, company, role);
    saveToHistory(entry);
    navigate(`/results/${entry.id}`);
  };

  const pasteSample = () => {
    setJdText(SAMPLE_JD);
    setCompany("Amazon");
    setRole("SDE-1");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Analyze Job Description</h1>
      <p className="text-muted-foreground mb-8">Paste a JD to extract skills, generate a prep plan, and assess readiness.</p>

      {/* Info Card */}
      <Card className="card-premium border-l-4 border-l-info mb-6">
        <CardContent className="py-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">What happens when you analyze</p>
            <p>We extract skills from the JD, generate a round-wise checklist, 7-day study plan, and 10 likely interview questions — all tailored to the detected stack.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="card-premium">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Job Description</CardTitle>
          <Button variant="ghost" size="sm" onClick={pasteSample} className="gap-1.5 text-xs text-muted-foreground">
            <Clipboard className="h-3.5 w-3.5" /> Paste Sample JD
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-muted-foreground">Company (optional)</label>
              <Input placeholder="e.g., Amazon" value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block text-muted-foreground">Role (optional)</label>
              <Input placeholder="e.g., SDE-1" value={role} onChange={e => setRole(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-muted-foreground">Job Description *</label>
            <Textarea
              placeholder="Paste the full job description here..."
              className="min-h-[200px]"
              value={jdText}
              onChange={e => setJdText(e.target.value)}
              aria-invalid={!!error}
            />
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
          {warning && <p className="text-sm text-warning font-medium">{warning}</p>}

          <Button onClick={handleAnalyze}>Analyze</Button>
        </CardContent>
      </Card>
    </div>
  );
}
