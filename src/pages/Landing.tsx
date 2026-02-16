import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Video, BarChart3, ArrowRight, CheckCircle, Building2, Users, Award } from "lucide-react";

const features = [
  { icon: Code, title: "Practice Problems", description: "Curated coding challenges aligned to your target companies.", color: "text-info", border: "border-l-info" },
  { icon: Video, title: "Mock Interviews", description: "Simulate real interview rounds with structured feedback.", color: "text-highlight", border: "border-l-highlight" },
  { icon: BarChart3, title: "Track Progress", description: "Monitor your readiness score and skill gaps over time.", color: "text-success", border: "border-l-success" },
];

const benefits = [
  "Extracts skills directly from job descriptions",
  "Generates round-wise interview prep plans",
  "Tracks readiness with a deterministic scoring engine",
  "Persists your progress — no account needed",
];

const trustedBy = [
  { icon: Building2, name: "Amazon" },
  { icon: Building2, name: "Google" },
  { icon: Building2, name: "Infosys" },
  { icon: Building2, name: "TCS" },
  { icon: Building2, name: "Microsoft" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between bg-card">
        <span className="font-serif text-xl font-semibold">Placement Readiness</span>
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
          Sign In
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 lg:py-36 overflow-hidden">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, hsl(0 100% 27% / 0.04) 0%, transparent 70%)"
          }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Built for serious placement prep</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold tracking-tight max-w-2xl">
              Ace Your Placement
            </h1>
            {/* Accent line */}
            <div className="mx-auto mt-4 w-16 h-1 rounded-full bg-primary/60" />
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Practice, assess, and prepare for your dream job — with structure, not guesswork.
            </p>
            <Button className="mt-8 gap-2" size="lg" onClick={() => navigate("/dashboard")}>
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className={`card-premium border-l-4 ${f.border}`}>
                <CardContent className="pt-6 flex flex-col items-start gap-3">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-muted ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">
            Trusted by students targeting top companies
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {trustedBy.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-muted-foreground/60">
                <c.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 pb-24 max-w-3xl mx-auto">
          <Card className="card-premium">
            <CardContent className="py-8 px-8">
              <h2 className="font-serif text-2xl font-bold mb-6 text-center">Why This Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
      </footer>
    </div>
  );
}
