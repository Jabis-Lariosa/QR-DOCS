
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  weeklyActivity,
  documentStatuses,
} from "@/components/data/dashboard-data";

export default function DocumentAnalytics() {
  const maxActivity = Math.max(
    ...weeklyActivity.map((item) =>
      Math.max(item.received, item.sent)
    )
  );

  const totalStatusCount = documentStatuses.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const totalReceived = weeklyActivity.reduce(
    (sum, item) => sum + item.received,
    0
  );

  const totalSent = weeklyActivity.reduce(
    (sum, item) => sum + item.sent,
    0
  );

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">Document Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Review document volume and current processing status.
        </p>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader>
            <CardTitle>Document Activity</CardTitle>
            <CardDescription>
              Incoming and outgoing documents this week
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div
              className="grid h-56 grid-cols-7 gap-2 sm:gap-4"
              role="img"
              aria-label="Bar chart comparing received and sent documents by day"
            >
              {weeklyActivity.map((item) => (
                <div
                  key={item.day}
                  className="flex min-w-0 flex-col items-center"
                >
                  <div className="flex w-full flex-1 items-end justify-center gap-1 border-b">
                    <div
                      title={`${item.received} received`}
                      className="w-3 rounded-t-sm bg-primary sm:w-5"
                      style={{
                        height: `${(item.received / maxActivity) * 100}%`,
                        minHeight: 3,
                      }}
                    />
                    <div
                      title={`${item.sent} sent`}
                      className="w-3 rounded-t-sm bg-sky-400 sm:w-5"
                      style={{
                        height: `${(item.sent / maxActivity) * 100}%`,
                        minHeight: 3,
                      }}
                    />
                  </div>
                  <span className="mt-2 text-xs text-muted-foreground">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Received</p>
                <p className="text-xl font-semibold">{totalReceived}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sent</p>
                <p className="text-xl font-semibold">{totalSent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
            <CardDescription>
              Distribution by current status
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <p className="text-3xl font-bold">
              {totalStatusCount}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                records
              </span>
            </p>

            <div className="flex h-3 overflow-hidden rounded-full bg-muted">
              {documentStatuses.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  title={`${item.label}: ${item.count}`}
                  style={{
                    width: `${(item.count / totalStatusCount) * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="space-y-4">
              {documentStatuses.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className={`size-2.5 shrink-0 rounded-full ${item.color}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="font-semibold">{item.count}</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${(item.count / totalStatusCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

     
    </section>
  );
}

function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
