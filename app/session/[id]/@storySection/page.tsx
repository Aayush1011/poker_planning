"use client";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import StoryFormComponent from "@/components/SessionPage/StoryFormComponent";
import { useEffect, useState, useContext } from "react";
import SingleStoryComponent from "@/components/SessionPage/SingleStoryComponent";
import {
  FormState,
  GetStoriesAPIReturn,
  IIsModeratorContext,
  SingleStory,
  StorySocketReturn,
} from "@/types";
import { API, socket } from "@/api";
import { toast } from "react-toastify";
import { IsModeratorContext } from "@/contexts/IsModerator";
import { retrieveStoryId, storeStoryId } from "@/utils";
import { StoryVotingComponent } from "@/components/SessionPage/StoryVotingComponent";

const StorySection = ({ params }: { params: { id: string } }) => {
  const { isModerator } = useContext(IsModeratorContext) as IIsModeratorContext;
  const [stories, setStories] = useState<[] | SingleStory[]>([]);
  const [mode, setMode] = useState("");
  const [formState, setFormState] = useState<FormState>({
    name: "",
    description: "",
  });
  const [storyToVote, setStoryToVote] = useState<SingleStory>();
  const modifyStory = ["Add Story", "Edit Story"];

  const fetchStories = async () => {
    const fetchedStories: GetStoriesAPIReturn = await API.getStories(params.id);
    if (fetchedStories.message === "stories fetched") {
      setStories(fetchedStories.stories!);
    }
  };

  const assignSectionHeight = () => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches) {
      const container = document.querySelector(".stories-container");
      if (container instanceof HTMLElement) {
        const parentContainerStyles = window.getComputedStyle(
          container.parentElement!
        );

        const height =
          window.innerHeight -
          container.offsetTop -
          parseInt(parentContainerStyles.paddingBottom, 10) -
          2;
        container.style.height = `${height}px`;
      } else {
        setTimeout(assignSectionHeight, 50);
      }
    }
  };

  const addNewStory = (id: number, name: string, description: string) => {
    const newStory: SingleStory = {
      id,
      name,
      description,
    };
    setStories((previousStories) => [newStory, ...previousStories]);
    toast.success("A new story was added");
  };

  const editExistingStory = (id: number, name: string, description: string) => {
    setStories((previousStories) => {
      const storyIndex = previousStories.findIndex((story) => story.id === id);
      const [editedStory] = previousStories.splice(storyIndex, 1);

      if (editedStory) {
        editedStory.name = name;
        editedStory.description = description;
      }
      return [editedStory, ...previousStories];
    });
    toast.success("A story was edited");
  };

  const deleteStory = (id: number) => {
    setStories((previousStories) => {
      const storyIndex = previousStories.findIndex((story) => story.id == id);
      console.log(storyIndex);

      previousStories.splice(storyIndex, 1);

      return [...previousStories];
    });
    toast.info("A story was deleted");
  };

  const voteStory = (storyId: number) => {
    const storyToVote = stories.find(({ id }) => id == storyId);
    if (storyToVote) {
      setMode("Vote");
      setStoryToVote({
        id: storyToVote.id,
        name: storyToVote.name,
        description: storyToVote.description,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", assignSectionHeight);
    return () => window.removeEventListener("resize", assignSectionHeight);
  }, []);

  useEffect(() => {
    assignSectionHeight();
  }, [mode]);

  useEffect(() => {
    const currentlyVotingStoryId = retrieveStoryId();
    if (currentlyVotingStoryId) {
      voteStory(parseInt(currentlyVotingStoryId, 10));
    }
    fetchStories();

    socket.on("story", ({ action, ...args }: StorySocketReturn) => {
      console.log("voting");

      switch (action) {
        case "add":
          if (args.name && args.description) {
            addNewStory(args.id, args.name, args.description);
          }
          break;

        case "edit":
          if (args.name && args.description) {
            editExistingStory(args.id, args.name, args.description);
          }
          break;

        case "delete":
          deleteStory(args.id);
          break;

        case "vote":
          storeStoryId(args.id);
          voteStory(args.id);

        default:
          break;
      }
    });
  }, []);

  return (
    <div className="-ms-5 md:-ms-10 md:me-3 bg-main-blue-opacity px-5 py-5 md:ps-10">
      <div className="flex justify-between items-center mb-5 ps-5">
        <h3 className="text-2xl font-semibold">
          {mode === "Vote" ? "Voting Ongoing" : "Stories"}
        </h3>
        {isModerator && (
          <div
            className="text-2xl cursor-pointer"
            title="AddStory"
            onClick={() => {
              setMode((previousValue) => {
                if (modifyStory.includes(previousValue)) return "";
                else return "Add Story";
              });
              if (modifyStory.includes(mode))
                setFormState({ id: undefined, name: "", description: "" });
            }}
          >
            {modifyStory.includes(mode) ? (
              <AiOutlineMinus />
            ) : (
              <AiOutlinePlus />
            )}
          </div>
        )}
      </div>
      {modifyStory.includes(mode) && (
        <StoryFormComponent
          sessionId={params.id}
          formState={formState}
          setFormState={setFormState}
          mode={mode}
          setMode={setMode}
        />
      )}
      {mode === "Vote" && storyToVote && (
        <StoryVotingComponent
          id={storyToVote.id}
          name={storyToVote.name}
          description={storyToVote.description}
        />
      )}
      {stories.length > 0 && !mode ? (
        <div className="stories-container overflow-y-auto flex flex-col gap-y-5">
          {stories.map(({ id, name, description }) => (
            <SingleStoryComponent
              key={id}
              id={id}
              name={name}
              description={description}
              sessionId={params.id}
              setFormState={setFormState}
              setMode={setMode}
            />
          ))}
        </div>
      ) : (
        !mode && (
          <p className="stories-container text-2xl text-gray text-center">
            No stories added
          </p>
        )
      )}
    </div>
  );
};

export default StorySection;
