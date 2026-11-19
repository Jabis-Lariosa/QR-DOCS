import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  RefreshCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clientSubmissions } from "@/components/data/client-data";

const trackingSteps = [
  {
    office: "Administrative Office",
    action: "Document received and acknowledged",
    date: "Nov 15, 2026 · 9:30 AM",
    status: "Completed",
  },
  {
    office: "Budget Office",
    action: "Reviewing document details",
    date: "In progress",
    status: "In Progress",
  },
  {
    office: "Property Office",
    action: "Awaiting receipt and action",
    date: "Next step",
    status: "Pending",
  },
];

function statusStyle(status: string) {
  if (status === "Completed") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "In Progress") {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }
  return "border-amber-200 bg-amber-50 text-amber-700";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Completed") return <CheckCircle2 className="size-4" />;
  if (status === "In Progress") return <RefreshCw className="size-4" />;
  return <Clock3 className="size-4" />;
}

export default function ClientTracking() {
  const [selectedId, setSelectedId] = useState(clientSubmissions[0].id);
  const selectedDocument =
    clientSubmissions.find((document) => document.id === selectedId) ??
    clientSubmissions[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Track my documents
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Follow the progress of documents you submitted.
        </p>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {clientSubmissions.map((document) => (
              <button
                key={document.id}
                type="button"
                onClick={() => setSelectedId(document.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  selectedDocument.id === document.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <FileText className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {document.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {document.id}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`mt-3 ${statusStyle(document.status)}`}
                >
                  {document.status}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>{selectedDocument.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedDocument.id} · Submitted {selectedDocument.date}
                </p>
              </div>
              <Badge
                variant="outline"
                className={statusStyle(selectedDocument.status)}
              >
                {selectedDocument.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-3 rounded-xl bg-muted/40 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Current location</p>
                <p className="mt-1 text-sm font-medium">Budget Office</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tracking number</p>
                <p className="mt-1 text-sm font-medium">{selectedDocument.id}</p>
              </div>
            </div>

            <h2 className="mb-5 font-semibold">Routing history</h2>
            <div className="space-y-0">
              {trackingSteps.map((step, index) => (
                <div key={step.office} className="relative flex gap-3 pb-7 last:pb-0">
                  {index < trackingSteps.length - 1 && (
                    <div className="absolute left-4 top-8 h-full w-px bg-border" />
                  )}
                  <div
                    className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border ${statusStyle(step.status)}`}
                  >
                    <StatusIcon status={step.status} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{step.office}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {step.action}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {step.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <p className="text-sm">
                Status updates will appear here as each receiving office
                acknowledges and processes your document.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
