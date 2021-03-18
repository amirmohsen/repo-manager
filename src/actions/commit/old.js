const exec = require('child-process-promise').exec;
const simpleGit = require('simple-git').default;
const { type: commitType, message: commitMessage } = require('yargs')
  .option('type', {
    alias: 't',
    type: 'string',
    description: 'Commit type',
    demandOption: true,
  })
  .option('message', {
    alias: 'm',
    type: 'string',
    description: 'Commit message',
    demandOption: true,
  }).argv;

const git = simpleGit();

const findScopesToCommit = async (workspaces) => {
  const scopes = await Promise.all(
    Object.entries(workspaces).map(async ([packageName, { location }]) => ({
      location,
      packageName,
      shouldCommit: Boolean((await git.status([location])).files.length),
    })),
  );

  return scopes
    .filter(({ shouldCommit }) => shouldCommit)
    .map(({ location, packageName }) => ({ location, packageName }));
};

const getWorkspaces = async () => {
  const { stdout: rawWorkspaces } = await exec('yarn --silent workspaces info');
  return JSON.parse(rawWorkspaces);
};

const commitScope = async ({ location, scope }) => {
  console.log(`Adding: ${location}`);
  await git.add(location);

  const fullCommitMessage = `${commitType}(${scope}): ${commitMessage}`;
  console.log(`Committing: ${fullCommitMessage}`);
  await git.commit(fullCommitMessage);
};

const run = async () => {
  const workspaces = await getWorkspaces();
  const scopes = await findScopesToCommit(workspaces);

  for (const { location, packageName } of scopes) {
    await commitScope({
      location,
      scope: packageName,
    });
  }
};

run();
