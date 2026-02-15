import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTestChecklist, saveTestChecklist } from "@/lib/storage";

const TEST_ITEMS = [
  { label: "JD required validation works", hint: "Try clicking Analyze with an empty textarea." },
  { label: "Short JD warning shows for <200 chars", hint: "Paste a very short text and click Analyze." },
  { label: "Skills extraction groups correctly", hint: "Paste a JD with React, SQL, Python and check tags." },
  { label: "Round mapping changes based on company + skills", hint: "Try 'Amazon' vs an unknown company name." },
  { label: "Score calculation is deterministic", hint: "Analyze the same JD twice — scores should match." },
  { label: "Skill toggles update score live", hint: "Toggle skills on results page and watch the score." },
  { label: "Changes persist after refresh", hint: "Toggle skills, refresh the page, check they stayed." },
  { label: "History saves and loads correctly", hint: "Analyze a JD, go to History, click the entry." },
  { label: "Export buttons copy the correct content", hint: "Click Copy buttons and paste into a text editor." },
  { label: "No console errors on core pages", hint: "Open DevTools Console on Dashboard, Results, History." },
];

export default function TestChecklist() {
  const [items, setItems] = useState<boolean[]>(new Array(10).fill(false));

  useEffect(() => {
    const saved = getTestChecklist();
    setItems(saved.items);
  }, []);

  const toggle = (i: number) => {
    const updated = [...items];
    updated[i] = !updated[i];
    setItems(updated);
    saveTestChecklist({ items: updated });
  };

  const reset = () => {
    const cleared = new Array(10).fill(false);
    setItems(cleared);
    saveTestChecklist({ items: cleared });
  };

  const passed = items.filter(Boolean).length;

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Test Checklist</h1>
      <p className="text-muted-foreground mb-6">Verify each item before shipping.</p>

      <div className="flex items-center justify-between mb-6">
        <Badge variant={passed === 10 ? "default" : "secondary"} className="text-sm">
          Tests Passed: {passed} / 10
        </Badge>
        <Button variant="outline" size="sm" onClick={reset}>Reset Checklist</Button>
      </div>

      {passed < 10 && (
        <p className="text-sm text-warning mb-4">Fix issues before shipping.</p>
      )}

      <Card className="shadow-none border border-border">
        <CardContent className="py-4 space-y-4">
          {TEST_ITEMS.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Checkbox checked={items[i]} onCheckedChange={() => toggle(i)} className="mt-0.5" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.hint}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
