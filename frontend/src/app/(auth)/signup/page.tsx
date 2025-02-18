import { redirect } from "next/navigation";
import { SignUpTemplate } from "@/components/templates";
import { NAVIGATION_LIST } from "@/constants/navigation";
import { getSession } from "@/actions/auth";

export default async function SignupPage() {
  const session = await getSession();
  if (session?.user) {
    redirect(NAVIGATION_LIST.TOP);
  }
  return <SignUpTemplate />;
}
