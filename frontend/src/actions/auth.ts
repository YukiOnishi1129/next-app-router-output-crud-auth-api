"use server";

import { checkAuth } from "@/actions/api/authApi";

export const isCheckAuth = async () => {
  const res = await checkAuth();
  if (!res?.data?.token) {
    return false;
  }
  return res;
};
