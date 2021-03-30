import json2md from 'json2md';
import { writeFileSync, ensureFileSync } from 'fs-extra';
import cliCommands from '../src/actions/cli';
import { DOCS_API_REFERENCE_PATH } from './paths';
import { CommandBuilder, Options } from 'yargs';

const getOptions = (builder: CommandBuilder) =>
  builder as { [key: string]: Options };

const generateAPIReference = () => {
  const page = [];

  page.push(
    {
      h1: 'API Reference',
    },
    {
      h2: 'CLI commands',
    },
    ...cliCommands.map(({ command, describe, builder }) => {
      const options = getOptions(builder);
      return [
        {
          p: [
            `**Command**: ${command}`,
            `**Description**: ${describe}`,
            `**Usage**: \`reman ${command} [...OPTIONS]\``,
          ],
        },
        {
          table: {
            headers: [
              'Option',
              'Alias',
              'Type',
              'Required',
              'Default',
              'Description',
            ],
            rows: Object.entries(
              options,
            ).map(
              ([
                option,
                {
                  alias,
                  description,
                  type,
                  demandOption,
                  default: defaultValue,
                },
              ]) => [
                option,
                alias,
                type,
                JSON.stringify(demandOption ?? false),
                typeof defaultValue === 'undefined'
                  ? ''
                  : JSON.stringify(defaultValue),
                description,
              ],
            ),
          },
        },
      ];
    }),
  );

  const markdownPage = json2md(page);

  ensureFileSync(DOCS_API_REFERENCE_PATH);
  writeFileSync(DOCS_API_REFERENCE_PATH, markdownPage);
};

generateAPIReference();
