import { markFile } from './marker'; // Replace 'yourFile' with the actual file name
import { bucket } from '../../database/firebase.js';

jest.mock('../../database/firebase.js', () => ({
  bucket: {
    file: jest.fn().mockReturnThis(),
    download: jest.fn().mockResolvedValue(['Mocked file data']),
  },
}));


//Mocking execution of python program
jest.mock('child_process', () => ({
  spawn: jest.fn().mockReturnValue({
    stdout: {
      on: jest.fn((event, callback) => {
        if (event === 'data') {
          callback('80');
        }
      }),
    },
    stderr: {
      on: jest.fn((event, callback) => {
        // if (event === 'error') {
        //   callback('Mocked error');
        // }
      }),
    },
    on: jest.fn((event, callback) => {
      if (event === 'close') {
        callback(0); // Mock successful execution
      }
    }),
    kill: jest.fn(),
  }),
}));

describe('markFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should download files and execute Python script', async () => {
    // Mock the inputs
    const markerPath = 'path/to/marker/file';
    const testPath = 'path/to/test/file';
    const test_case = 'test_case_content';

    // Call the function under test
    const result = await markFile(markerPath, testPath, test_case);

    // Assertions
    expect(bucket.file).toHaveBeenCalledWith(markerPath);
    expect(bucket.file).toHaveBeenCalledWith(testPath);
    expect(bucket.file().download).toHaveBeenCalled();
    expect(bucket.file().download).toHaveBeenCalledTimes(2);
    expect(result).toEqual('80');
    // expect(console.log).toHaveBeenCalledWith('Mocked error');
    // expect(console.log).toHaveBeenCalledTimes(1);
  });

  // Other test cases...
});
