import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import CartPanel from "@/components/CartPanel";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "REDSEEM — Raw Fashion",
  description: "Clothing for those who wear their truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartPanel />
      </body>
    </html>
  );
}
