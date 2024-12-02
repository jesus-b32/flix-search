import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4">
      <Frown className="h-20 w-20" />
      <h2 className="text-2xl font-bold">404 Not Found</h2>
      <p>Could not find requested resource</p>
      <Button asChild variant="secondary">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
