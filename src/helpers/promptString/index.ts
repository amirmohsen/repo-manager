import { StringPrompt, StringPromptOptions } from 'enquirer';
import getCharCountIndicator from '../getCharCountIndicator';
import suffix from '../suffix';

export interface ExtendedStringPromptOptions extends StringPromptOptions {
  maxCount?: number;
  inclusivePrefix?: string;
}

export class ExtendedStringPrompt extends StringPrompt {
  maxCount: number;

  inclusivePrefix: string;

  constructor({
    maxCount = Infinity,
    inclusivePrefix = '',
    ...options
  }: ExtendedStringPromptOptions) {
    super(options);
    this.maxCount = maxCount;
    this.inclusivePrefix = inclusivePrefix;
  }

  async message(): Promise<string> {
    const originalMessage = await super.message();
    return suffix(
      originalMessage,
      getCharCountIndicator({
        message: originalMessage,
        maxCount: this.maxCount,
      }),
    );
  }

  async format(): Promise<string> {
    const formatted = await super.format();
    return `${this.inclusivePrefix}${formatted}`;
  }

  append(ch: string) {
    if ((this.inclusivePrefix + this.input).length === this.maxCount) {
      return;
    }
    super.append(ch);
  }
}

const promptString = (
  options: ExtendedStringPromptOptions,
): Promise<string> => {
  const prompt = new ExtendedStringPrompt(options);
  return prompt.run();
};

export default promptString;
