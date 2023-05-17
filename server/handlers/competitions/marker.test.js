import { markFile } from './marker'; // Replace 'yourFile' with the actual file name
import { bucket } from '../../database/firebase.js';
import { spawn } from 'child_process';

jest.mock('../../database/firebase.js', () => ({
  bucket: {
    file: jest.fn().mockReturnThis(),
    download: jest.fn().mockResolvedValue(['Mocked file data']),
  },
}));


//Mocking execution of python program for successful operations
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

//Mocking timeout
jest.mock('timers', () => ({
  setTimeout: jest.fn((callback) => {
    callback();
    return {
      ref: jest.fn(),
      unref: jest.fn(),
      refresh: jest.fn(),
      close: jest.fn(),
    };
  }),
  clearTimeout: jest.fn(),
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

  it('should handle error when marking times out', async () => {
    spawn.mockReturnValueOnce({
      stdout: {
        on: jest.fn((event, callback) => {
        }),
      },
      stderr: {
        on: jest.fn((event, callback) => {
          callback("Marking timed out after 1s");
        }),
      },
      on: jest.fn((event, callback) => {
        if (event === 'close') {
          callback(1); // Mock unsuccessful execution
        }
        
      }),
      kill: jest.fn(),
    })

    // Mock the inputs
    const markerPath = 'path/to/marker/file';
    const testPath = 'path/to/test/file';
    const test_case = 'test_case_content';


    // Call the function under test
    const promise = markFile(markerPath, testPath, test_case);
    // Fast-forward time
    jest.advanceTimersByTime(1000);

    // Assertions
    await expect(promise).rejects.toThrow('Marking timed out after 1s');
    expect(bucket.file).toHaveBeenCalledWith(markerPath);
    expect(bucket.file).toHaveBeenCalledWith(testPath);
    expect(bucket.file().download).toHaveBeenCalled();
    expect(bucket.file().download).toHaveBeenCalledTimes(2);

  });

  it('should handle error when an error occurs during file download', async () => {
    // Mock the Firebase bucket to throw an error during download
    bucket.file().download.mockRejectedValueOnce(new Error('Failed to download file'));

    // Mock the inputs
    const markerPath = 'path/to/marker/file';
    const testPath = 'path/to/test/file';
    const test_case = 'test_case_content';

    // Call the function under test
    const promise = markFile(markerPath, testPath, test_case);

    // Assertions
    await expect(promise).rejects.toThrow('Failed to download file');
    expect(bucket.file).toHaveBeenCalledWith(markerPath);
  });

});


describe('markFile invalid input', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle error when an error occurs during spawn', async () => {
    // Mock the spawn function to return an error
   
      spawn.mockReturnValueOnce({
        stdout: {
          on: jest.fn((event, callback) => {
          }),
        },
        stderr: {
          on: jest.fn((event, callback) => {
            if (event === "error"){
              callback("Invalid text file format")
            }
          }),
        },
        on: jest.fn((event, callback) => {
          if (event === 'close') {
            callback(1); // Mock unsuccessful execution
          }
          
        }),
        kill: jest.fn(),
      })
    
    // Mock the inputs
    const markerPath = 'path/to/marker/file';
    const testPath = 'path/to/test/file';
    const test_case = 'test_case_content';

    // Call the function under test
    const promise = markFile(markerPath, testPath, test_case);

    // Assertions
    await expect(promise).rejects.toThrow('Invalid text file format');
    expect(bucket.file).toHaveBeenCalledWith(markerPath);
    expect(bucket.file).toHaveBeenCalledWith(testPath);
    expect(bucket.file().download).toHaveBeenCalled();
    expect(bucket.file().download).toHaveBeenCalledTimes(2);
  });

})
