import { UserCredentials } from "@/types";

export const setUserCredentials = ({
  userId,
  userName,
  token,
}: UserCredentials) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: userId,
      userName,
    })
  );
  sessionStorage.setItem("jwt", token);
};

export const removeUserCredentials = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    sessionStorage.removeItem("jwt");
  }
};

export const setJwtToken = (token: string) => {
  sessionStorage.setItem("jwt", token);
};

export const getUserCredentials = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
};

export const getUserId = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)["id"] : null;
  }
};

export const getUserName = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)["userName"] : null;
  }
};

export const getJwtToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("jwt");
  }
};

export const checkIfLoggedInOtherTab = () => {
  if (typeof window !== "undefined") {
    if (!sessionStorage.length) {
      // Ask other tabs for session storage
      console.log("Calling getSessionStorage");
      localStorage.setItem("getSessionStorage", String(Date.now()));
    }

    window.addEventListener("storage", (event) => {
      console.log("storage event", event);
      if (event.key == "getSessionStorage") {
        // Some tab asked for the sessionStorage -> send it
        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
        localStorage.removeItem("sessionStorage");
      } else if (event.key == "sessionStorage" && !sessionStorage.length) {
        // sessionStorage is empty -> fill it
        const data = JSON.parse(event.newValue!);
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    });
  }
};
