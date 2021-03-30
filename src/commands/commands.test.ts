import {
  mockProcessExit,
  mockProcessStderr,
  mockProcessStdout,
} from 'jest-mock-process';
import stripAnsi from 'strip-ansi';

interface MockProcessParams {
  args?: string;
}

interface MockProcessReturnValue {
  mocks: {
    exit: jest.SpyInstance;
    stdout: jest.SpyInstance;
    stderr: jest.SpyInstance;
  };
  restore: () => void;
}

const mockProcess = ({
  args = '',
}: MockProcessParams = {}): MockProcessReturnValue => {
  const originalArgv = process.argv;
  const mockExit = mockProcessExit();
  const mockStdout = mockProcessStdout();
  const mockStderr = mockProcessStderr();

  process.argv = [
    'node',
    'reman',
    ...(args ? args.split(' ').map((piece) => piece.trim()) : []),
  ];

  return {
    mocks: {
      exit: mockExit,
      stdout: mockStdout,
      stderr: mockStderr,
    },
    restore: () => {
      process.argv = originalArgv;
      mockExit.mockRestore();
      mockStdout.mockRestore();
      mockStderr.mockRestore();
    },
  };
};

const getOutput = (stream: NodeJS.WriteStream): string =>
  (stream.write as jest.Mock).mock.calls
    .map((call: string[]) => stripAnsi(call[0]))
    .join('\n');

describe('commands', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('../helpers/globals');
    jest.doMock('..');
  });

  afterEach(() => {
    jest.dontMock('..');
  });

  describe('when not provided with any arguments', () => {
    test('should exit with error code 1 and write to stdout', async () => {
      const { restore, mocks } = mockProcess();

      await import('.');

      expect(mocks.exit).toHaveBeenCalledTimes(1).toHaveBeenNthCalledWith(1, 1);

      const output = getOutput(process.stdout);

      restore();

      expect(output.includes('reman commit')).toBe(true);

      expect(
        output.includes('Commit message to one, multiple or all scopes'),
      ).toBe(true);

      expect(
        output.includes(
          'Not enough non-option arguments: got 0, need at least 1',
        ),
      ).toBe(true);
    });
  });
});
