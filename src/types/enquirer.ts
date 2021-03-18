declare module 'enquirer' {
  export type AutoCompleteChoices =
    | {
        name: string;
        value: string;
      }[]
    | string[];

  export interface AutoCompleteOptions {
    message: string;
    multiple: boolean;
    choices: AutoCompleteChoices;
    result: (names: string[]) => any;
  }

  export class AutoComplete {
    constructor(options: AutoCompleteOptions);

    run(): Promise<string[]>;

    find(name: string, prop: string): string;
  }
}
