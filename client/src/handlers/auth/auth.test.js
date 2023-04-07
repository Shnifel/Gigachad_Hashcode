

import { loginHandler } from './auth';


describe('loginHandler', () => {
    it('should return an error if email is empty', async () => {
        await expect(loginHandler({email: '', password: 'password'})).rejects.toThrow('auth/invalid-email');
    });
  
    it('should return an error if password is empty', async () => {
        await expect(loginHandler({email: 'test@email.com', password: ''})).rejects.toThrow('auth/missing-password');
    });

    // Add more test cases as needed
  });
  

