"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User } from "lucide-react";

function NavPrivate({TitlePage, username, email }) {
  return (
    <header className="bg-[#030712] border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{TitlePage}</h1>
        <div className="flex items-center space-x-4 ">
          {/* <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{username || "Usuario"}</p>
                <p className="text-xs leading-none text-muted-foreground">{email || "user@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurar</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/responsible/login">
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default NavPrivate;
