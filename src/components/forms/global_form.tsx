
import { useState, type FormEvent } from "react";
import {
  Plus,
  Trash2,
  FileText,
  Building2,
  Send,
} from "lucide-react";

const inputClass =
  "w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50";

type ReceivingOffice = {
  id: string;
  office: string;
  action: string;
  instructions: string;
};

type IntakeForm = {
  date: string;
  trackingNo: string;
  clientName: string;
  cellphoneNo: string;
  schoolOthers: string;
  docType: string;
  subjectDetails: string;
};

const makeInitialForm = (): IntakeForm => ({
  date: new Date().toLocaleDateString("en-CA"),
  trackingNo: "",
  clientName: "",
  cellphoneNo: "",
  schoolOthers: "",
  docType: "",
  subjectDetails: "",
});

const officeOptions = [
  "ICT OFFICE",
  "Records Office",
  "Office of the Schools Division Superintendent",
  "Administrative Office",
  "Accounting Office",
  "Budget Office",
  "Human Resource Office",
  "Legal Office",
  "Other",
];

const actionOptions = [
  "For Appropriate Action",
  "For Approval",
  "For Review",
  "For Information",
  "For Signature",
  "For Compliance",
  "For Processing",
  "For Filing",
  "For Recommendation",
  "Other",
];

type Employee = {
  id: string;
  name: string;
  department: string;
};

type Props = {
  employee: Employee;
};

