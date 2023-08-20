export interface SignUpData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LogInData {
  email: string;
  password: string;
}

export interface FormData extends LogInData, SignUpData {}

export interface UserCredentials {
  userId: number;
  userName: string;
  token: string;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export interface LogInAPIReturn extends UserCredentials {
  message: string;
  data?: string[];
}

export interface InputComponentProps {
  inputName: string;
  inputType: string;
  inputLabel: string;
  inputPlaceholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  styles: { div: string; label: string; field: string };
}

export interface ButtonComponentProps {
  text: string;
  colorClass: string;
  hoverColor?: string;
  callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface TopBarProps {
  onMenuClick?: React.MouseEventHandler<HTMLDivElement>;
  params?: { id: string };
}

export interface PreviousSessionRowsProps {
  name: string;
  status: string;
  participantCount: number;
  id: string;
  description: string;
}

export interface UserSessionsData {
  rows: Partial<Array<PreviousSessionRowsProps>>;
  count: number;
}

export interface TextAreaComponentProps {
  label: string;
  textAreaValue: string;
  textAreaChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export interface NewSessionDetails {
  name: string;
  description: string;
}

export interface SessionDetails extends NewSessionDetails {
  message: string;
  status: string;
}

export interface SessionPageProps extends Partial<NewSessionDetails> {}

export interface PaginationProps {
  total: number;
  currentPageSetter: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export interface FormState extends Omit<SingleStory, "id"> {
  id?: number;
}

export interface StoryFormComponentProps {
  sessionId: string;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

export interface APIReturn {
  message: string;
  id?: string | number;
  data?: string[];
}
export interface SingleStoryComponentProps extends SingleStory {
  sessionId: string;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

export interface SingleStory {
  id: number;
  name: string;
  description: string;
}

export interface GetStoriesAPIReturn {
  message: string;
  stories?: SingleStory[];
}

export interface StorySocketReturn {
  action: string;
  id: number;
  name?: string;
  description?: string;
}

export interface IIsModeratorContext {
  isModerator: boolean;
  setIsModerator: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddParticipantAPIReturn {
  message: string;
  role: string;
}

export interface StoryVotingComponentProps extends SingleStory {}
