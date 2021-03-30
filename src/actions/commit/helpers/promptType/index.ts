import promptSoloOption from '../../../../helpers/promptSoloOption';
import promptString from '../../../../helpers/promptString';

const message = 'Provide commit type';

const promptType = (types: string[] | undefined): Promise<string> => {
  if (!types) {
    return promptString({
      message,
    });
  }
  return promptSoloOption({
    message,
    choices: types,
  });
};

export default promptType;
