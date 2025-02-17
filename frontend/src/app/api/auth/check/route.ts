import { cookies } from "next/headers";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

import { postFetch } from "@/actions/api/fetch";
import { AUTH_COOKIE_KEY } from "@/constants/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await postFetch({
    path: "auth/authentication",
    body,
  });

  const data = await response.json();
  const status = response.status;

  if (status === StatusCodes.OK) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: AUTH_COOKIE_KEY,
      value: data.token,
      httpOnly: true,
      secure: true,
      expires: 60 * 60 * 24,
    });

    return NextResponse.json({
      status: status,
      data: data.user,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.json({
    status: status,
    errorCode: data.code,
    errorMessage: data.message,
  });
}
