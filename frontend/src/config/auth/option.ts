import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ExtendedUser } from "@/next-auth";
import { login } from "@/actions/api/authApi";

export const options: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async ({ email, password }) => {
        const inputEmail = email as string;
        const inputPassword = password as string;

        const res = await login(inputEmail, inputPassword);
        if (res.status !== 200) {
          throw new Error(res.errorMessage);
        }
        if (!res?.data) {
          throw new Error(res.errorMessage);
        }

        if (!res.data.token) {
          throw new Error("Token is not found");
        }

        return {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          createdAt: res.data.user.createdAt,
          updatedAt: res.data.user.updatedAt,
          token: res.data.token,
        } as ExtendedUser;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as ExtendedUser;
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
        token.token = u?.token;
        token.created_at = u.createdAt;
        token.updated_at = u.updatedAt;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token as any; // eslint-disable-line
      return session;
    },
  },
};
