import { auth } from "@/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isOauthUser } from "@/data/user";

export default async function DeleteAccountPage() {
  const session = await auth();
  const isOauth = await isOauthUser(session?.user?.id ?? "");

  return (
    <div className="w-full">
      <h1 className="my-5 text-4xl font-bold">Delete Account</h1>
      <section className="flex w-full flex-col items-center space-y-4 md:w-10/12 md:items-start">
        <p>
          You have just entered the <b>danger zone!</b> If you would like to
          continue and remove your account, you can do so by entering your
          password below and confirming the prompts.
        </p>
        {!isOauth ? (
          <>
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
            <Input
              id="password"
              className="w-full text-black"
              type="password"
            />{" "}
          </>
        ) : null}
        <Button variant={"destructive"}>Delete Account</Button>
      </section>
    </div>
  );
}
