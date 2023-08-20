"use client";

import {
  checkIfLoggedInOtherTab,
  getJwtToken,
  getUserCredentials,
  setJwtToken,
} from "@/utils";
import { useState, useEffect } from "react";
import {
  useRouter,
  usePathname,
  useParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import { API, leaveRoom } from "@/api";
import { toast } from "react-toastify";

const AuthProvider = () => {
  let sessionPagePath: string;
  const router = useRouter();
  const paths = useSelectedLayoutSegments();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const carryOutJwtRefresh = async () => {
      const result: Record<string, string> = await API.refreshJwt({
        fingerprint: "",
      });
      if (result.message === "refresh successful") {
        setJwtToken(result.token);
        router.push("/home");
      } else {
        Promise.reject(result.message);
      }
    };
    if (typeof window !== "undefined") {
      if (!getJwtToken()) {
        if (paths.length === 0 && pathname === "/") {
          checkIfLoggedInOtherTab();
          const retryToken = getJwtToken();
          if (retryToken) {
            router.push("/home");
          } else {
            const userCredentials = getUserCredentials();
            if (userCredentials) {
              carryOutJwtRefresh();
            } else {
              router.push("/");
            }
          }
        } else if (
          paths.length === 2 &&
          paths.includes("session") &&
          params.id
        ) {
          toast.error("Please log in first");
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("callbackUrl", params.id);
          const newPathname = `/?${searchParams.toString()}`;
          router.push(newPathname);
        } else if (paths.length === 1 && paths.includes("home")) {
          router.push("/");
        }
      } else {
        if (paths.length === 0 && pathname === "/") {
          router.push("/home");
        } else if (
          paths.length === 2 &&
          paths.includes("session") &&
          params.id
        ) {
          sessionPagePath = pathname;
        }
      }
      if (sessionPagePath !== pathname) {
        leaveRoom(params.id);
      }
    }
  }, [pathname]);

  return <></>;
};

export default AuthProvider;
