import promptToggle from '../../../../helpers/promptToggle';

const promptBreaking = () =>
  promptToggle({
    message: 'Is this a breaking change?',
  });

export default promptBreaking;
