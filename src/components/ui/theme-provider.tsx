// src/components/ui/theme-provider.tsx
"use client"

import * as React from "react"
// Corregimos la importación para que venga del paquete principal
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}