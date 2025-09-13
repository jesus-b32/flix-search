// Next.js Router
import Link from "next/link";

// Icons
import { Clapperboard } from "lucide-react";

/**
 * A footer component that displays the footer of the website.
 * Used in the layout component.
 *
 * @returns - a footer component that displays the footer of the website
 */
export const Footer = () => {
  return (
    <footer className="relative bg-slate-600 text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Clapperboard className="h-6 w-6" />
              The Flix Search
            </h2>
            <p className="text-muted-foreground">
              The best way to find where your favorite movies and shows are
              streaming. Discover global streaming availability easily, and
              access geo-restricted content using a VPN.
            </p>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link
                href="/"
                className="block transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block transition-colors hover:text-primary"
              >
                About
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Powered by</h3>
            <Link
              href="https://www.themoviedb.org/"
              className="block transition-colors hover:text-primary"
            >
              <img
                src="/tmdb.svg"
                alt="TMDB Logo"
                height="15"
                width="100"
                className="inline-block"
              />
            </Link>
            <p className="text-xs text-muted-foreground">
              The Flix Search uses the TMDB API, but is not endorsed, certified,
              or otherwise approved by TMDB.
            </p>

            <h4 className="my-2 font-semibold">Streaming Availability Data</h4>
            <Link
              href="https://www.justwatch.com/"
              className="block transition-colors hover:text-primary"
            >
              <img
                src="/justwatch.svg"
                alt="JustWatch Logo"
                height="15"
                width="100"
              />
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 The Flix Search. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
