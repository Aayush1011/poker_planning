"use client";

import { SessionDetails } from "@/types";
import { API, socket } from "@/api";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineContentCopy } from "react-icons/md";

const SessionDetails = ({ params }: { params: { id: string } }) => {
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

  useEffect(() => {
    getSessionDetails();
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
    <div className="md:pe-3 mb-7">
      {/* shadow-[0px_4px_12px_#3651ff3d] */}
      <div className="flex flex-col md:flex-row md:items-baseline pb-4 px-5 mb-0 mx-0">
        <div className=" w-1/2 md:py-3">
          <h1 className="font-semibold text-3xl text-almost-black">
            Session name
            <p className="font-medium text-gray capitalize">
              {" "}
              {sessionDetails.name}
            </p>
          </h1>
        </div>
        <div className="text-xl w-1/2">
          <p className="font-semibold text-almost-black">Description</p>
          <p className="font-medium text-gray capitalize">
            {sessionDetails.description}
          </p>
        </div>
      </div>
      <div
        className="flex justify-between shadow-[0px_4px_12px_#3651ff3d] text-xl py-4 px-5 mx-0 break-all hover:bg-main-blue-opacity cursor-pointer"
        onClick={copyToClipboard}
      >
        <p className="font-semibold">
          Invite Members:{" "}
          <span className="font-medium text-gray">{currentUrl}</span>
        </p>
        <MdOutlineContentCopy />
      </div>
    </div>
  );
};

export default SessionDetails;
