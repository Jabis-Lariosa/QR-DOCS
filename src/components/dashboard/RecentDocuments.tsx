
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { recentDocuments } from "@/components/data/dashboard-data";
import StatusBadge from "./StatusBadge";

export default function RecentDocuments() {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Recent Documents</h3>
          <p className="text-sm text-muted-foreground">
            Recently registered documents and their statuses.
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => navigate("/documents")}
        >
          View all documents
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>

      <Card className="min-w-0 overflow-hidden">
        <CardHeader className="sr-only">
          <CardTitle>Recent document records</CardTitle>
          <CardDescription>
            Reference numbers, subjects, departments, dates, and statuses.
          </CardDescription>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Reference No.</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentDocuments.map((document) => (
                <tr
                  key={document.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium">
                    {document.id}
                  </td>
                  <td className="max-w-64 px-4 py-4">
                    <span className="line-clamp-2">
                      {document.subject}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {document.department}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                    {document.date}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={document.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
