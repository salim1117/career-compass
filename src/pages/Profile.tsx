import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Target, TrendingUp, Calendar } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Profile</h1>
      <p className="text-muted-foreground mb-8">Your preparation journey at a glance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="card-premium sm:col-span-2 border-l-4 border-l-primary">
          <CardContent className="py-6 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Student</h2>
              <p className="text-sm text-muted-foreground">Placement preparation in progress</p>
              <Badge variant="secondary" className="mt-2">In Progress</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-l-4 border-l-info">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans flex items-center gap-2">
              <Target className="h-4 w-4 text-info" /> Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Weekly problems</span><span className="text-muted-foreground">12/20</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Mock tests</span><span className="text-muted-foreground">1/3</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" /> Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">JDs Analyzed</span><span className="font-medium">—</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Avg Score</span><span className="font-medium">—</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Streak</span><span className="font-medium">5 days</span></div>
          </CardContent>
        </Card>

        <Card className="card-premium sm:col-span-2 border-l-4 border-l-highlight">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans flex items-center gap-2">
              <Calendar className="h-4 w-4 text-highlight" /> Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1">
              {Array.from({ length: 28 }).map((_, i) => {
                const active = [0,1,3,4,7,8,10,11,14,15,17,18,21,22,24,25].includes(i);
                return <div key={i} className={`w-3 h-3 rounded-sm ${active ? "bg-primary/70" : "bg-muted"}`} />;
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last 4 weeks</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
