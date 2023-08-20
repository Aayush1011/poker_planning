import { LiaVoteYeaSolid } from "react-icons/lia";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useContext } from "react";

import {
  APIReturn,
  IIsModeratorContext,
  SingleStoryComponentProps,
} from "@/types";
import { API, socket } from "@/api";
import { IsModeratorContext } from "@/contexts/IsModerator";

const SingleStoryComponent = ({
  id,
  name,
  description,
  sessionId,
  setMode,
  setFormState,
}: SingleStoryComponentProps) => {
  const { isModerator } = useContext(IsModeratorContext) as IIsModeratorContext;

  const handleDelete = async () => {
    const deletedStory: APIReturn = await API.deleteStory(sessionId, id);

    if (deletedStory.message !== "story deleted") {
      // deleteStory(id);
      console.log(deletedStory.message);
    }
  };

  const handleVoting = async () => {
    socket.emit("story", { action: "vote", storyId: id, sessionId });
  };

  return (
    <div className="bg-white shadow-[0px_4px_12px_#3651ff3d] py-4 px-5 mx-0 hover:bg-main-blue-opacity">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold">{name}</p>
        {isModerator && (
          <div className="flex gap-x-4 text-2xl">
            <div className="cursor-pointer" title="Vote" onClick={handleVoting}>
              <LiaVoteYeaSolid />
            </div>
            <div
              className="cursor-pointer"
              title="Edit"
              onClick={() => {
                setMode("Edit Story");
                setFormState({ id, name, description });
              }}
            >
              <AiOutlineEdit />
            </div>
            <div
              className="cursor-pointer"
              title="Remove"
              onClick={handleDelete}
            >
              <AiOutlineDelete />
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="text-lg text-gray">{description}</p>
      </div>
    </div>
  );
};

export default SingleStoryComponent;
