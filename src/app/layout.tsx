import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Montserrat, Lato } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import MaintenanceGuard from "@/components/MaintenanceGuard";
import MaintenancePage from "@/app/maintenance/page";
import { headers } from "next/headers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["300","400","700","900"],
});

const isStaging = process.env.NEXT_PUBLIC_IS_STAGING === 'true' || process.env.VERCEL_ENV === 'preview';
async function isMaintenanceEnabledServer(): Promise<boolean> {
  try {
    const hdrs = await headers();
    const cookieHeader = hdrs.get('cookie') || '';
    if (/\bmaintenance=1\b/.test(cookieHeader)) return true;
  } catch {}
  return process.env.MAINTENANCE_MODE === 'true' || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
}

export const metadata: Metadata = {
  title: "Cross Creek Realty",
  description: "Premium real estate advisory across metro Atlanta.",
  robots: isStaging
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const maintenanceEnabled = await isMaintenanceEnabledServer();
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} ${lato.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>
          {maintenanceEnabled && <MaintenanceGuard enabled={true} />}
          {maintenanceEnabled ? <MaintenancePage /> : children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

