import { AutoComplete, AutoCompleteChoices } from 'enquirer';
import promptMultiOptions from '../../../../helpers/promptMultiOptions';

const promptCommitLocations = (
  choices: AutoCompleteChoices,
): Promise<string[]> => {
  return promptMultiOptions({
    message: 'Select packages',
    choices,
  });
};

export default promptCommitLocations;
