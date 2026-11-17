
import {
  ArrowLeft,
  QrCode,
  ScanLine,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GlobalDocumentForm from "@/components/forms/global_form";

export default function ReceiveDocument() {
  const navigate = useNavigate();

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
              Receive a Document
            </h1>
            <p className="text-xs text-muted-foreground">
              Records Section
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Document Intake
            </h2>
            <p className="mt-2 text-muted-foreground">
              Submit and route documents to the appropriate receiving offices.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate("/scan-document")}
          >
            <ScanLine className="mr-2 size-4" />
            Scan Document
          </Button>
        </div>

        {/* Global Document Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              Document Submission Form
            </CardTitle>
          </CardHeader>

          <CardContent>
            <GlobalDocumentForm />
          </CardContent>
        </Card>

        {/* QR Scanner Information */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <QrCode className="size-6 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Receive Submitted Documents
                </h3>
                <p className="text-sm text-muted-foreground">
                  Scan a submitted document's QR code to verify and update
                  its receiving status.
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/scan-document")}
              className="shrink-0"
            >
              <QrCode className="mr-2 size-4" />
              Open QR Scanner
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
