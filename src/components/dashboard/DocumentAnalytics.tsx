
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  weeklyActivity,
  documentStatuses,
} from "@/components/data/dashboard-data";

import {
  FileText,
  ArrowDownToLine,
  ArrowUpFromLine,
  Activity,
} from "lucide-react";

export default function DocumentAnalytics() {
  const maxActivity = Math.max(
    1,
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
        <h3 className="text-xl font-semibold">
          Document Tracking Analytics
        </h3>
        <p className="text-sm text-muted-foreground">
          Monitor document movement, receiving activity, and processing progress.
        </p>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        {/* Document Movement */}
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              <CardTitle>Document Movement</CardTitle>
            </div>
            <CardDescription>
              Daily incoming and forwarded documents this week
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div
              className="grid h-56 grid-cols-7 gap-2 sm:gap-4"
              role="img"
              aria-label="Bar chart comparing received and forwarded documents by day"
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
                        minHeight: item.received > 0 ? 3 : 0,
                      }}
                    />

                    <div
                      title={`${item.sent} forwarded`}
                      className="w-3 rounded-t-sm bg-sky-400 sm:w-5"
                      style={{
                        height: `${(item.sent / maxActivity) * 100}%`,
                        minHeight: item.sent > 0 ? 3 : 0,
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
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-primary/10 p-2">
                  <ArrowDownToLine className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Documents Received
                  </p>
                  <p className="text-xl font-semibold">
                    {totalReceived}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-md bg-sky-400/10 p-2">
                  <ArrowUpFromLine className="size-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Documents Forwarded
                  </p>
                  <p className="text-xl font-semibold">
                    {totalSent}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-sm bg-primary" />
                Received
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-sm bg-sky-400" />
                Forwarded
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Status */}
        <Card className="min-w-0">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              <CardTitle>Tracking Status</CardTitle>
            </div>
            <CardDescription>
              Current status of all tracked documents
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-3xl font-bold">
                {totalStatusCount}
              </p>
              <p className="text-xs text-muted-foreground">
                Total tracked documents
              </p>
            </div>

            {/* Status distribution bar */}
            <div className="flex h-3 overflow-hidden rounded-full bg-muted">
              {totalStatusCount > 0 &&
                documentStatuses.map((item) => (
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

            {/* Status breakdown */}
            <div className="space-y-4">
              {documentStatuses.map((item) => {
                const percentage =
                  totalStatusCount > 0
                    ? (item.count / totalStatusCount) * 100
                    : 0;

                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex min-w-0 items-center gap-2">
                        <span
                          className={`size-2.5 shrink-0 rounded-full ${item.color}`}
                        />
                        <span className="truncate">
                          {item.label}
                        </span>
                      </span>

                      <span className="font-semibold">
                        {item.count}
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
