import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const NotoSansJp = Noto_Sans_JP({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Comment App",
  description: "",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body className={NotoSansJp.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
