import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getHistory } from "@/lib/storage";

export default function HistoryPage() {
  const navigate = useNavigate();
  const history = getHistory();

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Analysis History</h1>
      <p className="text-muted-foreground mb-8">View and revisit your past JD analyses.</p>

      {history.length === 0 ? (
        <Card className="shadow-none border border-border">
          <CardContent className="py-10 text-center text-muted-foreground">
            No analyses yet. Go to <span className="font-medium text-foreground">Analyze JD</span> to create your first.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card
              key={entry.id}
              className="shadow-none border border-border cursor-pointer hover:bg-accent/50 transition-colors duration-150"
              onClick={() => navigate(`/results/${entry.id}`)}
            >
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{entry.company || "Unknown Company"} — {entry.role || "Unknown Role"}</p>
                  <p className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge variant="secondary">{entry.finalScore}/100</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
