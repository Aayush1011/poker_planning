"use client";

import { SessionDetails } from "@/types";
import { API } from "@/api";
import { getUserId } from "@/utils";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";

const SessionPage = ({ params }: { params: { id: string } }) => {
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>({
    name: "",
    description: "",
    message: "",
    status: "",
  });
  const [currentUrl, setCurrentUrl] = useState("");
  const getSessionDetails = async () => {
    const result: SessionDetails = await API.getSession(params.id);
    if (result.message === "session retrieved") {
      setSessionDetails(result);
    }
  };
  const addNewParticipant = async () => {
    await API.addParticipant(getUserId(), params.id, "member");
  };
  useEffect(() => {
    getSessionDetails();
    addNewParticipant();
    if (typeof window !== undefined) {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        toast.success("Session link copied");
      },
      () => {
        toast.error("Could not copy to clipboard");
      }
    );
  };

  return (
    <div className="block p-5 md:flex md:p-10">
      <div className="w-full md:w-4/5 md:pe-3">
        <div className="py-3 font-medium">
          <h1 className="text-3xl text-almost-black">
            Session name:
            <span className="text-gray capitalize"> {sessionDetails.name}</span>
          </h1>
        </div>
        <div className="font-medium py-5 text-xl">
          <p className="text-almost-black mb-3">Description</p>
          <p className="text-gray capitalize">{sessionDetails.description}</p>
        </div>
        <div
          className="flex justify-between shadow-[0px_4px_12px_#3651ff3d] text-xl py-4 px-5 my-4 mx-0 break-all hover:bg-main-blue-opacity cursor-pointer"
          onClick={copyToClipboard}
        >
          <p>
            Invite Members: <span className="text-gray">{currentUrl}</span>
          </p>
          <MdOutlineContentCopy />
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
