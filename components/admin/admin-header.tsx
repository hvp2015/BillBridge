"use client";

import { User } from "next-auth";
import { Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { signOut } from "next-auth/react";

export function AdminHeader({ user }: { user?: User }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Shield className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline text-muted-foreground">Administration</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="text-sm font-medium hidden sm:block">{user?.name}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
