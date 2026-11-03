
const statusStyles: Record<string, string> = {
  Received:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Pending:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "In Transit":
    "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Overdue:
    "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}
