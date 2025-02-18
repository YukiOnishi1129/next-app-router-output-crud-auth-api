import { redirect } from "next/navigation";
import { LoginTemplate } from "@/components/templates";
import { NAVIGATION_LIST } from "@/constants/navigation";
import { auth } from "@/auth/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect(NAVIGATION_LIST.TOP);
  }
  return <LoginTemplate />;
}
