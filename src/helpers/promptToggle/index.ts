import { Toggle, ToggleOptions } from 'enquirer';

const promptToggle = ({ message }: Pick<ToggleOptions, 'message'>) => {
  const prompt = new Toggle({
    message,
    enabled: 'Yes',
    disabled: 'No',
  });
  return prompt.run();
};

export default promptToggle;
