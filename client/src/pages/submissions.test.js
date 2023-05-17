/**
 * @jest-environment jsdom
 */

import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Submissions from './Competitions/Submissions';
import { getSubmissions, addSubmission } from '../handlers/submissions';
import { uploadFile } from '../handlers/competitions';
import { act } from 'react-dom/test-utils';

jest.mock('../handlers/submissions');
jest.mock('../handlers/competitions');
jest.mock('./login.scss', () => ({}));

describe('Submissions Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', async () => {
    // Mock the response from getSubmissions
    const mockResponse = {
      max_scores: [80, 0, null, 0, 0],
      subs_history: [
        { time: '12-05-2023 21:00', score: 80, test_case: 1 },
        { time: '12-06-2023 21:00', score: 90, test_case: 3 },
      ],
    };
    getSubmissions.mockResolvedValue(mockResponse);

    const numtests = 5;
    const subsid = 'abc123';

    await act(async () => {
        const { container } = render(
      <Submissions compid="123" numtests={numtests} subsid={subsid} />
    );

    // Assert loading state
    expect(container.innerHTML).toContain('CircularProgress');

    })
    
    // Wait for data to load
    // await waitFor(() => {
    //   // Assert rendered data
    //   expect(container.innerHTML).toContain('Submissions');
    //   expect(container.querySelectorAll('.MuiTableRow')).toHaveLength(numtests);
    // });
  });

//   it('handles file upload and submission', async () => {
//     // Mock the response from getSubmissions
//     const mockResponse = {
//       max_scores: [80, 0, null, 0, 0],
//       subs_history: [
//         { time: '12-05-2023 21:00', score: 80, test_case: 1 },
//         { time: '12-06-2023 21:00', score: 90, test_case: 3 },
//       ],
//     };
//     getSubmissions.mockResolvedValue(mockResponse);

//     // Mock the response from addSubmission
//     const mockFeedback = 'Submission feedback';
//     addSubmission.mockResolvedValue(mockFeedback);

//     const numtests = 5;
//     const subsid = 'abc123';

//     await act( async () => {
//         const { container, getAllByRole, getByText } = render(
//       <Submissions compid="123" numtests={numtests} subsid={subsid} />
//     );

//     // Wait for data to load
//     await waitFor(async() => {
//       // Assert rendered data
//       expect(container.innerHTML).toContain('Submissions');
//       //expect(container.querySelectorAll('.MuiTableRow')).toHaveLength(numtests);
//     });

//     // Click on "Add Submission" for the first test case
//     fireEvent.click(getAllByRole('button', { name: '' })[0]);

//     // Mock file upload
//     const mockFile = new File(['solution content'], 'solution.txt', { type: 'text/plain' });
//     const mockZipFile = new File(['zip content'], 'source.zip', { type: 'application/zip' });
//     const fileInput = container.querySelector('input[type="file"]')[0];
//     Object.defineProperty(fileInput, 'files', {
//       value: [mockFile],
//     });
//     const zipFileInput = container.querySelectorAll('input[type="file"]')[1];
//     Object.defineProperty(zipFileInput, 'files', {
//       value: [mockZipFile],
//     });

//     // Click on "Submit"
//     fireEvent.click(getByText('SUBMIT'));

//     // Assert uploadFile and addSubmission were called with the correct parameters
//     expect(uploadFile).toHaveBeenCalledWith('123', subsid, 'solution.txt', mockFile);
//     expect(uploadFile).toHaveBeenCalledWith('123', subsid, 'source.zip', mockZipFile);
//     expect(addSubmission).toHaveBeenCalledWith('123', subsid, {
//       solution_filename: 'solution.txt',
//       source_filename: 'source.zip',
//     });

//     // Wait for submission feedback
//     await waitFor(() => {
//       // Assert feedback is displayed
//       expect(container.innerHTML).toContain(mockFeedback);
//     });
//     })
    
//   });
});
