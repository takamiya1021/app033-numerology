import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "数秘術風占い - Numerology Fortune",
  description: "誕生日から運命の数字を占うアプリ",
  manifest: "/manifest.json",
  themeColor: "#7C3AED",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
