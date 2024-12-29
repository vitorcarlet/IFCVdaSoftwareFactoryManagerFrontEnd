"use client";

import { setSession } from "@/utils/jwt";

import axios, { AxiosError } from "axios";

import { NextRouter } from "next/router";
import { PATH_AUTH } from "@/routes/paths";
import { GlobalErrorProject } from "@/types/shared/shared";

const createCustomError = (
  message: string,
  status: number,
  rest: any
): GlobalErrorProject => {
  return { message, status, ...rest };
};

const axiosInstance = axios.create({
  timeout: 30 * 1000,
  timeoutErrorMessage:
    "Esgotado tempo limite, verifique sua internet e tente novamente",
  //baseURL: process.env.HOST_API_KEY,
  baseURL: "http://localhost:5206",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (
    error: AxiosError & {
      response: {
        data: {
          message: string;
          logout: boolean;
          messages: string[];
          wait?: number;
        };
      };
    }
  ) => {
    let errorMessage = "Algo deu errado";
    let statusCode = 0;
    let rest: Record<string, any> = {};

    if (error.response) {
      const messages = error?.response?.data?.messages || [];
      errorMessage =
        error.response.data.message || messages?.[0] || "Algo deu errado";
      statusCode = error.response.status;
      if (messages?.length) {
        rest = { messages, messagesString: messages.join("\n") };
      }

      if (error.response.data?.logout) {
        setSession(null);

        window.location.href = PATH_AUTH.logout;
      }

      if (error.response?.data?.wait) {
        rest.wait = error.response.data.wait;
      }
    } else if (error.request) {
      if (error.message.includes("timeout")) {
        errorMessage =
          "Esgotado tempo limite, verifique sua internet e tente novamente";
      } else {
        errorMessage =
          "Problema ao acessar a URL, verifique sua internet e tente novamente";
      }
    } else {
      errorMessage = error.message;
    }

    return Promise.reject(createCustomError(errorMessage, statusCode, rest));
  }
);

export * from "axios";
export default axiosInstance;

export const backonepage = (router: NextRouter) => {
  const currentPath = router.asPath;
  const newPath = currentPath.replace(/\/[^/]+\/$/, "/");
  setTimeout(() => {
    router.push(newPath);
  }, 4000);
};
