import { StringPrompt, StringPromptOptions } from 'enquirer';
import { red, green, blue } from 'chalk';

export interface CommitMessagePromptOptions extends StringPromptOptions {
  maxCount?: number;
  type: string;
  scopes: string[];
  root: boolean;
}

export class CommitMessagePrompt extends StringPrompt {
  maxCount: number;
  type: string;
  scopes: string[];
  root: boolean;

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
  }

  async format(): Promise<string> {
    const formatted = await super.format();
    return `${formatted}\n${this.scopes
      .map((scope) => {
        let completeMessage = `${this.type}(${scope}): ${this.state.input}`;
        const currentCount = completeMessage.length
          .toString()
          .padStart(this.maxCount.toString().length, '0');
        const coloredCurrentCount =
          completeMessage.length > this.maxCount
            ? red(currentCount)
            : green(currentCount);
        const coloredMaxCount = blue(this.maxCount);
        completeMessage =
          completeMessage.length > this.maxCount
            ? red(completeMessage)
            : completeMessage;
        return `(${coloredCurrentCount}/${coloredMaxCount}) ${completeMessage}`;
      })
      .join('\n')}`;
  }

  append(ch: string) {
    // if ((this.inclusivePrefix + this.input).length === this.maxCount) {
    //   return;
    // }
    super.append(ch);
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
