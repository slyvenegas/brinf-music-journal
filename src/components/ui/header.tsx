// src/components/ui/header.tsx
import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { Github } from 'lucide-react';
import { Button } from "./button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* --- CAMBIO AQUÍ: Quitamos 'container' y añadimos padding explícito 'px-6' --- */}
      <div className="flex h-14 items-center px-6">
        
        {/* GRUPO IZQUIERDA: Título */}
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Sly Last.fm Blog</span>
          </Link>
        </div>
        
        {/* GRUPO DERECHA: Usamos ml-auto para empujar este grupo a la derecha */}
        <div className="flex flex-1 items-center justify-end space-x-4 ml-auto">
          <NavLinks />
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" size="icon">
              <Link href="https://github.com/slyvenegas/brinf-music-journal" target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>

      </div>
    </header>
  );
}