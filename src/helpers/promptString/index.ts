import { StringPrompt, StringPromptOptions } from 'enquirer';

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
    return `${originalMessage} (${(this.inclusivePrefix + this.input).length
      .toString()
      .padStart(this.maxCount.toString().length, '0')}/${this.maxCount})`;
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
