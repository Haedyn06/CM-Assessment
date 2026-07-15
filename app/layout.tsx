import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { DemoFormProvider } from "@/components/ui/DemoForm";
import "./globals.css";
import "@/styles/FillButton.css";

const geistSans = Geist({
  variable: "--fontGeistSans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--fontGeistMono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bear",
  description: "Digital teammates for enterprise operators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/sign-in"
        >
          <DemoFormProvider>{children}</DemoFormProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
