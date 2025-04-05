"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

/**
 * A button component that is used to navigate back to a previous page.
 *
 * The `href` prop is used to determine the URL to navigate to.
 * The `label` prop is used to set the text content of the button.
 */
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    // asChild is used to use the Link component as a child of the Button component
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
