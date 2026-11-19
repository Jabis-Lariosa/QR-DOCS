import { Outlet } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";

export default function ClientDashboardLayout() {
  return (
    <div className="min-h-screen bg-muted/30 lg:flex">
      <ClientSidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
