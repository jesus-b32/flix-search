"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

/**
 * A button component that is used to navigate to the login page.
 * Used for navigating to the login page.
 *
 * @param children - the children to wrap
 * @param mode - the mode to use
 * @param asChild - whether to use the asChild prop
 */
export const LoginButton = ({
  children,
  mode = "redirect",
  // asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onCLick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }
  return (
    <span onClick={onCLick} className="cursor-pointer">
      {children}
    </span>
  );
};
