
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  FileText,
  Eye,
  Download,
  Route,
  CalendarDays,
  Building2,
  User,
  X,
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

// Sample records - replace with backend data
const documents = [
  {
    id: "DOC-001",
    trackingNo: "DQR-2026-0001",
    title: "Request for Office Equipment",
    sender: "Juan Dela Cruz",
    originatingOffice: "ICT OFFICE",
    dateSubmitted: "2026-11-15",
    documentType: "Request Letter",
    status: "In Progress",
    fileName: "equipment-request.pdf",
    fileUrl: "#",
    receivingOffices: [
      { office: "ADMINISTRATIVE OFFICE", status: "Completed" },
      { office: "BUDGET OFFICE", status: "In Progress" },
      { office: "PROPERTY OFFICE", status: "Pending Receipt" },
    ],
  },
  {
    id: "DOC-002",
    trackingNo: "DQR-2026-0002",
    title: "Monthly Accomplishment Report",
    sender: "Maria Santos",
    originatingOffice: "RECORDS SECTION",
    dateSubmitted: "2026-11-14",
    documentType: "Accomplishment Report",
    status: "Completed",
    fileName: "monthly-report.pdf",
    fileUrl: "#",
    receivingOffices: [
      { office: "ADMINISTRATIVE OFFICE", status: "Completed" },
      { office: "OFFICE OF THE HEAD", status: "Completed" },
    ],
  },
  {
    id: "DOC-003",
    trackingNo: "DQR-2026-0003",
    title: "Personnel Information Update",
    sender: "Pedro Reyes",
    originatingOffice: "HR OFFICE",
    dateSubmitted: "2026-11-16",
    documentType: "Personnel Document",
    status: "Pending Receipt",
    fileName: "personnel-update.pdf",
    fileUrl: "#",
    receivingOffices: [
      { office: "ADMINISTRATIVE OFFICE", status: "Pending Receipt" },
    ],
  },
  {
    id: "DOC-004",
    trackingNo: "DQR-2026-0004",
    title: "Correction of Submitted Document",
    sender: "Ana Garcia",
    originatingOffice: "ACCOUNTING OFFICE",
    dateSubmitted: "2026-11-16",
    documentType: "Financial Document",
    status: "For Correction",
    fileName: "financial-document.pdf",
    fileUrl: "#",
    receivingOffices: [
      { office: "BUDGET OFFICE", status: "For Correction" },
    ],
  },
  {
    id: "DOC-005",
    trackingNo: "DQR-2026-0005",
    title: "Office Memorandum",
    sender: "Jose Reyes",
    originatingOffice: "ADMINISTRATIVE OFFICE",
    dateSubmitted: "2026-11-17",
    documentType: "Memorandum",
    status: "Received",
    fileName: "office-memorandum.pdf",
    fileUrl: "#",
    receivingOffices: [
      { office: "RECORDS SECTION", status: "Received" },
    ],
  },
  {
    id: "DOC-006",
    trackingNo: "DQR-2026-0006",
    title: "Purchase Request",
    sender: "Carlo Mendoza",
    originatingOffice: "PROPERTY OFFICE",
    dateSubmitted: "2026-11-17",
    documentType: "Purchase Request",
    status: "Rejected",
    fileName: "purchase-request.pdf",
    fileUrl: "#",
    receivingOffices: [
      { office: "BUDGET OFFICE", status: "Rejected" },
    ],
  },
];

const statuses = [
  "All",
  "Pending Receipt",
  "Received",
  "In Progress",
  "For Correction",
  "Completed",
  "Rejected",
];

