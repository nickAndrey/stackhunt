export type AuthCredentials = {
  staff_id: string;
  email: string;
  hashed_password: string;
  role: 'staff' | 'admin';
  last_login: string;
};
