import { ArrowRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clientSubmissions } from "@/components/data/client-data";

export default function ClientDocuments() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My documents</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Only documents submitted from your client account are shown here.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted documents</CardTitle>
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
    </div>
  );
}
