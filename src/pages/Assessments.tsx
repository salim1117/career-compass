import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Award, CalendarDays } from "lucide-react";

const assessments = [
  { title: "DSA Mock Test", date: "Tomorrow, 10:00 AM", duration: "90 min", difficulty: "Medium", icon: Target, color: "text-info", accent: "border-l-info" },
  { title: "System Design Review", date: "Wed, 2:00 PM", duration: "60 min", difficulty: "Hard", icon: Award, color: "text-highlight", accent: "border-l-highlight" },
  { title: "HR Interview Prep", date: "Friday, 11:00 AM", duration: "45 min", difficulty: "Easy", icon: CalendarDays, color: "text-success", accent: "border-l-success" },
];

const diffColor: Record<string, string> = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Hard: "bg-primary/10 text-primary border-primary/20",
};

export default function Assessments() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Assessments</h1>
      <p className="text-muted-foreground mb-8">Upcoming mock tests and interview simulations.</p>

      <div className="space-y-4">
        {assessments.map((a) => (
          <Card key={a.title} className={`card-premium border-l-4 ${a.accent}`}>
            <CardContent className="py-5 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 bg-muted ${a.color}`}>
                <a.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base font-semibold">{a.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{a.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.duration}</span>
                </div>
              </div>
              <Badge variant="outline" className={`text-xs ${diffColor[a.difficulty]}`}>{a.difficulty}</Badge>
              <Button size="sm">Start</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 card-premium bg-accent/50">
        <CardContent className="py-6 text-center">
          <p className="text-sm text-muted-foreground">Full timed assessments with scoring will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
