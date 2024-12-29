"use client ";

import jwtDecode from "jwt-decode";

import { LOCAL_STORAGE } from "@/config";

import axios from "./axios";
import { sign, verify } from "crypto";

//

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode.jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null) => {
  if (!accessToken) {
    localStorage.removeItem(LOCAL_STORAGE.LOCAL_STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;
    return;
  }

  localStorage.setItem(LOCAL_STORAGE.LOCAL_STORAGE_KEY, accessToken);
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  axios.defaults.baseURL = "http://localhost:5206";
};

export { isValidToken, setSession, verify, sign };