function statusStyle(status: string) {
  const styles: Record<string, string> = {
    "Pending Receipt": "bg-amber-100 text-amber-700 border-amber-200",
    Received: "bg-blue-100 text-blue-700 border-blue-200",
    "In Progress": "bg-violet-100 text-violet-700 border-violet-200",
    "For Correction": "bg-orange-100 text-orange-700 border-orange-200",
    Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return styles[status] || "bg-gray-100 text-gray-700";
}

export default function DocumentRecords() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDocument, setSelectedDocument] =
    useState<(typeof documents)[number] | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        doc.trackingNo,
        doc.title,
        doc.sender,
        doc.originatingOffice,
        doc.documentType,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || doc.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const countStatus = (status: string) =>
    documents.filter((doc) => doc.status === status).length;

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Document Records
        </h1>
        <p className="text-sm text-muted-foreground">
          Centralized repository of all submitted and processed documents.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total Records" value={documents.length} />
        <SummaryCard title="Pending Receipt" value={countStatus("Pending Receipt")} />
        <SummaryCard title="In Progress" value={countStatus("In Progress")} />
        <SummaryCard title="Completed" value={countStatus("Completed")} />
      </div>

      {/* Main Double Container */}
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">

        {/* LEFT: RECORDS TABLE */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="text-base">
              All Document Records
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Browse and filter registered documents.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Status filter */}
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>

            {/* Records */}
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full min-w-[650px] text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left text-muted-foreground">
                    <th className="px-4 py-3">Tracking No.</th>
                    <th className="px-4 py-3">Document</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredDocuments.map((doc) => (
                    <tr
                      key={doc.id}
                      className={`cursor-pointer hover:bg-muted/40 ${
                        selectedDocument?.id === doc.id
                          ? "bg-primary/5"
                          : ""
                      }`}
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <td className="px-4 py-4 font-medium">
                        {doc.trackingNo}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.originatingOffice}
                        </p>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        {doc.dateSubmitted}
                      </td>

                      <td className="px-4 py-4">
                        <Badge
                          variant="outline"
                          className={statusStyle(doc.status)}
                        >
                          {doc.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                          }}
                          aria-label="View document"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {filteredDocuments.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-muted-foreground"
                      >
                        No document records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground">
              Showing {filteredDocuments.length} of {documents.length} records
            </p>
          </CardContent>
        </Card>

        {/* RIGHT: DOCUMENT DETAILS */}
        <Card className="min-w-0 xl:sticky xl:top-4">
          {selectedDocument ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">
                      Record Details
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedDocument.trackingNo}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSelectedDocument(null)}
                    aria-label="Close details"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">

                {/* Document Information */}
                <div className="space-y-4 rounded-lg bg-muted/40 p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Document Title
                    </p>
                    <p className="font-semibold">
                      {selectedDocument.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={<User className="size-4" />}
                      label="Sender"
                      value={selectedDocument.sender}
                    />
                    <DetailItem
                      icon={<Building2 className="size-4" />}
                      label="Originating Office"
                      value={selectedDocument.originatingOffice}
                    />
                    <DetailItem
                      icon={<FileText className="size-4" />}
                      label="Document Type"
                      value={selectedDocument.documentType}
                    />
                    <DetailItem
                      icon={<CalendarDays className="size-4" />}
                      label="Date Submitted"
                      value={selectedDocument.dateSubmitted}
                    />
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">
                      Overall Status
                    </p>
                    <Badge
                      variant="outline"
                      className={statusStyle(selectedDocument.status)}
                    >
                      {selectedDocument.status}
                    </Badge>
                  </div>
                </div>

                {/* Attachment */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold">
                    Document Attachment
                  </h3>

                  <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-md bg-red-100 p-2 text-red-600">
                        <FileText className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {selectedDocument.fileName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Attached document
                        </p>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          selectedDocument.fileUrl,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      aria-label="Download attachment"
                    >
                      <Download className="size-4" />
                    </Button>
                  </div>
                </div>

                {/* Receiving Offices */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold">
                    Receiving Offices
                  </h3>

                  <div className="space-y-2">
                    {selectedDocument.receivingOffices.map(
                      (route, index) => (
                        <div
                          key={`${route.office}-${index}`}
                          className="flex items-center justify-between gap-3 rounded-lg border p-3"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <Building2 className="size-4 shrink-0 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {route.office}
                            </span>
                          </div>

                          <Badge
                            variant="outline"
                            className={statusStyle(route.status)}
                          >
                            {route.status}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    className="flex-1"
                    onClick={() =>
                      navigate(
                        `/documents/tracking?trackingNo=${encodeURIComponent(selectedDocument.trackingNo)}`
                      )
                    }
                  >
                    <Route className="mr-2 size-4" />
                    View Tracking
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setSelectedDocument(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex min-h-[480px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-muted p-4">
                <FileText className="size-8 text-muted-foreground" />
              </div>

              <h3 className="mt-4 font-semibold">
                Select a Document Record
              </h3>

              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Select a record from the list to view its information,
                attachments, and receiving offices.
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
}: {
  title: string;
  value: number;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-1 break-words text-sm font-medium">{value}</p>
    </div>
  );
}
