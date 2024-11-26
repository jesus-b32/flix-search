import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function SettingCard() {
  const FilterContent = () => (
    <div className="flex w-full flex-col space-y-4 py-4">
      <Link
        href="/settings/profile"
        className="w-full text-center hover:bg-slate-300"
      >
        Edit Profile
      </Link>
      <Link
        href="/settings/delete-account"
        className="mb-4 w-full text-center hover:bg-slate-300"
      >
        Delete Account
      </Link>
    </div>
  );

  return (
    <>
      <Card className="w-full divide-y-2">
        <CardHeader>
          <CardTitle className="text-center font-bold">Settings</CardTitle>{" "}
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden lg:block">
            <FilterContent />
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full border-none">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters & Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="text-black">
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex h-[calc(100vh-8rem)] flex-col overflow-y-auto">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
