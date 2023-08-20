"use client";

import InputComponent from "../InputComponent";
import TextAreaComponent from "../TextAreaComponent";
import ButtonComponent from "../ButtonComponent";
import { APIReturn, SingleStory, StoryFormComponentProps } from "@/types";
import { API } from "@/api";
import { getUserId } from "@/utils";
import { toast } from "react-toastify";
import useStoryHook from "@/hooks/useStoryHook";

const StoryFormComponent = ({
  sessionId,
  formState,
  setFormState,
  mode,
  setMode,
}: StoryFormComponentProps) => {
  const { addNewStory, editExistingStory } = useStoryHook();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setMode("");
    setFormState({ id: undefined, name: "", description: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (mode) {
      case "Add Story":
        const addStoryResult: APIReturn = await API.addStory(
          sessionId,
          getUserId(),
          formState.name,
          formState.description
        );
        if (addStoryResult.message === "new story added") {
          // addNewStory(
          //   addStoryResult.id! as number,
          //   formState.name,
          //   formState.description
          // );
          resetForm();
        } else {
          toast.error(addStoryResult.data?.join(" \u26D4 "));
        }
        break;

      case "Edit Story":
        const editStoryResult: APIReturn = await API.editStory(
          sessionId,
          formState.id!,
          formState.name,
          formState.description
        );
        if (editStoryResult.message === "story edited") {
          // editExistingStory(
          //   formState.id!,
          //   formState.name,
          //   formState.description
          // );
          resetForm();
        } else {
          toast.error(editStoryResult.data?.join(" \u26D4 "));
        }
        break;

      default:
        break;
    }
  };

  return (
    <form className="stories-container" onSubmit={handleSubmit}>
      <InputComponent
        inputLabel="Story Name"
        inputName="name"
        inputPlaceholder=""
        inputType="text"
        inputValue={formState.name}
        onChange={handleChange}
        styles={{
          div: "",
          label: "input-component__label--new-session-form",
          field: "input-component__field--new-session-form",
        }}
      />
      <TextAreaComponent
        label="description"
        textAreaChange={handleChange}
        textAreaValue={formState.description}
      />
      <div className="flex justify-center">
        <ButtonComponent
          text={mode}
          colorClass="bg-main-orange"
          hoverColor="hover:bg-hover-orange"
        />
      </div>
    </form>
  );
};

export default StoryFormComponent;
