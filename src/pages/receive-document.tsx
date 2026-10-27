import { useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  FileInput,
  Mail,
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

type IntakeChannel = "walk-in" | "email";

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
];

export default function ReceiveDocument() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] =
    useState<IntakeChannel>("walk-in");

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
              Receive a Document
            </h1>
            <p className="text-xs text-muted-foreground">
              Records Section
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-8 sm:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Document Intake
          </h2>
          <p className="mt-2 text-muted-foreground">
            Select the submission channel to record an incoming document.
          </p>
        </div>

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
                className={`rounded-xl border bg-background p-4 text-left transition-colors ${
                  selected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <Icon className="size-5 text-primary" />
                  {selected && (
                    <span className="text-xs font-medium text-primary">
                      Selected
                    </span>
                  )}
                </div>
                <h3 className="font-semibold">{option.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="size-5" />
              {intakeOptions.find(
                (option) => option.id === activeForm
              )?.title}{" "}
              Intake Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeForm === "walk-in" && <WalkInPaperForm />}
            {activeForm === "email" && <OfficialEmailReferralForm />}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
