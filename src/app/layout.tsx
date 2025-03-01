import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider"
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-provider";
import { toast } from 'sonner';
import { Toaster } from "@/components/ui/sonner"
const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fuzzie",
  description: "Automate Your Work With Fuzzie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider
  publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABL_KEY}
  >
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
           <ModalProvider> 
            {children}
            <Toaster/>
           </ModalProvider>
      </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  );
}
