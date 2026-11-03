
import {
  ArrowRight,
  ClipboardList,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { workflow } from "@/components/data/dashboard-data";

const icons = [ClipboardList, Clock, CheckCircle2, FileText];

export default function ProcessingWorkflow() {
  return (
    <Card className="w-full min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Records Processing Workflow</CardTitle>
        <CardDescription className="hidden sm:block">
          Follow each stage of document processing.
        </CardDescription>
      </CardHeader>

      <CardContent className="min-w-0">
        <div className="overflow-x-auto pb-2 sm:overflow-x-visible">
          <div className="flex w-max items-center gap-2 sm:w-full">
            {workflow.map((item, index) => {
              const Icon = icons[index];

              return (
                <div
                  key={item.step}
                  className="flex w-24 shrink-0 items-center gap-2 sm:w-auto sm:min-w-0 sm:flex-1"
                >
                  <div className="flex min-h-24 w-full min-w-0 flex-col items-center justify-center rounded-xl border bg-card p-2 transition-colors hover:border-primary/50 hover:bg-muted/50 sm:min-h-40 sm:flex-1 sm:p-4">
                    <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-primary/10 sm:size-10">
                      <Icon className="size-4 text-primary sm:size-5" />
                    </div>

                    <p className="text-[10px] font-semibold uppercase text-muted-foreground sm:text-xs">
                      Step {item.step}
                    </p>

                    <h4 className="mt-1 text-center text-xs font-semibold sm:text-sm">
                      {item.title}
                    </h4>

                    <p className="mt-2 hidden text-center text-xs text-muted-foreground sm:block">
                      {item.description}
                    </p>
                  </div>

                  {index < workflow.length - 1 && (
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
