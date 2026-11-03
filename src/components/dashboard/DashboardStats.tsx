
import { ArrowUpRight, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/components/data/dashboard-data";

export default function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="size-4 text-primary" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold tabular-nums">
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>

              <div className="mt-3 flex items-center gap-1 text-xs">
                {stat.positive ? (
                  <ArrowUpRight className="size-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="size-4 text-amber-600" />
                )}
                <span
                  className={
                    stat.positive
                      ? "font-medium text-emerald-600"
                      : "font-medium text-amber-600"
                  }
                >
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
