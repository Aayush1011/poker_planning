import { StoryVotingComponentProps } from "@/types";

export const StoryVotingComponent = ({
  id,
  name,
  description,
}: StoryVotingComponentProps) => {
  return (
    <div className="stories container">
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
