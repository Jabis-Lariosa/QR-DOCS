
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  QrCode,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowRight,
  MapPin,
  RefreshCw,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample data - replace with API/database data
const trackingDocuments = [
  {
    id: "DOC-2026-001",
    trackingNo: "DQR-2026-0001",
    title: "Request for Office Equipment",
    sender: "Juan Dela Cruz",
    originatingOffice: "ICT OFFICE",
    dateSubmitted: "2026-11-15",
    overallStatus: "In Progress",
    receivingOffices: [
      {
        office: "ADMINISTRATIVE OFFICE",
        action: "For Approval",
        status: "Completed",
        receivedAt: "2026-11-15 09:30 AM",
        completedAt: "2026-11-15 02:15 PM",
        instructions: "Review and approve the equipment request.",
      },
      {
        office: "BUDGET OFFICE",
        action: "For Review",
        status: "In Progress",
        receivedAt: "2026-11-16 10:00 AM",
        completedAt: null,
        instructions: "Check the availability of the requested budget.",
      },
      {
        office: "PROPERTY OFFICE",
        action: "For Appropriate Action",
        status: "Pending Receipt",
        receivedAt: null,
        completedAt: null,
        instructions: "Verify equipment availability.",
      },
    ],
  },
  {
    id: "DOC-2026-002",
    trackingNo: "DQR-2026-0002",
    title: "Monthly Accomplishment Report",
    sender: "Maria Santos",
    originatingOffice: "RECORDS SECTION",
    dateSubmitted: "2026-11-14",
    overallStatus: "Completed",
    receivingOffices: [
      {
        office: "ADMINISTRATIVE OFFICE",
        action: "For Review",
        status: "Completed",
        receivedAt: "2026-11-14 08:30 AM",
        completedAt: "2026-11-14 11:00 AM",
        instructions: "Review the submitted report.",
      },
      {
        office: "OFFICE OF THE HEAD",
        action: "For Signature",
        status: "Completed",
        receivedAt: "2026-11-14 01:00 PM",
        completedAt: "2026-11-14 03:30 PM",
        instructions: "Sign the accomplishment report.",
      },
    ],
  },
  {
    id: "DOC-2026-003",
    trackingNo: "DQR-2026-0003",
    title: "Personnel Information Update",
    sender: "Pedro Reyes",
    originatingOffice: "HR OFFICE",
    dateSubmitted: "2026-11-16",
    overallStatus: "Pending Receipt",
    receivingOffices: [
      {
        office: "ADMINISTRATIVE OFFICE",
        action: "For Appropriate Action",
        status: "Pending Receipt",
        receivedAt: null,
        completedAt: null,
        instructions: "Update the personnel information.",
      },
    ],
  },
  {
    id: "DOC-2026-004",
    trackingNo: "DQR-2026-0004",
    title: "Correction of Submitted Document",
    sender: "Ana Garcia",
    originatingOffice: "ACCOUNTING OFFICE",
    dateSubmitted: "2026-11-16",
    overallStatus: "For Correction",
    receivingOffices: [
      {
        office: "BUDGET OFFICE",
        action: "For Review",
        status: "For Correction",
        receivedAt: "2026-11-16 09:00 AM",
        completedAt: null,
        instructions: "Please correct the missing financial details.",
      },
    ],
  },
];

type DocumentStatus =
  | "Pending Receipt"
  | "Received"
  | "In Progress"
  | "For Correction"
  | "Completed"
  | "Rejected";

function getStatusStyle(status: string) {
  switch (status) {
    case "Pending Receipt":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Received":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "In Progress":
      return "bg-violet-100 text-violet-700 border-violet-200";
    case "For Correction":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Completed":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Rejected":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "Pending Receipt":
      return <Clock className="size-4" />;
    case "Received":
      return <CheckCircle2 className="size-4" />;
    case "In Progress":
      return <RefreshCw className="size-4" />;
    case "For Correction":
      return <AlertCircle className="size-4" />;
    case "Completed":
      return <CheckCircle2 className="size-4" />;
    case "Rejected":
      return <XCircle className="size-4" />;
    default:
      return <FileText className="size-4" />;
  }
}

