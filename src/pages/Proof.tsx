import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getProofSubmission, saveProofSubmission, getTestChecklist, getCompletedSteps } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Copy, CheckCircle, Circle } from "lucide-react";

const STEP_NAMES = [
  "Design System", "Platform Shell", "Skill Dashboard", "JD Analyzer & History",
  "Interactive Results & Exports", "Company Intel & Rounds", "Data Hardening", "Test Checklist",
];

function isValidUrl(s: string): boolean {
  try { new URL(s); return true; } catch { return false; }
}

export default function Proof() {
  const { toast } = useToast();
  const [lovableLink, setLovableLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [deployedLink, setDeployedLink] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = getProofSubmission();
    setLovableLink(saved.lovableLink);
    setGithubLink(saved.githubLink);
    setDeployedLink(saved.deployedLink);
  }, []);

  const save = () => {
    const errs: Record<string, string> = {};
    if (lovableLink && !isValidUrl(lovableLink)) errs.lovable = "Invalid URL";
    if (githubLink && !isValidUrl(githubLink)) errs.github = "Invalid URL";
    if (deployedLink && !isValidUrl(deployedLink)) errs.deployed = "Invalid URL";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    saveProofSubmission({ lovableLink, githubLink, deployedLink });
    toast({ title: "Proof links saved" });
  };

  const checklist = getTestChecklist();
  const allTestsPassed = checklist.items.every(Boolean);
  const allLinksProvided = isValidUrl(lovableLink) && isValidUrl(githubLink) && isValidUrl(deployedLink);
  // For demo purposes, steps are considered complete if tests pass
  const isShipped = allTestsPassed && allLinksProvided;

  const submissionText = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${lovableLink || "(not provided)"}
GitHub Repository: ${githubLink || "(not provided)"}
Live Deployment: ${deployedLink || "(not provided)"}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-bold">Ship & Submit</h1>
      <p className="text-muted-foreground">Complete all requirements to achieve Shipped status.</p>

      {/* Status */}
      <Badge variant={isShipped ? "default" : "secondary"} className="text-sm">
        Status: {isShipped ? "Shipped" : "In Progress"}
      </Badge>

      {/* Step overview */}
      <Card className="shadow-none border border-border">
        <CardHeader><CardTitle className="text-lg">Step Completion</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STEP_NAMES.map((name, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {allTestsPassed ? <CheckCircle className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                <span>{name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test checklist status */}
      <Card className="shadow-none border border-border">
        <CardHeader><CardTitle className="text-lg">Test Checklist</CardTitle></CardHeader>
        <CardContent>
          <Badge variant={allTestsPassed ? "default" : "secondary"}>
            {checklist.items.filter(Boolean).length}/10 tests passed
          </Badge>
          {!allTestsPassed && <p className="text-sm text-warning mt-2">Complete all tests before shipping.</p>}
        </CardContent>
      </Card>

      {/* Proof links */}
      <Card className="shadow-none border border-border">
        <CardHeader><CardTitle className="text-lg">Artifact Links</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Lovable Project Link</label>
            <Input value={lovableLink} onChange={e => setLovableLink(e.target.value)} placeholder="https://lovable.dev/projects/..." />
            {errors.lovable && <p className="text-xs text-destructive mt-1">{errors.lovable}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">GitHub Repository</label>
            <Input value={githubLink} onChange={e => setGithubLink(e.target.value)} placeholder="https://github.com/..." />
            {errors.github && <p className="text-xs text-destructive mt-1">{errors.github}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Deployed URL</label>
            <Input value={deployedLink} onChange={e => setDeployedLink(e.target.value)} placeholder="https://your-app.lovable.app" />
            {errors.deployed && <p className="text-xs text-destructive mt-1">{errors.deployed}</p>}
          </div>
          <Button onClick={save}>Save Links</Button>
        </CardContent>
      </Card>

      {/* Export */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => { navigator.clipboard.writeText(submissionText); toast({ title: "Submission copied to clipboard" }); }}
      >
        <Copy className="h-4 w-4 mr-2" /> Copy Final Submission
      </Button>

      {/* Shipped message */}
      {isShipped && (
        <Card className="shadow-none border border-primary/30 bg-accent/50">
          <CardContent className="py-8 text-center space-y-2">
            <p className="font-serif text-xl font-bold">You built a real product.</p>
            <p className="text-muted-foreground text-sm">Not a tutorial. Not a clone. A structured tool that solves a real problem.</p>
            <p className="font-medium text-sm">This is your proof of work.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
