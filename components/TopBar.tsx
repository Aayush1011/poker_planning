"use client";

import { useState, useEffect } from "react";
import { RiMenu2Line, RiMenu3Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Signika } from "next/font/google";

import ButtonComponent from "./ButtonComponent";
import { getUserName, removeUserCredentials } from "@/utils";
import { TopBarProps } from "@/types";
import {
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

const signika = Signika({
  weight: "500",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const params = useParams();

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  const handleLogOut = () => {
    removeUserCredentials();
    router.push("/");
  };

  return (
    <>
      {segment === "home" || segment === "session" ? (
        <>
          <div
            className={`flex items-center md:justify-between max-md:gap-x-8 py-4 px-5 md:px-10 bg-main-blue text-white ${
              !params?.id && "max-md:gap-x-8"
            }`}
          >
            <div
              className="md:hidden text-sm"
              onClick={() => setShowLeftMenu(true)}
            >
              <RiMenu2Line />
            </div>
            <div
              className={`${signika.className} text-3xl md:text-5xl font-medium hover:cursor-pointer`}
              onClick={() => router.push("/home")}
            >
              Poker Planning
            </div>
            <div
              className={`flex flex-col md:flex-row gap-y-10 md:gap-x-10 items-center text-base max-md:h-full max-md:w-0 max-md:fixed max-md:z-10 max-md:top-0 max-md:left-0 max-md:bg-main-orange max-md:overflow-x-hidden max-md:duration-500 max-md:pt-15 ${
                showLeftMenu && "w-1/2"
              }`}
            >
              <div
                className="md:hidden z-20 text-xl text-center text-white"
                onClick={() => setShowLeftMenu(false)}
              >
                <MdClose />
              </div>
              <div className="flex gap-x-4 font-normal items-center">
                <div className="text-4xl">
                  <RxAvatar />
                </div>
                <div className="text-center">{userName}</div>
              </div>
              <ButtonComponent
                text="Log Out"
                colorClass="bg-error -mt-0"
                callback={handleLogOut}
              />
            </div>
            {params?.id && (
              <div className="md:hidden text-sm" onClick={onMenuClick}>
                <RiMenu3Line />
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopBar;
