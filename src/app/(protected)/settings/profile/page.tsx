import { auth } from "@/auth";

export default async function SettingProfilePage() {
  const session = await auth();
  return (
    <div className="">
      <h1 className="my-5 text-4xl font-bold">Edit Profile</h1>
    </div>
  );
}
