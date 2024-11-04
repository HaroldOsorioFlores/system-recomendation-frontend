"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, MenuIcon, ClipboardList, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth.store";
import { isTokenExpired } from "@/lib/utils";
import { Label } from "./ui/label";

const pages = [
  { name: "Inicio", icon: Home, path: "/recomendacion" },
  { name: "Historial", icon: ClipboardList, path: "/historial" },
  //   { name: "Configuración", icon: Settings },
  //   { name: "Profile", icon: User },
  // { name: "Feedback", icon: HelpCircle, path: "/feedback" },
];

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { email, logout, token, exp } = useAuthStore();

  React.useEffect(() => {
    console.log({ token });
    if (token) {
      if (exp !== null && isTokenExpired(exp)) {
        logout();
        router.push("/");
      }
    }

    // if (!token) router.push("/");
  }, [token, exp, logout, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar para pantallas grandes */}
      <aside
        className={`hidden md:flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } border-r`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <MenuIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <nav className="px-2 flex flex-col justify-between h-full  pb-10">
            <div className="space-y-2 ">
              {pages.map((page) => (
                <Button
                  key={page.name}
                  variant="ghost"
                  onClick={() => router.push(page.path)}
                  className={`w-full justify-start ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <page.icon className="h-4 w-4" />
                  {isOpen && <span className="ml-2">{page.name}</span>}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`w-full justify-start ${
                isOpen ? "" : "justify-center"
              }`}
            >
              <LogOut className="h-4 w-4" />
              {isOpen && <span className="ml-2">Salir</span>}
            </Button>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header de usuario */}
        <header className="border-b p-4 flex justify-between items-center bg-background h-[73px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="h-full flex flex-col">
                <div className="p-4 flex-1 justify-between">
                  <nav className="space-y-2 py-7">
                    {pages.map((page) => (
                      <Button
                        key={page.name}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => router.push(page.path)}
                      >
                        <page.icon className="h-4 w-4 mr-2" />
                        {page.name}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className={`w-full justify-start ${
                        isOpen ? "" : "justify-center"
                      }`}
                    >
                      <LogOut className="h-4 w-4" />
                      {isOpen && <span className="ml-2">Salir</span>}
                    </Button>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex justify-between gap-4">
            <Label className="pl-4 text-xl font-bold">RecFoodCato</Label>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{email}</span>
              {/* <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar> */}
            </div>
          </div>
        </header>

        {/* Área de contenido */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
