import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const radarData = [
  { skill: "DSA", value: 75 },
  { skill: "Sys Design", value: 60 },
  { skill: "Comm", value: 80 },
  { skill: "Resume", value: 85 },
  { skill: "Aptitude", value: 70 },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const activeDays = [true, true, false, true, true, false, true];

const assessments = [
  { name: "DSA Mock Test", time: "Tomorrow, 10:00 AM" },
  { name: "System Design Review", time: "Wed, 2:00 PM" },
  { name: "HR Interview Prep", time: "Friday, 11:00 AM" },
];

function CircularProgress({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset} className="transition-all duration-500" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-serif font-bold">{value}</span>
        <span className="text-xs text-muted-foreground">Readiness Score</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Your placement preparation at a glance.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card className="shadow-none border border-border">
          <CardHeader><CardTitle className="text-lg">Overall Readiness</CardTitle></CardHeader>
          <CardContent><CircularProgress value={72} /></CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Card className="shadow-none border border-border">
          <CardHeader><CardTitle className="text-lg">Skill Breakdown</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <Card className="shadow-none border border-border">
          <CardHeader><CardTitle className="text-lg">Continue Practice</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">Dynamic Programming</p>
            <div className="flex items-center gap-3">
              <Progress value={30} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground">3/10</span>
            </div>
            <Button size="sm">Continue</Button>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="shadow-none border border-border">
          <CardHeader><CardTitle className="text-lg">Weekly Goals</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Problems Solved</span>
                <span className="text-muted-foreground">12/20</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="flex gap-2">
              {days.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full border ${activeDays[i] ? "bg-primary border-primary" : "border-border"}`} />
                  <span className="text-[10px] text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assessments */}
        <Card className="shadow-none border border-border lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Upcoming Assessments</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {assessments.map((a) => (
                <li key={a.name} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="font-medium text-sm">{a.name}</span>
                  <span className="text-sm text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
