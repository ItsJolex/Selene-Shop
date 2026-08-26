import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Selene Makeup Store",
  description: "The Art of Makeup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
