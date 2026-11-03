
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Eye,
  Search,
  QrCode,
  UserRound,
  Building2,
  Clock,
  CheckCircle2,
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type SubmissionStatus = "Pending Review" | "Needs Correction" | "Received";
type SubmissionType = "Employee" | "Department";

type Submission = {
  id: string;
  title: string;
  submitter: string;
  department: string;
  channel: string;
  receivedAt: string;
  status: SubmissionStatus;
  type: SubmissionType;
  fileUrl?: string;
};

const initialSubmissions: Submission[] = [
  {
    id: "SUB-2026-001",
    title: "Request for Certification",
    submitter: "Maria Santos",
    department: "ICT Office",
    channel: "Employee Online Form",
    receivedAt: "November 2, 2026, 9:15 AM",
    status: "Pending Review",
    type: "Employee",
  },
  {
    id: "SUB-2026-002",
    title: "Official Memorandum",
    submitter: "Records Office",
    department: "Administrative Office",
    channel: "Department Submission",
    receivedAt: "November 2, 2026, 8:42 AM",
    status: "Pending Review",
    type: "Department",
  },
  {
    id: "SUB-2026-003",
    title: "Document Request",
    submitter: "Juan Dela Cruz",
    department: "ICT Office",
    channel: "Employee Online Form",
    receivedAt: "November 1, 2026, 4:30 PM",
    status: "Needs Correction",
    type: "Employee",
  },
  {
    id: "SUB-2026-004",
    title: "Purchase Request",
    submitter: "Accounting Office",
    department: "Administrative Office",
    channel: "Department Submission",
    receivedAt: "October 30, 2026, 10:30 AM",
    status: "Received",
    type: "Department",
  },
];

const statusStyles: Record<SubmissionStatus, string> = {
  "Pending Review": "bg-amber-100 text-amber-800",
  "Needs Correction": "bg-red-100 text-red-800",
  Received: "bg-green-100 text-green-800",
};

export default function IncomingSubmissions() {
  const navigate = useNavigate();

  const [submissions] = useState<Submission[]>(initialSubmissions);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesStatus =
        statusFilter === "All" || submission.status === statusFilter;

      const matchesType =
        typeFilter === "All" || submission.type === typeFilter;

      const matchesQuery =
        !normalizedQuery ||
        [
          submission.id,
          submission.title,
          submission.submitter,
          submission.department,
          submission.channel,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesStatus && matchesType && matchesQuery;
    });
  }, [submissions, query, statusFilter, typeFilter]);

  const pendingCount = submissions.filter(
    (item) => item.status === "Pending Review"
  ).length;

  const employeeCount = submissions.filter(
    (item) => item.type === "Employee"
  ).length;

  const departmentCount = submissions.filter(
    (item) => item.type === "Department"
  ).length;

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
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
              Review Documents
            </h1>
            <p className="text-xs text-muted-foreground">
              Incoming Document Management
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        {/* Page Title */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Incoming Submissions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Review employee and department document submissions.
              Scan the QR code to verify receipt.
            </p>
          </div>

          <Button onClick={() => navigate("/receive-document")}>
            <QrCode className="mr-2 size-4" />
            Scan QR Code
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Review
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {pendingCount}
                </p>
              </div>
              <div className="rounded-lg bg-amber-100 p-3">
                <Clock className="size-5 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Employee Submissions
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {employeeCount}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <UserRound className="size-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Department Submissions
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {departmentCount}
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <Building2 className="size-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="flex flex-col gap-3 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ID, title, submitter, or department..."
                className="pl-9"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                aria-label="Filter submission type"
              >
                <option value="All">All submission types</option>
                <option value="Employee">Employee Online Form</option>
                <option value="Department">Department Submission</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                aria-label="Filter by status"
              >
                <option value="All">All statuses</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Needs Correction">Needs Correction</option>
                <option value="Received">Received</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Submissions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Document Submissions</h3>
            <span className="text-sm text-muted-foreground">
              {filteredSubmissions.length} results
            </span>
          </div>

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
                      {submission.id} · {submission.receivedAt}
                    </p>
                  </div>

                  <Badge
                    variant="secondary"
                    className={statusStyles[submission.status]}
                  >
                    {submission.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Submitter:</span>{" "}
                    {submission.submitter}
                  </p>

                  <p className="text-muted-foreground">
                    Department: {submission.department}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    {submission.type === "Employee" ? (
                      <UserRound className="size-3.5 text-blue-600" />
                    ) : (
                      <Building2 className="size-3.5 text-purple-600" />
                    )}

                    <span className="text-xs text-muted-foreground">
                      {submission.channel}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <Eye className="mr-2 size-4" />
                    Review
                  </Button>

                  {submission.status === "Pending Review" && (
                    <Button
                      onClick={() => navigate("/receive-document")}
                    >
                      <QrCode className="mr-2 size-4" />
                      Scan QR
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredSubmissions.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No submissions match your search or filters.
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Review Details Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={(open) => {
          if (!open) setSelectedSubmission(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>Submission Details</DialogTitle>
                <DialogDescription>
                  Review the incoming document information.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <p className="text-xs text-muted-foreground">
                    Tracking Number
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedSubmission.id}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Document Title
                    </p>
                    <p className="font-medium">
                      {selectedSubmission.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Submitted By
                    </p>
                    <p className="font-medium">
                      {selectedSubmission.submitter}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Submission Type
                    </p>
                    <p className="font-medium">
                      {selectedSubmission.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Receiving Department
                    </p>
                    <p className="font-medium">
                      {selectedSubmission.department}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Submission Channel
                    </p>
                    <p className="font-medium">
                      {selectedSubmission.channel}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Date Submitted
                    </p>
                    <p className="font-medium">
                      {selectedSubmission.receivedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-muted-foreground">
                    Current Status
                  </span>

                  <Badge
                    className={statusStyles[selectedSubmission.status]}
                    variant="secondary"
                  >
                    {selectedSubmission.status}
                  </Badge>
                </div>

                {selectedSubmission.status === "Pending Review" && (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedSubmission(null);
                      navigate("/receive-document");
                    }}
                  >
                    <QrCode className="mr-2 size-4" />
                    Scan QR to Receive
                  </Button>
                )}

                {selectedSubmission.status === "Received" && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <CheckCircle2 className="size-5" />
                    Document has been received.
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
