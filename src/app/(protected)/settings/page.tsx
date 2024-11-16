import { auth } from "@/auth";

export default async function SettingPage() {
  const session = await auth();
  console.log("session: ", session);
  return <div>{JSON.stringify(session)}</div>;
}
