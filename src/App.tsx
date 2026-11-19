
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/auth/login";
import Signup from "@/auth/signup";

import Dashboard from "@/pages/dashboard";
import ClientDashboard from "@/pages/client-dashboard";
import ReceiveDocument from "@/pages/receive-document";
import IncomingSubmissions from "@/pages/incoming-submissions";
import ReviewDocuments from "@/pages/review-documents";
import ScanDocument from "@/pages/scan-document";
import DocumentTracking from "@/pages/document-tracking";
import DocumentRecords from "@/pages/document-records";
import SendDocumentPage from "@/pages/send-document";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientDashboardLayout from "@/components/dashboard/ClientDashboardLayout";
import ClientSubmitDocument from "@/pages/client-submit-document";
import ClientDocuments from "@/pages/client-documents";
import ClientTracking from "@/pages/client-tracking";

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

          {/* Document Submission */}
          <Route
            path="/receive-document"
            element={<ReceiveDocument />}
          />

          <Route
            path="/employee-online"
            element={<SendDocumentPage />}
          />

          {/* Incoming Documents */}
          <Route
            path="/records/incoming"
            element={<IncomingSubmissions />}
          />

          {/* Document Management */}
          <Route
            path="/documents/records"
            element={<DocumentRecords />}
          />

          <Route
            path="/documents/received"
            element={<ReviewDocuments />}
          />

          <Route
            path="/documents/tracking"
            element={<DocumentTracking />}
          />

          {/* QR Scanner */}
          <Route
            path="/scan-document"
            element={<ScanDocument />}
          />
        </Route>

        {/* Separate client portal */}
        <Route element={<ClientDashboardLayout />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route
            path="/client/submit-document"
            element={<ClientSubmitDocument />}
          />
          <Route path="/client/documents" element={<ClientDocuments />} />
          <Route path="/client/tracking" element={<ClientTracking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
