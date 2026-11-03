
import {
  CheckCircle2,
  Send,
  AlertCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { activities } from "@/components/data/dashboard-data";

const activityStyles = {
  received: {
    icon: CheckCircle2,
    color: "text-emerald-600",
  },
  sent: {
    icon: Send,
    color: "text-blue-600",
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-600",
  },
};

export default function RecentActivity() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest document processing events
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {activities.map((activity, index) => {
            const style =
              activityStyles[
                activity.type as keyof typeof activityStyles
              ] ?? activityStyles.received;

            const Icon = style.icon;

            return (
              <div key={`${activity.title}-${activity.time}`} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-muted p-2">
                    <Icon className={`size-4 ${style.color}`} />
                  </div>

                  {index < activities.length - 1 && (
                    <div className="mt-2 min-h-5 w-px flex-1 bg-border" />
                  )}
                </div>

                <div className="min-w-0 flex-1 pb-2">
                  <p className="text-sm font-semibold">{activity.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
