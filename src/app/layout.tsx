import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Remind Me" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(inter.className, "dark")}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="dark:bg-black">
        <ClerkProvider>
          <ThemeProvider>
            <div className="flex min-h-screen w-full flex-col items-center">
              <Navbar />
              <main className="dark:bg-neutral-950 flex flex-grow pt-6 w-full justify-center">
                {children}
              </main>
              <Toaster />
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
