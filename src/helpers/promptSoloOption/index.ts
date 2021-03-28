import { AutoComplete, AutoCompleteChoices } from 'enquirer';

export interface PromptOptionsParams {
  message: string;
  choices: AutoCompleteChoices;
}

const promptSoloOption = ({
  message,
  choices,
}: PromptOptionsParams): Promise<string> => {
  const prompt = new AutoComplete({
    message,
    choices,
    multiple: false,
  });

  return prompt.run() as Promise<string>;
};

export default promptSoloOption;
