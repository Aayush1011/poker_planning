import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { JwtPayload, decode } from "jsonwebtoken";
import { io } from "socket.io-client";

import { LogInData, NewSessionDetails, SignUpData } from "@/types";
import { getJwtToken, setJwtToken } from "@/utils";

export const API_URL = "http://localhost:5000/";

const API_CLIENT = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

API_CLIENT.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getJwtToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API_CLIENT.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError | Error) => {
    if (axios.isAxiosError(error)) {
      const originalConfig = error.config as AxiosRequestConfig;
      const { status, data } = (error.response as AxiosResponse) ?? {};
      if (
        status === 403 &&
        data.message === "jwt expired" &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const fingerprint: string = (decode(getJwtToken()!) as JwtPayload)[
            "fingerprint"
          ];
          const result: Record<string, string> = await API.refreshJwt({
            fingerprint,
          });
          if (result.message === "refresh successful") {
            setJwtToken(result.token);
            return API_CLIENT(originalConfig);
          }
        } catch (_error) {
          if (_error instanceof AxiosError || _error instanceof Error) {
            console.log(_error);
          }
        }
      } else {
        return error.response;
      }
    }
  }
);

export const API = {
  signup: async (userData: SignUpData) => {
    const response = await API_CLIENT.put("auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  login: async (userData: LogInData) => {
    const response = await API_CLIENT.post("auth/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },

  refreshJwt: async (fingerprint: Record<string, string>) => {
    const response = await axios.post(
      `${API_URL}auth/refresh-jwt`,
      fingerprint,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  },

  getSession: async (sessionId: string) => {
    const response = await API_CLIENT.get(`sessions/${sessionId}`);
    return response.data;
  },

  getUserSessions: async (userId: number, count: number, offset?: number) => {
    const searchParams = new URLSearchParams({
      fetchLimit: `${count}`,
      fetchOffset: `${offset ? offset : 0}`,
    });
    const response = await API_CLIENT.get(
      `users/${userId}/sessions?${searchParams}`
    );
    return response.data;
  },

  createSession: async (newSessionDetails: NewSessionDetails) => {
    const response = await API_CLIENT.post("session/", newSessionDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  addParticipant: async (userId: number, sessionId: string, role: string) => {
    const response = await API_CLIENT.post(
      `/sessions/${sessionId}/users/${userId}`,
      { role },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  addStory: async (
    sessionId: string,
    userId: number,
    name: string,
    description: string
  ) => {
    const response = await API_CLIENT.post(
      `/sessions/${sessionId}/story`,
      { userId, name, description },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  getStories: async (sessionId: string) => {
    const response = await API_CLIENT.get(`/sessions/${sessionId}/stories`);
    return response.data;
  },

  editStory: async (
    sessionId: string,
    storyId: number,
    name: string,
    description: string
  ) => {
    const response = await API_CLIENT.put(
      `/sessions/${sessionId}/stories/${storyId}`,
      { name, description },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  deleteStory: async (sessionId: string, storyId: number) => {
    const response = await API_CLIENT.delete(
      `/sessions/${sessionId}/stories/${storyId}`
    );
    return response.data;
  },
};

export const socket = io(API_URL);

export const leaveRoom = (id: string) => {
  socket.emit("room", { action: "leave", id });
};
