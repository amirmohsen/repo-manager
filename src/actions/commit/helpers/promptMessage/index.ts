import { StringPrompt, StringPromptOptions } from 'enquirer';
import prefix from '../../../../helpers/prefix';
import suffix from '../../../../helpers/suffix';
import getCharCountIndicator from '../../../../helpers/getCharCountIndicator';
import errorAndExit from '../../../../helpers/errorAndExit';
import { ScopesMetaData } from '../../../../helpers/getScopesMetaData';

export interface CommitMessagePromptOptions extends StringPromptOptions {
  maxCount?: number;
  type: string;
  scopesMetaData: ScopesMetaData;
}

export class CommitMessagePrompt extends StringPrompt {
  maxCount: number;
  type: string;
  scopesMetaData: ScopesMetaData;

  constructor({
    type,
    maxCount = Infinity,
    scopesMetaData,
    ...props
  }: CommitMessagePromptOptions) {
    super(props);
    this.maxCount = maxCount;
    this.type = type;
    this.scopesMetaData = scopesMetaData;
  }

  async format(): Promise<string> {
    const firstLine = await this.getFirstLine();
    const mirrorLines = this.getMirrorLines();
    return `${firstLine}\n${mirrorLines.join('\n')}`;
  }

  async run(): Promise<string> {
    const value = await super.run();

    if (value.length > this.scopesMetaData.realMaxCount) {
      errorAndExit('Provided message is too long');
    }

    return value;
  }

  private async getFirstLine(): Promise<string> {
    const formatted = await super.format();
    return suffix(
      formatted,
      getCharCountIndicator({
        message: this.state.input,
        maxCount: this.scopesMetaData.realMaxCount,
      }),
    );
  }

  private getMirrorLines(): string[] {
    return this.scopesMetaData.prefixes.map((prefixStr) => {
      const message = `${prefixStr}${this.state.input}`;
      return prefix(
        message,
        getCharCountIndicator({
          message,
          maxCount: this.maxCount,
        }),
      );
    });
  }
}

const promptMessage = (
  props: Omit<CommitMessagePromptOptions, 'message'>,
): Promise<string> => {
  const prompt = new CommitMessagePrompt({
    message: 'Provide commit message',
    ...props,
  });
  return prompt.run();
};

export default promptMessage;
