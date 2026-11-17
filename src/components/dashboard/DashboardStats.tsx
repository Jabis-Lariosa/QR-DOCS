
import {
  FileText,
  Clock,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const trackingStats = [
  {
    title: "Total Documents",
    value: 48,
    description: "All recorded documents",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Pending Receipt",
    value: 12,
    description: "Awaiting office confirmation",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "In Progress",
    value: 21,
    description: "Currently being processed",
    icon: RefreshCw,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Completed",
    value: 15,
    description: "Successfully processed documents",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {trackingStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <Icon className={`size-5 ${stat.color}`} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold tabular-nums">
                {stat.value}
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
