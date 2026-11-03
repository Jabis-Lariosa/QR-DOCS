
import EmployeeOnlineForm from "@/components/forms/EmployeeOnline_form";

export default function SendDocumentPage() {
  // Temporary data. Replace with the authenticated employee's details.
  const employee = {
    id: "EMP-001",
    name: "Department Employee",
    department: "ICT OFFICE",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <EmployeeOnlineForm employee={employee} />
      </div>
    </div>
  );
}