export default function DocumentTracking() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDocument, setSelectedDocument] =
    useState<(typeof trackingDocuments)[number] | null>(null);

  const filteredDocuments = useMemo(() => {
    return trackingDocuments.filter((doc) => {
      const matchesSearch = [
        doc.trackingNo,
        doc.title,
        doc.sender,
        doc.originatingOffice,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        doc.overallStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalDocuments = trackingDocuments.length;

  const countStatus = (status: DocumentStatus) =>
    trackingDocuments.filter(
      (doc) => doc.overallStatus === status
    ).length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Document Tracking
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor document movement and receiving-office progress.
          </p>
        </div>

        <Button onClick={() => navigate("/scan-document")}>
          <QrCode className="mr-2 size-4" />
          Scan Document
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Documents"
          value={totalDocuments}
          icon={<FileText className="size-5" />}
          description="All tracked documents"
        />

        <SummaryCard
          title="Pending Receipt"
          value={countStatus("Pending Receipt")}
          icon={<Clock className="size-5" />}
          description="Awaiting QR confirmation"
        />

        <SummaryCard
          title="In Progress"
          value={countStatus("In Progress") + countStatus("Received")}
          icon={<RefreshCw className="size-5" />}
          description="Currently being processed"
        />

        <SummaryCard
          title="Completed"
          value={countStatus("Completed")}
          icon={<CheckCircle2 className="size-5" />}
          description="All required actions finished"
        />
      </div>

      
{/* Double Container Layout */}
<div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">

  {/* LEFT CONTAINER - Document List */}
  <Card className="min-w-0">
    <CardHeader>
      <CardTitle className="text-base">
        Document Records
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Search and select a document to track.
      </p>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tracking number, title, sender..."
          className="pl-9"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="All">All Statuses</option>
        <option value="Pending Receipt">Pending Receipt</option>
        <option value="Received">Received</option>
        <option value="In Progress">In Progress</option>
        <option value="For Correction">For Correction</option>
        <option value="Completed">Completed</option>
        <option value="Rejected">Rejected</option>
      </select>

      <div className="space-y-3">
        {filteredDocuments.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => setSelectedDocument(doc)}
            className={`w-full rounded-lg border p-4 text-left transition-colors hover:bg-muted/50 ${
              selectedDocument?.id === doc.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <FileText className="size-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {doc.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {doc.trackingNo}
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={`shrink-0 ${getStatusStyle(doc.overallStatus)}`}
              >
                {doc.overallStatus}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
              <span>{doc.originatingOffice}</span>
              <span>{doc.dateSubmitted}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Submitted by {doc.sender}
              </span>
              <span className="flex items-center gap-1 font-medium text-primary">
                View Tracking <ArrowRight className="size-3" />
              </span>
            </div>
          </button>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No documents found.
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filteredDocuments.length} of {totalDocuments} documents
      </p>
    </CardContent>
  </Card>

  {/* RIGHT CONTAINER - Tracking Details */}
  <Card className="min-w-0 xl:sticky xl:top-4">
    {selectedDocument ? (
      <>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-base">
                Tracking Details
              </CardTitle>
              <p className="mt-1 break-all text-sm text-muted-foreground">
                {selectedDocument.trackingNo}
              </p>
            </div>

            <Badge
              variant="outline"
              className={getStatusStyle(selectedDocument.overallStatus)}
            >
              {selectedDocument.overallStatus}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Document Information */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/40 p-4">
            <InfoItem
              label="Document Title"
              value={selectedDocument.title}
            />
            <InfoItem
              label="Submitted By"
              value={selectedDocument.sender}
            />
            <InfoItem
              label="Originating Office"
              value={selectedDocument.originatingOffice}
            />
            <InfoItem
              label="Date Submitted"
              value={selectedDocument.dateSubmitted}
            />
          </div>

          {/* Routing History */}
          <div>
            <h3 className="mb-4 font-semibold">
              Routing History
            </h3>

            <div className="space-y-0">
              {selectedDocument.receivingOffices.map(
                (route, index) => (
                  <div
                    key={`${route.office}-${index}`}
                    className="relative flex gap-3 pb-6 last:pb-0"
                  >
                    {index !==
                      selectedDocument.receivingOffices.length - 1 && (
                      <div className="absolute left-4 top-9 h-full w-px bg-border" />
                    )}

                    <div
                      className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border ${getStatusStyle(route.status)}`}
                    >
                      {getStatusIcon(route.status)}
                    </div>

                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">
                            {route.office}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {route.action}
                          </p>
                        </div>

                        <Badge
                          variant="outline"
                          className={getStatusStyle(route.status)}
                        >
                          {route.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 rounded-md border p-3 text-xs">
                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">
                            Received
                          </span>
                          <span className="text-right font-medium">
                            {route.receivedAt || "Awaiting QR scan"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">
                            Completed
                          </span>
                          <span className="text-right font-medium">
                            {route.completedAt || "Not completed"}
                          </span>
                        </div>

                        <div className="border-t pt-2">
                          <p className="text-muted-foreground">
                            Instructions
                          </p>
                          <p className="mt-1">
                            {route.instructions || "No instructions provided."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </>
    ) : (
      <CardContent className="flex min-h-[450px] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-muted p-4">
          <MapPin className="size-8 text-muted-foreground" />
        </div>

        <h3 className="mt-4 font-semibold">
          No Document Selected
        </h3>

        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Select a document from the list to view its tracking information and routing history.
        </p>
      </CardContent>
    )}
  </Card>
</div>

    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-medium">{value}</p>
    </div>
  );
}
