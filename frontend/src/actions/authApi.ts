"use server";

import { StatusCodes } from "http-status-codes";

import { setAuthCookie, deleteAuthCookie } from "@/actions/cookie";

import { postFetch } from "./fetch";
import { AuthType } from "@/types/user";
import { ResponseType, IErrorResponse } from "@/types/ApiResponse";

export const login = async (email: string, password: string) => {
  try {
    const response = await postFetch({
      path: "auth/login",
      body: { email, password },
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const status = response.status;
    if (status === StatusCodes.OK) {
      await setAuthCookie(data.token);
      const res: ResponseType<AuthType> = {
        status: status,
        data: data,
      };
      return res;
    }

    const res: ResponseType = {
      status: status,
      errorCode: data.code,
      errorMessage: data.message,
    };
    return res;
  } catch (error) {
    const res: ResponseType = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      errorCode: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
      errorMessage: `Internet Server Error: ${error}`,
    };
    const fetchError = error as IErrorResponse;
    res.errorCode = fetchError?.status?.toString();
    res.errorMessage = fetchError?.statusText;
    return res;
  }
};

export const logout = async () => {
  await deleteAuthCookie();
};
