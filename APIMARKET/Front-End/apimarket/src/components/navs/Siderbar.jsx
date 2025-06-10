"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Hexagon,
  Home,
  Users,
  Droplet,
  FlaskRoundIcon as Flask,
  Clipboard,
  Flower,
  Eye,
  PenToolIcon as Tool,
  Bug,
  Sprout,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/app/context/authContext";

function Siderbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Inicio" },
    { href: "/dashboard/hive", icon: Hexagon, label: "Colmena" },
    { href: "/dashboard/production", icon: Droplet, label: "Producción" },
    { href: "/dashboard/recolection", icon: Flask, label: "Recoleción Miel" },
    { href: "/dashboard/protocol", icon: Clipboard, label: "Protocolo" },
    { href: "/dashboard/feeding", icon: Flower, label: "Alimentación" },
    { href: "/dashboard/review", icon: Eye, label: "Revisión" },
    { href: "/dashboard/implement", icon: Tool, label: "Implemento" },
    { href: "/dashboard/race", icon: Bug, label: "Raza" },
    { href: "/dashboard/insemination", icon: Sprout, label: "inseminación" },
  ];

  // Agrega el ítem "Responsable" solo si el rol es instructor o pasante
  if (user?.rol === "instructor" || user?.rol === "pasante") {
    menuItems.push({
      href: "/dashboard/responsable",
      icon: Users,
      label: "Responsable",
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-[#030712] text-white transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className={cn(
        "flex items-center h-16 border-b border-gray-200",
        isOpen ? "justify-between px-2" : "justify-center"
      )}>
        {isOpen && (
          <div className="flex items-center flex-1 min-w-0">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 mr-2 flex-shrink-0"
              src="/icon.png"
              alt="ApiMarket Logo"
            />
            <span className="text-lg sm:text-2xl font-semibold text-white truncate">
              APIMARKET
            </span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:text-[#e87204] focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:ring-offset-2 flex-shrink-0"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out",
                  "text-white hover:text-[#e87204] hover:bg-white",
                  "focus:outline-none focus:ring-2 focus:ring-[#e87204] focus:ring-offset-2",
                  "border border-transparent hover:border-[#e87204]",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 text-gray-400 group-hover:text-[#e87204] hover:text-[#e87204]",
                    isOpen && "mr-3"
                  )}
                />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Siderbar;
