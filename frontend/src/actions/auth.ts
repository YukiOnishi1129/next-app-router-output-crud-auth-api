"use server";

import { AuthError } from "next-auth";

import { signIn as NextAuthSignIn } from "@/auth/auth";

export const signIn = async (email: string, password: string) => {
  try {
    await NextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      isSuccess: true,
      message: "ログインに成功しました。",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            error: {
              message: "メールアドレスまたはパスワードが間違っています。",
            },
          };
        default:
          return {
            isSuccess: false,
            error: {
              message: "ログインに失敗しました。",
            },
          };
      }
    }
    return {
      isSuccess: false,
      error: {
        message: "ログインに失敗しました。",
      },
    };
  }
};
