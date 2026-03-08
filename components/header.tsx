"use client";

import { User } from "next-auth";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/sidebar-context";
import { TopNavigation } from "./top-navigation";
import { ModeToggle } from "./mode-toggle";

export function Header({ user }: { user?: User }) {
  const { toggleSidebar } = useSidebar();
  
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
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="text-sm font-medium hidden sm:block">{user?.email}</div>
      </div>
    </header>
  );
}
