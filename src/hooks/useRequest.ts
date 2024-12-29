"use client";

import { useCallback } from "react";

import axios, { AxiosError } from "@/utils/axios";

import { enqueueSnackbar } from "notistack";

import { AxiosRequestConfig, Method } from "axios";

import useSWR, { SWRConfiguration } from "swr";
import { Helpers } from "@/helpers/helpers";
interface Payload {
  id?: number | Array<number>;
  [key: string]: any;
}

export interface UseRequestFunctions {
  sendRequest: <T = any>(
    url: string,
    method?: Method,
    payload?: Payload
  ) => Promise<T>;
  sendRequestSilent: <T = any>(
    url: string,
    method?: Method,
    payload?: Payload
  ) => Promise<T>;
}

type UseRequestFunction = () => UseRequestFunctions;

export const useRequest: UseRequestFunction = () => {
  const sendRequest = useCallback(
    async <T>(url: string, method?: Method, payload?: Payload) =>
      new Promise<T>((resolve, reject) => {
        if (!payload) payload = {};

        const { isSilent, ...restPayload } = payload;
        restPayload._method = method ?? "get";

        axios
          .post(url, Helpers.objToFormData(restPayload))
          .then(({ data }) => {
            if (!isSilent && data?.message) {
              enqueueSnackbar(data.message, {
                variant: "success",
                preventDuplicate: true,
              });
            }

            if (data?.alert) {
              enqueueSnackbar(data.alert, {
                variant: "warning",
                autoHideDuration: 8000,
              });
            }

            resolve(data);
          })
          .catch((error) => {
            if (!isSilent) {
              enqueueSnackbar(error?.message, {
                variant: "error",
                autoHideDuration: 8000,
                anchorOrigin: { vertical: "top", horizontal: "center" },
              });
            }
            error.success = false;

            reject(error);
          });
      }),
    []
  );

  const sendRequestSilent = useCallback(
    async <T>(url: string, method?: Method, payload?: Payload) => {
      if (!payload) payload = {};
      payload.isSilent = true;

      return await sendRequest<T>(url, method, payload);
    },
    [sendRequest]
  );

  return { sendRequest, sendRequestSilent };
};

type HookOptions = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: Record<string, any>;
};

export interface ResponseWithMessage {
  errors?: [];
}

export type Error<T> = AxiosError<T>;

export type UseRequestSWRProps = SWRConfiguration & {
  url: string;
  silent?: boolean;
  queryKey?: string;
  stopRequest?: boolean;
  method?: Method;
  options?: HookOptions;
};

/**
 * @description Hook to make requests to the API using axios and swr
 * @param {string} url - The url to make the request
 * @param {boolean} silent - If the request should show a snackbar with the response message
 * @param {Method} method - The method to make the request
 */
export function useRequestSWR<T>({
  url = "/set-a-url",
  method = "GET",
  silent = false,
  stopRequest = false,
  options,
  queryKey,
  ...rest
}: UseRequestSWRProps) {
  const axiosConfig: AxiosRequestConfig = {
    method,
    url,
    headers: options?.headers,
    params: options?.params,
    data: options?.data,
  };

  const fetcher = async () => {
    const response = await axios(axiosConfig)
      .then((response) => {
        if (!silent && response.data?.message) {
          enqueueSnackbar(response.data.message, {
            variant: "success",
            preventDuplicate: true,
          });
        }
        return response;
      })
      .catch((error) => {
        const axiosError = error as AxiosError<T>;

        if (!silent) {
          enqueueSnackbar(axiosError.message, {
            variant: "error",
            autoHideDuration: 8000,
            preventDuplicate: true,
          });
        }

        throw axiosError;
      });

    return response?.data;
  };

  const key = stopRequest ? null : queryKey ?? url;

  const request = useSWR<T, Error<T>>(key, fetcher, {
    ...rest,
    revalidateOnMount: true,
  });

  return request;
}
