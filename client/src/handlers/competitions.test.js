import { createNewCompetitions } from '../competitions.js'
import axios from 'axios';

jest.mock('axios');

describe('createNewCompetitions', () => {
  it('should return the competition data', async () => {
    const expectedResponse = { data: { competitionId: '123' } };
    axios.post.mockResolvedValue(expectedResponse);

    const inputs = {
      compname: 'Test Competition',
      compdesc: 'This is a test competition',
      regstartdate: '2022-01-01',
      regenddate: '2022-01-31',
      compdate: '2022-02-28',
      teamsize: 3,
      numteams: 8,
    };
    const result = await createNewCompetitions(inputs);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/competitions/createCompetition', inputs);
    expect(result).toEqual(expectedResponse.data);
  });
});