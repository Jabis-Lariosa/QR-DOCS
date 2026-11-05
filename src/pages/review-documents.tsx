
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  QrCode,
  FileText,
  Clock,
  CheckCircle2,
  Eye,
  Download,
  CalendarDays,
  Building2,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type DocumentStatus = "Pending" | "Received";

interface DocumentRecord {
  id: string;
  trackingNo: string;
  documentName: string;
  sender: string;
  department: string;
  subject: string;
  dateSubmitted: string;
  status: DocumentStatus;
  fileUrl?: string;
}


const initialDocuments: DocumentRecord[] = [
  {
    id: "1",
    trackingNo: "DOC-2026-001",
    documentName: "Memorandum.pdf",
    sender: "Juan Dela Cruz",
    department: "Administrative Office",
    subject: "Request for Office Supplies",
    dateSubmitted: "November 2, 2026",
    status: "Pending",
  },
  {
    id: "2",
    trackingNo: "DOC-2026-002",
    documentName: "Purchase Request.pdf",
    sender: "Maria Santos",
    department: "Accounting Office",
    subject: "Equipment Purchase Request",
    dateSubmitted: "November 2, 2026",
    status: "Pending",
  },
  {
    id: "3",
    trackingNo: "DOC-2026-003",
    documentName: "Travel Order.pdf",
    sender: "Pedro Reyes",
    department: "Human Resource Office",
    subject: "Official Travel Authorization",
    dateSubmitted: "November 1, 2026",
    status: "Received",
  },
];

export default function ReviewDocuments() {
  const navigate = useNavigate();

  const [documents] = useState<DocumentRecord[]>(initialDocuments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentRecord | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = [
        doc.trackingNo,
        doc.documentName,
        doc.sender,
        doc.department,
        doc.subject,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || doc.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [documents, search, filter]);

  const pendingCount = documents.filter(
    (doc) => doc.status === "Pending"
  ).length;

  const receivedCount = documents.filter(
    (doc) => doc.status === "Received"
  ).length;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Review Documents
          </h1>
          <p className="text-sm text-muted-foreground">
            Review incoming documents and validate their receipt.
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
                Total Documents
              </p>
              <p className="mt-1 text-2xl font-bold">
                {documents.length}
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>

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
                Received Documents
              </p>
              <p className="mt-1 text-2xl font-bold">
                {receivedCount}
              </p>
            </div>
            <div className="rounded-lg bg-green-100 p-3">
              <CheckCircle2 className="size-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Table */}
      <Card>
        <CardHeader className="space-y-4">
          <div>
            <CardTitle>Incoming Documents</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Documents sent to your department.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tracking number, sender..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Received"].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={filter === status ? "default" : "outline"}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-3 py-3 font-medium">Tracking No.</th>
                  <th className="px-3 py-3 font-medium">Document</th>
                  <th className="px-3 py-3 font-medium">Sender</th>
                  <th className="px-3 py-3 font-medium">Department</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b last:border-0 transition-colors hover:bg-muted/40"
                  >
                    <td className="px-3 py-4 font-medium">
                      {doc.trackingNo}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-muted-foreground" />
                        {doc.documentName}
                      </div>
                    </td>

                    <td className="px-3 py-4">{doc.sender}</td>

                    <td className="px-3 py-4">
                      {doc.department}
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap">
                      {doc.dateSubmitted}
                    </td>

                    <td className="px-3 py-4">
                      <Badge
                        variant="secondary"
                        className={
                          doc.status === "Pending"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : "bg-green-100 text-green-700 hover:bg-green-100"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </td>

                    <td className="px-3 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}

                {filteredDocuments.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-muted-foreground"
                    >
                      <FileText className="mx-auto mb-3 size-8 opacity-40" />
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
            <span>
              Showing {filteredDocuments.length} of {documents.length} documents
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
            >
              <RefreshCw className="mr-2 size-3" />
              Reset filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Details Dialog */}
      <Dialog
        open={!!selectedDocument}
        onOpenChange={(open) => {
          if (!open) setSelectedDocument(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle>Document Details</DialogTitle>
                <DialogDescription>
                  Review the submitted document information.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">
                    Tracking Number
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedDocument.trackingNo}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Document Name
                      </p>
                      <p className="font-medium">
                        {selectedDocument.documentName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building2 className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Sending Department
                      </p>
                      <p className="font-medium">
                        {selectedDocument.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Date Submitted
                      </p>
                      <p className="font-medium">
                        {selectedDocument.dateSubmitted}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">
                    Subject / Details
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedDocument.subject}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Status
                  </span>
                  <Badge variant="secondary">
                    {selectedDocument.status}
                  </Badge>
                </div>

                {selectedDocument.fileUrl && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        selectedDocument.fileUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <Download className="mr-2 size-4" />
                    Download Document
                  </Button>
                )}

                {selectedDocument.status === "Pending" && (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedDocument(null);
                      navigate("/receive-document");
                    }}
                  >
                    <QrCode className="mr-2 size-4" />
                    Scan QR to Receive
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
