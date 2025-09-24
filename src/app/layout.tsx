// src/app/layout.tsx
import type { Metadata } from "next";
// 1. Importa Lora junto a Inter
import { Inter, Lora } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/ui/header";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// 2. Configura ambas fuentes
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], weight: "600", variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Brinf Music Journal",
  description: "Un diario musical generado por IA con Last.fm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Aplica las variables de las fuentes al body
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <div className="fixed bottom-4 right-4">
              <ThemeToggle />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}