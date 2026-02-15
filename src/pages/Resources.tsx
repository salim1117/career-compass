import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";

const resources = [
  { icon: BookOpen, title: "DSA Fundamentals", desc: "Master arrays, trees, graphs, and dynamic programming.", tags: ["Beginner", "Core"], color: "bg-primary/10 text-primary" },
  { icon: Video, title: "System Design Patterns", desc: "Learn scalable architecture patterns used by top companies.", tags: ["Advanced", "Design"], color: "bg-highlight/10 text-highlight" },
  { icon: FileText, title: "Resume Building Guide", desc: "Craft an ATS-friendly resume that stands out to recruiters.", tags: ["Essential", "Career"], color: "bg-success/10 text-success" },
  { icon: BookOpen, title: "Behavioral Interview Prep", desc: "Frameworks for answering HR and managerial round questions.", tags: ["HR", "Communication"], color: "bg-info/10 text-info" },
  { icon: Video, title: "SQL & Database Mastery", desc: "From basic queries to indexing, joins, and optimization.", tags: ["Data", "Backend"], color: "bg-warning/10 text-warning" },
  { icon: FileText, title: "Aptitude & Reasoning", desc: "Practice quantitative, logical, and verbal reasoning.", tags: ["Aptitude", "Basics"], color: "bg-primary/10 text-primary" },
];

export default function Resources() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-bold mb-2">Resources</h1>
      <p className="text-muted-foreground mb-8">Curated learning materials for every stage of your preparation.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((r) => (
          <Card key={r.title} className="shadow-none border border-border hover:border-primary/30 transition-colors duration-150 cursor-pointer group">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${r.color}`}>
                  <r.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-semibold flex items-center gap-1">
                    {r.title}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {r.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
