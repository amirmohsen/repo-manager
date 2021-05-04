import promptToggle from '../../../../helpers/promptToggle';

const promptProceedWithInvalidCommit = () =>
  promptToggle({
    message: 'Do you want to continue anyway?',
  });

export default promptProceedWithInvalidCommit;
