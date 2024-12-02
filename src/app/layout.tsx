import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Flix Search",
    default: "Flix Search",
  },
  description: "Global Streaming Search Engine for Movies and TV Shows",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
