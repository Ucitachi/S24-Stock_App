"use client";

import { ThemeProvider } from "next-themes";
import { TokenProvider } from "./TokenContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <TokenProvider>
      {children}
      </TokenProvider>
    </ThemeProvider>
  );
}
