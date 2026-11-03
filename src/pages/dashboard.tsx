
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import DashboardStats from "@/components/dashboard/DashboardStats";
import DocumentAnalytics from "@/components/dashboard/DocumentAnalytics";
import PendingActions from "@/components/dashboard/PendingActions";
import RecentDocuments from "@/components/dashboard/RecentDocuments";
import DepartmentActivity from "@/components/dashboard/DepartmentActivity";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DocumentManagement from "@/components/dashboard/DocumentManagement";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full min-w-0 space-y-8">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Records Dashboard
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Monitor documents, outgoing transfers, pending actions,
            and records processing activity.
          </p>
        </div>

        <Button
          className="w-full shrink-0 sm:w-auto"
          onClick={() => navigate("/receive-document")}
        >
          <Plus className="mr-2 size-4" />
          Receive Document
        </Button>
      </section>

      {/* Dashboard overview */}
      <DashboardStats />

      {/* Analytics */}
      <DocumentAnalytics />

      {/* Pending document actions */}
      <PendingActions />

      {/* Recent documents */}
      <RecentDocuments />

      {/* Department and system activity */}
      <section className="grid min-w-0 gap-4 xl:grid-cols-2">
        <DepartmentActivity />
        <RecentActivity />
      </section>

      {/* Document management */}
      <DocumentManagement />

      {/* Footer */}
      <footer className="border-t py-4">
        <p className="text-center text-xs text-muted-foreground">
          Document Management System · Records Section
        </p>
      </footer>
    </div>
  );
}
