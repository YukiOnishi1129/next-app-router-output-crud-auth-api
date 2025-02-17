"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "@/constants/auth";

const setCookie = async (key: string, value: string) => {
  const cookie = await cookies();
  cookie.set(key, value, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });
};

const deleteCookie = async (key: string) => {
  const cookie = await cookies();
  cookie.delete(key);
};

const getCookie = async (key: string) => {
  const cookie = await cookies();
  return cookie.get(key)?.value;
};

export const setAuthCookie = async (token: string) => {
  await setCookie(AUTH_COOKIE_KEY, token);
};

export const getAuthCookie = async () => {
  return await getCookie(AUTH_COOKIE_KEY);
};

export const deleteAuthCookie = async () => {
  await deleteCookie(AUTH_COOKIE_KEY);
};
