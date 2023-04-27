import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './Login';
jest.mock('./login.scss', () => {});
jest.mock('../assets/tunnel-65492.mp4', () => 'mocked-video-file');
import { loginHandler, googleAuth } from '../handlers/auth/auth';
import { setAdmin } from '../stateManagement/state';
import { JSDOM } from 'jsdom';

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

describe('Login component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
  });

  it('should handle form submission', async () => {
    const mockDispatch = useDispatch();

    loginHandler.mockResolvedValue({ isAdmin: true });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);

    expect(loginHandler).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });

    await screen.findByText('Sign in');
    expect(mockDispatch).toHaveBeenCalledWith(setAdmin(true));
    expect(screen.getByTestId('Background')).toBeInTheDocument();
  });

  it('should handle Google authentication', async () => {
    const mockDispatch = useDispatch();

    googleAuth.mockResolvedValue({ isAdmin: false });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const googleButton = screen.getByRole('button', {
      name: 'CONTINUE WITH GOOGLE',
    });

    fireEvent.click(googleButton);

    expect(googleAuth).toHaveBeenCalled();

    await screen.findByText('Sign in');
    expect(mockDispatch).toHaveBeenCalledWith(setAdmin(false));
    expect(screen.getByTestId('Background')).toBeInTheDocument();
  });
});
