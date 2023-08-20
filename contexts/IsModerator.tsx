"use client";

import { IIsModeratorContext } from "@/types";
import { createContext, useState } from "react";

export const IsModeratorContext = createContext<IIsModeratorContext | null>(
  null
);

const IsModeratorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModerator, setIsModerator] = useState(false);

  return (
    <IsModeratorContext.Provider value={{ isModerator, setIsModerator }}>
      {children}
    </IsModeratorContext.Provider>
  );
};

export default IsModeratorContextProvider;
