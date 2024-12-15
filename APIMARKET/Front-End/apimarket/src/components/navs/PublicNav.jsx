"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

function PublicNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#030712] backdrop-blur supports-[backdrop-filter]:bg-[#030712]">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 ml-4 flex items-center space-x-2">
            <img
              className="imag"
              src="/assets/img/apimar.png"
              alt="Apimarket"
              width="70"
              height="70"
            />
          </Link>

          <nav className="flex items-center space-x-6 text-white font-medium">
            <Link href="/we"> Quienes Somos</Link>
            <Link href="/contact">Contacto</Link>
            <Link href="/documentation">Documentación</Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6 ml-3" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-white">
            <SheetTitle className="text-left mb-4">Menú</SheetTitle>
            <nav className="flex flex-col gap-4">
              <Link href="/">Inicio</Link>
              <Link href="/we">Acerca de</Link>
              <Link href="/contact">Contacto</Link>
              <Link href="/documentation">Documentación</Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality if needed */}
          </div>
          <nav className="flex items-center">
            <Button asChild className="bg-[#e87204] hover:bg-transparent hover:text-white border hover:border-[#e87204]">
              <Link href="/responsible/login">Iniciar Sesión</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default PublicNav;
