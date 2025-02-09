import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Clapperboard, Menu, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchPopover from "@/components/client/SearchPopover";
// import { LoginButton } from "@/components/auth/login-button";
import { signOut, auth } from "@/auth";

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
  const session = await auth();
  const name = session?.user?.name ?? "";
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
        <Link href="/tv?sort_by=popularity.desc&page=1">Discover Shows</Link>
        {!session ? (
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
            {!session ? (
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
        {!session ? null : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-full">
                {session?.user?.image ? (
                  <img
                    src={session?.user?.image ?? ""}
                    alt="Profile picture"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <CircleUserRound className="h-10 w-10" strokeWidth={1} />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/user/${name}/watchlist`}>Watchlist</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/settings/profile"}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form
                  action={async () => {
                    "use server";
                    await signOut({
                      redirectTo: "/auth/login",
                    });
                  }}
                >
                  <Button type="submit" variant="destructive" size={"sm"}>
                    Sign out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
