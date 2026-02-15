import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/lib/types";

interface TopBarProps {
  currentStep?: number;
  totalSteps?: number;
  status?: ProjectStatus;
}

export function TopBar({ currentStep = 1, totalSteps = 8, status = "Not Started" }: TopBarProps) {
  const statusVariant = status === "Shipped" ? "default" : status === "In Progress" ? "secondary" : "outline";

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <span className="font-serif text-lg font-semibold text-foreground">Placement Readiness</span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <Badge variant={statusVariant} className="text-xs">
        {status}
      </Badge>
    </header>
  );
}
