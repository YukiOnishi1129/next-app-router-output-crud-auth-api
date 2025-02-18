"use server";

import { StatusCodes } from "http-status-codes";

import { signOut } from "@/config/auth";

import { AuthType } from "@/types/user";
import { ResponseType, IErrorResponse } from "@/types/ApiResponse";
import { postFetch } from "./fetch";

export const login = async (email: string, password: string) => {
  try {
    const response = await postFetch({
      path: "auth/login",
      body: {
        email,
        password,
      },
    });

    const data = await response.json();
    const status = response.status;
    if (status === StatusCodes.OK) {
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
  await signOut();
};
