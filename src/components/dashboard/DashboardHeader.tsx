
import {
  LayoutDashboard,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-lg bg-primary/10 p-2">
            <LayoutDashboard className="size-6 text-primary" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold sm:text-xl">
              Document Management System
            </h1>
            <p className="text-xs text-muted-foreground">
              Records Section
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account menu"
              className="rounded-full"
            >
              <CircleUserRound className="size-6" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => navigate("/login", { replace: true })}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
