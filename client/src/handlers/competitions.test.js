import { createNewCompetitions, createTeam } from './competitions.js'
import axios from 'axios';

jest.mock('axios');

describe('createNewCompetitions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
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

describe('createTeam', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should create a new team and return join code', async () => {
    const expectedResponse = { teamCode: 'abcde' };
    axios.post.mockResolvedValue(expectedResponse);

    const inputs = {
      teamname: 'TeamName',
      uid: '123',
    };
    const result = await createTeam(inputs);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/competitions/createTeams', inputs);
    expect(result).toEqual(expectedResponse.data);
  });
});

