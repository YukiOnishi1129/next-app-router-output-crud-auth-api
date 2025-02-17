"use server";

import { getAuthCookie } from "@/actions/cookie";
import { BASE_GO_API_URL } from "@/constants/api";

const BASE_URL = BASE_GO_API_URL;

type GetFetchArgs = {
  path: string;
  tagName: string;
  cacheType?: RequestCache;
};

export const getFetch = async ({ path, tagName, cacheType }: GetFetchArgs) => {
  const token = await getAuthCookie();
  return fetch(`${BASE_URL}/${path}`, {
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    next: { tags: [tagName] },
    cache: cacheType,
  });
};

type PostFetchArgs = {
  path: string;
  body: Record<string, unknown>;
};

export const postFetch = async ({ path, body }: PostFetchArgs) => {
  const token = await getAuthCookie();
  return fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(body),
  });
};

type PutFetchArgs = {
  path: string;
  body: Record<string, unknown>;
};

export const putFetch = async ({ path, body }: PutFetchArgs) => {
  const token = await getAuthCookie();
  return fetch(`${BASE_URL}/${path}`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify(body),
  });
};

type DeleteFetchArgs = {
  path: string;
};

export const deleteFetch = async ({ path }: DeleteFetchArgs) => {
  const token = await getAuthCookie();
  return fetch(`${BASE_URL}/${path}`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  });
};
