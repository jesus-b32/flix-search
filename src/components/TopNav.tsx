import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";

import { CircleUser, Clapperboard, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import SearchPopover from "./SearchPopover";

export default function TopNav() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background bg-slate-600 px-4 text-black md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Clapperboard className="h-6 w-6" />
          <span className="sr-only">Flix Search</span>
        </Link>
        <Link href="/movie?sort_by=popularity.desc&page=1">
          Discover Movies
        </Link>
        <Link href="/tv?sort_by=popularity.desc&page=1">Discover TV Shows</Link>
        <Link href="/auth/signup">Signup</Link>
        <Link href="/auth/login">Login</Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-slate-600 text-black"
        >
          {/* added title and description for screen readers accessibility */}
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Open navigation menu
          </SheetDescription>
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="w-fit">
              <Clapperboard className="h-6 w-6" />
              <span className="sr-only">Flix Search</span>
            </Link>
            <Link
              href="/movie?sort_by=popularity.desc&page=1"
              className="text-muted-foreground hover:text-foreground"
            >
              Discover Movies
            </Link>
            <Link
              href="/tv?sort_by=popularity.desc&page=1"
              className="text-muted-foreground hover:text-foreground"
            >
              Discover TV Shows
            </Link>
            <Link
              href="/auth/signup"
              className="text-muted-foreground hover:text-foreground"
            >
              Signup
            </Link>
            <Link
              href="/auth/login"
              className="text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-initial">
          <SearchPopover />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
