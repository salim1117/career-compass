import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAnalysis } from "@/lib/analyzer";
import { saveToHistory } from "@/lib/storage";

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

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Analyze Job Description</h1>
      <p className="text-muted-foreground mb-8">Paste a JD to extract skills, generate a prep plan, and assess readiness.</p>

      <Card className="shadow-none border border-border">
        <CardHeader>
          <CardTitle className="text-lg">Job Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Company (optional)</label>
              <Input placeholder="e.g., Amazon" value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Role (optional)</label>
              <Input placeholder="e.g., SDE-1" value={role} onChange={e => setRole(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Job Description *</label>
            <Textarea
              placeholder="Paste the full job description here..."
              className="min-h-[200px]"
              value={jdText}
              onChange={e => setJdText(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {warning && <p className="text-sm text-warning">{warning}</p>}

          <Button onClick={handleAnalyze}>Analyze</Button>
        </CardContent>
      </Card>
    </div>
  );
}
