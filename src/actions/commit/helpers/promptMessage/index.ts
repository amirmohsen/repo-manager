import { StringPrompt, StringPromptOptions } from 'enquirer';
import { red, green, blue } from 'chalk';

export interface CommitMessagePromptOptions extends StringPromptOptions {
  maxCount?: number;
  type: string;
  scopes: string[];
  root: boolean;
}

export interface ScopesMetaData {
  realMaxCount: number;
  prefixes: string[];
}

export class CommitMessagePrompt extends StringPrompt {
  maxCount: number;
  type: string;
  scopes: string[];
  root: boolean;
  scopesMetaData: ScopesMetaData;

  constructor({
    scopes,
    type,
    root,
    maxCount = Infinity,
    ...props
  }: CommitMessagePromptOptions) {
    super(props);
    this.maxCount = maxCount;
    this.scopes = scopes;
    this.type = type;
    this.root = root;
    this.scopesMetaData = this.getScopesMetaData();
  }

  async format(): Promise<string> {
    const firstLine = await this.getFirstLine();
    const mirrorLines = this.getMirrorLines();
    return `${firstLine}\n${mirrorLines.join('\n')}`;
  }

  private async getFirstLine(): Promise<string> {
    const formatted = await super.format();
    return `${formatted} ${this.getCharCountIndicator({
      message: this.state.input,
      maxCount: this.scopesMetaData.realMaxCount,
    })}`;
  }

  private getMirrorLines(): string[] {
    return this.scopesMetaData.prefixes.map((prefix) => {
      const message = `${prefix}${this.state.input}`;
      return `${this.getCharCountIndicator({
        message,
        maxCount: this.maxCount,
      })} ${message}`;
    });
  }

  private getCharCountIndicator({
    message,
    maxCount,
  }: {
    message: string;
    maxCount: number;
  }) {
    const currentCount = message.length
      .toString()
      .padStart(maxCount.toString().length, '0');
    const coloredCurrentCount =
      message.length > maxCount ? red(currentCount) : green(currentCount);
    const coloredMaxCount = blue(maxCount);
    return `(${coloredCurrentCount}/${coloredMaxCount})`;
  }

  private getScopesMetaData(): ScopesMetaData {
    return this.scopes.reduce(
      (metadata, scope) => {
        const messagePrefix = `${this.type}(${scope}): `;
        const remainingCharCount = this.maxCount - messagePrefix.length;
        return {
          realMaxCount:
            remainingCharCount < metadata.realMaxCount
              ? remainingCharCount
              : metadata.realMaxCount,
          prefixes: [...metadata.prefixes, messagePrefix],
        };
      },
      {
        realMaxCount: this.maxCount,
        prefixes: [] as string[],
      },
    );
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
