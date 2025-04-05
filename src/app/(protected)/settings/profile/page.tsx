import { type Metadata } from "next";
import { currentUser } from "@/lib/currentUser";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ProfileEditWrapper from "@/components/ProfileEditWrapper";

//forms
import { UpdateImageForm } from "@/components/form/UpdateImageForm";
import { UpdateNameForm } from "@/components/form/UpdateNameForm";
import { UpdateEmailForm } from "@/components/form/UpdateEmailForm";
import { UpdatePasswordForm } from "@/components/form/UpdatePasswordForm";
import { UpdateTwoFactorForm } from "@/components/form/UpdateTwoFactorForm";

export const metadata: Metadata = {
  title: "My Profile",
};

export default async function SettingProfilePage() {
  const user = await currentUser();

  return (
    <div className="w-full">
      <h1 className="my-5 text-4xl font-bold">Edit Profile</h1>
      <section className="flex w-full flex-col items-start space-y-4 md:w-10/12">
        <Label htmlFor="name" className="font-semibold">
          Name
        </Label>
        <Input
          id="name"
          className="w-full text-black"
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
          className="w-full text-black"
          defaultValue={user?.image ?? ""}
          disabled
        />
        <ProfileEditWrapper buttonName="Update Profile Image">
          <UpdateImageForm userId={user?.id ?? ""} />
        </ProfileEditWrapper>
        {!user?.isOAuth && (
          <>
            <Label htmlFor="email" className="font-semibold">
              Email
            </Label>
            <Input
              id="email"
              className="w-full text-black"
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

            <Label className="font-semibold">Two Factor Authentication</Label>
            <ProfileEditWrapper buttonName="Update Two Factor Authentication">
              <UpdateTwoFactorForm
                userId={user?.id ?? ""}
                isTwoFactorEnabled={user?.isTwoFactorEnabled ?? false}
              />
            </ProfileEditWrapper>
          </>
        )}
      </section>
    </div>
  );
}
