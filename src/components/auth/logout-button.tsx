import { logout } from "@/server/actions/auth/logout";
import { Button } from "@/components/ui/button";

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
