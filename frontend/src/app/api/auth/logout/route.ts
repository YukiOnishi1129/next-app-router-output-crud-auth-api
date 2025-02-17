import { cookies } from "next/headers";

import { AUTH_COOKIE_KEY } from "@/constants/auth";

export async function POST() {
  const cookie = await cookies();
  cookie.delete(AUTH_COOKIE_KEY);
}
