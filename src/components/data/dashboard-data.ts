
import {
  FileText,
  Clock,
  AlertCircle,
  Inbox,
  ClipboardList,
} from "lucide-react";

export const stats = [
  {
    title: "Total Documents",
    value: "128",
    description: "Registered document records",
    icon: FileText,
    trend: "+12.5%",
    positive: true,
  },
  {
    title: "Pending Acknowledgment",
    value: "24",
    description: "Awaiting recipient confirmation",
    icon: Clock,
    trend: "Needs attention",
    positive: false,
  },
  {
    title: "In Transit",
    value: "17",
    description: "Documents sent to other offices",
    icon: Inbox,
    trend: "In progress",
    positive: true,
  },
  {
    title: "Overdue",
    value: "5",
    description: "Past the expected receipt deadline",
    icon: AlertCircle,
    trend: "Needs review",
    positive: false,
  },
];

export const workflow = [
  {
    step: "01",
    title: "Receive",
    description: "Accept documents from supported channels.",
  },
  {
    step: "02",
    title: "Validate",
    description: "Check completeness and document details.",
  },
  {
    step: "03",
    title: "Register",
    description: "Assign an official document reference.",
  },
  {
    step: "04",
    title: "Track",
    description: "Monitor transfers and receipt confirmations.",
  },
];

export const weeklyActivity = [
  { day: "Mon", received: 18, sent: 12 },
  { day: "Tue", received: 24, sent: 16 },
  { day: "Wed", received: 15, sent: 11 },
  { day: "Thu", received: 28, sent: 20 },
  { day: "Fri", received: 21, sent: 14 },
  { day: "Sat", received: 9, sent: 5 },
  { day: "Sun", received: 6, sent: 3 },
];

export const documentStatuses = [
  { label: "Received", count: 52, color: "bg-emerald-500" },
  { label: "In Transit", count: 17, color: "bg-blue-500" },
  {
    label: "Pending Acknowledgment",
    count: 24,
    color: "bg-amber-500",
  },
  {
    label: "Under Processing",
    count: 30,
    color: "bg-violet-500",
  },
  { label: "Overdue", count: 5, color: "bg-red-500" },
];

export const pendingActions = [
  {
    title: "Pending receipt confirmation",
    description: "Documents sent to other departments",
    count: 24,
    icon: Inbox,
    color: "text-amber-600",
    background: "bg-amber-500/10",
    route: "/records/incoming",
  },
  {
    title: "Overdue documents",
    description: "Transfers past their expected deadline",
    count: 5,
    icon: AlertCircle,
    color: "text-red-600",
    background: "bg-red-500/10",
    route: "/records/incoming",
  },
  {
    title: "Documents requiring validation",
    description: "Records awaiting completeness checks",
    count: 12,
    icon: ClipboardList,
    color: "text-blue-600",
    background: "bg-blue-500/10",
    route: "/records/incoming",
  },
];

export const recentDocuments = [
  {
    id: "DOC-2026-0142",
    subject: "Request for Office Supplies",
    department: "Procurement Department",
    date: "Oct 28, 2026",
    status: "Pending",
  },
  {
    id: "DOC-2026-0141",
    subject: "Monthly Accomplishment Report",
    department: "Administrative Department",
    date: "Oct 28, 2026",
    status: "Received",
  },
  {
    id: "DOC-2026-0140",
    subject: "Request for Document Certification",
    department: "Records Office",
    date: "Oct 27, 2026",
    status: "In Transit",
  },
  {
    id: "DOC-2026-0139",
    subject: "Memorandum for Compliance",
    department: "Finance Department",
    date: "Oct 27, 2026",
    status: "Overdue",
  },
];

export const departmentActivity = [
  { name: "Administrative", received: 42, sent: 31 },
  { name: "Finance", received: 35, sent: 27 },
  { name: "Procurement", received: 28, sent: 34 },
  { name: "Records Office", received: 23, sent: 36 },
];

export const activities = [
  {
    title: "Document received",
    description: "DOC-2026-0141 was acknowledged.",
    time: "10 minutes ago",
    type: "received",
  },
  {
    title: "Document dispatched",
    description: "DOC-2026-0142 was sent to Procurement.",
    time: "35 minutes ago",
    type: "sent",
  },
  {
    title: "Validation required",
    description: "A document was flagged for review.",
    time: "1 hour ago",
    type: "warning",
  },
];
