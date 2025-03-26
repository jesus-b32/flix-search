import { type Metadata } from "next";
import { currentUser } from "@/lib/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ProfileEditWrapper from "@/components/ProfileEditWrapper";
import { isOauthUser } from "@/data/user";
import { ImageForm } from "@/components/form/ImageForm";

export const metadata: Metadata = {
  title: "My Profile",
};

export default async function SettingProfilePage() {
  const user = await currentUser();
  const isOauth = await isOauthUser(user?.id ?? "");

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
        <Label htmlFor="email" className="font-semibold">
          Email
        </Label>
        <Input
          id="email"
          className="w-full text-black"
          defaultValue={user?.email ?? ""}
          disabled
        />
        <Label htmlFor="image" className="font-semibold">
          Profile Image
        </Label>
        <Input
          id="image"
          className="w-full text-black"
          defaultValue={user?.image ?? ""}
          disabled
        />
        <ProfileEditWrapper valueBeingEdited="image" isOauth={isOauth}>
          <ImageForm isOauth={isOauth} userId={user?.id ?? ""} />
        </ProfileEditWrapper>
      </section>
    </div>
  );
}
