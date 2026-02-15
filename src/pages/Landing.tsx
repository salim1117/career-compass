import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Video, BarChart3 } from "lucide-react";

const features = [
  { icon: Code, title: "Practice Problems", description: "Curated coding challenges aligned to your target companies." },
  { icon: Video, title: "Mock Interviews", description: "Simulate real interview rounds with structured feedback." },
  { icon: BarChart3, title: "Track Progress", description: "Monitor your readiness score and skill gaps over time." },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-serif text-xl font-semibold">Placement Readiness</span>
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
          Sign In
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-24 lg:py-40">
          <h1 className="font-serif text-4xl lg:text-6xl font-bold tracking-tight max-w-2xl">
            Ace Your Placement
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Practice, assess, and prepare for your dream job — with structure, not guesswork.
          </p>
          <Button className="mt-8" size="lg" onClick={() => navigate("/dashboard")}>
            Get Started
          </Button>
        </section>

        {/* Features */}
        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="border border-border shadow-none">
                <CardContent className="pt-6 flex flex-col items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-accent flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
      </footer>
    </div>
  );
}
