import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarpetViz - AI Rug Visualization",
  description: "View luxury rugs in your room with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
