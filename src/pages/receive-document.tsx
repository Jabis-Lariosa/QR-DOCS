
import { useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  FileInput,
  Mail,
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

import WalkInPaperForm from "@/components/forms/Walk-InPaper_form";
import OfficialEmailReferralForm from "@/components/forms/OfficialEmailReferralForm";

type IntakeChannel = "walk-in" | "email" | "qr";

const intakeOptions = [
  {
    id: "walk-in" as const,
    title: "Walk-in Paper",
    description: "Receive and record physical documents.",
    icon: FileInput,
  },
  {
    id: "email" as const,
    title: "Official Email",
    description: "Record official emails and referrals.",
    icon: Mail,
  },
  {
    id: "qr" as const,
    title: "QR Code Scanning",
    description: "Receive employee and department submissions by scanning QR codes.",
    icon: QrCode,
  },
];

export default function ReceiveDocument() {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] =
    useState<IntakeChannel>("walk-in");

  const activeOption = intakeOptions.find(
    (option) => option.id === activeForm
  );

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
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Document Intake
          </h2>
          <p className="mt-2 text-muted-foreground">
            Select how the incoming document will be received and recorded.
          </p>
        </div>

        {/* Intake Options */}
        <div className="grid gap-3 md:grid-cols-3">
          {intakeOptions.map((option) => {
            const Icon = option.icon;
            const selected = activeForm === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveForm(option.id)}
                aria-pressed={selected}
                className={`rounded-xl border bg-background p-4 text-left transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "hover:border-primary/50 hover:bg-muted/30"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>

                  {selected && (
                    <span className="text-xs font-medium text-primary">
                      Selected
                    </span>
                  )}
                </div>

                <h3 className="font-semibold">
                  {option.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Intake Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="size-5" />
              {activeOption?.title} Intake
            </CardTitle>
          </CardHeader>

          <CardContent>
            {activeForm === "walk-in" && (
              <WalkInPaperForm />
            )}

            {activeForm === "email" && (
              <OfficialEmailReferralForm />
            )}

            {activeForm === "qr" && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                  <ScanLine className="size-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold">
                  Scan Incoming Document
                </h3>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Scan the QR code generated from an Employee Online Form
                  or Department Document Submission to verify and receive
                  the document.
                </p>

                <Button
                  className="mt-6"
                  onClick={() => navigate("/scan-document")}
                >
                  <QrCode className="mr-2 size-4" />
                  Open QR Scanner
                </Button>

                <p className="mt-3 text-xs text-muted-foreground">
                  QR verification is required before marking a document
                  as received.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
