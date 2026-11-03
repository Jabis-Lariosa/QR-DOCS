
import { ArrowRight, ClipboardList, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const shortcuts = [
  {
    title: "Incoming Submissions",
    description:
      "Review newly received documents and pending records.",
    icon: ClipboardList,
    route: "/records/incoming",
    action: "View submissions",
  },
  {
    title: "All Documents",
    description:
      "Search document records and review their processing history.",
    icon: FileText,
    route: "/documents",
    action: "View all documents",
  },
];

export default function DocumentManagement() {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">Document Management</h3>
        <p className="text-sm text-muted-foreground">
          Access your document records and receiving queue.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {shortcuts.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="flex items-start gap-4 p-5">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Icon className="size-6 text-primary" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <Button
                    variant="link"
                    className="mt-2 h-auto px-0"
                    onClick={() => navigate(item.route)}
                  >
                    {item.action}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
