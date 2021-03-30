declare module 'enquirer' {
  export interface PromptOptions {
    message: string;
  }

  export type AutoCompleteChoices =
    | {
        name: string;
        value: string;
      }[]
    | string[];

  export interface AutoCompleteOptions extends PromptOptions {
    multiple: boolean;
    choices: AutoCompleteChoices;
    result?: (names: string[]) => any;
  }

  export class Prompt {}

  export class AutoComplete extends Prompt {
    constructor(options: AutoCompleteOptions);

    find(name: string, prop: string): string;

    run(): Promise<string[] | string>;
  }

  export type StringPromptOptions = PromptOptions;

  export class StringPrompt extends Prompt {
    input: string;

    state: {
      input: string;
    };

    constructor(options: StringPromptOptions);

    message(): Promise<string>;

    format(): Promise<string>;

    append(ch: string): void;

    run(): Promise<string>;
  }
}
