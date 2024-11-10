"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

/**
 * A component that renders a row of social sign-in buttons (Google and GitHub)
 * with the same style as the primary button.
 *
 * This component is intended to be used in the {@link CardWrapper} component.
 */
export const Social = () => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
