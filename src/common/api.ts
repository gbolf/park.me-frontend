export const api = {
  me: 'user/profile',
  login: 'auth/login',
  register: 'auth/register',
  logout: 'auth/logout',

  fileUpload: 'upload',
  parking: 'parkings',
  myparkings: 'parkings/myParkings',
  bookedParkings: 'parkings/bookedParkings',
} as const;
