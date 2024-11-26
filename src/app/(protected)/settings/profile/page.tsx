import { auth } from "@/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ProfileForm from "@/components/ProfileForm";

export default async function SettingProfilePage() {
  const session = await auth();
  return (
    <div className="w-full">
      <h1 className="my-5 text-4xl font-bold">Edit Profile</h1>
      <section className="flex w-full flex-col items-center space-y-4 md:w-10/12 md:items-start">
        <Label htmlFor="name" className="font-semibold">
          Name
        </Label>
        <Input
          id="name"
          className="w-full text-black"
          defaultValue={session?.user?.name ?? ""}
          disabled
        />
        <Label htmlFor="email" className="font-semibold">
          Email
        </Label>
        <Input
          id="email"
          className="w-full text-black"
          defaultValue={session?.user?.email ?? ""}
          disabled
        />
        <Label htmlFor="image" className="font-semibold">
          Profile Image
        </Label>
        <Input
          id="image"
          className="w-full text-black"
          defaultValue={session?.user?.image ?? ""}
          disabled
        />
        <ProfileForm valueBeingEdited="image" />
      </section>
    </div>
  );
}
