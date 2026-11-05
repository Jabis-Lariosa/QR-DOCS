
import { useMemo, useState } from "react";
import {
    Search,
    FileText,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Link2,
    Clock,
    Download,
    ShieldCheck,
    CalendarDays,
    Building2,
    Eye,
    X,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { QRCodeSVG } from "qrcode.react";
import { Copy, ExternalLink } from "lucide-react";

type DocumentStatus =
    | "Pending Validation"
    | "Accepted"
    | "Rejected"
    | "For Correction"
    | "Duplicate";

type DocumentRecord = {
    id: string;
    trackingNo: string;
    title: string;
    sender: string;
    department: string;
    type: string;
    subject: string;
    submittedAt: string;
    receivedAt: string;
    status: DocumentStatus;
    fileName: string;
    fileUrl: string;
    remarks?: string;
    duplicateOf?: string;
};

type ActionType = "Accepted" | "Rejected" | "For Correction" | "Duplicate";

const initialDocuments: DocumentRecord[] = [
    {
        id: "1",
        trackingNo: "DOC-2026-001",
        title: "Request for Office Supplies",
        sender: "Juan Dela Cruz",
        department: "Administrative Office",
        type: "Request Letter",
        subject: "Office supplies procurement",
        submittedAt: "November 04, 2026",
        receivedAt: "November 05, 2026",
        status: "Pending Validation",
        fileName: "office-supplies-request.pdf",
        fileUrl: "#",
    },
    {
        id: "2",
        trackingNo: "DOC-2026-002",
        title: "Monthly Accomplishment Report",
        sender: "Maria Santos",
        department: "Planning and Development",
        type: "Report",
        subject: "October monthly accomplishment",
        submittedAt: "November 04, 2026",
        receivedAt: "November 05, 2026",
        status: "Pending Validation",
        fileName: "accomplishment-report.pdf",
        fileUrl: "#",
    },
    {
        id: "3",
        trackingNo: "DOC-2026-003",
        title: "Personnel Travel Order",
        sender: "Pedro Reyes",
        department: "Human Resource Office",
        type: "Travel Order",
        subject: "Official travel authorization",
        submittedAt: "November 03, 2026",
        receivedAt: "November 04, 2026",
        status: "Pending Validation",
        fileName: "travel-order.pdf",
        fileUrl: "#",
    },
    {
        id: "4",
        trackingNo: "DOC-2026-004",
        title: "Annual Procurement Plan",
        sender: "Ana Garcia",
        department: "Budget Office",
        type: "Procurement Document",
        subject: "Annual procurement plan 2027",
        submittedAt: "November 02, 2026",
        receivedAt: "November 03, 2026",
        status: "Accepted",
        fileName: "procurement-plan.pdf",
        fileUrl: "#",
    },
];

const statusStyles: Record<DocumentStatus, string> = {
    "Pending Validation":
        "bg-amber-100 text-amber-700 border-amber-200",
    Accepted: "bg-green-100 text-green-700 border-green-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    "For Correction": "bg-orange-100 text-orange-700 border-orange-200",
    Duplicate: "bg-purple-100 text-purple-700 border-purple-200",
};

export default function DocumentValidation() {
    const [documents, setDocuments] =
        useState<DocumentRecord[]>(initialDocuments);

    const [selectedId, setSelectedId] = useState("1");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const [action, setAction] = useState<ActionType | null>(null);
    const [remarks, setRemarks] = useState("");
    const [duplicateId, setDuplicateId] = useState("");
    const [generatedAccessUrl, setGeneratedAccessUrl] = useState("");
    const findMatchingOriginal = () => {
        if (!selectedDocument) return "";

        const match = documents.find(
            (doc) =>
                doc.id !== selectedDocument.id &&
                doc.status !== "Rejected" &&
                doc.status !== "Duplicate" &&
                doc.title.trim().toLowerCase() ===
                selectedDocument.title.trim().toLowerCase()
        );

        return match?.id ?? "";
    };

    const selectedDocument = documents.find(
        (doc) => doc.id === selectedId
    );

    const filteredDocuments = useMemo(() => {
        return documents.filter((doc) => {
            const matchesSearch =
                doc.trackingNo.toLowerCase().includes(search.toLowerCase()) ||
                doc.title.toLowerCase().includes(search.toLowerCase()) ||
                doc.sender.toLowerCase().includes(search.toLowerCase()) ||
                doc.department.toLowerCase().includes(search.toLowerCase());

            const matchesFilter =
                filter === "All" || doc.status === filter;

            return matchesSearch && matchesFilter;
        });
    }, [documents, search, filter]);

    const pendingCount = documents.filter(
        (doc) => doc.status === "Pending Validation"
    ).length;

    const acceptedCount = documents.filter(
        (doc) => doc.status === "Accepted"
    ).length;

    const correctionCount = documents.filter(
        (doc) => doc.status === "For Correction"
    ).length;

    const rejectedCount = documents.filter(
        (doc) => doc.status === "Rejected"
    ).length;

    const openAction = (type: ActionType) => {
        setAction(type);
        setRemarks("");
        setDuplicateId("");
    };

    const closeAction = () => {
        setAction(null);
        setRemarks("");
        setDuplicateId("");
    };

    const applyAction = async () => {
        if (!selectedDocument || !action) return;

        if (
            (action === "Rejected" || action === "For Correction") &&
            !remarks.trim()
        ) {
            return;
        }

        if (action === "Duplicate" && !duplicateId) return;

        try {
            let accessUrl = "";

            // Ask the backend to link the duplicate and create
            // a secure access token for the original document.
            if (action === "Duplicate") {
                const response = await fetch(
                    `/api/documents/${selectedDocument.id}/link-duplicate`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            originalDocumentId: duplicateId,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to link duplicate document.");
                }

                const result = await response.json();
                accessUrl = result.accessUrl;

                if (!accessUrl) {
                    throw new Error("The server did not return an access URL.");
                }
            }

            setDocuments((previous) =>
                previous.map((doc) =>
                    doc.id === selectedDocument.id
                        ? {
                            ...doc,
                            status: action,
                            remarks: remarks.trim() || undefined,
                            duplicateOf:
                                action === "Duplicate" ? duplicateId : undefined,
                        }
                        : doc
                )
            );

            if (action === "Duplicate") {
                setGeneratedAccessUrl(accessUrl);
            }

            closeAction();
        } catch (error) {
            console.error(error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        }
    };

    const availableDuplicates = documents.filter(
        (doc) =>
            doc.id !== selectedId &&
            doc.status !== "Rejected" &&
            doc.status !== "Duplicate"
    );

    return (
        <div className="min-h-screen space-y-6 bg-slate-50 p-4 md:p-6 lg:p-8">

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />
                        Document Management
                        <span>/</span>
                        <span className="text-slate-900">Validation</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Document Validation
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review and validate documents received by your department.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-2">
                        <Clock className="mr-2 h-4 w-4" />
                        {pendingCount} Pending Review
                    </Badge>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <StatCard
                    title="Pending Validation"
                    value={pendingCount}
                    icon={<Clock className="h-5 w-5 text-amber-600" />}
                    description="Awaiting review"
                />
                <StatCard
                    title="Accepted"
                    value={acceptedCount}
                    icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                    description="Validated documents"
                />
                <StatCard
                    title="For Correction"
                    value={correctionCount}
                    icon={<AlertCircle className="h-5 w-5 text-orange-600" />}
                    description="Returned to sender"
                />
                <StatCard
                    title="Rejected"
                    value={rejectedCount}
                    icon={<XCircle className="h-5 w-5 text-red-600" />}
                    description="Rejected submissions"
                />
            </div>

            {/* Main Content */}
            <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">

                {/* Document Queue */}
                <Card className="min-w-0 overflow-hidden">
                    <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                                Received Documents
                            </CardTitle>
                            <Badge variant="secondary">
                                {filteredDocuments.length} Records
                            </Badge>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tracking no., title, sender..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {["All", "Pending Validation", "Accepted", "For Correction", "Rejected", "Duplicate"].map(
                                (item) => (
                                    <Button
                                        key={item}
                                        size="sm"
                                        variant={filter === item ? "default" : "outline"}
                                        className="shrink-0"
                                        onClick={() => setFilter(item)}
                                    >
                                        {item === "Pending Validation" ? "Pending" : item}
                                    </Button>
                                )
                            )}
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="max-h-[650px] space-y-3 overflow-y-auto p-4">
                        {filteredDocuments.length === 0 ? (
                            <div className="py-12 text-center">
                                <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                <p className="font-medium text-slate-700">
                                    No documents found
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try another search or filter.
                                </p>
                            </div>
                        ) : (
                            filteredDocuments.map((doc) => (
                                <button
                                    key={doc.id}
                                    onClick={() => {
                                        setSelectedId(doc.id);
                                        closeAction();
                                    }}
                                    className={`w-full rounded-lg border p-4 text-left transition-all hover:border-slate-400 hover:bg-slate-50 ${selectedId === doc.id
                                        ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
                                        : "border-slate-200 bg-white"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-slate-100 p-2.5">
                                            <FileText className="h-5 w-5 text-slate-600" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {doc.trackingNo}
                                                </span>

                                                <Badge
                                                    variant="outline"
                                                    className={statusStyles[doc.status]}
                                                >
                                                    {doc.status}
                                                </Badge>
                                            </div>

                                            <p className="mt-2 truncate font-semibold text-slate-900">
                                                {doc.title}
                                            </p>

                                            <p className="mt-1 truncate text-sm text-muted-foreground">
                                                {doc.department}
                                            </p>

                                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{doc.sender}</span>
                                                <span>{doc.receivedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Document Details */}
                <Card className="min-w-0 overflow-hidden">
                    {selectedDocument ? (
                        <>
                            <CardHeader className="flex flex-row items-start justify-between gap-3">
                                <div>
                                    <CardTitle className="text-base">
                                        Document Details
                                    </CardTitle>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Review the submission before making a decision.
                                    </p>
                                </div>

                                <Badge
                                    variant="outline"
                                    className={statusStyles[selectedDocument.status]}
                                >
                                    {selectedDocument.status}
                                </Badge>
                            </CardHeader>

                            <Separator />

                            <CardContent className="space-y-6 p-5">

                                {/* Document Information */}
                                <div>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Document Information
                                    </p>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        {selectedDocument.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Tracking No: {selectedDocument.trackingNo}
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <DetailItem
                                        icon={<Building2 />}
                                        label="Sending Department"
                                        value={selectedDocument.department}
                                    />
                                    <DetailItem
                                        icon={<Eye />}
                                        label="Submitted By"
                                        value={selectedDocument.sender}
                                    />
                                    <DetailItem
                                        icon={<CalendarDays />}
                                        label="Date Submitted"
                                        value={selectedDocument.submittedAt}
                                    />
                                    <DetailItem
                                        icon={<CalendarDays />}
                                        label="Date Received"
                                        value={selectedDocument.receivedAt}
                                    />
                                </div>

                                <Separator />

                                {/* Subject */}
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Document Type
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {selectedDocument.type}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Subject / Purpose
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {selectedDocument.subject}
                                    </p>
                                </div>

                                <Separator />

                                {/* File Attachment */}
                                <div>
                                    <p className="mb-3 text-sm font-semibold text-slate-800">
                                        Attached Document
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-slate-50 p-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="rounded-md bg-white p-2">
                                                <FileText className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {selectedDocument.fileName}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Document attachment
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={selectedDocument.fileUrl === "#"}
                                            onClick={() =>
                                                window.open(selectedDocument.fileUrl, "_blank")
                                            }
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            View / Download
                                        </Button>
                                    </div>
                                </div>

                                {/* Previous Validation Remarks */}
                                {selectedDocument.remarks && (
                                    <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                                        <p className="text-sm font-semibold text-orange-800">
                                            Validation Remarks
                                        </p>
                                        <p className="mt-1 text-sm text-orange-700">
                                            {selectedDocument.remarks}
                                        </p>
                                    </div>
                                )}

                                {selectedDocument.status === "Duplicate" &&
                                    selectedDocument.duplicateOf &&
                                    generatedAccessUrl && (
                                        <div className="space-y-4 rounded-lg border border-purple-200 bg-purple-50/50 p-5">

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Link2 className="h-5 w-5 text-purple-600" />
                                                    <h3 className="font-semibold text-purple-900">
                                                        Duplicate Document Linked
                                                    </h3>
                                                </div>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Scan the QR code or share the access URL to view
                                                    the original document.
                                                </p>
                                            </div>

                                            {/* QR Code */}
                                            <div className="flex justify-center rounded-lg border bg-white p-5">
                                                <QRCodeSVG
                                                    value={generatedAccessUrl}
                                                    size={190}
                                                    level="H"
                                                    includeMargin
                                                />
                                            </div>

                                            {/* Access URL */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">
                                                    Document Access URL
                                                </label>

                                                <div className="flex gap-2">
                                                    <Input
                                                        readOnly
                                                        value={generatedAccessUrl}
                                                        className="min-w-0 bg-white text-xs"
                                                    />

                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(generatedAccessUrl)
                                                        }
                                                        title="Copy access URL"
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <Button
                                                className="w-full bg-purple-600 hover:bg-purple-700"
                                                onClick={() =>
                                                    window.open(generatedAccessUrl, "_blank")
                                                }
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Open Original Document
                                            </Button>

                                            <p className="text-center text-xs text-muted-foreground">
                                                Access is subject to document permissions and link validity.
                                            </p>
                                        </div>
                                    )}

                                <Separator />

                                {/* Validation Actions */}
                                <div>
                                    <p className="mb-3 text-sm font-semibold text-slate-900">
                                        Validation Actions
                                    </p>

                                    {selectedDocument.status === "Pending Validation" ||
                                        selectedDocument.status === "Accepted" ? (
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                                            {selectedDocument.status === "Pending Validation" && (
                                                <>
                                                    <Button
                                                        onClick={() => openAction("Accepted")}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                                        Accept Document
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => openAction("Rejected")}
                                                    >
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        Reject Document
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        className="border-orange-300 text-orange-700 hover:bg-orange-50"
                                                        onClick={() => openAction("For Correction")}
                                                    >
                                                        <AlertCircle className="mr-2 h-4 w-4" />
                                                        For Correction
                                                    </Button>
                                                </>
                                            )}

                                            <Button
                                                variant="outline"
                                                className="border-purple-300 text-purple-700 hover:bg-purple-50"
                                                onClick={() => {
  setDuplicateId(findMatchingOriginal());
  setAction("Duplicate");
  setRemarks("");
}}
                                            >
                                                <Link2 className="mr-2 h-4 w-4" />
                                                Link Duplicate
                                            </Button>

                                        </div>
                                    ) : (
                                        <div className="rounded-lg border bg-slate-50 p-4 text-sm text-muted-foreground">
                                            This document has already been validated.
                                            Its current status is{" "}
                                            <strong className="text-slate-900">
                                                {selectedDocument.status}
                                            </strong>.
                                        </div>
                                    )}
                                </div>

                                {/* Action Confirmation Panel */}
                                {action && (
                                    <div className="space-y-4 rounded-lg border border-slate-300 bg-slate-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-slate-900">
                                                {action === "Accepted"
                                                    ? "Confirm Acceptance"
                                                    : action === "Rejected"
                                                        ? "Reject Document"
                                                        : action === "For Correction"
                                                            ? "Return for Correction"
                                                            : "Link Duplicate Document"}
                                            </h3>

                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={closeAction}
                                                aria-label="Close action panel"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {action === "Accepted"
                                                ? "Confirm that this document is valid and complete."
                                                : action === "Rejected"
                                                    ? "Provide the reason why this document is being rejected."
                                                    : action === "For Correction"
                                                        ? "Specify the changes required before resubmission."
                                                        : "Select the original document that this submission duplicates."}
                                        </p>

                                        
{action === "Duplicate" ? (
    <div className="space-y-3">
        {duplicateId ? (
            (() => {
                const original = documents.find(
                    (doc) => doc.id === duplicateId
                );

                if (!original) return null;

                return (
                    <div className="rounded-lg border border-purple-200 bg-white p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-purple-600" />
                            <span className="font-semibold text-slate-800">
                                Original Document Identified
                            </span>
                        </div>

                        <p className="font-medium text-slate-900">
                            {original.title}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Tracking No: {original.trackingNo}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Department: {original.department}
                        </p>
                    </div>
                );
            })()
        ) : (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="font-medium text-amber-800">
                    No matching original document found.
                </p>
                <p className="mt-1 text-sm text-amber-700">
                    The system cannot automatically identify the original document.
                    Duplicate linking is unavailable.
                </p>
            </div>
        )}
    </div>
) : action !== "Accepted" ? (
    <div className="space-y-2">
        <label className="text-sm font-medium">
            Reason / Instructions
            <span className="text-red-500"> *</span>
        </label>

        <Textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder={
                action === "Rejected"
                    ? "Enter the reason for rejection..."
                    : "Enter the required corrections..."
            }
            rows={3}
        />
    </div>
) : null}


                                        <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
                                            <Button
                                                variant="outline"
                                                onClick={closeAction}
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                                disabled={
                                                    ((action === "Rejected" ||
                                                        action === "For Correction") &&
                                                        !remarks.trim()) ||
                                                    (action === "Duplicate" && !duplicateId)
                                                }
                                                onClick={applyAction}
                                                className={
                                                    action === "Accepted"
                                                        ? "bg-green-600 hover:bg-green-700"
                                                        : action === "Duplicate"
                                                            ? "bg-purple-600 hover:bg-purple-700"
                                                            : ""
                                                }
                                                variant={
                                                    action === "Rejected" ? "destructive" : "default"
                                                }
                                            >
                                                Confirm {action === "Duplicate" ? "Link" : action}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </>
                    ) : (
                        <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center">
                            <FileText className="mb-3 h-12 w-12 text-slate-300" />
                            <p className="font-semibold text-slate-700">
                                Select a document
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Choose a record from the received documents queue.
                            </p>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    );
}

// Reusable statistics card
function StatCard({
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
        <Card className="min-w-0">
            <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-lg bg-slate-100 p-3">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm text-muted-foreground">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

// Reusable document detail
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
        <div className="flex min-w-0 items-start gap-3">
            <div className="rounded-md bg-slate-100 p-2 text-slate-600 [&_svg]:h-4 [&_svg]:w-4">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="break-words text-sm font-medium text-slate-800">
                    {value}
                </p>
            </div>
        </div>
    );
}
