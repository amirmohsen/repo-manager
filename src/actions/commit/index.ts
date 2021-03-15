import { ICommit } from './types';

const commit = ({ message, type, all, root }: ICommit) => {
  console.log({ message, type, all, root });
};

export default commit;
