import NextAuth from "next-auth";
import { options } from "@/auth/option";

export const { handlers, signIn, signOut, auth } = NextAuth(options);
