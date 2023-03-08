import axios from 'axios';
import { SignInService } from './authService';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
export const auth = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const Auth = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refresh: (token: any) =>
    auth.get('user/refresh', {
      headers: {
        'x-access-token': token,
      },
    }),
  signIn: (userData: SignInService) =>
    auth.post('user/signin', {
      email: userData.email,
      password: userData.password_signin,
      isKeep: userData.isKeep,
    }),
};

export const SignApi = {
  signUp: (userData: FormData) => api.post('user/signup', userData),
  checkDupleEmail: (email: string) => api.get(`user/check/email?email=${email}`),
  checkDupleNick: (nickname: string) => api.get(`user/check/nickname?nickname=${nickname}`),
  checkDuplePhone: (phone: string) => api.get(`user/check/phone?phone=${phone}`),
};

export const Mentee = {
  question: (questionContents: FormData) => api.post('mentee/question', questionContents),
};
