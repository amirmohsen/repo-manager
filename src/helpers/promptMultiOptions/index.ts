import { AutoComplete, AutoCompleteChoices } from 'enquirer';

export interface PromptOptionsParams {
  message: string;
  choices: AutoCompleteChoices;
}

const promptMultiOptions = ({
  message,
  choices,
}: PromptOptionsParams): Promise<string[]> => {
  const prompt = new AutoComplete({
    message,
    choices,
    multiple: true,
    result(names) {
      return names.map((name) =>
        ((this as unknown) as AutoComplete).find(name, 'value'),
      );
    },
  });

  return prompt.run() as Promise<string[]>;
};

export default promptMultiOptions;
