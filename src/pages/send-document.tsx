
import GlobalDocumentForm from "@/components/forms/global_form";

export default function SendDocumentPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Send Document
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Submit a document and specify the offices responsible for
            receiving and processing it.
          </p>
        </div>

        <GlobalDocumentForm />
      </div>
    </div>
  );
}
