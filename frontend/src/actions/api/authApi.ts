"use server";

import { StatusCodes } from "http-status-codes";

import { deleteAuthCookie } from "@/actions/cookie";

import { AuthType } from "@/types/user";
import { ResponseType, IErrorResponse } from "@/types/ApiResponse";
import { postFetch } from "./fetch";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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

export const checkAuth = async () => {
  const body: Record<string, unknown> = {};
  try {
    const response = await postFetch({
      path: "auth/authentication",
      body,
    });

    const data = await response.json();
    const status = response.status;
    if (status === StatusCodes.OK) {
      const res: ResponseType<AuthType> = {
        status: StatusCodes.OK,
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
