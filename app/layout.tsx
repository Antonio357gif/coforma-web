import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./components/SiteShell";
import CookieNotice from "./components/CookieNotice";
import { siteUrl } from "./data/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: { default: "Coforma | CRM Integral FPE para academias", template: "%s | Coforma" },
  description:
    "Plataforma integral para la gestión de formación, alumnado y convocatorias FPE.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased`}>
        <SiteHeader />
        <main className="grow">{children}</main>
        <SiteFooter />
        <CookieNotice />
      </body>
    </html>
  );
}