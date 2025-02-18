import { redirect } from "next/navigation";
import { LoginTemplate } from "@/components/templates";
import { getSession } from "@/actions/auth";
import { NAVIGATION_LIST } from "@/constants/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session?.user) {
    redirect(NAVIGATION_LIST.TOP);
  }
  return <LoginTemplate />;
}
