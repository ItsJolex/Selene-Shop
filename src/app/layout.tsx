import type { Metadata } from "next";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsjolex.github.io/Selene-Shop"),
  title: "Selene Makeup Store",
  description: "The Art of Makeup - Tu tienda de makeup en Venezuela",
  openGraph: {
    title: "Selene Makeup Store",
    description: "Elevando tu belleza natural con cosméticos curados y de calidad premium.",
    url: "https://itsjolex.github.io/Selene-Shop",
    siteName: "Selene Makeup Store",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_VE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
      </head>
      <body className="antialiased min-h-screen bg-surface-container text-on-surface">
        <SplashScreen />
        {children}
        <Footer />
      </body>
    </html>
  );
}
