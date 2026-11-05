
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Archive,
  Building2,
  ChevronLeft,
  ChevronRight,
  FilePlus2,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Send,
  UserRound,
  X,
  Landmark,
  ShieldCheck,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Review Documents",
    url: "/documents/received",
    icon: Inbox,
  },
  {
    title: "Document Records",
    url: "/documents/records",
    icon: Archive,
  },
  {
  title: "Send Document",
  url: "/employee-online",
  icon: Send,
},
{
  title: "Validate Documents",
  url: "/documents/validation",
  icon: ShieldCheck,
}
];

interface AppSidebarProps {
  departmentName?: string;
  userName?: string;
  onLogout?: () => void;
}

export default function AppSidebar({
  departmentName = "Government Office",
  userName = "Department User",
  onLogout,
}: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    // Replace with your authentication logout logic.
    navigate("/login");
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center gap-3 px-4",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Landmark className="size-5" />
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold tracking-tight">
              DocuFlow
            </h2>
            <p className="truncate text-xs text-muted-foreground">
              Document Management
            </p>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden size-8 shrink-0 lg:flex"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <div className="flex-1 space-y-5 overflow-y-auto p-3">
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
          )}

          {navigation.map(({ title, url, icon: Icon }) => (
            <NavLink
              key={url}
              to={url}
              end={url === "/dashboard"}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? title : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground",
                  collapsed && "justify-center px-2"
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              {!collapsed && <span className="truncate">{title}</span>}
            </NavLink>
          ))}
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Organization
            </p>
          )}

          <button
            type="button"
            title={collapsed ? "My Department" : undefined}
            onClick={() => {
              setMobileOpen(false);
              navigate("/department");
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center px-2"
            )}
          >
            <Building2 className="size-5 shrink-0" />
            {!collapsed && <span className="truncate">My Department</span>}
          </button>
        </div>
      </div>

      <Separator />

      {/* Account */}
      <div className="shrink-0 p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "h-auto w-full justify-start gap-3 p-2",
                collapsed && "justify-center"
              )}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                <UserRound className="size-5" />
              </div>

              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-medium">
                      {userName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {departmentName}
                    </p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={collapsed ? "right" : "top"}
            align="end"
            className="w-56"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <UserRound className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/department")}>
              <Building2 className="mr-2 size-4" />
              My Department
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>

        <Landmark className="size-5 text-primary" />
        <span className="font-semibold">DocuFlow</span>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden h-screen shrink-0 flex-col border-r bg-background transition-[width] duration-200 lg:sticky lg:top-0 lg:flex",
          collapsed ? "lg:w-[72px]" : "lg:w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background shadow-xl transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute right-2 top-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </Button>
        </div>

        {sidebarContent}
      </aside>
    </>
  );
}
