"use client";

import { useEffect, useContext } from "react";
import { API, leaveRoom, socket } from "@/api";
import { getUserId, getUserName } from "@/utils";
import { IsModeratorContext } from "@/contexts/IsModerator";
import { AddParticipantAPIReturn, IIsModeratorContext } from "@/types";

const SessionPage = ({ params }: { params: { id: string } }) => {
  const { isModerator, setIsModerator } = useContext(
    IsModeratorContext
  ) as IIsModeratorContext;
  const addNewParticipant = async () => {
    const participant: AddParticipantAPIReturn = await API.addParticipant(
      getUserId(),
      params.id,
      "member"
    );
    if (
      ["new participant added", "user has already joined session"].includes(
        participant.message
      )
    ) {
      setIsModerator(participant.role === "moderator");
    }
  };
  useEffect(() => {
    addNewParticipant();
    socket.emit("room", {
      action: "join",
      id: params.id,
      username: getUserName(),
      role: isModerator ? "moderator" : "member",
    });

    window.addEventListener("beforeunload", () => leaveRoom(params.id));
    return () =>
      window.removeEventListener("beforeunload", () => leaveRoom(params.id));
  }, []);

  return <></>;
};

export default SessionPage;
