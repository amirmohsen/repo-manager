import { SimpleGit } from 'simple-git';

import createMockRepo from '../utils/createMockRepo';

describe('commit', () => {
  let git!: SimpleGit;
  let cleanup!: () => void;
  let reman!: (options?: string) => Buffer | string;

  afterAll(() => {});

  beforeEach(async () => {
    ({ git, cleanup, reman } = await createMockRepo('commit'));
  });

  afterEach(() => {
    // cleanup();
  });

  describe('with flags', () => {
    const flags = ['--all --type chore --message "this is a test message"'];
    it.each(flags)('%p', (flag: string) => {
      reman(flag);
    });
  });

  describe('without flags', () => {});

  describe('a combination of some flags and some manual input', () => {});
});
