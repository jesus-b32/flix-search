"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

/**
 * A component that renders a row of social sign-in buttons (Google and GitHub)
 * with the same style as the primary button.
 *
 * This component is intended to be used in the {@link CardWrapper} component.
 *
 * @returns a row of social sign-in buttons (Google and GitHub)
 */
export const SocialButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onClick("google")}
        aria-label="Login with Google"
      >
        <FcGoogle className="h-5 w-5" role="img" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onClick("github")}
        aria-label="Login with GitHub"
      >
        <FaGithub className="h-5 w-5" role="img" />
      </Button>
    </div>
  );
};
