import simpleGit from 'simple-git';
import { execSync } from 'child_process';
import { resolve, join } from 'path';
import { ensureDirSync, removeSync, pathExistsSync, copySync } from 'fs-extra';

const ROOT = resolve(__dirname, '../..');

const EXAMPLE_CONTENTS_DIR = join(
  ROOT,
  'test/utils/mock-repo-examples/lerna-yarn-workspaces',
);

const REPOS_DIR = join(ROOT, 'out/functional-test-repos');

ensureDirSync(REPOS_DIR);

const createMockRepo = async (command: string) => {
  const GIT_REPO_DIR = join(REPOS_DIR, command);
  const cleanup = () => removeSync(GIT_REPO_DIR);

  if (pathExistsSync(GIT_REPO_DIR)) {
    cleanup();
  }

  ensureDirSync(GIT_REPO_DIR);

  const git = simpleGit({
    baseDir: GIT_REPO_DIR,
  });

  await git.init();

  copySync(EXAMPLE_CONTENTS_DIR, GIT_REPO_DIR);

  execSync('yarn', {
    cwd: GIT_REPO_DIR,
  });

  const reman = (options: string = '') =>
    execSync(`node ${ROOT}/out/dist/js/bin.js commit ${options}`, {
      cwd: GIT_REPO_DIR,
    });

  return {
    reman,
    repoDir: GIT_REPO_DIR,
    git,
    cleanup,
  };
};

export default createMockRepo;
