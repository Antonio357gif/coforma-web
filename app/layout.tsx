import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./components/SiteShell";
import CookieNotice from "./components/CookieNotice";
import { SiteShare } from "./components/SharePage";
import { publicPagePaths } from "./data/pages";
import { pageMetadata, siteUrl } from "./data/seo";

const siteTitle = "Coforma | CRM Integral FPE para academias";
const siteDescription = "Plataforma integral para la gestión de formación, alumnado y convocatorias FPE.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...pageMetadata(siteTitle, siteDescription, "/"),
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | Coforma" },
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
        <main className="grow">
          {children}
          <SiteShare pagePaths={publicPagePaths} />
        </main>
        <SiteFooter />
        <CookieNotice />
      </body>
    </html>
  );
}