export default function EmployeeOnlineForm({ employee }: Props) {
  const [form, setForm] = useState<IntakeForm>(makeInitialForm);

  const [receivingOffices, setReceivingOffices] = useState<
    ReceivingOffice[]
  >([
    {
      id: crypto.randomUUID(),
      office: "ICT OFFICE",
      action: "For Appropriate Action",
      instructions: "",
    },
  ]);

  const [file, setFile] = useState<File | null>(null);

  const update = (field: keyof IntakeForm, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  function updateReceivingOffice(
    id: string,
    field: keyof Omit<ReceivingOffice, "id">,
    value: string
  ) {
    setReceivingOffices((previous) =>
      previous.map((office) =>
        office.id === id
          ? { ...office, [field]: value }
          : office
      )
    );
  }

  function addReceivingOffice() {
    setReceivingOffices((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        office: "",
        action: "For Appropriate Action",
        instructions: "",
      },
    ]);
  }

  function removeReceivingOffice(id: string) {
    if (receivingOffices.length === 1) {
      alert("At least one receiving office is required.");
      return;
    }

    setReceivingOffices((previous) =>
      previous.filter((office) => office.id !== id)
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      alert("Please attach a document.");
      return;
    }

    if (
      receivingOffices.some(
        (office) => !office.office || !office.action
      )
    ) {
      alert("Please complete all receiving office details.");
      return;
    }

    const record = {
      id: crypto.randomUUID(),
      ...form,

      channel: "EMPLOYEE_ONLINE",

      receivedAt: new Date().toISOString(),

      // Automatically enters Document Records
      status: "PENDING",

      // Initial receiving offices and their instructions
      receivingOffices: receivingOffices.map((office) => ({
        ...office,
        status: "PENDING",
        receivedAt: null,
        completedAt: null,
      })),

      submittedBy: employee.id,
      employeeName: employee.name,
      department: employee.department,

      attachment: file.name,

      officialRegistration: false,
    };

    console.log("New Document Record:", record);

    // TODO:
    // Send record and file to your backend API.
    // The backend should save the record in the database.
    // The Document Records page should retrieve it from the API.

    alert(
      "Document successfully submitted and added to Document Records."
    );

    setForm(makeInitialForm());

    setReceivingOffices([
      {
        id: crypto.randomUUID(),
        office: "ICT OFFICE",
        action: "For Appropriate Action",
        instructions: "",
      },
    ]);

    setFile(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-5xl space-y-6 rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm sm:p-7"
    >
      {/* HEADER */}
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          Employee Document Submission
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Submit and route an internal document to the appropriate offices.
        </p>
      </header>

      {/* DOCUMENT INFORMATION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-700" />
          <h3 className="font-semibold">Document Information</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date</label>
            <input
              required
              type="date"
              className={inputClass}
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Tracking No.
            </label>
            <input
              className={inputClass}
              placeholder="Enter tracking number (if assigned)"
              value={form.trackingNo}
              onChange={(e) =>
                update("trackingNo", e.target.value)
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Client Name</label>
            <input
              required
              className={inputClass}
              value={form.clientName}
              onChange={(e) =>
                update("clientName", e.target.value)
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Cellphone No.
            </label>
            <input
              type="tel"
              className={inputClass}
              value={form.cellphoneNo}
              onChange={(e) =>
                update("cellphoneNo", e.target.value)
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              School / Others
            </label>
            <input
              required
              className={inputClass}
              value={form.schoolOthers}
              onChange={(e) =>
                update("schoolOthers", e.target.value)
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Document Type
            </label>
            <select
              required
              className={inputClass}
              value={form.docType}
              onChange={(e) =>
                update("docType", e.target.value)
              }
            >
              <option value="">Select document type</option>
              <option>Letter</option>
              <option>Request</option>
              <option>Application</option>
              <option>Memorandum</option>
              <option>Report</option>
              <option>Referral</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Subject / Details
          </label>
          <textarea
            required
            rows={4}
            className={inputClass}
            value={form.subjectDetails}
            onChange={(e) =>
              update("subjectDetails", e.target.value)
            }
            placeholder="Enter document subject and details..."
          />
        </div>
      </section>

      {/* RECEIVING OFFICES */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-700" />
              <h3 className="font-semibold">
                Document Routing
              </h3>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Specify the offices that need to receive or process this document.
            </p>
          </div>

          <button
            type="button"
            onClick={addReceivingOffice}
            className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Add Office
          </button>
        </div>

        <div className="space-y-4">
          {receivingOffices.map((office, index) => (
            <div
              key={office.id}
              className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">
                  Receiving Office #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeReceivingOffice(office.id)}
                  className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">
                    Receiving Office
                  </label>

                  <select
                    required
                    className={inputClass}
                    value={office.office}
                    onChange={(e) =>
                      updateReceivingOffice(
                        office.id,
                        "office",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select office</option>
                    {officeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">
                    Action Required
                  </label>

                  <select
                    required
                    className={inputClass}
                    value={office.action}
                    onChange={(e) =>
                      updateReceivingOffice(
                        office.id,
                        "action",
                        e.target.value
                      )
                    }
                  >
                    {actionOptions.map((action) => (
                      <option key={action}>{action}</option>
                    ))}
                  </select>
                </div>
              </div>

              {office.office === "Other" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">
                    Specify Office
                  </label>
                  <input
                    required
                    className={inputClass}
                    placeholder="Enter office name"
                    onChange={(e) =>
                      updateReceivingOffice(
                        office.id,
                        "office",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              {office.action === "Other" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">
                    Specify Action
                  </label>
                  <input
                    required
                    className={inputClass}
                    placeholder="Enter required action"
                    onChange={(e) =>
                      updateReceivingOffice(
                        office.id,
                        "action",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Instructions / Remarks
                </label>
                <textarea
                  rows={2}
                  className={inputClass}
                  placeholder="Additional instructions for this office (optional)"
                  value={office.instructions}
                  onChange={(e) =>
                    updateReceivingOffice(
                      office.id,
                      "instructions",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPLOYEE DETAILS */}
      <section className="space-y-3">
        <h3 className="font-semibold">Employee / Department</h3>

        <div className="grid gap-3 sm:grid-cols-3">
          <input
            readOnly
            aria-label="Employee Name"
            className={`${inputClass} bg-slate-50`}
            value={employee.name}
          />
          <input
            readOnly
            aria-label="Employee ID"
            className={`${inputClass} bg-slate-50`}
            value={employee.id}
          />
          <input
            readOnly
            aria-label="Department"
            className={`${inputClass} bg-slate-50`}
            value={employee.department}
          />
        </div>
      </section>

      {/* ATTACHMENT */}
      <section className="space-y-2">
        <label className="block text-sm font-medium">
          Attach Document *
        </label>

        <input
          required
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
          className={inputClass}
          onChange={(event) =>
            setFile(event.target.files?.[0] ?? null)
          }
        />

        {file && (
          <p className="text-sm text-slate-600">
            Selected: {file.name}
          </p>
        )}
      </section>

      {/* SUBMISSION NOTICE */}
      <div className="rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Upon submission, this document will automatically be recorded
        in Document Records with a Pending status. The designated
        receiving offices can then process the document according to
        their assigned actions.
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end border-t border-slate-200 pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <Send className="h-4 w-4" />
          Submit Document
        </button>
      </div>
    </form>
  );
}
