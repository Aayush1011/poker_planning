import { useEffect, useState } from "react";
import { FormState, SingleStory, StorySocketReturn } from "@/types";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { API_URL, socket } from "@/api";

const useStoryHook = () => {
  const [stories, setStories] = useState<[] | SingleStory[]>([]);
  const [mode, setMode] = useState("");
  const [formState, setFormState] = useState<FormState>({
    name: "",
    description: "",
  });

  useEffect(() => {
    socket.on("story", ({ action, ...args }: StorySocketReturn) => {
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

        default:
          break;
      }
    });
  }, []);

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
      const storyIndex = previousStories.findIndex((story) => story.id === id);
      previousStories.splice(storyIndex, 1);

      return [...previousStories];
    });
    toast.info("A story was deleted");
  };

  return {
    stories,
    setStories,
    mode,
    setMode,
    formState,
    setFormState,
    addNewStory,
    editExistingStory,
    deleteStory,
  };
};

export default useStoryHook;
