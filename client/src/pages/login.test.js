import React from 'react';
import { createMemoryRouter, Route, createRoutesFromElements } from 'react-router-dom';

import Login from './Login.js';
jest.mock('./login.scss', () => {});
jest.mock('../assets/tunnel-65492.mp4', () => 'mocked-video-file');

import { JSDOM } from 'jsdom';

import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import store from "../stateManagement/store.js";
import { Provider } from 'react-redux';
import { loginHandler, googleAuth } from '../handlers/auth/auth';
import { setAdmin } from '../stateManagement/state';

// Mock external dependencies and functions
jest.mock('../handlers/auth/auth');

describe('Login component', () => {

  beforeEach(() => {
    // Reset mock function mocks before each test
    loginHandler.mockClear();

    // Create a mock Redux store

  });

  test('handleSubmit should dispatch actions and navigate on successful login', async () => {
    // Mock loginHandler to resolve with desired data
    loginHandler.mockResolvedValue({ isAdmin: true });

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Rest of the test code...
  });

  test('handleSubmit should update error state on login failure', async () => {
    // Mock loginHandler to reject with an error
    const errorMessage = 'Invalid credentials';
    loginHandler.mockRejectedValue(new Error(errorMessage));

    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Rest of the test code...
  });

  test('handlegoogle should dispatch actions and navigate on successful Google authentication', async () => {
    // Rest of the test code...
  });

  // Additional tests...
});



const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost' // Provide a dummy URL to resolve the "TypeError" issue
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };


jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../handlers/auth/auth', () => ({
  loginHandler: jest.fn(),
  googleAuth: jest.fn(),
}));

const routesConfig = createRoutesFromElements(
    <Route path = "/" >
      <Route exact index element = {<Login/>}/>
    </Route>

  )

const router = createMemoryRouter(routesConfig, { initialEntries: ["/"]})



