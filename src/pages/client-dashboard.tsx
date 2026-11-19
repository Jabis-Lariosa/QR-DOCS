import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FilePlus2,
  FileText,
  Route,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clientSubmissions } from "@/components/data/client-data";

const statusSummary = [
  { label: "Total submissions", value: "12", icon: FileText },
  { label: "In progress", value: "4", icon: Clock3 },
  { label: "Completed", value: "7", icon: CheckCircle2 },
];

export default function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full min-w-0 space-y-6">
      <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
        <p className="text-sm text-primary-foreground/70">Client portal</p>
        <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Hello, Juan
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-primary-foreground/75 sm:text-base">
              Submit documents, follow their progress, and see when each office
              has completed its action.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="secondary"
              onClick={() => navigate("/client/submit-document")}
            >
              <Upload className="mr-2 size-4" />
              Submit a document
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => navigate("/client/tracking")}
            >
              Track a submission
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {statusSummary.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-3xl font-bold">{value}</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>My recent submissions</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                A quick view of your latest document activity.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/documents/tracking")}
            >
              View all
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {clientSubmissions.map((submission) => (
              <button
                key={submission.id}
                type="button"
                onClick={() => navigate("/client/tracking")}
                className="flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors hover:bg-muted/40"
              >
                <div className="rounded-lg bg-muted p-2.5">
                  <FileText className="size-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {submission.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {submission.id} · Submitted {submission.date}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`hidden shrink-0 sm:inline-flex ${submission.statusClass}`}
                >
                  {submission.status}
                </Badge>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="h-auto w-full justify-start gap-3 p-4"
              onClick={() => navigate("/client/submit-document")}
            >
              <FilePlus2 className="size-5 text-primary" />
              <span className="text-left">
                <span className="block font-medium">New submission</span>
                <span className="block text-xs font-normal text-muted-foreground">
                  Send a document to an office
                </span>
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto w-full justify-start gap-3 p-4"
              onClick={() => navigate("/client/tracking")}
            >
              <Route className="size-5 text-primary" />
              <span className="text-left">
                <span className="block font-medium">Track documents</span>
                <span className="block text-xs font-normal text-muted-foreground">
                  Follow routing and status updates
                </span>
              </span>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
