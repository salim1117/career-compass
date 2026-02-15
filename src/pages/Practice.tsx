import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Code, Zap, Brain, Trophy } from "lucide-react";

const topics = [
  { icon: Code, title: "Arrays & Strings", total: 25, done: 8, color: "bg-primary/10 text-primary" },
  { icon: Brain, title: "Dynamic Programming", total: 20, done: 3, color: "bg-highlight/10 text-highlight" },
  { icon: Zap, title: "Trees & Graphs", total: 18, done: 12, color: "bg-info/10 text-info" },
  { icon: Trophy, title: "System Design", total: 10, done: 6, color: "bg-success/10 text-success" },
];

export default function Practice() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Practice</h1>
      <p className="text-muted-foreground mb-8">Sharpen your skills with curated problem sets.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((t) => {
          const pct = Math.round((t.done / t.total) * 100);
          return (
            <Card key={t.title} className="shadow-none border border-border hover:border-primary/30 transition-colors duration-150">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${t.color}`}>
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-base font-semibold">{t.title}</h3>
                    <p className="text-xs text-muted-foreground">{t.done}/{t.total} completed</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{pct}%</Badge>
                </div>
                <Progress value={pct} className="h-2" />
                <Button variant="outline" size="sm" className="w-full">Continue</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 shadow-none border border-border bg-accent/50">
        <CardContent className="py-6 text-center">
          <p className="text-sm text-muted-foreground">More practice categories coming soon — SQL, OS, Networks, and more.</p>
        </CardContent>
      </Card>
    </div>
  );
}
