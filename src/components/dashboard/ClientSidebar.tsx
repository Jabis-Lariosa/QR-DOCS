import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FilePlus2,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  RefreshCw,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { title: "Overview", url: "/client-dashboard", icon: LayoutDashboard },
  { title: "My Documents", url: "/client/documents", icon: FileText },
  { title: "Track Documents", url: "/client/tracking", icon: RefreshCw },
  { title: "Submit Document", url: "/client/submit-document", icon: FilePlus2 },
];

export default function ClientSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const content = (
    <>
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <FileText className="size-5" />
        </div>
        <div>
          <p className="text-sm font-bold">DocuFlow</p>
          <p className="text-xs text-muted-foreground">Client portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          My workspace
        </p>
        {navigation.map(({ title, url, icon: Icon }) => (
          <NavLink
            key={url}
            to={url}
            end={url === "/client-dashboard"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )
            }
          >
            <Icon className="size-5" />
            {title}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-3">
        <div className="mb-2 flex items-center gap-3 rounded-lg p-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-muted">
            <UserRound className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Juan Dela Cruz</p>
            <p className="truncate text-xs text-muted-foreground">Client</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => navigate("/login")}
        >
          <LogOut className="mr-2 size-4" />
          Sign out
        </Button>
      </div>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Open client navigation"
        >
          <Menu className="size-5" />
        </Button>
        <FileText className="size-5 text-primary" />
        <span className="font-semibold">Client portal</span>
      </header>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close client navigation"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r bg-background lg:sticky lg:top-0 lg:flex">
        {content}
      </aside>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background shadow-xl transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-3 z-10"
          onClick={() => setMobileOpen(false)}
          aria-label="Close client navigation"
        >
          <X className="size-5" />
        </Button>
        {content}
      </aside>
    </>
  );
}
