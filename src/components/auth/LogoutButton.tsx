import { logout } from "@/server/actions/auth/logout";
import { Button } from "@/components/ui/button";

/**
 * Reusable logout button that will call on logout server action when clicked on.
 */
export const LogoutButton = () => {
  const onClick = () => {
    logout();
  };

  return (
    <Button onClick={onClick} size="sm" variant="destructive">
      Logout
    </Button>
  );
};
