
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Settings, LogOut, Shield, User } from "lucide-react";
import { useAuth } from "@/app/context/authContext";

function NavPrivate({ TitlePage, Icon }) {
  const [userName, setUserName] = useState("");
  const [lastname, setLastname] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const { user, logout } = useAuth();


  const handleSave = () => {
    const fullName = localStorage.getItem("fullName")?.toLowerCase() || "";
    const combined = `${editName} ${editLastName}`.toLowerCase().trim();

    const allowedParts = fullName.split(" ").filter(Boolean);
    const inputParts = combined.split(" ").filter(Boolean);

    const isValid = inputParts.every((word) => allowedParts.includes(word));

  };

  function getInitials(name, last) {
    const firstInitial = name?.trim()?.charAt(0).toUpperCase() || "";
    const lastInitial = last?.trim()?.charAt(0).toUpperCase() || "";
    return `${firstInitial}${lastInitial}` || "U";
  }

  // console.log("USER EN NAVPRIVATE:", user, "mira chat");

  return (
    <header className="bg-[#030712] border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-2xl font-semibold italic font-[Papyrus] text-[#e87204]">
          {TitlePage}
          {Icon && <span className="mr-2 ml-2">{Icon}</span>} {/* Para dar espacio entre el ícono y el título */}
        </h1>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-0 overflow-hidden" align="end" forceMount>
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="text-lg bg-white/20 text-white">
                      {user ? user.username.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-base font-semibold text-white">{user ? user.username : "Usuario"}</p>
                    <p className="text-xs text-white/80">{user ? user.email : "userApi@gmail.com"}</p>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-white">
                <div className="px-2 py-1.5 mb-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Información de cuenta</p>
                </div>

                <DropdownMenuItem className="p-2 cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Rol</p>
                      <p className="text-xs text-muted-foreground">{user ? user.rol : "..."}</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-2 cursor-default">
                  <Link href="/dashboard">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Panel de control</p>
                        <p className="text-xs text-muted-foreground">Centro de monitoreo</p>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-2 cursor-default">
                  <Link href="/dashboard/settings-responsible">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ver información de cuenta</p>
                        <p className="text-xs text-muted-foreground">Configuración de perfil</p>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>


                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem asChild className="p-2">
                  <Link href="/responsible/login" onClick={logout}>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <LogOut className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cerrar sesión</p>
                        <p className="text-xs text-muted-foreground">Salir de la aplicación</p>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </div>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>


    </header>
  );
}

export default NavPrivate;
