import { auth } from "@/auth";

export default async function SettingPage() {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
}