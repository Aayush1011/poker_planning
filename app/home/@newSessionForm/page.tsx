"use client";

import { useState } from "react";

import { toast } from "react-toastify";
import InputComponent from "@/components/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { API } from "@/api";
import { useRouter } from "next/navigation";
import { getUserId } from "@/utils";
import { APIReturn } from "@/types";

const NewSession = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({ name: "", description: "" });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: APIReturn = await API.createSession(formState);
    if (result.message === "new session created") {
      const participantAddition: { message: string } = await API.addParticipant(
        getUserId(),
        result.id! as string,
        "moderator"
      );
      if (participantAddition.message === "new participant added") {
        router.push(`/session/${result.id}`);
      } else {
        console.log(result.message);
      }
    } else {
      toast.error(result.data?.join(" \u26D4 "));
    }
  };

  return (
    <div className="w-5/6 p-5 md:w-1/2 md:p-8 md:border-b md:border-solid md:border-b-light-grey md:border-l md:border-l-light-grey">
      <h1 className="text-almost-black text-3xl mb-4">Create New Session</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-x-5">
        <div>
          <InputComponent
            inputName="name"
            inputType="text"
            inputLabel="Session Name"
            inputPlaceholder=""
            onChange={handleChange}
            inputValue={formState.name}
            styles={{
              div: "",
              label: "input-component__label--new-session-form",
              field: "input-component__field--new-session-form",
            }}
          />
        </div>
        <TextAreaComponent
          label="description"
          textAreaChange={handleChange}
          textAreaValue={formState.description}
        />
        <ButtonComponent
          text="Start Session"
          colorClass="bg-main-orange"
          hoverColor="hover:bg-hover-orange"
        />
      </form>
    </div>
  );
};

export default NewSession;
