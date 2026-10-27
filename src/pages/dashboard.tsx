
import {
  LayoutDashboard,
  FileText,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Plus,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  const stats = [
    {
      title: "Total Records",
      value: "48",
      description: "Registered documents",
      icon: FileText,
    },
    {
      title: "Pending Validation",
      value: "12",
      description: "Awaiting records review",
      icon: Clock,
    },
    {
      title: "Validated Records",
      value: "31",
      description: "Successfully validated",
      icon: CheckCircle2,
    },
    {
      title: "Needs Correction",
      value: "5",
      description: "Requires submitter action",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <LayoutDashboard className="size-6 text-primary" />
            </div>

            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                Document Management System
              </h1>
              <p className="text-xs text-muted-foreground">
                Records Section
              </p>
            </div>
          </div>

          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        {/* Page heading */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Records Dashboard
            </h2>
            <p className="mt-2 text-muted-foreground">
              Receive, validate, register, and manage incoming documents.
            </p>
          </div>

          <Button
            onClick={() => navigate("/receive-document")}
          >
            <Plus className="mr-2 size-4" />
            Receive Document
          </Button>
        </section>

        {/* Record statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="size-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  <div className="text-3xl font-bold">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Record management actions */}
        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">
              Record Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Access the main functions of the records section.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="rounded-lg bg-primary/10 p-3">
                  <ClipboardList className="size-6 text-primary" />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">
                    Incoming Submissions
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Review newly received documents from all channels.
                  </p>

                  <Button
                    variant="link"
                    className="mt-2 h-auto px-0"
                    onClick={() => navigate("/records/incoming")}
                  >
                    View submissions
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="size-6 text-primary" />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">
                    Official Records
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Search and manage officially registered documents.
                  </p>

                  <Button
                    variant="link"
                    className="mt-2 h-auto px-0"
                    onClick={() => navigate("/documents")}
                  >
                    View records
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Search className="size-6 text-primary" />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">
                    Find a Record
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Locate documents using their reference number or title.
                  </p>

                  <Button
                    variant="link"
                    className="mt-2 h-auto px-0"
                    onClick={() => navigate("/documents")}
                  >
                    Search records
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Records workflow reminder */}
        <Card>
          <CardHeader>
            <CardTitle>Records Processing Workflow</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Receive",
                  description: "Accept documents from supported channels.",
                },
                {
                  step: "02",
                  title: "Validate",
                  description: "Check completeness and document details.",
                },
                {
                  step: "03",
                  title: "Register",
                  description: "Assign an official record reference when approved.",
                },
                {
                  step: "04",
                  title: "Track",
                  description: "Monitor status and forward records as required.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-lg border p-4"
                >
                  <p className="text-sm font-semibold text-primary">
                    STEP {item.step}
                  </p>
                  <h4 className="mt-2 font-semibold">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
