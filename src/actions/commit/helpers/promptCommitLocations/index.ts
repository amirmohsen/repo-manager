import { AutoComplete, AutoCompleteChoices } from 'enquirer';

const promptCommitLocations = async (
  choices: AutoCompleteChoices,
): Promise<string[]> => {
  const prompt = new AutoComplete({
    message: 'Select packages',
    multiple: true,
    choices,
    result(names) {
      return names.map((name) =>
        ((this as unknown) as AutoComplete).find(name, 'value'),
      );
    },
  });

  return prompt.run();
};

export default promptCommitLocations;
