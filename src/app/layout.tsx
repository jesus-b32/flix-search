import "@/styles/globals.css";

// UI Components
import { GeistSans } from "geist/font/sans";

// Next.js
import { type Metadata } from "next";
import TopNav from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme-provider";

/**
 * The metadata for the root layout.
 */
export const metadata: Metadata = {
  title: {
    template: "%s | The Flix Search",
    default: "The Flix Search",
  },
  description: "A Global Streaming Search Engine for Movies and TV Shows",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/**
 * The root layout.
 *
 * @returns the root layout
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopNav />
          {/* Add padding-top to the main element equal to navbar height */}
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
