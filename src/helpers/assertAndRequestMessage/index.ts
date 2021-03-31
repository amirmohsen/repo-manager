import promptMessage from '../../actions/commit/helpers/promptMessage';
import errorAndExit from '../errorAndExit';
import { AvailablePackages } from '../getAvailablePackages';
import getScopesMetaData from '../getScopesMetaData';

export interface AssertAndRequestMessageProps {
  availablePackages: AvailablePackages;
  type: string;
  message?: string;
  maxCount: number;
  breaking: boolean;
}

const assertAndRequestMessage = async ({
  availablePackages,
  type,
  message,
  maxCount,
  breaking,
}: AssertAndRequestMessageProps): Promise<string> => {
  const scopesMetaData = getScopesMetaData({
    type,
    availablePackages,
    maxCount,
    breaking,
  });

  if (message) {
    if (message.length > scopesMetaData.realMaxCount) {
      errorAndExit('Provided message is too long');
    }
    return message;
  }

  return promptMessage({
    type,
    maxCount,
    scopesMetaData,
  });
};

export default assertAndRequestMessage;
