import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";

import {
  CircleUser,
  // Search as SearchIcon,
  Clapperboard,
  Menu,
  ChevronDown,
} from "lucide-react";

// import { Search } as  from "lucide-react";

import Search from "./client/Search";

import Link from "next/link";

export default function TopNav() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Clapperboard className="h-6 w-6" />
          <span className="sr-only">Flix Search</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex flex-row items-center">
              <p className="text-muted-foreground transition-colors hover:text-foreground">
                Discover Movies
              </p>
              <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Popular
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Top Rated
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Now Playing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Upcoming
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex flex-row items-center">
              <p className="text-muted-foreground transition-colors hover:text-foreground">
                Discover TV Series
              </p>
              <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Popular
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Top Rated
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                On the Air
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Airing Today
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="/signup"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Signup
        </Link>
        <Link
          href="/login"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Login
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          {/* added title and description for screen readers accessibility */}
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Open navigation menu
          </SheetDescription>
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Clapperboard className="h-6 w-6" />
              <span className="sr-only">Flix Search</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="flex flex-row items-center">
                  <p className="text-muted-foreground transition-colors hover:text-foreground">
                    Discover Movies
                  </p>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Popular
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Top Rated
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Now Playing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Upcoming
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="flex flex-row items-center">
                  <p className="text-muted-foreground transition-colors hover:text-foreground">
                    Discover TV Series
                  </p>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Popular
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Top Rated
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    On the Air
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Airing Today
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[75px] gap-3 p-4 md:w-[100px] md:grid-cols-2 lg:w-[150px]">
                      <li>
                        <Link href="#">Link</Link>
                      </li>
                      <li>
                        <Link href="#">Link2</Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/signup"
              className="text-muted-foreground hover:text-foreground"
            >
              Signup
            </Link>
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <Search />
        </div>
        {/* <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
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
