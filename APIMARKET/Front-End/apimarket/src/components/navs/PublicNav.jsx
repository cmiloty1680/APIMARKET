"use client";

import React from "react";
import Link from "next/link";
import { Menu, Users, Mail, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

function PublicNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#030712] backdrop-blur supports-[backdrop-filter]:bg-[#030712]">
      <div className="container flex h-20 items-center justify-between flex-wrap max-w-full overflow-hidden">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 ml-4 flex items-center space-x-2">
          
            <Image
              className="imag"
              src="/assets/img/apimar.png"
              alt="Apimarket"
              width="70"
              height="70"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-white font-medium flex-wrap justify-center gap-x-4">
            <Link href="/we" className="whitespace-nowrap flex items-center gap-2">
              <Users className="w-5 h-5" /> Quienes Somos
            </Link>
            <Link href="/contact" className="whitespace-nowrap flex items-center gap-2">
              <Mail className="w-5 h-5" /> Contacto
            </Link>
            <Link href="/documentation" className="whitespace-nowrap flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Documentación
            </Link>
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
              <Link href="/we">Quienes Somos</Link>
              <Link href="/contact">Contacto</Link>
              <Link href="/documentation">Documentación</Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center flex-shrink-0">
          <nav className="flex items-center">
            <Button asChild className="bg-[#e87204] hover:bg-transparent hover:text-white border hover:border-[#e87204] mr-8">
              <Link href="/responsible/login">Iniciar Sesión</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default PublicNav;
