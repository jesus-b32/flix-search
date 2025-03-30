import { type Metadata } from "next";
import { currentUser } from "@/lib/currentUser";
import { DeleteAccountForm } from "@/components/form/DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete My Account",
};

export default async function DeleteAccountPage() {
  const user = await currentUser();

  return (
    <div className="w-full">
      <h1 className="my-5 text-4xl font-bold">Delete Account</h1>
      <section className="flex w-full flex-col items-start space-y-4 md:w-10/12">
        <p>
          You have just entered the <b>danger zone!</b> If you would like to
          continue and remove your account, you can do so by entering your
          password below and confirming the prompts.
        </p>
        <DeleteAccountForm isOauth={user?.isOAuth} userId={user?.id ?? ""} />
      </section>
    </div>
  );
}
