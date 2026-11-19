import { ArrowLeft, FilePlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlobalDocumentForm from "@/components/forms/global_form";

export default function ClientSubmitDocument() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/client-dashboard")}
          aria-label="Back to client dashboard"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <FilePlus2 className="size-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">
              Submit a document
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Send a document to the offices that need to review or process it.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document submission form</CardTitle>
        </CardHeader>
        <CardContent>
          <GlobalDocumentForm />
        </CardContent>
      </Card>
    </div>
  );
}
