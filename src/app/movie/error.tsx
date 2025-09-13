"use client";

// Next.js
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * The error page for the movie details page.
 *
 * @returns the error page
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
