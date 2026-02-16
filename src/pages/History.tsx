import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHistory, deleteFromHistory } from "@/lib/storage";
import { Trash2, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function scoreColor(score: number) {
  if (score >= 70) return "bg-success/10 text-success border-success/20";
  if (score >= 40) return "bg-warning/10 text-warning border-warning/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState(getHistory());

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFromHistory(id);
    setHistory(getHistory());
    toast({ title: "Entry deleted" });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Analysis History</h1>
      <p className="text-muted-foreground mb-8">View and revisit your past JD analyses.</p>

      {history.length === 0 ? (
        <Card className="card-premium">
          <CardContent className="py-10 text-center text-muted-foreground">
            No analyses yet. Go to <span className="font-medium text-foreground">Analyze JD</span> to create your first.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card
              key={entry.id}
              className="card-premium cursor-pointer"
              onClick={() => navigate(`/results/${entry.id}`)}
            >
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{entry.company || "Unknown Company"} — {entry.role || "Unknown Role"}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${scoreColor(entry.finalScore)}`}>
                    {entry.finalScore}/100
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={(e) => handleDelete(entry.id, e)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
