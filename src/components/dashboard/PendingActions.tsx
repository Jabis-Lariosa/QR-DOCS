
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pendingActions } from "@/components/data/dashboard-data";

export default function PendingActions() {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">Pending Actions</h3>
        <p className="text-sm text-muted-foreground">
          Documents that may require attention from the records team.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {pendingActions.map((action) => {
          const Icon = action.icon;

          return (
            <Card key={action.title} className="transition-shadow hover:shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className={`rounded-lg p-3 ${action.background}`}>
                    <Icon className={`size-5 ${action.color}`} />
                  </div>
                  <span className="text-2xl font-bold">{action.count}</span>
                </div>

                <h4 className="mt-4 font-semibold">{action.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>

                <Button
                  variant="link"
                  className="mt-2 h-auto px-0"
                  onClick={() => navigate(action.route)}
                >
                  Review documents
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
