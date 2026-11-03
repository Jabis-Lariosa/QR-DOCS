
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { departmentActivity } from "@/components/data/dashboard-data";

export default function DepartmentActivity() {
  const maxValue = Math.max(
    1,
    ...departmentActivity.map((item) =>
      Math.max(item.received, item.sent)
    )
  );

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Department Activity</CardTitle>
        <CardDescription>
          Sample incoming and outgoing document volumes
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {departmentActivity.map((department) => (
          <div key={department.name} className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-medium">
                {department.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {department.received} received · {department.sent} sent
              </span>
            </div>

            <div className="flex h-2 gap-1 overflow-hidden rounded-full bg-muted">
              <div
                className="rounded-full bg-primary"
                style={{
                  width: `${(department.received / maxValue) * 100}%`,
                }}
                title={`${department.received} received`}
              />
              <div
                className="rounded-full bg-sky-400"
                style={{
                  width: `${(department.sent / maxValue) * 100}%`,
                }}
                title={`${department.sent} sent`}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-4 border-t pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-sm bg-primary" />
            Received
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-sm bg-sky-400" />
            Sent
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
