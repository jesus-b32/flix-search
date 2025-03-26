import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Clapperboard, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchPopover from "@/components/client/SearchPopover";
import { currentUser } from "@/lib/auth";
import { UserButton } from "@/components/auth/user-button";

/**
 * The navigation bar component. It displays the Flix Search logo,
 * links to discover movies and TV shows, login/signup buttons,
 * and a search bar. For logged-in users, it also displays a dropdown
 * menu with links to their account settings and support and hides the login/signup buttons.
 *
 * The component is responsive and will render a hamburger menu
 * on smaller screens.
 *
 * @returns The navigation bar component.
 */
export default async function TopNav() {
  const user = await currentUser();
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center gap-4 bg-slate-600 px-6 text-black">
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
        <Link href="/tv?sort_by=popularity.desc&page=1">Discover Shows</Link>
        {!user ? (
          <>
            <Link href="/auth/register">Signup</Link>
            <Link href="/auth/login">Login</Link>
          </>
        ) : null}
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
            <SheetClose asChild>
              <Link href="/" className="w-fit">
                <Clapperboard className="h-6 w-6" />
                <span className="sr-only">Flix Search</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/movie?sort_by=popularity.desc&page=1"
                className="text-muted-foreground hover:text-foreground"
              >
                Discover Movies
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/tv?sort_by=popularity.desc&page=1"
                className="text-muted-foreground hover:text-foreground"
              >
                Discover Shows
              </Link>
            </SheetClose>
            {!user ? (
              <>
                <SheetClose asChild>
                  <Link
                    href="/auth/register"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Signup
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/auth/login"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Login
                  </Link>
                </SheetClose>
              </>
            ) : null}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-initial">
          <SearchPopover />
        </div>
        {!user ? null : (
          <UserButton imageLink={user?.image ?? ""} name={user?.name ?? ""} />
        )}
      </div>
    </header>
  );
}
