
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/auth/login";
import Signup from "@/auth/signup";

import Dashboard from "@/pages/dashboard";
import ReceiveDocument from "@/pages/receive-document";
import IncomingSubmissions from "@/pages/incoming-submissions";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GuestOnlineForm from "@/components/forms/GuestOnline_form";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard layout with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/receive-document"
            element={<ReceiveDocument />}
          />
          <Route
            path="/records/incoming"
            element={<IncomingSubmissions />}
          />
        </Route>

        {/* Public guest form */}
        <Route
          path="/guest-online"
          element={
            <main className="min-h-screen bg-muted/40 px-5 py-10 sm:px-10">
              <GuestOnlineForm />
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
