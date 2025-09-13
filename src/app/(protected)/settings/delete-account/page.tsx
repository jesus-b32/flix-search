// Next.js
import { type Metadata } from "next";
import { currentUser } from "@/lib/currentUser";

// Custom Components
import { DeleteAccountForm } from "@/components/form/DeleteAccountForm";
import ProfileEditWrapper from "@/components/ProfileEditWrapper";

/**
 * The metadata for the delete account page.
 */
export const metadata: Metadata = {
  title: "Delete My Account",
};

/**
 * The delete account page for deleting user account.
 *
 * @returns the delete account page
 */
export default async function DeleteAccountPage() {
  const user = await currentUser();

  return (
    <div className="w-full">
      <h1 className="my-5 text-4xl font-bold">Delete Account</h1>
      <section className="flex w-full flex-col items-start space-y-4 md:w-10/12">
        {user?.isOAuth ? (
          <p>
            You have just entered the <b>danger zone!</b> If you would like to
            continue and remove your account, you can do so by clicking the
            delete button below and confirming the prompts.
          </p>
        ) : (
          <p>
            You have just entered the <b>danger zone!</b> If you would like to
            continue and remove your account, you can do so by entering your
            password below and confirming the prompts.
          </p>
        )}
        <ProfileEditWrapper buttonName="Delete Account">
          <DeleteAccountForm isOauth={user?.isOAuth} userId={user?.id ?? ""} />
        </ProfileEditWrapper>
      </section>
    </div>
  );
}
