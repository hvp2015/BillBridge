"use client";

import { User } from "next-auth";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/sidebar-context";
import { TopNavigation } from "./top-navigation";
import { ModeToggle } from "./mode-toggle";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function Header({ user }: { user?: User }) {
  const { toggleSidebar } = useSidebar();
  const { data: session } = useSession();
  const displayName = session?.user?.name || user?.name || "User";
  const username = (session?.user as any)?.username || "";
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 justify-between flex-shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="outline" size="icon" className="md:hidden shrink-0" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <div className="hidden md:block flex-1">
          <TopNavigation />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-3">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="text-sm font-medium">{displayName}</div>
              {username && <div className="text-xs text-muted-foreground">@{username}</div>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
