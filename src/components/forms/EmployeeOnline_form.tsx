import { useState, type FormEvent } from "react";


const inputClass =
  "w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const buttonClass =
  "rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100";

type IntakeForm = {
  date: string;
  trackingNo: string;
  clientName: string;
  cellphoneNo: string;
  option: string;
  schoolId: string;
  schoolOthers: string;
  docType: string;
  subjectDetails: string;
  receivingOffice: string;
  officeDestination: string;
};

const makeInitialForm = (): IntakeForm => ({
  date: new Date().toLocaleDateString("en-CA"),
  trackingNo: "",
  clientName: "",
  cellphoneNo: "",
  option: "Elem.",
  schoolId: "",
  schoolOthers: "",
  docType: "",
  subjectDetails: "",
  receivingOffice: "ICT OFFICE",
  officeDestination: "",
});

type Employee = { id: string; name: string; department: string; };
type Props = { employee: Employee; };

export default function EmployeeOnlineForm({ employee }: Props) {
  const [form, setForm] = useState<IntakeForm>(makeInitialForm);
  const [file, setFile] = useState<File | null>(null);

  const update = (field: keyof IntakeForm, value: string) =>
    setForm((previous) => ({ ...previous, [field]: value }));

  function findSchoolById() {
    if (!form.schoolId.trim()) {
      alert("Enter a School ID first.");
      return;
    }
    alert("School ID lookup is not connected yet. Connect it to your school directory API.");
  }

  function searchSchool() {
    alert("School search is not connected yet. Connect it to a school directory or search dialog.");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      alert("Please attach a document.");
      return;
    }
    const intake = {
      ...form,
      channel: "EMPLOYEE_ONLINE",
      receivedAt: new Date().toISOString(),
      status: "PENDING_REVIEW",
      officialRegistration: false,
      submittedBy: employee.id, employeeName: employee.name, department: employee.department, attachment: file.name,
    };
    console.log("Employee intake:", intake);
    alert("Employee intake recorded.");
    // Connect this intake object and any selected files to your backend API.
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-5 rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm sm:p-7">
      <header className="border-b border-slate-200 pb-4">
        
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Employee Document Submission</h2>
        <p className="mt-1 text-sm text-slate-500">Submit an internal document for intake review.</p>
      </header>

      <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-[150px_minmax(0,1fr)]">
        <label className="self-center text-sm font-medium text-slate-700">Date</label>
        <input aria-label="Date" required type="date" className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} />

        <label className="self-center text-sm font-medium text-slate-700">Tracking No.</label>
        <input aria-label="Tracking Number" className={inputClass} placeholder="Enter tracking number (if assigned)" value={form.trackingNo} onChange={(e) => update("trackingNo", e.target.value)} />

        <label className="self-center text-sm font-medium text-slate-700">Client Name</label>
        <input aria-label="Client Name" required className={inputClass} value={form.clientName} onChange={(e) => update("clientName", e.target.value)} />

        <label className="self-center text-sm font-medium text-slate-700">Cellphone No.</label>
        <input aria-label="Cellphone Number" type="tel" className={inputClass} value={form.cellphoneNo} onChange={(e) => update("cellphoneNo", e.target.value)} />

        <span className="self-center text-sm font-medium text-slate-700">Option</span>
        <fieldset className="flex flex-wrap gap-x-4 gap-y-2">
          {["Elem.", "Sec.", "SDO Base", "Private/Others"].map((option) => (
            <label key={option} className="inline-flex items-center gap-2 text-sm">
              <input type="radio" name="clientOption" value={option} checked={form.option === option} onChange={(e) => update("option", e.target.value)} />
              {option}
            </label>
          ))}
        </fieldset>

        <label className="self-center text-sm font-medium text-slate-700">School ID</label>
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <input aria-label="School ID" className={inputClass} value={form.schoolId} onChange={(e) => update("schoolId", e.target.value)} />
          <button type="button" className={buttonClass} onClick={findSchoolById}>Find ID</button>
          <button type="button" className={buttonClass} onClick={searchSchool}>Search School</button>
        </div>

        <label className="self-center text-sm font-medium text-slate-700">School/Others</label>
        <input aria-label="School or Others" required className={inputClass} value={form.schoolOthers} onChange={(e) => update("schoolOthers", e.target.value)} />

        <label className="self-center text-sm font-medium text-slate-700">Doc. Type</label>
        <select aria-label="Document Type" required className={inputClass} value={form.docType} onChange={(e) => update("docType", e.target.value)}>
          <option value="">Select document type</option>
          <option>Letter</option>
          <option>Request</option>
          <option>Application</option>
          <option>Memorandum</option>
          <option>Report</option>
          <option>Referral</option>
          <option>Other</option>
        </select>

        <label className="self-start pt-2 text-sm font-medium text-slate-700">Subject/Details</label>
        <textarea aria-label="Subject and Details" required rows={4} className={inputClass} value={form.subjectDetails} onChange={(e) => update("subjectDetails", e.target.value)} />

        <label className="self-center text-sm font-medium text-slate-700">Receiving Office</label>
        <select aria-label="Receiving Office" required className={inputClass} value={form.receivingOffice} onChange={(e) => update("receivingOffice", e.target.value)}>
          <option value="">Select receiving office</option>
          <option>ICT OFFICE</option>
          <option>Records Office</option>
          <option>Office of the Schools Division Superintendent</option>
          <option>Administrative Office</option>
          <option>Other</option>
        </select>

        <label className="self-center text-sm font-semibold text-blue-800">OFFICE Destination</label>
        <input aria-label="Office Destination" required className={inputClass} value={form.officeDestination} onChange={(e) => update("officeDestination", e.target.value)} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">Employee / Department</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <input readOnly aria-label="Employee Name" className={`${inputClass} bg-slate-50`} value={employee.name} />
          <input readOnly aria-label="Employee ID" className={`${inputClass} bg-slate-50`} value={employee.id} />
          <input readOnly aria-label="Department" className={`${inputClass} bg-slate-50`} value={employee.department} />
        </div>
        <label className="block space-y-1 text-sm font-medium">Attach Document *
          <input required type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" className={inputClass} onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
        </label>
        {file && <p className="text-sm text-slate-600">Selected: {file.name}</p>}
      </div>
      <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
        This records document intake for review only. It does not perform official registration or approval.
      </p>
      <div className="flex justify-end">
        <button type="submit" className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300">Submit for Intake</button>
      </div>
    </form>
  );
}
