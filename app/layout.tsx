import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "i love you iska ♡",
  description: "our little gallery",
  icons: {
    icon: "/love.png",
  },
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