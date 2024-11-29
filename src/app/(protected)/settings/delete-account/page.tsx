import { auth } from "@/auth";

import { isOauthUser } from "@/data/user";
import { DeleteAccountForm } from "@/components/form/DeleteAccountForm";

export default async function DeleteAccountPage() {
  const session = await auth();
  const isOauth = await isOauthUser(session?.user?.id ?? "");

  return (
    <div className="w-full">
      <h1 className="my-5 text-4xl font-bold">Delete Account</h1>
      <section className="flex w-full flex-col items-start space-y-4 md:w-10/12">
        <p>
          You have just entered the <b>danger zone!</b> If you would like to
          continue and remove your account, you can do so by entering your
          password below and confirming the prompts.
        </p>
        <DeleteAccountForm isOauth={isOauth} userId={session?.user?.id ?? ""} />
      </section>
    </div>
  );
}
