import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-600">
      <div className="px-4 sm:px-6 lg:px-4">
        <div className="flex flex-col items-start justify-between gap-4 divide-y py-10 md:h-24 md:flex-row md:items-center md:divide-y-0 md:py-0">
          <div className="flex w-full flex-row justify-center gap-4 px-8 md:justify-start md:gap-2 md:px-0">
            <Clapperboard className="h-6 w-6" />
            <span className="text-lg font-bold">The Flix Search</span>
          </div>
          <nav className="flex w-full justify-center gap-4 sm:gap-6 md:justify-end">
            <Button asChild variant="link">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/about">About</Link>
            </Button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
