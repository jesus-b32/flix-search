// Next.js
import { type Metadata } from "next";
import { currentUser } from "@/lib/currentUser";
import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

// UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Custom Components
import ProfileEditWrapper from "@/components/ProfileEditWrapper";

// Forms
import { UpdateImageForm } from "@/components/form/UpdateImageForm";
import { UpdateNameForm } from "@/components/form/UpdateNameForm";
import { UpdateEmailForm } from "@/components/form/UpdateEmailForm";
import { UpdatePasswordForm } from "@/components/form/UpdatePasswordForm";
import { UpdateTwoFactorForm } from "@/components/form/UpdateTwoFactorForm";

/**
 * The metadata for the profile page.
 */
export const metadata: Metadata = {
  title: "My Profile",
};

/**
 * The profile page for editing user profile.
 *
 * @returns the profile page
 */
export default async function SettingProfilePage() {
  const user = await currentUser();

  // Check if user has a credential account (email/password)
  // OAuth users don't have credential accounts, so 2FA is not available for them
  // Better Auth only supports 2FA for credential accounts
  let isOAuth = true;
  if (user?.id) {
    const credentialAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.userId, user.id),
        eq(accounts.provider, "credential"),
      ),
    });
    // User is OAuth-only if they don't have a credential account with password
    isOAuth = !credentialAccount?.password;
  }

  return (
    <div className="w-full">
      <h1 className="my-5 text-4xl font-bold">Edit Profile</h1>
      <section className="flex w-full flex-col items-start space-y-4 md:w-10/12">
        <Label htmlFor="name" className="font-semibold">
          Name
        </Label>
        <Input
          id="name"
          className="w-full text-foreground"
          defaultValue={user?.name ?? ""}
          disabled
        />
        <ProfileEditWrapper buttonName="Update Name">
          <UpdateNameForm userId={user?.id ?? ""} />
        </ProfileEditWrapper>
        <Label htmlFor="image" className="font-semibold">
          Profile Image
        </Label>
        <Input
          id="image"
          className="w-full text-foreground"
          defaultValue={user?.image ?? ""}
          disabled
        />
        <ProfileEditWrapper buttonName="Update Profile Image">
          <UpdateImageForm userId={user?.id ?? ""} />
        </ProfileEditWrapper>
        {!isOAuth && (
          <>
            <Label htmlFor="email" className="font-semibold">
              Email
            </Label>
            <Input
              id="email"
              className="w-full text-foreground"
              defaultValue={user?.email ?? ""}
              disabled
            />
            <ProfileEditWrapper buttonName="Update Email">
              <UpdateEmailForm userId={user?.id ?? ""} />
            </ProfileEditWrapper>

            <Label className="font-semibold">Password</Label>
            <ProfileEditWrapper buttonName="Update Password">
              <UpdatePasswordForm userId={user?.id ?? ""} />
            </ProfileEditWrapper>

            {/* 
              Two Factor Authentication is only available for credential accounts (email/password).
              OAuth accounts rely on the provider's 2FA, so this form is hidden for OAuth users.
              See Better Auth docs: https://www.better-auth.com/docs/plugins/2fa#enabling-2fa
            */}
            <Label className="font-semibold">Two Factor Authentication</Label>
            <ProfileEditWrapper buttonName="Update Two Factor Authentication">
              <UpdateTwoFactorForm
                userId={user?.id ?? ""}
                twoFactorEnabled={
                  (user as { twoFactorEnabled?: boolean | null })
                    ?.twoFactorEnabled ?? false
                }
              />
            </ProfileEditWrapper>
          </>
        )}
      </section>
    </div>
  );
}
