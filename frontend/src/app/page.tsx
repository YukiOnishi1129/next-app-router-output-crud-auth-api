import { redirect } from "next/navigation";
import { LoginTemplate } from "@/components/templates";
import { isCheckAuth } from "@/actions/auth";
import { NAVIGATION_LIST } from "@/constants/navigation";

export default async function LoginPage() {
  const auth = await isCheckAuth();
  if (auth) {
    redirect(NAVIGATION_LIST.TOP);
  }
  return <LoginTemplate />;
}
