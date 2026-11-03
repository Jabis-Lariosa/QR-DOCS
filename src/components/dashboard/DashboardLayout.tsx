
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-muted/30 lg:flex">
      <AppSidebar
        userName="Juan Dela Cruz"
        departmentName="Records Department"
      />

      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
