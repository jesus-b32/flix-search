"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface UserButtonProps {
  imageLink: string;
  name: string;
}

/**
 * A dropdown menu button that is rendered for logged in users.
 * Dropdown menu includes links to settings, watchlist, and a logout button.
 *
 * @param imageLink - the URL of the user's image
 * @param name - the name of the user
 * @returns a dropdown menu button that is rendered for logged in users
 */
export const UserButton = ({ imageLink, name }: UserButtonProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={imageLink} className="h-10 w-10 rounded-full" />
          <AvatarFallback>
            <CircleUserRound className="h-10 w-10" strokeWidth={1} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/user/${name}/watchlist`} className="cursor-pointer">
            Watchlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/settings/profile"} className="cursor-pointer">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
