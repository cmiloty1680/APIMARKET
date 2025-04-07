// "use client";

// import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Bell, Settings, LogOut, User } from "lucide-react";

// function NavPrivate({TitlePage}) {
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [lastname, setLastname] = useState("");

//   useEffect(() => {
//     setUserName(localStorage.getItem("username") || "Usuario");
//     setUserEmail(localStorage.getItem("email") || "user@example.com");
//     setLastname(localStorage.getItem("lastname") || "");
//   }, []);

//   function getInitials(name, last) {
//     const firstInitial = name?.trim()?.charAt(0).toUpperCase() || "";
//     const lastInitial = last?.trim()?.charAt(0).toUpperCase() || "";
//     return `${firstInitial}${lastInitial}` || "U";
//   }
  
  
//   return (
//     <header className="bg-[#030712] border-b px-4 py-3">
//       <div className="flex items-center justify-between">
//       <h1 className="text-2xl font-semibold italic font-[Papyrus] text-[#e87204]">{TitlePage}</h1>

//         <div className="flex items-center space-x-4 ">
//           {/* <Button variant="ghost" size="icon">
//             <Bell className="h-5 w-5" />
//           </Button> */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <User className="h-5 w-5" />
//               </Button> */}
//               <Avatar>
//       <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//       <AvatarFallback>{getInitials(userName, lastname)}</AvatarFallback>
//     </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                 <p className="text-sm font-medium leading-none">{userName} {lastname}</p>
//                 <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Configurar</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link href="/responsible/login">
//                   <div className="flex items-center">
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Cerrar sesión
//                   </div>
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default NavPrivate;


// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Bell, Settings, LogOut } from "lucide-react";

// function NavPrivate({ TitlePage }) {
//   const [userName, setUserName] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [userEmail, setUserEmail] = useState("");

//   const [open, setOpen] = useState(false);
//   const [editName, setEditName] = useState("");
//   const [editLastName, setEditLastName] = useState("");

//   useEffect(() => {
//     const name = localStorage.getItem("username") || "Usuario";
//     const last = localStorage.getItem("lastname") || "";
//     const email = localStorage.getItem("email") || "user@example.com";
//     setUserName(name);
//     setLastname(last);
//     setUserEmail(email);
//     setEditName(name);
//     setEditLastName(last);
//   }, []);

//   const handleSave = () => {
//     setUserName(editName);
//     setLastname(editLastName);
//     localStorage.setItem("username", editName);
//     localStorage.setItem("lastname", editLastName);
//     setOpen(false);
//   };

//   function getInitials(name, last) {
//     const firstInitial = name?.trim()?.charAt(0).toUpperCase() || "";
//     const lastInitial = last?.trim()?.charAt(0).toUpperCase() || "";
//     return `${firstInitial}${lastInitial}` || "U";
//   }

//   return (
//     <header className="bg-[#030712] border-b px-4 py-3">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold italic font-[Papyrus] text-[#e87204]">
//           {TitlePage}
//         </h1>

//         <div className="flex items-center space-x-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Avatar>
//                 <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                 <AvatarFallback>{getInitials(userName, lastname)}</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">
//                     {userName} {lastname}
//                   </p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     {userEmail}
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => setOpen(true)}>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Configurar</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link href="/responsible/login">
//                   <div className="flex items-center">
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Cerrar sesión
//                   </div>
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Modal de configuración */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Editar nombre de usuario</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Input
//               placeholder="Nombre"
//               value={editName}
//               onChange={(e) => setEditName(e.target.value)}
//             />
//             <Input
//               placeholder="Apellido"
//               value={editLastName}
//               onChange={(e) => setEditLastName(e.target.value)}
//             />
//           </div>
//           <DialogFooter>
//             <Button onClick={handleSave}>Guardar</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </header>
//   );
// }

// export default NavPrivate;
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
import { Settings, LogOut } from "lucide-react";

function NavPrivate({ TitlePage }) {
  const [userName, setUserName] = useState("");
  const [lastname, setLastname] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");

  const capitalizeFirst = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const rawName = localStorage.getItem("username") || "Usuario";
    const rawLast = localStorage.getItem("lastname") || "";
    const email = localStorage.getItem("email") || "user@example.com";

    const name = capitalizeFirst(rawName);
    const last = capitalizeFirst(rawLast);

    const full = localStorage.getItem("fullName") || `${name} ${last}`;

    setUserName(name);
    setLastname(last);
    setUserEmail(email);
    setEditName(name);
    setEditLastName(last);

    localStorage.setItem("fullName", full);
  }, []);

  const handleSave = () => {
    const fullName = localStorage.getItem("fullName")?.toLowerCase() || "";
    const combined = `${editName} ${editLastName}`.toLowerCase().trim();

    const allowedParts = fullName.split(" ").filter(Boolean);
    const inputParts = combined.split(" ").filter(Boolean);

    const isValid = inputParts.every((word) => allowedParts.includes(word));

    if (!editName.trim() || !editLastName.trim()) {
      alert("❌ El nombre y el apellido no pueden estar vacíos.");
      return;
    }

    if (!isValid) {
      alert("❌ Solo puedes usar partes de tu nombre completo original.");
      return;
    }

    const formattedName = capitalizeFirst(editName);
    const formattedLastName = capitalizeFirst(editLastName);

    setUserName(formattedName);
    setLastname(formattedLastName);
    localStorage.setItem("username", formattedName);
    localStorage.setItem("lastname", formattedLastName);
    setOpen(false);
  };

  function getInitials(name, last) {
    const firstInitial = name?.trim()?.charAt(0).toUpperCase() || "";
    const lastInitial = last?.trim()?.charAt(0).toUpperCase() || "";
    return `${firstInitial}${lastInitial}` || "U";
  }

  return (
    <header className="bg-[#030712] border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold italic font-[Papyrus] text-[#e87204]">
          {TitlePage}
        </h1>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>{getInitials(userName, lastname)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userName} {lastname}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar nombre de usuario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nombre"
              value={editName}
              onChange={(e) => setEditName(capitalizeFirst(e.target.value))}
            />
            <Input
              placeholder="Apellido"
              value={editLastName}
              onChange={(e) => setEditLastName(capitalizeFirst(e.target.value))}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default NavPrivate;
