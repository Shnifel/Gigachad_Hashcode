// Import the function to test and Firebase
import { createCompetition } from './competitions.js';
import { db } from '../../database/firebase.js';

// Mock the Firebase Firestore methods
jest.mock('../../database/firebase.js', () => {
  return {
    db: {
      collection: jest.fn().mockReturnValue({
        add: jest.fn().mockResolvedValue({ id: 'competition-id' }),
      }),
    },
  };
});

describe('createCompetition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should create a competition successfully', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        uid: 'admin-id',
        compname: 'Test Competition',
        compdesc: 'A test competition',
        regstartdate: '2023-05-01',
        regenddate: '2023-05-10',
        compdate: '2023-06-01',
        max_teamsize: 5,
        numteams: 10,
        min_teamsize: 2,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    console.log(db)

    // Call the function
    await createCompetition(req, res);

    // Expect the Firestore methods to be called with the correct arguments
    expect(db.collection).toHaveBeenCalledWith('Competitions');
    expect(db.collection().add).toHaveBeenCalledWith({
      admin: 'admin-id',
      compname: 'Test Competition',
      compdesc: 'A test competition',
      regstartdate: '2023-05-01',
      regenddate: '2023-05-10',
      compdate: '2023-06-01',
      max_teamsize: 5,
      numteams: 10,
      min_teamsize: 2,
      teams: [],
    });

    // Expect the response to have a 200 status and the competition ID
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ compid: 'competition-id' });
  });

   
});
