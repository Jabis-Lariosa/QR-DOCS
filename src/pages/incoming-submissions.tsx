import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Eye,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SubmissionStatus = "Pending Review" | "Needs Correction" | "Validated";

type Submission = {
  id: string;
  title: string;
  submitter: string;
  channel: string;
  receivedAt: string;
  status: SubmissionStatus;
};

const submissions: Submission[] = [
  {
    id: "SUB-2026-001",
    title: "Request for Certification",
    submitter: "Maria Santos",
    channel: "Walk-in Paper",
    receivedAt: "October 27, 2026, 9:15 AM",
    status: "Pending Review",
  },
  {
    id: "SUB-2026-002",
    title: "Official Memorandum",
    submitter: "Records Office",
    channel: "Official Email",
    receivedAt: "October 27, 2026, 8:42 AM",
    status: "Pending Review",
  },
  {
    id: "SUB-2026-003",
    title: "Document Request",
    submitter: "Juan Dela Cruz",
    channel: "Walk-in Paper",
    receivedAt: "October 26, 2026, 4:30 PM",
    status: "Needs Correction",
  },
];

const statusStyles: Record<SubmissionStatus, string> = {
  "Pending Review": "bg-amber-100 text-amber-800",
  "Needs Correction": "bg-red-100 text-red-800",
  Validated: "bg-green-100 text-green-800",
};

export default function IncomingSubmissions() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | SubmissionStatus>(
    "All"
  );

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesStatus =
        statusFilter === "All" || submission.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [
          submission.id,
          submission.title,
          submission.submitter,
          submission.channel,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-20 border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to dashboard"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold sm:text-xl">
              Incoming Submissions
            </h1>
            <p className="text-xs text-muted-foreground">
              Records Section
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Review Incoming Documents
          </h2>
          <p className="mt-2 text-muted-foreground">
            Review and validate documents received through each intake channel.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by ID, title, submitter, or channel"
                className="pl-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as "All" | SubmissionStatus
                )
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Needs Correction">Needs Correction</option>
              <option value="Validated">Validated</option>
            </select>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ClipboardList className="size-5 text-primary" />
                      {submission.title}
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {submission.id} · Received {submission.receivedAt}
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${statusStyles[submission.status]}`}
                  >
                    {submission.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Submitter:</span>{" "}
                    {submission.submitter}
                  </p>
                  <p className="text-muted-foreground">
                    Channel: {submission.channel}
                  </p>
                </div>
                <Button variant="outline">
                  <Eye className="mr-2 size-4" />
                  Review submission
                </Button>
              </CardContent>
            </Card>
          ))}

          {filteredSubmissions.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No submissions match your search or status filter.
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
