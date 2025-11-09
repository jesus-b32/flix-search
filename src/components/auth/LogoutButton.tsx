"use client";

import { logout } from "@/server/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * Reusable logout button that will call on logout server action when clicked on.
 * Handles redirect to login page after successful logout.
 *
 * @returns a logout button that will call on logout server action when clicked on
 */
export const LogoutButton = () => {
  const router = useRouter();

  const onClick = async () => {
    const result = await logout();
    if (result?.success) {
      router.push("/auth/login");
    }
  };

  return (
    <Button onClick={onClick} size="sm" variant="destructive">
      Logout
    </Button>
  );
};
