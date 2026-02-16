import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { ProjectStatus } from "@/lib/types";

interface TopBarProps {
  currentStep?: number;
  totalSteps?: number;
  status?: ProjectStatus;
}

export function TopBar({ currentStep = 1, totalSteps = 8, status = "Not Started" }: TopBarProps) {
  const statusVariant = status === "Shipped" ? "default" : status === "In Progress" ? "secondary" : "outline";

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shadow-sm">
      <span className="font-serif text-lg font-semibold text-foreground">Placement Readiness</span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Badge variant={statusVariant} className={`text-xs ${status === "In Progress" ? "animate-pulse" : ""}`}>
          {status}
        </Badge>
      </div>
    </header>
  );
}
